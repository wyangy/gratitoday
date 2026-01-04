import React from "react";
import GratitudeItem from "./GratitudeItem";
import "./GratitudeList.css";

function GratitudeList({ entries, onDelete }) {
  if (entries.length === 0) {
    return (
      <div className="empty-state">
        <p>No entries yet. Start by adding what you're grateful for today!</p>
      </div>
    );
  }

  return (
    <div className="gratitude-list">
      {entries.map((entry) => (
        <GratitudeItem key={entry.id} entry={entry} onDelete={onDelete} />
      ))}
    </div>
  );
}

export default GratitudeList;
