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

  test("edits an entry when edit button is clicked", () => {
    render(<App />);
    const input = screen.getByPlaceholderText(/I'm grateful for.../i);
    const addButton = screen.getByRole("button", { name: /Add/i });

    // Add an entry
    fireEvent.change(input, { target: { value: "Original text" } });
    fireEvent.click(addButton);

    expect(screen.getByText(/Original text/i)).toBeInTheDocument();

    // Click edit button (pencil icon)
    const editButton = screen.getByText(/✎/);
    fireEvent.click(editButton);

    // Find the edit input and change the text
    const editInput = screen.getByDisplayValue(/Original text/i);
    fireEvent.change(editInput, { target: { value: "Edited text" } });

    // Click save
    const saveButton = screen.getByText(/Save/i);
    fireEvent.click(saveButton);

    // Check new text appears and old text is gone
    expect(screen.getByText(/Edited text/i)).toBeInTheDocument();
    expect(screen.queryByText(/Original text/i)).not.toBeInTheDocument();
  });

  test("cancels edit and reverts to original text", () => {
    render(<App />);
    const input = screen.getByPlaceholderText(/I'm grateful for.../i);
    const addButton = screen.getByRole("button", { name: /Add/i });

    // Add an entry
    fireEvent.change(input, { target: { value: "Original text" } });
    fireEvent.click(addButton);

    // Click edit
    const editButton = screen.getByText(/✎/);
    fireEvent.click(editButton);

    // Change text
    const editInput = screen.getByDisplayValue(/Original text/i);
    fireEvent.change(editInput, { target: { value: "Changed text" } });

    // Click cancel
    const cancelButton = screen.getByText(/Cancel/i);
    fireEvent.click(cancelButton);

    // Original text should still be there
    expect(screen.getByText(/Original text/i)).toBeInTheDocument();
    expect(screen.queryByText(/Changed text/i)).not.toBeInTheDocument();
  });

  test("does not save empty edit", () => {
    render(<App />);
    const input = screen.getByPlaceholderText(/I'm grateful for.../i);
    const addButton = screen.getByRole("button", { name: /Add/i });

    // Add an entry
    fireEvent.change(input, { target: { value: "Original text" } });
    fireEvent.click(addButton);

    // Click edit
    const editButton = screen.getByText(/✎/);
    fireEvent.click(editButton);

    // Clear the input
    const editInput = screen.getByDisplayValue(/Original text/i);
    fireEvent.change(editInput, { target: { value: "" } });

    // Click save
    const saveButton = screen.getByText(/Save/i);
    fireEvent.click(saveButton);

    // Should still be in edit mode (save didn't work)
    expect(screen.getByText(/Save/i)).toBeInTheDocument();
  });
});
