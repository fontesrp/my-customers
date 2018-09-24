import React, { Component } from "react";
import { connect } from "react-redux";

import { orderCustomersBy, resetOrderBy } from "redux/actions/CustomersActions";
import View from "./View";

class OrderBy extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false
    };
  }

  onReset() {
    this.setState({ isLoading: true });

    return this.props.resetOrderBy().then(() => this.close());
  }

  onSubmit(field) {
    this.setState({ isLoading: true });

    if (!field || !field.id) {
      return this.onReset();
    }

    return this.props.orderCustomersBy(field.id).then(() => this.close());
  }

  close() {
    this.setState({ isLoading: false }, () => this.props.closeModal());
  }

  render() {
    const fields = [
      { id: "id", name: "Id" },
      { id: "name", name: "Name" },
      { id: "email", name: "Email" },
      { id: "status", name: "Status" },
      { id: "createdAt", name: "Created at" }
    ];

    return (
      <View
        fields={fields}
        isLoading={this.state.isLoading}
        selected={this.props.customersState.orderBy}
        onSubmit={(field) => this.onSubmit(field)}
        onReset={() => this.onReset()}
      />
    );
  }
}

const mapStateToProps = (state) => ({ customersState: state.customers });

export default connect(
  mapStateToProps,
  {
    orderCustomersBy,
    resetOrderBy
  }
)(OrderBy);
