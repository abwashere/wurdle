import React from 'react';
import './App.css';

function App() {
  const wordle = "MEMOS"

  const rows = new Array()
  console.log('rows', rows)

  const handleSubmit = (input: string) => {
    if (rows.length < 6 && input.length === 5){
      rows.push(input)
      return ["H","E","L","L","O"]
    }
    return []
  }

  const testRow = [
    ["H","E","L","L","O"],
    ["","","","",""],
    ["","","","",""],
    ["","","","",""],
    ["","","","",""],
    ["","","","",""],
  ]

  return (
    <div className="App">
      <header className="App-header">
        <h1>Wordle</h1>
      </header>
      <div className="App-viewer">
        {testRow.map(word => (
        <div className="word">
          {word.map(letter => (
            <div className="letter">{letter}</div>
          ))}
        </div>))}
      </div>
      <div className="App-input">
        <input type="text"/> 
        <button>submit</button>
      </div>
    </div>
  );
}

export default App;
