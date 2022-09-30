import "./App.css";

import { useState, useEffect } from "react";
import styled from "styled-components";

import { EN_LOCAL, FR_LOCAL } from "../constants";
import { revealTile, shakeTiles } from "./animations";
import EN_WORDS from "./data/enWords";
import FR_WORDS from "./data/frWords";
import Keys from "./Keys";
import LanguageSelect from "./LanguageSelect";
import ResultModal from "./ResultModal";

const StyledDiv = styled.div<any>`
  &.rotation {
    animation-name: ${({ state }) => revealTile(state)};
    animation-duration: 0.6s;
    animation-delay: ${({ rotationDelay }) => rotationDelay + "ms"};
    animation-fill-mode: forwards; // Hold the last keyframe state of animation after animation ends
  }
  &.shaking {
    animation-name: ${({ state }) => shakeTiles(state)};
    animation-duration: 0.6s;
  }
`;

interface ILetter {
  letter: string;
  state: string;
  shouldRotate?: boolean;
  rotationDelay: number;
}

const emptyGrid = [1, 1, 1, 1, 1, 1].map(() => [
  { letter: "", state: "", rotationDelay: 0 },
  { letter: "", state: "", rotationDelay: 0 },
  { letter: "", state: "", rotationDelay: 0 },
  { letter: "", state: "", rotationDelay: 0 },
  { letter: "", state: "", rotationDelay: 0 },
]);

export const Letter = (props: ILetter) => {
  const { letter, state, shouldRotate, rotationDelay } = props;
  return (
    <StyledDiv
      state={state}
      rotationDelay={rotationDelay}
      className={`tile ${state} ${shouldRotate ? "rotation" : ""}`}
    >
      {letter}
    </StyledDiv>
  );
};

export const Row = ({ attempt }: { attempt: ILetter[] }) => {
  if (attempt.every((tile) => tile.letter === "")) {
    return (
      <div className="row">
        {["", "", "", "", ""].map((tile, i) => {
          return <Letter key={i} letter={""} state={""} rotationDelay={0} />;
        })}
      </div>
    );
  }
  return (
    <div className="row">
      {attempt.map((tile, i) => {
        const { letter, state, rotationDelay } = tile;
        return (
          <Letter
            key={i}
            letter={letter}
            state={state}
            rotationDelay={rotationDelay}
            shouldRotate={state !== ""}
          />
        );
      })}
    </div>
  );
};

function App() {
  const [locale, setLocale] = useState(FR_LOCAL);
  const [input, setInput] = useState("");
  const [attemptsList, setAttemptsList] = useState(emptyGrid);
  const [hasWon, setHasWon] = useState<null | boolean>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [wurdle, setWurdle] = useState("");
  const [absentLetters, setAbsentLetters] = useState<string[]>([]);
  const [disableClick, setDisableClick] = useState(false);

  const checkAnswer = (lettersArr: string[]): ILetter[] => {
    let statusArr = [];

    // count each letter appearance in the wurdle
    // only those which are present (but not at the right place)
    let answerMap = new Map();
    let ind = 0;
    for (const letter of wurdle.split("")) {
      if (letter !== lettersArr[ind]) {
        answerMap.set(letter, (answerMap.get(letter) || 0) + 1);
      }
      ind++;
    }

    for (let i = 0; i < 5; i++) {
      if (lettersArr[i] === wurdle[i]) {
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

  const addLetter = (pushedLetter: string) => {
    for (let i = 0; i < attemptsList.length; i++) {
      // Find the first letter that is empty
      let currentAttempt = attemptsList[i];
      let emptyTileIndex = currentAttempt.findIndex(
        (tile) => tile.letter === ""
      );
      if (emptyTileIndex >= 0) {
        setAttemptsList((attemptsList) => {
          const newList = [...attemptsList];
          const emptyTile = newList[i][emptyTileIndex];
          emptyTile.letter = pushedLetter;
          return newList;
        });
        if (emptyTileIndex === 4) {
          setDisableClick(true);
        }
        break;
      }
    }
    const inputVal = input;
    const newInputVal = inputVal + pushedLetter;
    setInput(newInputVal);
  };

  const handleClear = () => {
    if (input !== "") {
      setInput("");
      for (let i = 0; i < attemptsList.length; i++) {
        const isNextAttemptEmpty =
          i === attemptsList.length - 1
            ? true
            : attemptsList[i + 1].every((tile) => tile.letter === "");
        const isLastAttempt = i === 5;

        if (isLastAttempt || isNextAttemptEmpty) {
          const cleanAttempts = [...attemptsList];
          cleanAttempts[i].forEach((tile) => {
            tile.letter = "";
            tile.state = "";
          });
          break;
        }
      }
      setDisableClick(false);
    }
  };

  const isWordFromTheList = () => {
    if (
      (locale === EN_LOCAL && !EN_WORDS.includes(input)) ||
      (locale === FR_LOCAL && !FR_WORDS.includes(input))
    ) {
      return false;
    }
    return true;
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const evaluatedLetters = checkAnswer(input.split(""));

    if (disableClick) {
      for (let i = 0; i < attemptsList.length; i++) {
        const isCurrentAttemptEmpty = attemptsList[i].every(
          (tile) => tile.letter === ""
        );
        const isNextAttemptEmpty =
          i === attemptsList.length - 1
            ? true
            : attemptsList[i + 1].every((tile) => tile.letter === "");

        if (!isCurrentAttemptEmpty && isNextAttemptEmpty) {
          // If input is not a word of the list, make it shake
          if (!isWordFromTheList()) {
            setAttemptsList((attemptsList) => {
              const attemptsArr = [...attemptsList];
              attemptsArr[i].forEach((tile) => {
                tile.state = "shaking";
              });
              return attemptsArr;
            });
            break;
          }
          // If word is in the list: replace last attempt with evaluated letters
          setAttemptsList((attemptsList) => {
            const evaluatedList = [...attemptsList];
            evaluatedList[i] = evaluatedLetters;
            return evaluatedList;
          });
          break;
        }
      }
    }

    if (isWordFromTheList()) {
      // Add absent letters in disabled letters list
      let wrongLetters = [];
      for (let letter of input) {
        if (!wurdle.match(letter)) {
          wrongLetters.push(letter);
        }
      }
      setAbsentLetters([...absentLetters, ...wrongLetters]);
      setDisableClick(false);

      setInput("");
    }
  };

  useEffect(() => {
    if (
      attemptsList.some((attempt) =>
        attempt.every((tile) => tile.state === "correct")
      )
    ) {
      setTimeout(() => {
        setHasWon(true);
        setIsOpen(true);
      }, 2500);
    } else if (
      attemptsList[attemptsList.length - 1].every((tile) => tile.state !== "")
    ) {
      setTimeout(() => {
        setHasWon(false);
        setIsOpen(true);
      }, 2500);
    }
  }, [attemptsList, hasWon]);

  useEffect(() => {
    const newWord =
      locale === EN_LOCAL
        ? EN_WORDS[Math.floor(Math.random() * EN_WORDS.length)]
        : FR_WORDS[Math.floor(Math.random() * FR_WORDS.length)];
    setWurdle(newWord);
  }, [locale]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Wurdle</h1>
        <div>
          <LanguageSelect
            locale={locale}
            setLocale={setLocale}
            disabled={attemptsList[0].every((tile) => tile.state !== "")} // disable changing the language when a game already started
          />
        </div>
      </header>

      <div className="App-board">
        {attemptsList.map((attempt, i) => (
          <Row attempt={attempt} key={i} />
        ))}
      </div>

      <Keys
        locale={locale}
        absentKeys={absentLetters}
        disableClick={disableClick}
        addLetter={addLetter}
        clearInput={handleClear}
        submitInput={handleSubmit}
      />

      <ResultModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        hasWon={hasWon}
        answer={wurdle}
        locale={locale}
      />
    </div>
  );
}

export default App;
