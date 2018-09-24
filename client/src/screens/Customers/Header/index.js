import React, { Fragment } from "react";

import search from "./search.svg";
import sort from "./sort.svg";
import { Wrapper, Title, IconsWrapper, Icon } from "./styles";

const Header = ({ onSearchClick, onSortClick }) => (
  <Fragment>
    <Wrapper>
      <Title>MyCustomers</Title>
      <IconsWrapper>
        <Icon src={search} alt="search" onClick={onSearchClick} />
        <Icon src={sort} alt="sort" onClick={onSortClick} />
      </IconsWrapper>
    </Wrapper>
  </Fragment>
);

export default Header;
