import React, { useState, useEffect } from "react";
import "./App.css";
import GratitudeForm from "./GratitudeForm";
import GratitudeList from "./GratitudeList";

function App() {
  const [entries, setEntries] = useState(() => {
    const saved = localStorage.getItem("gratitudeEntries");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("gratitudeEntries", JSON.stringify(entries));
  }, [entries]);

  const addEntry = (text) => {
    const newEntry = {
      id: Date.now(),
      text: text,
      date: new Date().toLocaleDateString(),
    };
    setEntries([newEntry, ...entries]);
  };

  const deleteEntry = (id) => {
    setEntries(entries.filter((entry) => entry.id !== id));
  };

  const editEntry = (id, newText) => {
    setEntries(
      entries.map((entry) =>
        entry.id === id ? { ...entry, text: newText } : entry
      )
    );
  };

  return (
    <div className="App">
      <header>
        <h1>Gratitoday</h1>
        <p>What are you grateful for today?</p>
      </header>

      <GratitudeForm onAddEntry={addEntry} />
      <GratitudeList
        entries={entries}
        onDelete={deleteEntry}
        onEdit={editEntry}
      />
    </div>
  );
}

export default App;
