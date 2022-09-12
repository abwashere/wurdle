import { keyframes } from "styled-components";

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

export const shakeTiles = (state: string) => keyframes`
  10%, 90% {
    transform: translate3d(-1px, 0, 0);
  }
  
  20%, 80% {
    transform: translate3d(2px, 0, 0);
  }

  30%, 50%, 70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%, 60% {
    transform: translate3d(4px, 0, 0);
  }
`;