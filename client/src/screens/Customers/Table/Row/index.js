import React, { Fragment } from "react";

import Loading from "screens/Customers/Loading";
import { localeDate } from "utils/date";
import {
  Wrapper,
  Title,
  Text,
  Description,
  Notes,
  NotesWrapper,
  NotesIcon
} from "./styles";
import notes from "./notes.svg";

const Row = ({ index, style, customers, isRowLoaded, onNotesClick }) => {
  const customer = customers[index] || {};

  return (
    <Wrapper style={style}>
      {isRowLoaded({ index }) ? (
        <Fragment>
          <Description>
            <Title>{customer.id}</Title>
            <Text>{customer.name}</Text>
            <Text>{customer.email}</Text>
            <Text>{customer.status}</Text>
            <Text>{localeDate(customer.created_at)}</Text>
          </Description>
          <Notes onClick={() => onNotesClick(customer)}>
            <NotesWrapper>
              <NotesIcon src={notes} alt="notes" />
            </NotesWrapper>
          </Notes>
        </Fragment>
      ) : (
        <Loading />
      )}
    </Wrapper>
  );
};

export default Row;
