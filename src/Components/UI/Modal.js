import React, { Fragment } from "react";
import ReactDom from "react-dom";
import styles from "./Modal.module.css";

const BackDrop = (props) => {
  const backdropHandler = () => {
    props.setmodal(false);
  };
  return <div className={styles.backdrop} onClick={backdropHandler}></div>;
};

const ModalOverlay = (props) => {
  return (
    <div className={styles.modal}>
      <div className={styles.content}>{props.children}</div>
    </div>
  );
};

const overlay = document.getElementById("overlay");

const Modal = (props) => {
  return (
    <Fragment>
      {ReactDom.createPortal(<BackDrop setmodal={props.setmod} />, overlay)}
      {ReactDom.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        overlay
      )}
    </Fragment>
  );
};

export default Modal;
