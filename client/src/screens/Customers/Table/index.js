import React, { Component } from "react";
import { connect } from "react-redux";

import { fetchCustomers } from "redux/actions/CustomersActions";
import { documentDimentions } from "utils/measures";
import View from "./View";

class Table extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      isFirstLoad: true
    };
  }

  componentDidMount() {
    this.loadNextPage({ startIndex: 0, stopIndex: 30 });
  }

  loadNextPage({ startIndex, stopIndex }) {
    if (!this.state.isLoading) {
      this.setState({ isLoading: true });

      // InfiniteLoader is calling this function with `stopIndex` === `startIndex`,
      // despite its `minimumBatchSize` prop; this would cause the client to
      // make one request per new row, which would slow the system down and could
      // crash the API.
      const _stopIndex =
        stopIndex - startIndex < 30 ? startIndex + 30 : stopIndex;

      return this.props
        .fetchCustomers({ startIndex, stopIndex: _stopIndex })
        .then(() => this.setState({ isLoading: false, isFirstLoad: false }));
    }
  }

  hasNextPage() {
    const { customers, total } = this.props.customersState;

    return customers.length < total;
  }

  isRowLoaded({ index }) {
    const { customers } = this.props.customersState;

    return !this.hasNextPage() || index < customers.length;
  }

  render() {
    const { customersState, onNotesClick } = this.props;

    const { customers } = customersState;

    const rowCount = this.hasNextPage()
      ? customers.length + 1
      : customers.length;

    return (
      <View
        isFirstLoad={this.state.isFirstLoad}
        customers={customers}
        rowCount={rowCount}
        documentDimentions={documentDimentions()}
        loadMoreRows={(params) => this.loadNextPage(params)}
        isRowLoaded={(params) => this.isRowLoaded(params)}
        onNotesClick={onNotesClick}
      />
    );
  }
}

const mapStateToProps = (state) => ({ customersState: state.customers });

export default connect(
  mapStateToProps,
  { fetchCustomers }
)(Table);
