import React from "react";
import styled from "styled-components";

import { ReactComponent as Globe } from "./assets/globe-solid.svg";

const HEIGHT = 20;
const FR_LOCAL = "FR";
const EN_LOCAL = "EN";

const StyledDiv = styled.div`
  position: absolute;
  right: 10px;
  top: 10px;
  width: ${({ isOpen }: { isOpen: boolean }) => (isOpen ? "120px" : "inherit")};
  height: ${HEIGHT}px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  cursor: pointer;
  select {
    font-size: 12px;
    position: absolute;
    right: 30px;
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

  const handleChange = (e: any) => {
    let val = e.target.value;
    setLocale(val);
    setOpenSelect(false);
  };

  return (
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
        height={`${HEIGHT}px`}
        onClick={() => setOpenSelect(!openSelect)}
      />
    </StyledDiv>
  );
};

export default LanguageSelect;
