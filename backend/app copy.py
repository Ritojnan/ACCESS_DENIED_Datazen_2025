import streamlit as st
import pandas as pd
import matplotlib.pyplot as plt
import io

def preprocess_data(df):
    df = df.dropna(how='all')
    df = df.dropna(axis=1, how='all')
    df = df.fillna("Missing")
    df = df.drop_duplicates()
    df.columns = df.columns.str.lower().str.strip().str.replace(' ', '_')
    return df

def df_to_image(df):
    fig, ax = plt.subplots(figsize=(12, len(df) * 0.5 + 1))
    ax.axis('off')  # Hide axes

    # Render the table using Matplotlib
    table = ax.table(cellText=df.values, colLabels=df.columns, cellLoc='center', loc='center')
    table.auto_set_font_size(False)
    table.set_fontsize(10)
    table.auto_set_column_width(range(len(df.columns)))

    # Save the image to a buffer
    buf = io.BytesIO()
    plt.savefig(buf, format='png', bbox_inches='tight')
    buf.seek(0)
    plt.close(fig)
    return buf

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

        # Convert and display the table as an image
        image_buffer = df_to_image(processed_df)
        st.image(image_buffer, caption=f"Table Image from '{sheet_name}'")
