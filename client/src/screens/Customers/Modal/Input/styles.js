import styled from "styled-components";

import style from "utils/style";

export const Input = styled.input`
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  width: 100%;
  font-size: ${style.size.small};
  padding-top: 15px;
  border-width: 0 0 2px 0;
  border-color: ${style.color.lightGray};
  ${({ error }) => !!error && `border-color: ${style.color.primary}`};
  ${({ customMargin }) => !!customMargin && customMargin};

  &[type="reset"],
  &[type="submit"] {
    padding-bottom: 15px;
    color: ${style.color.white};
    font-size: ${style.size.normal};
  }

  &[type="reset"] {
    background-color: ${style.color.primary};
    margin-bottom: 15px;
  }

  &[type="submit"] {
    background-color: ${style.color.light};
  }
`;
