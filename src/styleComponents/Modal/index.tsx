import React, { useContext } from "react";
import { ModalContext } from "../../lib/context/ModalContext"


import styles from "./Modal.module.scss";
import { CloseModalButton } from "../CloseModalButton";
import { Roboto } from "next/font/google";
import clsx from "clsx";

const roboto = Roboto({
  weight: ['400', '700', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
})

export const Modal: React.FC = () => {
  const { modalContent, handleModal, modal } = useContext(ModalContext);
  const mainClass = clsx(styles.Modal, roboto.className)
  if (modal) {
    return (
      <div className={mainClass}>
        <div className={styles.modalInner}>
          <CloseModalButton handleClose={handleModal} />
          <div className={styles.modalContent}>{modalContent}</div>
        </div>
      </div>
    );
  } else return null;
};

export default Modal;
