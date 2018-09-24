import React from "react";

import { Wrapper, Spinner } from "./styles";

const Loading = ({ full }) => (
  <Wrapper full={full}>
    <Spinner>
      {Array.from({ length: 12 }).map((_, idx) => (
        <div key={idx} />
      ))}
    </Spinner>
  </Wrapper>
);

export default Loading;
