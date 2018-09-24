import styled from "styled-components";

import style from "utils/style";

export const Wrapper = styled.div`
  height: 50px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${style.color.secondary};
`;

export const Title = styled.p`
  margin: 0;
  padding: 0 15px;
  color: ${style.color.white};
  font-size: ${style.size.large};
`;

export const ButtonsWrapper = styled.div`
  display: flex;
`;

export const CloseIcon = styled.div`
  padding: 15px;
  width: 18px;
  height: 18px;
  opacity: 0.3;
  position: relative;

  :hover {
    opacity: 1;
  }

  :before,
  :after {
    position: absolute;
    left: 23px;
    content: " ";
    height: 18px;
    width: 2px;
    background-color: ${style.color.white};
  }

  :before {
    transform: rotate(45deg);
  }

  :after {
    transform: rotate(-45deg);
  }
`;
