import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

const StyledContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
  margin: auto;
  padding: 30px 40px;
  width: 50%;
  max-width: 500px;
  box-shadow: 5px 5px 25px #000;
  background-color: #000;
  color: #fff;
  text-align: center;
  font-size: 25px;
  font-family: Arial, Helvetica, sans-serif;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.7);
`;

const CloseButton = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;

const ResultModal = ({
  isOpen,
  onClose,
  hasWon,
  answerWord,
}: {
  isOpen: boolean;
  onClose: () => void;
  hasWon: null | boolean;
  answerWord: string;
}) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <>
      <Overlay />
      <StyledContainer>
        <h2>{hasWon ? "NICE JOB!" : "OH NOOO :("}</h2>
        <p>
          The answer was
          <br />
          <br />
          {answerWord}
        </p>
        <CloseButton onClick={onClose}>X</CloseButton>
      </StyledContainer>
    </>,
    document.getElementById("modal-root")!
  );
};

export default ResultModal;
