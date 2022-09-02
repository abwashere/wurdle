import React from "react";
import styled, { keyframes } from "styled-components";

import FR_WORDS from "../data/fr-words";
import EN_WORDS from "../data/en-words";

import ResultModal from "./ResultModal";
import LanguageSelect from "./LanguageSelect";

import "./App.css";

interface ILetter {
  letter: string;
  state: string;
  shouldRotate?: boolean;
  rotationDelay: number;
}

export const ANSWER = "MOMMY";

const emptyGrid = [1, 1, 1, 1, 1, 1].map(() => [
  { letter: "", state: "", rotationDelay: 0 },
  { letter: "", state: "", rotationDelay: 0 },
  { letter: "", state: "", rotationDelay: 0 },
  { letter: "", state: "", rotationDelay: 0 },
  { letter: "", state: "", rotationDelay: 0 },
  { letter: "", state: "", rotationDelay: 0 },
  { letter: "", state: "", rotationDelay: 0 },
]);

const StyledDiv = styled.div<any>`
  &.rotation {
    animation-name: ${({ state }) => revealTile(state)};
    animation-duration: 0.6s;
    animation-delay: ${({ rotationDelay }) => rotationDelay + "ms"};
    animation-fill-mode: forwards; //hold the last keyframe state of animation after animation ends
  }
`;
export const revealTile = (state: string) => keyframes`
  0% {
    transform: rotateX(0deg);
    border: none;
    background-color: none;
  }
  50% {
    transform: rotateX(90deg);
    background-color: none;
  }
  100% {
    transform: rotateX(0deg);
    background-color: ${
      state === "correct"
        ? "#6aaa64"
        : state === "present"
        ? "#c9b458"
        : "#3A3A3C"
    };
    border: none;
  }
`;

export const Letter = (props: ILetter) => {
  const { letter, state, shouldRotate, rotationDelay } = props;
  return (
    <StyledDiv
      state={state}
      rotationDelay={rotationDelay}
      className={`tile ${state} ${shouldRotate && "rotation"}`}
    >
      {letter}
    </StyledDiv>
  );
};

export const Row = ({ attempt }: { attempt: ILetter[] }) => {
  if (attempt.every((el) => el.letter === "")) {
    return (
      <div className="row">
        {["", "", "", "", ""].map((el, i) => {
          return <Letter key={i} letter={""} state={""} rotationDelay={0} />;
        })}
      </div>
    );
  }
  return (
    <div className="row">
      {attempt.map((el, i) => {
        const { letter, state, rotationDelay } = el;
        return (
          <Letter
            key={i}
            letter={letter}
            state={state}
            rotationDelay={rotationDelay}
            shouldRotate
          />
        );
      })}
    </div>
  );
};

function App() {
  const [locale, setLocale] = React.useState("EN");
  const [input, setInput] = React.useState("");
  const [attemptsList, setAttemptsList] = React.useState(emptyGrid);
  const [hasWon, setHasWon] = React.useState<null | boolean>(null);
  const [isOpen, setIsOpen] = React.useState(false);

  const inputRef = React.useRef<HTMLInputElement>(null);

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
        statusArr.push({
          letter: lettersArr[i],
          state: "correct",
          rotationDelay: i * 300,
        });
      } else if (
        answerMap.has(lettersArr[i]) &&
        answerMap.get(lettersArr[i]) > 0
      ) {
        answerMap.set(lettersArr[i], answerMap.get(lettersArr[i]) - 1);
        statusArr.push({
          letter: lettersArr[i],
          state: "present",
          rotationDelay: i * 300,
        });
      } else {
        statusArr.push({
          letter: lettersArr[i],
          state: "absent",
          rotationDelay: i * 300,
        });
      }
    }

    return statusArr;
  };

  const onlyAlphabet = (e: any) => {
    const keyCheck = /^[a-zA-Z]+$/; // only letters

    const inputVal = e.target.value;

    if (inputRef.current) {
      if (keyCheck.test(inputVal)) {
        inputRef.current.value = inputVal;
      } else {
        inputRef.current.value = inputVal.slice(0, -1);
      }
    }
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
      setTimeout(() => {
        setHasWon(true);
        setIsOpen(true);
      }, 2000);
    }
    if (hasWon !== true && attemptsList[5].every((el) => el.letter !== "")) {
      setHasWon(false);
      setIsOpen(true);
    }
  }, [attemptsList, hasWon]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Wurdle</h1>
        <div>
          <LanguageSelect locale={locale} setLocale={setLocale} />
        </div>
      </header>

      <div className="App-board">
        {attemptsList.map((attempt, i) => (
          <Row attempt={attempt} key={i} />
        ))}
      </div>

      <div className="App-form">
        <form onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            type="text"
            onChange={handleChange}
            value={input}
            maxLength={5}
            onInput={onlyAlphabet} // prevent entering value of keys that are not letters
            // oninput event occurs immediately after the value has changed, while onchange occurs when the element loses focus, after the content has been changed
          />
          <button onSubmit={handleSubmit} disabled={isDisabled}>
            SUBMIT
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
