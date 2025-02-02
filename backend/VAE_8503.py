import streamlit as st
import pandas as pd
import numpy as np
import tensorflow as tf
from tensorflow.keras.models import load_model
from tensorflow.keras.layers import Layer
from tensorflow.keras import backend as K
from sklearn.preprocessing import StandardScaler
import matplotlib.pyplot as plt

class Sampling(Layer):
    def call(self, inputs):
        z_mean, z_log_var = inputs
        batch = tf.shape(z_mean)[0]
        dim = tf.shape(z_mean)[1]
        epsilon = tf.keras.backend.random_normal(shape=(batch, dim))
        return z_mean + tf.exp(0.5 * z_log_var) * epsilon

class VAE_Loss(Layer):
    def __init__(self, **kwargs):
        super(VAE_Loss, self).__init__(**kwargs)
    def call(self, inputs):
        return inputs

def load_and_predict(data, model_path):
    custom_objects = {
        'Sampling': Sampling,
        'VAE_Loss': VAE_Loss
    }
    with tf.keras.utils.custom_object_scope(custom_objects):
        vae = load_model(model_path, compile=False)

    reconstructed = vae.predict(data)
    reconstruction_errors = np.mean(np.abs(data - reconstructed), axis=1)
    threshold = np.percentile(reconstruction_errors, 98)
    fraud_predictions = reconstruction_errors > threshold

    return fraud_predictions, reconstruction_errors, threshold

def highlight_fraud_rows(s):
    return ['background-color: red' if s['Fraud_Prediction'] else '' for _ in s]

def main():
    st.title("Fraud Detection with VAE")
    
    st.write("""
    ### Instructions:
    Upload a CSV file containing the proper financials of the company.
    """)
    
    uploaded_file = st.file_uploader("Upload CSV file", type=['csv'])
    
    if uploaded_file is not None:
        try:
            df = pd.read_csv(uploaded_file)
            required_features = ['Income', 'Expenditure', 'Profit']
            missing_cols = [col for col in required_features if col not in df.columns]
            if missing_cols:
                st.error(f"Missing required columns: {', '.join(missing_cols)}")
                return
            
            X = df[required_features]
            
            if X.isnull().any().any():
                st.error("Data contains missing values. Please clean the data first.")
                return
            
            scaler = StandardScaler()
            X_scaled = scaler.fit_transform(X)
            
            try:
                with st.spinner("Making predictions..."):
                    predictions, errors, threshold = load_and_predict(X_scaled, 'vae_model.h5')
                
                results_df = df.copy()
                results_df['Fraud_Prediction'] = predictions
                results_df['Reconstruction_Error'] = errors
                
                st.success("Predictions completed!")
                
                st.write("### Summary")
                col1, col2 = st.columns(2)
                with col1:
                    st.write(f"Total transactions: {len(predictions)}")
                    st.write(f"Flagged as potential fraud: {sum(predictions)}")
                with col2:
                    st.write(f"Fraud percentage: {(sum(predictions)/len(predictions)*100):.2f}%")
                    st.write(f"Threshold value: {threshold:.4f}")
                
                st.write("### Error Distribution")
                fig, ax = plt.subplots(figsize=(10, 6))
                ax.hist(errors, bins=50, alpha=0.75, color='blue')
                ax.axvline(threshold, color='red', linestyle='--', label='Fraud Threshold')
                ax.set_title('Reconstruction Error Distribution')
                ax.set_xlabel('Reconstruction Error')
                ax.set_ylabel('Count')
                ax.legend()
                st.pyplot(fig)
                
                st.write("### Detailed Results")
                styled_df = results_df.style.apply(highlight_fraud_rows, axis=1)
                st.dataframe(styled_df)
                
                csv = results_df.to_csv(index=False)
                st.download_button(
                    label="Download Results as CSV",
                    data=csv,
                    file_name="fraud_predictions.csv",
                    mime="text/csv"
                )
                
            except Exception as e:
                st.error(f"Error making predictions: {str(e)}")
                st.write("Please ensure the model file 'vae_model.h5' is in the same directory as this script.")
                
        except Exception as e:
            st.error(f"Error reading file: {str(e)}")
            st.write("Please ensure your CSV file is properly formatted.")

if __name__ == "__main__":
    main()
