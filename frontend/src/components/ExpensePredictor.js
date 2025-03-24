import React, { useState, useEffect } from "react";
import { getExpensePredictions } from "../api";
import { Line } from "react-chartjs-2";
import { Button, Paper, Typography, Box } from "@mui/material";
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

// Register required Chart.js components
Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ExpensePredictor = () => {
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPredictions = async () => {
    setLoading(true);
    try {
      // Assume getExpensePredictions returns an array of numbers.
      const predictionsData = await getExpensePredictions();
      if (predictionsData && Array.isArray(predictionsData)) {
        const validPredictions = predictionsData.filter(p => !isNaN(p) && p >= 0);
        setPredictions(validPredictions);
      }
      setError(null);
    } catch (err) {
      console.error("Error fetching predictions:", err);
      setError("Failed to load predictions.");
    }
    setLoading(false);
  };

  useEffect(() => {
    // Immediately invoke an async function to avoid "promise ignored" warnings.
    (async () => {
      await fetchPredictions();
    })();
  }, []);

  const chartData = {
    labels: Array.from({ length: predictions.length }, (_, i) => `Month ${i + 1}`),
    datasets: [
      {
        label: "Predicted Expenses ($)",
        data: predictions,
        borderColor: "#1976d2",
        backgroundColor: "rgba(25, 118, 210, 0.2)",
        tension: 0.3,
        pointRadius: 3,
        borderWidth: 2
      }
    ]
  };

  return (
    <Paper sx={{ padding: 3, margin: "20px auto", maxWidth: 700 }}>
      <Typography variant="h6" gutterBottom>
        AI Expense Predictions (Next {predictions.length} Months)
      </Typography>
      <Button variant="contained" color="primary" onClick={fetchPredictions} disabled={loading}>
        {loading ? "Loading..." : "Refresh Predictions"}
      </Button>
      {error && <Typography color="error">{error}</Typography>}
      {predictions.length > 0 && (
        <Box sx={{ marginTop: 2 }}>
          <Line data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
        </Box>
      )}
    </Paper>
  );
};

export default ExpensePredictor;
