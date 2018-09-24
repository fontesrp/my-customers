import React from "react";
import { InfiniteLoader, List } from "react-virtualized";

import Row from "./Row";
import { Wrapper } from "./styles";

const View = ({
  customers,
  rowCount,
  isRowLoaded,
  loadMoreRows,
  documentDimentions,
  onNotesClick
}) => (
  <Wrapper>
    <InfiniteLoader
      isRowLoaded={isRowLoaded}
      loadMoreRows={loadMoreRows}
      rowCount={rowCount}
      minimumBatchSize={15}
    >
      {({ onRowsRendered, registerChild }) => (
        <List
          ref={registerChild}
          onRowsRendered={onRowsRendered}
          rowRenderer={(props) => (
            <Row
              {...props}
              customers={customers}
              isRowLoaded={isRowLoaded}
              onNotesClick={onNotesClick}
            />
          )}
          height={documentDimentions.height - 53}
          rowCount={rowCount}
          rowHeight={105}
          width={documentDimentions.width - 30}
        />
      )}
    </InfiniteLoader>
  </Wrapper>
);

export default View;
