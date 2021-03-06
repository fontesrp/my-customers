import React from "react";
import ReactModal from "react-modal";

import Header from "./Header";
import Form from "./Form";
import OrderBy from "./OrderBy";

ReactModal.setAppElement("#root");

const Modal = ({ isOpen, title, type, data, closeModal }) => (
  <ReactModal
    isOpen={isOpen}
    onRequestClose={closeModal}
    contentLabel={title}
    style={{ content: { padding: 0, display: "block" } }}
  >
    <Header title={title} closeModal={closeModal} />
    {(type === "search" || type === "notes") && (
      <Form
        closeModal={closeModal}
        isSearch={type === "search"}
        customer={data}
      />
    )}
    {type === "orderBy" && <OrderBy closeModal={closeModal} />}
  </ReactModal>
);

export default Modal;
