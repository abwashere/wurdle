import React from "react";
import styled from "styled-components";

import { ReactComponent as Globe } from "./assets/globe-solid.svg";

const HEIGHT = "20px";

const StyledDiv = styled.div`
  position: absolute;
  right: 10px;
  top: 10px;
  width: ${({ isOpen }: { isOpen: boolean }) => (isOpen ? "90px" : "5%")};
  height: HEIGHT;
  cursor: pointer;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  select {
    font-size: 12px;
    margin-right: 5px;
  }
`;

const LanguageSelect = ({
  locale,
  setLocale,
}: {
  locale: string;
  setLocale: (a: string) => void;
}) => {
  const [openSelect, setOpenSelect] = React.useState(false);

  return (
    <StyledDiv isOpen={openSelect}>
      {openSelect && (
        <select onChange={(e) => setLocale(e.target.value)}>
          <option value="FR">Français</option>
          <option value="EN">English</option>
        </select>
      )}
      <Globe
        fill="#fff"
        height={HEIGHT}
        onClick={() => setOpenSelect(!openSelect)}
      />
    </StyledDiv>
  );
};

export default LanguageSelect;
