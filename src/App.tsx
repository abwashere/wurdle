import React from "react";
import "./App.css";

interface ILetter {
  letter: string;
  state: string;
}

export const ANSWER: string = "IMAMS";

export const checkAnswer = (lettersArr: string[]): ILetter[] => {
  let statusArr = [];

  // count each letter appearance in the answer
  // only those which are present (but not at the right place)
  let answerMap = new Map();
  let ind = 0;
  for (const letter of ANSWER.split("")) {
    if (letter !== lettersArr[ind]) {
      answerMap.set(letter, (answerMap.get(letter) || 0) + 1);
    }
    ind++;
  }

  for (let i = 0; i < 5; i++) {
    if (lettersArr[i] === ANSWER[i]) {
      statusArr.push({ letter: lettersArr[i], state: "correct" });
    } else if (
      answerMap.has(lettersArr[i]) &&
      answerMap.get(lettersArr[i]) > 0
    ) {
      answerMap.set(lettersArr[i], answerMap.get(lettersArr[i]) - 1);
      statusArr.push({ letter: lettersArr[i], state: "present" });
    } else {
      statusArr.push({ letter: lettersArr[i], state: "absent" });
    }
  }

  return statusArr;
};

export const Letter = (props: ILetter) => {
  const { letter, state } = props;
  return <div className={`letter ${state}`}>{letter}</div>;
};

export const Row = ({ attempt }: { attempt: string }) => {
  if (attempt === "") {
    return (
      <div className="word">
        {["", "", "", "", ""].map((el, i) => {
          return <Letter key={i} letter={""} state={""} />;
        })}
      </div>
    );
  }

  const lettersArr = attempt.split("");
  const evaluatedLetters = checkAnswer(lettersArr);
  // const evaluatedLetters = lettersArr.map((letter, i) => evaluateLetter(letter, i))

  return (
    <div className="word">
      {evaluatedLetters.map((el, i) => {
        const { letter, state } = el;
        return <Letter key={i} letter={letter} state={state} />;
      })}
    </div>
  );
};

function App() {
  const [guess, setGuess] = React.useState("");
  const [attemptList, setAttemptList] = React.useState(["", "", "", "", "", ""]);

  const handleChange = (e: any) => {
    let val = e.target.value;
    setGuess(val.toUpperCase());
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    for (let i = 0; i <= 6; i++) {
      if (attemptList[i] === "") {
        setAttemptList((attemptList) => {
          const newList = [...attemptList];
          newList[i] = guess;
          return newList;
        });
        break;
      }
    }

    setGuess("");
  };

  const isDisabled =
    guess.length !== 5 ||
    guess.includes(" ") ||
    attemptList.every((el) => el !== "");

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
          <input
            type="text"
            onChange={handleChange}
            value={guess}
            maxLength={5}
          />
          <button onSubmit={handleSubmit} disabled={isDisabled}>
            submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
