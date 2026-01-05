import React, { useState, useEffect } from "react";
import "./App.css";
import GratitudeForm from "./GratitudeForm";
import GratitudeList from "./GratitudeList";
import Background from "./Background"; // <- clean import

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
      text,
      date: new Date().toLocaleDateString(),
    };
    setEntries([newEntry, ...entries]);
  };

  const deleteEntry = (id) => setEntries(entries.filter((e) => e.id !== id));
  const editEntry = (id, newText) =>
    setEntries(entries.map((e) => (e.id === id ? { ...e, text: newText } : e)));

  return (
    <div className="App">
      <Background />

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
