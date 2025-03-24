// src/components/Predictions.js
import React, { useEffect, useState } from "react";
import { getExpensePredictions } from "../api";
import { Paper, Typography } from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

const Predictions = () => {
  const [predictions, setPredictions] = useState([]);

  useEffect(() => {
    fetchPredictions();
  }, []);

  const fetchPredictions = async () => {
    try {
      const data = await getExpensePredictions();
      console.log("Predictions data =>", data);

      if (Array.isArray(data)) {
        // Filter out invalid or negative values
        const validPredictions = data.filter((p) => !isNaN(p) && p >= 0);
        setPredictions(validPredictions);
      } else {
        console.error("Predict route didn't return an array. Data:", data);
      }
    } catch (error) {
      console.error("Error fetching predictions:", error);
    }
  };

  const chartData = predictions.map((value, index) => ({
    month: `Month ${index + 1}`,
    prediction: value
  }));

  return (
    <Paper elevation={3} style={{ padding: 16, maxWidth: 600, margin: "20px auto" }}>
      <Typography variant="h5" gutterBottom>
        Expense Predictions
      </Typography>
      {predictions.length > 0 ? (
        <LineChart width={500} height={300} data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="prediction" stroke="#8884d8" />
        </LineChart>
      ) : (
        <Typography>No predictions available.</Typography>
      )}
    </Paper>
  );
};

export default Predictions;
