import React from "react";
import "./GratitudeItem.css";

function GratitudeItem({ entry, onDelete }) {
  return (
    <div className="gratitude-item">
      <div className="item-content">
        <p className="item-text">{entry.text}</p>
        <span className="item-date">{entry.date}</span>
      </div>
      <button className="delete-button" onClick={() => onDelete(entry.id)}>
        ×
      </button>
    </div>
  );
}

export default GratitudeItem;
