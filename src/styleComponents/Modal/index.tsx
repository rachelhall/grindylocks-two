import React, { useContext } from "react";
import { ModalContext } from "lib/context/ModalContext";
import { CloseModalButton, Text } from "styleComponents";

import styles from "./Modal.module.scss";

export const Modal: React.FC = () => {
  const { modalContent, handleModal, modal } = useContext(ModalContext);
  if (modal) {
    return (
      <div className={styles.Modal}>
        <div className={styles.modalInner}>
          <CloseModalButton handleClose={handleModal} />
          <div className={styles.modalContent}>{modalContent}</div>
        </div>
      </div>
    );
  } else return null;
};

export default Modal;
