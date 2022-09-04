import React from "react";
import styled from "styled-components";

const KeysGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-gap: 5px;
  width: 350px;
  margin: 0px auto 20px;
  text-align: center;
  color: #fff;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 15px;

  .key {
    height: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #adadad;
    &.disabled {
      color: #484a4d;
      background-color: #282c34;
    }
  }
`;

const Keys = ({ disabledKeys }: { disabledKeys: string[] }) => {
  return (
    <KeysGrid>
      {[
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z",
      ].map((letter) => (
        <div
          key={letter}
          className={
            disabledKeys.find((key) => key.toUpperCase() === letter)
              ? "disabled key"
              : "key"
          }
        >
          {letter}
        </div>
      ))}
    </KeysGrid>
  );
};

export default Keys;
