import React, { Component } from "react";
import { connect } from "react-redux";

import {
  resetCustomers,
  searchCustomers,
  resetSearch,
  editCustomer,
  editManyNotes,
  createNote
} from "redux/actions/CustomersActions";
import View from "./View";

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false
    };
  }

  onSearchReset() {
    this.setState({ isLoading: true });

    return this.props.resetSearch().then(() => this.close());
  }

  onSearchSubmit(data) {
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

  async onEditSubmit(data) {
    this.setState({ isLoading: true });

    const { customer, createNote, editManyNotes, resetCustomers } = this.props;

    if (data["note-new"]) {
      await createNote({
        customerId: this.props.customer.id,
        body: data["note-new"]
      });
    }

    const notesToEdit = [];

    (customer.notes || []).forEach((note) => {
      const newBody = data[`note-${note.id}`];

      if (note.body !== newBody) {
        notesToEdit.push({ id: note.id, body: newBody });
      }
    });

    await editManyNotes(notesToEdit);

    await resetCustomers();

    this.close();
  }

  onReset() {
    return this.props.isSearch ? this.onSearchReset() : this.close();
  }

  onSubmit(data) {
    return this.props.isSearch
      ? this.onSearchSubmit(data)
      : this.onEditSubmit(data);
  }

  close() {
    this.setState({ isLoading: false }, () => this.props.closeModal());
  }

  render() {
    const { isSearch, customersState, customer } = this.props;

    console.log(customer);

    return (
      <View
        isLoading={this.state.isLoading}
        isSearch={isSearch}
        formValues={isSearch ? customersState.search : customer}
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
    editManyNotes,
    createNote
  }
)(Form);
