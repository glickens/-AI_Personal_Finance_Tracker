import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders AI Finance Tracker title", () => {
    render(<App />);
    const titleElement = screen.getByText(/AI Finance Tracker/i); // Updated text match
    expect(titleElement).toBeInTheDocument();
});
