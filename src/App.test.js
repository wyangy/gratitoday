import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";

describe("Gratitoday App", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("renders app title", () => {
    render(<App />);
    const title = screen.getByText(/Gratitoday/i);
    expect(title).toBeInTheDocument();
  });

  test("renders input field and submit button", () => {
    render(<App />);
    const input = screen.getByPlaceholderText(/I'm grateful for.../i);
    const button = screen.getByRole("button", { name: /Add/i });
    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  test("shows empty state when no entries", () => {
    render(<App />);
    const emptyMessage = screen.getByText(/No entries yet/i);
    expect(emptyMessage).toBeInTheDocument();
  });

  test("adds a new entry when form is submitted", () => {
    render(<App />);
    const input = screen.getByPlaceholderText(/I'm grateful for.../i);
    const button = screen.getByRole("button", { name: /Add/i });

    fireEvent.change(input, { target: { value: "Sunny weather" } });
    fireEvent.click(button);

    expect(screen.getByText(/Sunny weather/i)).toBeInTheDocument();
  });

  test("clears input after submitting", () => {
    render(<App />);
    const input = screen.getByPlaceholderText(/I'm grateful for.../i);
    const button = screen.getByRole("button", { name: /Add/i });

    fireEvent.change(input, { target: { value: "Good coffee" } });
    fireEvent.click(button);

    expect(input.value).toBe("");
  });

  test("does not add empty entries", () => {
    render(<App />);
    const button = screen.getByRole("button", { name: /Add/i });

    fireEvent.click(button);

    expect(screen.getByText(/No entries yet/i)).toBeInTheDocument();
  });

  test("deletes an entry when delete button is clicked", () => {
    render(<App />);
    const input = screen.getByPlaceholderText(/I'm grateful for.../i);
    const addButton = screen.getByRole("button", { name: /Add/i });

    fireEvent.change(input, { target: { value: "Morning coffee" } });
    fireEvent.click(addButton);

    expect(screen.getByText(/Morning coffee/i)).toBeInTheDocument();

    const deleteButton = screen.getByText(/×/);
    fireEvent.click(deleteButton);

    expect(screen.queryByText(/Morning coffee/i)).not.toBeInTheDocument();
  });

  test("displays multiple entries", () => {
    render(<App />);
    const input = screen.getByPlaceholderText(/I'm grateful for.../i);
    const button = screen.getByRole("button", { name: /Add/i });

    fireEvent.change(input, { target: { value: "First entry" } });
    fireEvent.click(button);

    fireEvent.change(input, { target: { value: "Second entry" } });
    fireEvent.click(button);

    expect(screen.getByText(/First entry/i)).toBeInTheDocument();
    expect(screen.getByText(/Second entry/i)).toBeInTheDocument();
  });
});
