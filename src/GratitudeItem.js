import React, { useState } from "react";
import "./GratitudeItem.css";

function GratitudeItem({ entry, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(entry.text);

  const handleSave = () => {
    if (editText.trim() === "") {
      return;
    }
    onEdit(entry.id, editText);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditText(entry.text);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="gratitude-item editing">
        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          className="edit-input"
          autoFocus
        />
        <div className="edit-buttons">
          <button onClick={handleSave} className="save-button">
            Save
          </button>
          <button onClick={handleCancel} className="cancel-button">
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="gratitude-item">
      <div className="item-content">
        <p className="item-text">{entry.text}</p>
        <span className="item-date">{entry.date}</span>
      </div>
      <div className="item-buttons">
        <button className="edit-button" onClick={() => setIsEditing(true)}>
          ✎
        </button>
        <button className="delete-button" onClick={() => onDelete(entry.id)}>
          ⌫
        </button>
      </div>
    </div>
  );
}

export default GratitudeItem;
