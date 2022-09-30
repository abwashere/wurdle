import { createPortal } from "react-dom";
import styled from "styled-components";

const StyledContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
  margin: auto;
  padding: 30px 40px;
  width: 30%;
  max-width: 500px;
  box-shadow: 5px 5px 25px #000;
  background-color: #000;
  border: 1px solid #fff;
  color: #fff;
  text-align: center;
  font-family: Arial, Helvetica, sans-serif;

  .answer {
    font-size: 25px;
    font-weight: 600;
  }
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
  answer,
  locale,
}: {
  isOpen: boolean;
  onClose: () => void;
  hasWon: null | boolean;
  answer: string;
  locale: string;
}) => {
  if (!isOpen) return null;

  return createPortal(
    <>
      <Overlay />
      <StyledContainer>
        <p>
          {locale === "en"
            ? hasWon
              ? "NICE JOB!"
              : "OH NOOO :("
            : hasWon
            ? "BIEN JOUÉ !"
            : "OH NON :("}
        </p>
        <p>{locale === "en" ? "The answer was" : "La réponse était"}</p>
        <p className="answer">{answer}</p>

        <CloseButton onClick={onClose}>X</CloseButton>
      </StyledContainer>
    </>,
    document.getElementById("modal-root")!
  );
};

export default ResultModal;
