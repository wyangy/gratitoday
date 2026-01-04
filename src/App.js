import React, { useState } from "react";
import "./App.css";
import GratitudeForm from "./GratitudeForm";

function App() {
  const [entries, setEntries] = useState([]);

  const addEntry = (text) => {
    const newEntry = {
      id: Date.now(),
      text: text,
      date: new Date().toLocaleDateString(),
    };
    setEntries([newEntry, ...entries]); // Add to beginning of array
  };

  return (
    <div className="App">
      <header>
        <h1>Gratitoday</h1>
        <p>What are you grateful for today?</p>
      </header>

      <GratitudeForm onAddEntry={addEntry} />

      {/* We'll display entries here next */}
      <div>
        {entries.map((entry) => (
          <div key={entry.id}>
            <p>
              {entry.text} - {entry.date}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
