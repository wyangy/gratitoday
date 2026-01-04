import React, { useState } from "react";
import "./GratitudeForm.css";

function GratitudeForm({ onAddEntry }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (text.trim() === "") {
      return; // Don't submit empty entries
    }

    onAddEntry(text);
    setText(""); // Clear the input after submitting
  };

  return (
    <form className="gratitude-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="I'm grateful for..."
        className="gratitude-input"
      />
      <button type="submit" className="submit-button">
        Add
      </button>
    </form>
  );
}

export default GratitudeForm;
