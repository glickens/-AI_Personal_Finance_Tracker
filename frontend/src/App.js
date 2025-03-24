// src/App.js
import React, { useState, useEffect } from "react";
import { getExpenses } from "./api";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseTable from "./components/ExpenseTable";
import Predictions from "./components/Predictions";

const App = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const data = await getExpenses();
      setExpenses(data);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  const handleExpenseAdded = () => {
    fetchExpenses(); // Refresh expense list when a new expense is added
  };

  return (
    <div className="container">
      <h1>AI Finance Tracker</h1>
      <ExpenseForm onExpenseAdded={handleExpenseAdded} />
      <ExpenseTable expenses={expenses} onExpenseDeleted={fetchExpenses} />
      <Predictions />
    </div>
  );
};

export default App;


