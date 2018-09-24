import React, { Component, Fragment } from "react";

import Header from "./Header";
import Table from "./Table";
import Modal from "./Modal";

class Customers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false,
      modalTitle: null,
      modalType: null
    };
  }

  openModal({ title, type }) {
    this.setState({
      isModalOpen: true,
      modalTitle: title,
      modalType: type
    });
  }

  closeModal() {
    this.setState({
      isModalOpen: false,
      modalTitle: null,
      modalType: null
    });
  }

  render() {
    return (
      <Fragment>
        <Header
          onSearchClick={() =>
            this.openModal({ title: "Search", type: "search" })
          }
          onSortClick={() => this.openModal({ title: "Sort", type: "sort" })}
        />
        <Table
          onNotesClick={() =>
            this.openModal({ title: "Customer Details", type: "notes" })
          }
        />
        <Modal
          isOpen={this.state.isModalOpen}
          title={this.state.modalTitle}
          type={this.state.modalType}
          closeModal={() => this.closeModal()}
        />
      </Fragment>
    );
  }
}

export default Customers;
