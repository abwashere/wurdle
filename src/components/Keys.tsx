import styled from "styled-components";

import { EN_LOCAL, FR_LOCAL } from "../constants";
import {
  enKeyboardFirstRow,
  enKeyboardLastRow,
  enKeyboardSecondRow,
} from "./data/enKeyboard";
import {
  frKeyboardFirstRow,
  frKeyboardLastRow,
  frKeyboardSecondRow,
} from "./data/frKeyboard";

type KeysGridProps = {
  row: number;
  locale: string;
  disableClick: boolean;
};

const KeysGrid = styled.div`
  display: grid;
  grid-template-columns: ${(props: KeysGridProps) => {
    if (props.locale === EN_LOCAL) {
      return props.row === 1
        ? "repeat(10, 1fr)"
        : props.row === 2
        ? "repeat(9, 1fr)"
        : "repeat(9, 1fr)";
    }
    if (props.locale === FR_LOCAL) {
      return props.row === 1
        ? "repeat(10, 1fr)"
        : props.row === 2
        ? "repeat(10, 1fr)"
        : "repeat(8, 1fr)";
    }
  }};
  grid-gap: 7px;
  justify-content: center;
  max-width: 300px;
  margin: 0px auto 7px;
  color: #fff;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 18px;
  font-weight: 700;

  .key {
    height: 45px;
    width: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #adadad;
    border-radius: 4px;
    cursor: ${(props: KeysGridProps) =>
      props.disableClick ? "not-allowed" : "pointer"};
    &.absent {
      color: #484a4d;
      background-color: #282c34;
    }
  }
  .key-ENTER,
  .key-ENTRÉE,
  .key-CLEAR,
  .key-RETOUR {
    width: 105px;
    cursor: pointer;
  }

  @media screen and (max-width: 400px) {
    font-size: 14px;
    /* max-width: 350px; */

    .key {
      height: 50px;
      width: 29px;
    }
    .key-ENTER,
    .key-ENTRÉE,
    .key-CLEAR,
    .key-RETOUR {
      width: fit-content;
      padding: 0px 2px;
    }
  }
`;

const Keys = ({
  locale,
  absentKeys,
  disableClick,
  addLetter,
  clearInput,
  submitInput,
}: {
  locale: string;
  absentKeys: string[];
  disableClick: boolean;
  addLetter: (a: string) => void;
  clearInput: () => void;
  submitInput: (e: any) => void;
}) => {
  const keyboardFirstRow =
    locale === "fr" ? frKeyboardFirstRow : enKeyboardFirstRow;
  const keyboardSecondRow =
    locale === "fr" ? frKeyboardSecondRow : enKeyboardSecondRow;
  const keyboardLastRow =
    locale === "fr" ? frKeyboardLastRow : enKeyboardLastRow;

  function isAbsent(letter: string) {
    if (absentKeys.find((key) => key.toUpperCase() === letter)) {
      return true;
    }
    return false;
  }

  function handleClick(e: any) {
    const key = e.target.innerHTML;
    if (key === "CLEAR" || key === "RETOUR") {
      clearInput();
    } else if (key === "ENTER" || key === "ENTRÉE") {
      submitInput(e);
    } else if (disableClick) {
      return; // no action allowed unless attempt is cleared
    } else {
      addLetter(key);
    }
  }

  function getKey(key: string) {
    return (
      <div
        key={key}
        onClick={handleClick}
        className={isAbsent(key) ? `absent key key-${key}` : `key key-${key}`}
      >
        {key}
      </div>
    );
  }

  return (
    <>
      <KeysGrid row={1} locale={locale} disableClick={disableClick}>
        {keyboardFirstRow.map((key) => getKey(key))}
      </KeysGrid>
      <KeysGrid row={2} locale={locale} disableClick={disableClick}>
        {keyboardSecondRow.map((key) => getKey(key))}
      </KeysGrid>
      <KeysGrid row={3} locale={locale} disableClick={disableClick}>
        {keyboardLastRow.map((key) => getKey(key))}
      </KeysGrid>
    </>
  );
};

export default Keys;
