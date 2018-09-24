import styled from "styled-components";

import style from "utils/style";

export const Wrapper = styled.div`
  background-color: ${style.color.primary};
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const Title = styled.p`
  margin: 0;
  padding: 15px 15px;
  color: ${style.color.white};
  font-size: ${style.size.large};
`;

export const IconsWrapper = styled.div`
  display: flex;
  color: white;
`;

export const Icon = styled.img`
  padding: 15px 15px;
`;
