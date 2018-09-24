import React, { Component } from "react";
import { connect } from "react-redux";

import {
  resetCustomers,
  searchCustomers,
  resetSearch,
  editCustomer,
  editNote
} from "redux/actions/CustomersActions";
import View from "./View";

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false
    };
  }

  onReset() {
    this.setState({ isLoading: true });

    return this.props.resetSearch().then(() => this.close());
  }

  onSubmit(data) {
    this.setState({ isLoading: true });

    const searchBy = Object.keys(data).reduce((result, field) => {
      if (data[field]) {
        result[field] = data[field];
      }

      return result;
    }, {});

    if (Object.keys(searchBy).length === 0) {
      return this.onReset();
    }

    return this.props.searchCustomers(searchBy).then(() => this.close());
  }

  close() {
    this.setState({ isLoading: false }, () => this.props.closeModal());
  }

  render() {
    return (
      <View
        isLoading={this.state.isLoading}
        isSearch
        formValues={this.props.customersState.search}
        onSubmit={(data) => this.onSubmit(data)}
        onReset={() => this.onReset()}
      />
    );
  }
}

const mapStateToProps = (state) => ({ customersState: state.customers });

export default connect(
  mapStateToProps,
  {
    resetCustomers,
    searchCustomers,
    resetSearch,
    editCustomer,
    editNote
  }
)(Form);
