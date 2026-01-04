import React, { useState, useEffect } from "react";
import "./App.css";
import GratitudeForm from "./GratitudeForm";
import GratitudeList from "./GratitudeList";

function App() {
  // Load entries from localStorage on start
  const [entries, setEntries] = useState(() => {
    const saved = localStorage.getItem("gratitudeEntries");
    return saved ? JSON.parse(saved) : [];
  });

  // Save entries to localStorage whenever they change
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

  return (
    <div className="App">
      <header>
        <h1>Gratitoday</h1>
        <p>What are you grateful for today?</p>
      </header>

      <GratitudeForm onAddEntry={addEntry} />
      <GratitudeList entries={entries} onDelete={deleteEntry} />
    </div>
  );
}

export default App;
