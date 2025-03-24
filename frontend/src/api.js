import axios from "axios";

// Optional: Log to verify axios is correctly imported.
console.log("axios =>", axios);

const API_BASE_URL = "http://127.0.0.1:5000/api";

export const getExpenses = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/expenses`);
    return response.data;
  } catch (error) {
    console.error("Error fetching expenses:", error);
    throw error;
  }
};

export const addExpense = async (expenseData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/expenses`, expenseData, {
      headers: { "Content-Type": "application/json" }
    });
    return response.data.id;
  } catch (error) {
    console.error("Error adding expense:", error);
    throw error;
  }
};

export const deleteExpense = async (expenseId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/expenses/${expenseId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting expense:", error);
    throw error;
  }
};

export const getExpensePredictions = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/predict`);
    // Assumes your backend returns an object like { predictions: [ ... ] }
    return response.data.predictions;
  } catch (error) {
    console.error("Error fetching expense predictions:", error);
    throw error;
  }
};
