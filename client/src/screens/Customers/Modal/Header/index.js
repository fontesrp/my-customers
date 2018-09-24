import React from "react";

import { Wrapper, Title, ButtonsWrapper, CloseIcon } from "./styles";

const Header = ({ title, closeModal }) => (
  <Wrapper>
    <Title>{title}</Title>
    <ButtonsWrapper>
      <CloseIcon onClick={closeModal} />
    </ButtonsWrapper>
  </Wrapper>
);

export default Header;
