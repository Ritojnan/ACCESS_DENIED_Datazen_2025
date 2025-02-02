import streamlit as st
import pandas as pd

def preprocess_data(df):
    df = df.dropna(how='all')
    df = df.dropna(axis=1, how='all')
    df = df.fillna("Missing")
    df = df.drop_duplicates()
    df.columns = df.columns.str.lower().str.strip().str.replace(' ', '_')
    
    return df

st.title("Excel File Processor and Markdown Converter (Supports .xls and .xlsx)")

uploaded_file = st.file_uploader("Upload an Excel file", type=["xls", "xlsx"])

if uploaded_file:
    sheets = pd.read_excel(uploaded_file, sheet_name=None)
    st.write("### Sheets Found:")
    st.write(list(sheets.keys()))
    processed_books = {}
    
    for sheet_name, df in sheets.items():
        processed_df = preprocess_data(df)
        processed_books[sheet_name] = processed_df
        st.subheader(f"Processed Data from '{sheet_name}'")
        st.write(processed_df)
        
        # Convert DataFrame to Markdown
        # markdown_output = processed_df.to_markdown(index=False)
        
        # st.text_area(f"Markdown Content for '{sheet_name}'", markdown_output, height=300)
        
        # Download Markdown as File
        # st.download_button(
        #     f"Download Processed '{sheet_name}' as Markdown",
        #     markdown_output,
        #     f"{sheet_name}_processed.md",
        #     "text/markdown"
        # )
        
        # # CSV download for compatibility
        # st.download_button(
        #     f"Download Processed '{sheet_name}' as CSV",
        #     processed_df.to_csv(index=False).encode('utf-8'),
        #     f"{sheet_name}_processed.csv",
        #     "text/csv"
        # )
