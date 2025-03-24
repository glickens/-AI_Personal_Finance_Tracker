// src/components/ExpenseTable.js
import React from "react";
import { deleteExpense } from "../api";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";

const ExpenseTable = ({ expenses, onExpenseDeleted }) => {
  const totalExpenses = expenses.reduce((sum, expense) => sum + Number(expense.amount), 0);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this expense?");
    if (!confirmDelete) return;
    try {
      await deleteExpense(id);
      onExpenseDeleted();
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  return (
    <div className="expense-table">
      <h2>Expense List</h2>
      <p><strong>Total Expenses: ${totalExpenses.toFixed(2)}</strong></p>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Amount ($)</th>
            <th>Category</th>
            <th>Description</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.length > 0 ? (
            expenses.map((expense) => (
              <tr key={expense.id}>
                <td>{expense.id}</td>
                <td>{expense.amount}</td>
                <td>{expense.category}</td>
                <td>{expense.description}</td>
                <td>{expense.date}</td>
                <td>
                  <IconButton onClick={() => handleDelete(expense.id)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No expenses recorded.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseTable;


