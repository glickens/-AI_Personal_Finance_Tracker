import pytest
import sys
import os

# Ensure the backend directory is in the Python path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

# Import the app and database functions correctly
from backend.app import app  # Ensure correct import
from backend.database.db_handler import add_expense, get_expenses

@pytest.fixture
def client():
    """Flask test client setup."""
    app.config["TESTING"] = True
    with app.test_client() as client:
        yield client

def test_add_expense(client):
    """Test adding a new expense."""
    response = client.post("/api/expenses", json={
        "date": "2025-02-14",
        "amount": 10.5,
        "category": "Food",
        "description": "Lunch"
    })

    assert response.status_code == 201
    assert response.json["message"] == "Expense added successfully"

def test_get_expenses(client):
    """Test retrieving expenses."""
    add_expense("2025-02-14", 15.0, "Transport", "Taxi fare")  # Add test expense
    response = client.get("/api/expenses")

    assert response.status_code == 200
    assert isinstance(response.json, list)

def test_delete_expense(client):
    """Test deleting an expense."""
    add_expense("2025-02-14", 20.0, "Groceries", "Supermarket")  # Add test expense
    expenses = get_expenses()
    expense_id = expenses[-1]["id"]  # Get last added expense

    response = client.delete(f"/api/expenses/{expense_id}")

    assert response.status_code == 200
    assert response.json["message"] == "Expense deleted successfully"

