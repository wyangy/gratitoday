import React, { useState } from "react";
import "./App.css";
import GratitudeForm from "./GratitudeForm";
import GratitudeList from "./GratitudeList";

function App() {
  const [entries, setEntries] = useState([]);

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
