import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import ExpenseForm from "../components/ExpenseForm";

// Mock the addExpense API call to always resolve
import { addExpense } from "../api";
jest.mock("../api", () => ({
  addExpense: jest.fn(() => Promise.resolve({})),
}));

test("renders expense form and submits correctly", async () => {
  const mockOnExpenseAdded = jest.fn();
  render(<ExpenseForm onExpenseAdded={mockOnExpenseAdded} />);

  // For <input type="number" />, the ARIA role is spinbutton
  await userEvent.type(
    screen.getByRole("spinbutton", { name: /Amount/i }),
    "50"
  );

  // Category is type="text", so it's role="textbox"
  await userEvent.type(
    screen.getByRole("textbox", { name: /Category/i }),
    "Food"
  );

  // Description is also a text field
  await userEvent.type(
    screen.getByRole("textbox", { name: /Description/i }),
    "Dinner"
  );

  // For <input type="date" />, use the label-based query
  await userEvent.type(screen.getByLabelText(/date/i), "2025-02-14");

  // Click the submit button
  await userEvent.click(screen.getByRole("button", { name: /Add Expense/i }));

  // Verify that the callback was called exactly once
  expect(mockOnExpenseAdded).toHaveBeenCalledTimes(1);
});
