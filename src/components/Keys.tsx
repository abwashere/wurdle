import styled from "styled-components";
import {
  frKeyboardFirstRow,
  frKeyboardSecondRow,
  frKeyboardLastRow,
} from "./data/frKeyboard";
import {
  enKeyboardFirstRow,
  enKeyboardSecondRow,
  enKeyboardLastRow,
} from "./data/enKeyboard";
import { EN_LOCAL, FR_LOCAL } from "../constants";

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
  grid-gap: 5px;
  justify-content: center;
  width: 350px;
  margin: 0px auto 5px;
  color: #fff;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 15px;

  .key {
    height: 30px;
    width: 30px;
    display: flex;
    margin: 2px;
    align-items: center;
    justify-content: center;
    background-color: #adadad;
    border-radius: 2px;
    cursor: ${(props: KeysGridProps) =>
      props.disableClick ? "not-allowed" : "pointer"};
    &.disabled {
      color: #484a4d;
      background-color: #282c34;
      cursor: none;
    }
  }

  .key-ENTER,
  .key-ENTRÉE,
  .key-CLEAR,
  .key-RETOUR {
    padding: 0 1.5em;
    cursor: pointer;
  }
`;

const Keys = ({
  locale,
  disabledKeys,
  disableClick,
  addLetter,
  clearInput,
  submitInput,
}: {
  locale: string;
  disabledKeys: string[];
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

  function isDisabled(letter: string) {
    if (disabledKeys.find((key) => key.toUpperCase() === letter)) {
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
      !isDisabled(key) && addLetter(key);
    }
  }

  function getKeys(key: string) {
    return (
      <div
        key={key}
        onClick={handleClick}
        className={
          isDisabled(key) ? `disabled key key-${key}` : `key key-${key}`
        }
      >
        {key}
      </div>
    );
  }

  return (
    <>
      <KeysGrid row={1} locale={locale} disableClick={disableClick}>
        {keyboardFirstRow.map((key) => getKeys(key))}
      </KeysGrid>
      <KeysGrid row={2} locale={locale} disableClick={disableClick}>
        {keyboardSecondRow.map((key) => getKeys(key))}
      </KeysGrid>
      <KeysGrid row={3} locale={locale} disableClick={disableClick}>
        {keyboardLastRow.map((key) => getKeys(key))}
      </KeysGrid>
    </>
  );
};

export default Keys;
