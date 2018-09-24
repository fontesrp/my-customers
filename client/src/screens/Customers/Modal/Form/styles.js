import styled from "styled-components";

import style from "utils/style";

export const FormWrapper = styled.form`
  padding: 15px;
`;

export const FormGroup = styled.div`
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  padding-bottom: 20px;
`;

export const Label = styled.label`
  width: 100%;
  font-weight: 500;
  display: block;
`;

export const SelectWrapper = styled.div`
  position: relative;
`;

export const Select = styled.select`
  width: 100%;
  font-size: 14px;
  padding-top: 15px;
  border-width: 0 0 2px 0;
  border-color: ${style.color.lightGray};
  ${({ error }) => !!error && "border-color: red"};
  background-color: unset;
  border-radius: unset;
`;

export const ArrowDown = styled.div`
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 8px solid #333;
  position: absolute;
  right: 7px;
  top: 20px;
`;

export const TextArea = styled.textarea`
  width: 100%;
  font-size: 14px;
  padding-top: 15px;
  border-width: 0 0 2px 0;
  border-color: ${style.color.lightGray};
  ${({ error }) => !!error && "border-color: red"};
`;
