import sys
import os


# Ensure the backend directory is in the Python path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

# Correct import for predictor module
from backend.ml.predictor import predict_savings


def test_predictor_valid_data():
    """Ensure AI predictions work with valid data."""
    data = [{"amount": 100}, {"amount": 150}, {"amount": 200}]
    result = predict_savings(data)

    assert "predictions" in result
    assert len(result["predictions"]) == 12  # Ensure 12-month predictions


def test_predictor_invalid_data():
    """Ensure AI model handles invalid data gracefully."""
    result = predict_savings([])
    assert "error" in result
