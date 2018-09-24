import React from "react";
import { InfiniteLoader, List } from "react-virtualized";

import Loading from "screens/Customers/Loading";
import Row from "./Row";
import { Wrapper } from "./styles";

const View = ({
  isFirstLoad,
  customers,
  rowCount,
  isRowLoaded,
  loadMoreRows,
  documentDimentions,
  onNotesClick
}) =>
  isFirstLoad ? (
    <Loading full />
  ) : (
    <Wrapper>
      <InfiniteLoader
        isRowLoaded={isRowLoaded}
        loadMoreRows={loadMoreRows}
        rowCount={rowCount}
        minimumBatchSize={30}
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
            height={documentDimentions.height - 55}
            rowCount={rowCount}
            rowHeight={105}
            width={documentDimentions.width - 30}
          />
        )}
      </InfiniteLoader>
    </Wrapper>
  );

export default View;
