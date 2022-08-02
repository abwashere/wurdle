import React from "react";
import ResultModal from "./ResultModal";
import "./App.css";

interface ILetter {
  letter: string;
  state: string;
}

export const ANSWER: string = "IMAMS";

const emptyGrid = [1, 1, 1, 1, 1, 1].map(() => [
  { letter: "", state: "" },
  { letter: "", state: "" },
  { letter: "", state: "" },
  { letter: "", state: "" },
  { letter: "", state: "" },
  { letter: "", state: "" },
  { letter: "", state: "" },
]);

export const Letter = (props: ILetter) => {
  const { letter, state } = props;
  return <div className={`letter ${state}`}>{letter}</div>;
};

export const Row = ({ attempt }: { attempt: ILetter[] }) => {
  if (attempt.every((el) => el.letter === "")) {
    return (
      <div className="word">
        {["", "", "", "", ""].map((el, i) => {
          return <Letter key={i} letter={""} state={""} />;
        })}
      </div>
    );
  }
  return (
    <div className="word">
      {attempt.map((el, i) => {
        const { letter, state } = el;
        return <Letter key={i} letter={letter} state={state} />;
      })}
    </div>
  );
};

function App() {
  const [input, setInput] = React.useState("");
  const [attemptsList, setAttemptsList] = React.useState(emptyGrid);
  const [hasWon, setHasWon] = React.useState<null | boolean>(null);
  const [isOpen, setIsOpen] = React.useState(false);

  const checkAnswer = (lettersArr: string[]): ILetter[] => {
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

  const handleChange = (e: any) => {
    let val = e.target.value;
    setInput(val.toUpperCase());
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    for (let i = 0; i <= 6; i++) {
      if (attemptsList[i].every((el) => el.letter === "")) {
        setAttemptsList((attemptsList) => {
          const newList = [...attemptsList];
          const evaluatedLetters = checkAnswer(input.split(""));
          newList[i] = evaluatedLetters;
          return newList;
        });
        break;
      }
    }

    setInput("");
  };

  const isDisabled =
    hasWon ||
    input.length !== 5 ||
    input.includes(" ") ||
    attemptsList.every((attempt) => attempt.every((el) => el.letter !== ""));

  React.useEffect(() => {
    if (
      attemptsList.some((attempt) =>
        attempt.every((el) => el.state === "correct")
      )
    ) {
      setHasWon(true);
      setIsOpen(true);
    }
    if (hasWon !== true && attemptsList[5].every((el) => el.letter !== "")) {
      setHasWon(false);
      setIsOpen(true);
    }
  }, [attemptsList, hasWon]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Wordle</h1>
      </header>

      <div className="App-viewer">
        {attemptsList.map((attempt, i) => (
          <Row attempt={attempt} key={i} />
        ))}
      </div>

      <div className="App-form">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            onChange={handleChange}
            value={input}
            maxLength={5}
          />
          <button onSubmit={handleSubmit} disabled={isDisabled}>
            submit
          </button>
        </form>
      </div>

      <ResultModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        hasWon={hasWon}
        answerWord={ANSWER}
      />
    </div>
  );
}

export default App;
