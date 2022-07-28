import React from 'react';
import './App.css';

interface ILetter {
  letter: string,
  state: string,
}

export const ANSWER = "MEMOS"

export const evaluateLetter = (letter: string, index: number) : ILetter => {

  for (let i=0; i < 5; i++) {
    if (index === i && letter === ANSWER[i]) {
      return {letter, state: "correct"}
    }
  }

  return { letter, state: "absent" }
}

export const Letter = (props: ILetter ) => {
  const { letter, state } = props;
  return <div className={`letter ${state}`}>{letter}</div>
}

export const Row = ({ attempt }: { attempt: string }) => {
  const lettersArr = attempt === "" ? ["","","","",""] : attempt.split("")
  const evaluatedLetters = lettersArr.map((letter, i) => evaluateLetter(letter, i))

  const word = <div className="word">
    {evaluatedLetters.map((el, i) => {
      const { letter, state } = el;
      return <Letter key={i} letter={letter} state={state} />
    })}
  </div>

  return word
}

function App() {
  const [guess, setGuess] = React.useState("")

  const [attemptList, setAttemptList] = React.useState(["", "", "", "", ""])

  console.log(attemptList)
  
  const handleChange = (e: any) => {
    let val = e.target.value
    setGuess(guess => val.toUpperCase())
  }
  
  const handleSubmit = (e: any) => {
    e.preventDefault()
    
    for (let i=0; i<=6; i++) {
      if (attemptList[i] === ""){
        setAttemptList(attemptList => {
          const newList = [...attemptList]
          newList[i] = guess;
          return newList
        })
        break;
      }
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Wordle</h1>
      </header>

      <div className="App-viewer">
        {attemptList.map((attempt, i) => (
          <Row attempt={attempt} key={i} />
        ))}
      </div>

      <div className="App-form">
        <form onSubmit={handleSubmit}>
          <input type="text" onChange={handleChange} maxLength={5} /> 
          <button onSubmit={handleSubmit} disabled={guess.length !== 5}>submit</button>
        </form>
      </div>
    </div>
  );
}

export default App;