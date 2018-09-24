import styled from "styled-components";

import style from "utils/style";

export const Wrapper = styled.div`
  padding: 7px 0 8px 0;
  display: flex;

  :after {
    width: 100%;
    border-bottom: 1px ${style.color.lightGray} dotted;
    content: " ";
    position: absolute;
    top: 87%;
  }
`;

export const Description = styled.div`
  flex: 8;
`;

export const Title = styled.div`
  font-size: ${style.size.normal};
  font-weight: bold;
  color: ${style.color.text};
`;

export const Text = styled(Title)`
  font-weight: normal;
`;

export const Notes = styled.div`
  flex: 2;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const NotesWrapper = styled.div`
  height: 40px;
  width: 40px;
  border-radius: 50%;
  background-color: ${style.color.light};
  color: ${style.color.text};
  position: relative;
`;

export const NotesIcon = styled.img`
  position: absolute;
  left: 9px;
  top: 7px;
`;
