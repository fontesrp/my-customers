import React from "react";

import Loading from "screens/Customers/Loading";
import Input from "screens/Customers/Modal/Input";
import { Wrapper } from "./styles";

const View = ({ isLoading, selected, onSubmit, onReset, fields }) => (
  <Wrapper>
    {isLoading && <Loading full absolute />}
    {fields.map((fld) => (
      <Input
        key={fld.id}
        type="submit"
        value={fld.name}
        onClick={() => onSubmit(fld)}
        customMargin="margin-bottom: 15px"
      />
    ))}
    <Input type="reset" onClick={onReset} />
  </Wrapper>
);

export default View;
