import logging
from sqlalchemy.orm import sessionmaker
from datetime import datetime
from .models import Expense, engine
from marshmallow import ValidationError

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

Session = sessionmaker(bind=engine)

def init_db():
    """Initialize the database and create tables."""
    try:
        Expense.metadata.create_all(engine)
        logger.info("Database initialized successfully.")
    except Exception as e:
        logger.error(f"Error initializing database: {e}")
        raise

def add_expense(date, amount, category, description=None):
    """Add a new expense to the database and return its ID."""
    session = Session()
    try:
        if isinstance(date, str):
            try:
                date = datetime.strptime(date, "%Y-%m-%d").date()
            except ValueError as e:
                logger.error(f"Error parsing date: {e}")
                raise ValidationError({"date": ["Invalid date format. Use YYYY-MM-DD."]})

        expense = Expense(date=date, amount=amount, category=category, description=description)
        session.add(expense)
        session.commit()
        expense_id = expense.id  # Capture the generated ID
        logger.info(f"Expense added: {amount} - {category} - {description}")
        return expense_id
    except Exception as e:
        session.rollback()
        logger.error(f"Error adding expense: {e}")
        raise
    finally:
        session.close()

def get_expenses():
    """Retrieve all expenses."""
    session = Session()
    try:
        expenses = session.query(Expense).all()
        return [
            {"id": e.id, "date": e.date.isoformat(), "amount": e.amount, "category": e.category, "description": e.description}
            for e in expenses
        ]
    except Exception as e:
        logger.error(f"Error fetching expenses: {e}")
        raise
    finally:
        session.close()

def delete_expense(expense_id):
    """Delete an expense by ID."""
    session = Session()
    try:
        expense = session.query(Expense).filter_by(id=expense_id).first()
        if not expense:
            return False  # Expense not found
        session.delete(expense)
        session.commit()
        logger.info(f"Expense {expense_id} deleted.")
        return True
    except Exception as e:
        session.rollback()
        logger.error(f"Error deleting expense {expense_id}: {e}")
        raise
    finally:
        session.close()




