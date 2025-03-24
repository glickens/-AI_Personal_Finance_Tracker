import numpy as np
import pandas as pd
from sklearn.linear_model import LinearRegression


def predict_savings(data):
    """Predict future savings based on past expense amounts."""

    if not isinstance(data, list) or not data:
        return {"error": "Invalid input format. Expected a list of expense records."}

    df = pd.DataFrame(data)

    if 'amount' not in df.columns or df.empty:
        return {"error": "Missing 'amount' column or empty dataset."}

    # Convert 'amount' to numeric, handle errors
    df['amount'] = pd.to_numeric(df['amount'], errors='coerce')

    if df['amount'].isnull().all():
        return {"error": "All expense amounts are invalid or missing."}

    if len(df) < 2:
        return {"error": "Insufficient data for prediction. Need at least 2 records."}

    X = np.arange(len(df)).reshape(-1, 1)  # Feature: index as time step
    y = df['amount']

    model = LinearRegression()
    model.fit(X, y)  # Train model

    future_steps = 12  # Predict next 12 months
    future_X = np.arange(len(df), len(df) + future_steps).reshape(-1, 1)
    future_predictions = model.predict(future_X)

    # Fix: Ensure predictions are always non-negative
    future_predictions = np.maximum(future_predictions, 0)

    return {"predictions": future_predictions.tolist()}


