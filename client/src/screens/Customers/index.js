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
      modalType: null,
      modalData: null
    };
  }

  openModal({ title, type, data }) {
    this.setState({
      isModalOpen: true,
      modalTitle: title,
      modalType: type,
      modalData: data
    });
  }

  closeModal() {
    this.setState({
      isModalOpen: false,
      modalTitle: null,
      modalType: null,
      modalData: null
    });
  }

  render() {
    return (
      <Fragment>
        <Header
          onSearchClick={() =>
            this.openModal({ title: "Search", type: "search" })
          }
          onSortClick={() =>
            this.openModal({ title: "Sort customers", type: "orderBy" })
          }
        />
        <Table
          onNotesClick={(customer) =>
            this.openModal({
              title: "Customer Details",
              type: "notes",
              data: customer
            })
          }
        />
        <Modal
          isOpen={this.state.isModalOpen}
          title={this.state.modalTitle}
          type={this.state.modalType}
          data={this.state.modalData}
          closeModal={() => this.closeModal()}
        />
      </Fragment>
    );
  }
}

export default Customers;
