import React from "react";
import styled from "styled-components";
import { LANG_SELECT_HEIGHT, EN_LOCAL, FR_LOCAL } from "../constants";

import { ReactComponent as Globe } from "./assets/globe-solid.svg";

const StyledDiv = styled.div`
  position: absolute;
  right: 10px;
  top: 10px;
  width: ${({ isOpen }: { isOpen: boolean }) => (isOpen ? "120px" : "inherit")};
  height: ${LANG_SELECT_HEIGHT}px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  cursor: pointer;
  select {
    font-size: 12px;
    position: absolute;
    right: 55px;
  }
`;
const StyledLocale = styled.div`
  font-family: Arial, Helvetica, sans-serif;
  margin-left: 5px;
`;

const LanguageSelect = ({
  locale,
  setLocale,
  disabled, // disable changing the language when a game already started
}: {
  locale: string;
  setLocale: (a: string) => void;
  disabled: boolean;
}) => {
  const [openSelect, setOpenSelect] = React.useState(false);

  const handleChange = (e: any) => {
    let val = e.target.value;
    setLocale(val);
    setOpenSelect(false);
  };

  return (
    <>
      <StyledDiv isOpen={openSelect}>
        {openSelect && (
          <select
            onChange={handleChange}
            defaultValue={locale === EN_LOCAL ? EN_LOCAL : FR_LOCAL}
          >
            <option value={FR_LOCAL}>Français</option>
            <option value={EN_LOCAL}>English</option>
          </select>
        )}
        <Globe
          fill="#fff"
          height={`${LANG_SELECT_HEIGHT}px`}
          onClick={() => !disabled && setOpenSelect(!openSelect)}
        />
        <StyledLocale>{locale.toUpperCase()}</StyledLocale>
      </StyledDiv>
    </>
  );
};

export default LanguageSelect;
