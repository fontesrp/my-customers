import React from "react";
import ReactModal from "react-modal";

import Form from "./Form";

ReactModal.setAppElement("#root");

const Modal = ({ isOpen, closeModal, title }) => (
  <ReactModal isOpen={isOpen} onRequestClose={closeModal} contentLabel={title}>
    <Form />
  </ReactModal>
);

export default Modal;
