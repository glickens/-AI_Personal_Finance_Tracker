from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from database.db_handler import init_db, get_expenses, add_expense, delete_expense
from ml.predictor import predict_savings
from database.models import expense_schema
from marshmallow import ValidationError
import logging

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend requests

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Rate limiting
limiter = Limiter(
    app=app,
    key_func=get_remote_address,
    default_limits=["200 per day", "50 per hour"]
)

# Initialize the database
init_db()

# Get All Expenses
@app.route('/api/expenses', methods=['GET'])
def get_expenses_route():
    expenses = get_expenses()
    return jsonify(expenses), 200

# Add an Expense
@app.route('/api/expenses', methods=['POST'])
def add_expense_route():
    data = request.json

    # Validate required fields
    if not all(k in data for k in ("date", "amount", "category")):
        return jsonify({"error": "Missing required fields: date, amount, category"}), 400

    try:
        expense_schema.load(data)  # Validate input data
    except ValidationError as err:
        return jsonify({"error": err.messages}), 400

    # Add expense and return the new expense ID
    new_id = add_expense(data["date"], data["amount"], data["category"], data.get("description"))
    return jsonify({"message": "Expense added successfully", "id": new_id}), 201

# Delete an Expense
@app.route('/api/expenses/<int:expense_id>', methods=['DELETE'])
def delete_expense_route(expense_id):
    try:
        if delete_expense(expense_id):
            return jsonify({"message": "Expense deleted successfully"}), 200
        else:
            return jsonify({"error": "Expense not found"}), 404
    except Exception as e:
        logger.error(f"Error deleting expense {expense_id}: {e}")
        return jsonify({"error": "Internal server error"}), 500

# AI Prediction Route
@app.route('/api/predict', methods=['GET'])
def get_predictions():
    try:
        expenses = get_expenses()
        if not expenses:
            return jsonify({"error": "No expenses available for prediction."}), 400

        # Extract valid 'amount' values for prediction
        formatted_expenses = [{"amount": e.get("amount")} for e in expenses if "amount" in e and isinstance(e.get("amount"), (int, float))]
        if not formatted_expenses:
            return jsonify({"error": "No valid numerical expense data available for prediction."}), 400

        prediction_result = predict_savings(formatted_expenses)
        if isinstance(prediction_result, dict) and "error" in prediction_result:
            return jsonify({"error": prediction_result["error"]}), 400

        # FIX: Flattening the response so the JSON is {"predictions": [ ... ]}
        return jsonify(prediction_result), 200

    except Exception as e:
        logger.error(f"Error generating predictions: {e}")
        return jsonify({"error": "Failed to generate predictions"}), 500

if __name__ == '__main__':
    app.run(debug=True)

