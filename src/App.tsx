import React from 'react';
import './App.css';


export const Letter = (props: { 
  letter: string, 
  state: string 
}) => {
  return <div className="letter">{props.letter}</div>
}

export const Row = (props: { letters?: string[] }) => {
  const lettersInput = props.letters || ["", "", "", "", ""]
  const word = <div className="word">
    {lettersInput.map((letter, i) => (
      <Letter key={i} letter={letter} state={'something'} />
    ))}
  </div>
  return word
}

function App() {
  // const wordle = "MEMOS"

  // const attempts = []


  return (
    <div className="App">
      <header className="App-header">
        <h1>Wordle</h1>
      </header>
      <div className="App-viewer">
        <Row letters={["H", "E", "L", "L", "O"]} />
        <Row />
        <Row />
        <Row />
        <Row />
        <Row />
      </div>
      <div className="App-input">
        <input type="text"/> 
        <button>submit</button>
      </div>
    </div>
  );
}

export default App;
