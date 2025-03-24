// src/components/ExpenseForm.js
import React, { useState } from "react";
import { TextField, Button, Paper, Typography, Box } from "@mui/material";
import { addExpense } from "../api";

const ExpenseForm = ({ onExpenseAdded }) => {
  const [formData, setFormData] = useState({
    amount: "",
    category: "",
    description: "",
    date: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addExpense(formData);
      onExpenseAdded();
      setFormData({ amount: "", category: "", description: "", date: "" });
    } catch (error) {
      console.error("Error adding expense:", error);
      alert("Failed to add expense. Check your backend.");
    }
  };

  return (
    <Paper elevation={3} sx={{ padding: 3, maxWidth: 400, margin: "20px" }}>
      <Typography variant="h5" gutterBottom>
        Add Expense
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            label="Amount ($)"
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
            fullWidth
          />
          <TextField
            label="Category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            fullWidth
          />
          <TextField
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Date"
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Add Expense
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default ExpenseForm;



