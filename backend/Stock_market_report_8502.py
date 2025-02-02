import os
import streamlit as st
import pandas as pd
import numpy as np
import plotly.graph_objects as go
from ta.trend import SMAIndicator, MACD
from ta.momentum import RSIIndicator
from datetime import datetime
from fpdf import FPDF

def load_csv_data(file):
    try:
        # Read CSV file
        df = pd.read_csv(file)
        
        # Debug information
        st.write("Initial data shape:", df.shape)
        
        # Check if DataFrame is empty
        if df.empty:
            st.error("The uploaded CSV file is empty")
            return None
        
        # Check if 'Date' column exists
        if 'Date' not in df.columns:
            st.error("CSV file must contain a 'Date' column")
            return None
        
        # Create a copy to avoid modifying original data
        df = df.copy()
            
        # Convert Date column to datetime with error handling
        try:
            df['Date'] = pd.to_datetime(df['Date'])
        except Exception as e:
            st.error(f"Error converting dates: {str(e)}")
            st.write("Please ensure your date format is consistent (e.g., YYYY-MM-DD)")
            return None
            
        df.set_index('Date', inplace=True)
        
        # Check for required columns
        required_columns = ['Open', 'High', 'Low', 'Close', 'Volume']
        missing_columns = [col for col in required_columns if col not in df.columns]
        
        if missing_columns:
            st.error(f"Missing required columns: {', '.join(missing_columns)}")
            return None
        
        # Clean and convert numeric columns
        for col in required_columns:
            # Remove any currency symbols, commas, and spaces
            if df[col].dtype == object:
                df[col] = df[col].astype(str).str.replace('Rs', '')
                df[col] = df[col].str.replace(',', '')
                df[col] = df[col].str.replace(' ', '')
            
            # Convert to numeric, tracking invalid values
            numeric_series = pd.to_numeric(df[col], errors='coerce')
            invalid_count = numeric_series.isna().sum()
            
            if invalid_count > 0:
                st.warning(f"Found {invalid_count} invalid numeric values in {col} column")
                
            df[col] = numeric_series
        
        # Remove rows with any NaN values
        rows_before = len(df)
        df.dropna(inplace=True)
        rows_removed = rows_before - len(df)
        
        if rows_removed > 0:
            st.warning(f"Removed {rows_removed} rows with missing or invalid values")
        
        # Check remaining data
        if len(df) < 60:
            st.error(f"Not enough valid data points. Found {len(df)} days, but need at least 60 days.")
            
            # Show sample of problematic rows for debugging
            st.write("Sample of rows with issues (before cleaning):")
            problem_rows = df[df.isnull().any(axis=1)]
            if not problem_rows.empty:
                st.write(problem_rows.head())
            
            return None
        
        # Sort by date
        df.sort_index(inplace=True)
        
        # Show successful data range
        st.success(f"Successfully loaded data from {df.index.min()} to {df.index.max()} ({len(df)} trading days)")
        
        return df
        
    except Exception as e:
        st.error(f"Error loading CSV file: {str(e)}")
        st.write("Full error details:", str(e))
        return None

def compute_technical_indicators(df):
    try:
        if df is None or df.empty:
            return None
            
        df['SMA_20'] = SMAIndicator(close=df['Close'], window=20).sma_indicator()
        df['SMA_50'] = SMAIndicator(close=df['Close'], window=50).sma_indicator()
        df['RSI'] = RSIIndicator(close=df['Close']).rsi()
        df['MACD'] = MACD(close=df['Close']).macd_diff()
        df.dropna(inplace=True)
        
        if df.empty:
            st.error("No data left after computing indicators")
            return None
            
        return df
    except Exception as e:
        st.error(f"Error computing technical indicators: {str(e)}")
        return None

def generate_recommendation(df):
    try:
        if df is None or df.empty:
            return "Unable to generate recommendation due to insufficient data"
            
        rsi = df['RSI'].iloc[-1]
        macd = df['MACD'].iloc[-1]
        sma20 = df['SMA_20'].iloc[-1]
        sma50 = df['SMA_50'].iloc[-1]
        
        if rsi < 30 and macd > 0 and sma20 > sma50:
            return "🚀 **Strong Buy**: Oversold with bullish trend!"
        elif rsi < 50 and macd > 0 and sma20 > sma50:
            return "✅ **Buy**: Uptrend forming."
        elif rsi > 70 and macd < 0 and sma20 < sma50:
            return "🚨 **Strong Sell**: Overbought and bearish crossover."
        elif rsi > 50 and macd < 0 and sma20 < sma50:
            return "⚠️ **Sell**: Downtrend forming."
        else:
            return "⏳ **Hold**: Market conditions are neutral."
    except Exception as e:
        return f"Error generating recommendation: {str(e)}"

def generate_pdf_report(df, recommendation):
    try:
        if df is None or df.empty:
            st.error("Cannot generate PDF report: No data available")
            return None
            
        pdf = FPDF()
        pdf.add_page()
        
        # Title
        pdf.set_font('Arial', 'B', 16)
        pdf.cell(0, 10, "Stock Analysis Report", ln=True, align='C')
        
        # Date Range
        pdf.set_font('Arial', '', 10)
        pdf.cell(0, 10, f"Analysis Period: {df.index.min().strftime('%Y-%m-%d')} to {df.index.max().strftime('%Y-%m-%d')}", ln=True)
        
        # Price Information
        pdf.set_font('Arial', 'B', 12)
        pdf.cell(0, 10, "Price Information", ln=True)
        pdf.set_font('Arial', '', 10)
        pdf.cell(0, 10, f"Current Price: Rs{df['Close'].iloc[-1]:.2f}", ln=True)
        pdf.cell(0, 10, f"52-Week High: Rs{df['Close'].rolling(252, min_periods=1).max().iloc[-1]:.2f}", ln=True)
        pdf.cell(0, 10, f"52-Week Low: Rs{df['Close'].rolling(252, min_periods=1).min().iloc[-1]:.2f}", ln=True)
        
        # Technical Indicators
        pdf.set_font('Arial', 'B', 12)
        pdf.cell(0, 10, "Technical Indicators", ln=True)
        pdf.set_font('Arial', '', 10)
        pdf.cell(0, 10, f"RSI: {df['RSI'].iloc[-1]:.2f}", ln=True)
        pdf.cell(0, 10, f"MACD: {df['MACD'].iloc[-1]:.2f}", ln=True)
        pdf.cell(0, 10, f"SMA 20: Rs{df['SMA_20'].iloc[-1]:.2f}", ln=True)
        pdf.cell(0, 10, f"SMA 50: Rs{df['SMA_50'].iloc[-1]:.2f}", ln=True)
        
        # Recommendation
        pdf.set_font('Arial', 'B', 12)
        pdf.cell(0, 10, "Recommendation", ln=True)
        pdf.set_font('Arial', '', 10)
        pdf.multi_cell(0, 10, recommendation.replace('**', '').replace('🚀', '').replace('✅', '').replace('🚨', '').replace('⚠️', '').replace('⏳', ''))
        
        return pdf.output(dest='S').encode('latin1')
    except Exception as e:
        st.error(f"Error generating PDF report: {str(e)}")
        return None

def main():
    st.set_page_config(page_title="Stock Analysis App", layout="wide")
    
    st.title("📈 Stock Market Analysis from CSV")
    
    st.write("""
    Select the company whose stock report is to be generated
    """)
    
    # Specify the folder containing CSV files
    csv_folder = "Data/"  # Update this path to your folder containing CSV files
    
    # Get list of CSV files in the folder
    csv_files = [f for f in os.listdir(csv_folder) if f.endswith('.csv')]
    
    if not csv_files:
        st.error("No CSV files found in the specified folder.")
        return
    
    # Dropdown to select a CSV file
    selected_file = st.selectbox("Select a Company ", csv_files)
    
    if selected_file:
        file_path = os.path.join(csv_folder, selected_file)
        df = load_csv_data(file_path)
        
        if df is not None and not df.empty:
            # Compute technical indicators
            df = compute_technical_indicators(df)
            
            if df is not None and not df.empty:
                # Display plots
                col1, col2 = st.columns([2, 1])
                
                with col1:
                    # Price chart with SMA
                    fig = go.Figure()
                    fig.add_trace(go.Scatter(x=df.index, y=df['Close'], name="Price"))
                    fig.add_trace(go.Scatter(x=df.index, y=df['SMA_20'], name="SMA 20"))
                    fig.add_trace(go.Scatter(x=df.index, y=df['SMA_50'], name="SMA 50"))
                    fig.update_layout(title="Stock Price and Moving Averages",
                                    xaxis_title="Date",
                                    yaxis_title="Price")
                    st.plotly_chart(fig)
                
                with col2:
                    # Display current metrics
                    st.subheader("Current Metrics")
                    if len(df) > 0:
                        st.metric("Close Price", f"Rs{df['Close'].iloc[-1]:.2f}")
                        st.metric("RSI", f"{df['RSI'].iloc[-1]:.2f}")
                        st.metric("MACD", f"{df['MACD'].iloc[-1]:.2f}")
                    else:
                        st.warning("No data available for metrics")
                
                # Technical Analysis Charts
                col3, col4 = st.columns(2)
                
                with col3:
                    # RSI Chart
                    fig_rsi = go.Figure()
                    fig_rsi.add_trace(go.Scatter(x=df.index, y=df['RSI'], name="RSI"))
                    fig_rsi.add_hline(y=70, line_dash="dash", line_color="red")
                    fig_rsi.add_hline(y=30, line_dash="dash", line_color="green")
                    fig_rsi.update_layout(title="Relative Strength Index (RSI)",
                                        yaxis_title="RSI")
                    st.plotly_chart(fig_rsi)
                
                with col4:
                    # MACD Chart
                    fig_macd = go.Figure()
                    fig_macd.add_trace(go.Scatter(x=df.index, y=df['MACD'], name="MACD"))
                    fig_macd.add_hline(y=0, line_dash="dash", line_color="gray")
                    fig_macd.update_layout(title="MACD",
                                         yaxis_title="MACD")
                    st.plotly_chart(fig_macd)
                
                # Generate recommendation
                recommendation = generate_recommendation(df)
                
                st.subheader("Investment Recommendation")
                st.markdown(recommendation)
                
                # Generate and offer PDF download
                pdf_bytes = generate_pdf_report(df, recommendation)
                
                if pdf_bytes is not None:
                    st.download_button(
                        "Download Analysis Report (PDF)",
                        data=pdf_bytes,
                        file_name=f"stock_analysis_{datetime.now().strftime('%Y%m%d')}.pdf",
                        mime="application/pdf"
                    )

if __name__ == "__main__":
    main()