import { Modal } from "grindylocks/styleComponents";
import { Portal } from "grindylocks/utils/Portal";
import React, { createContext } from "react";
import { useModal } from "../hooks/useModal";



interface IModalContext {
  modal: boolean;
  handleModal: (content?: JSX.Element) => void;
  modalContent: JSX.Element | undefined;
}

const ModalContext = createContext<IModalContext>({
  modal: false,
  handleModal: function (content?: JSX.Element | undefined): void {
    throw new Error("Function not implemented.");
  },
  modalContent: undefined
});

const ModalProvider = ({ children }: { children: JSX.Element }) => {
  let { modal, handleModal, modalContent } = useModal();
  return (
    <ModalContext.Provider value={{ modal, handleModal, modalContent }}>
      <Portal>
        <Modal />
      </Portal>
      {children}
    </ModalContext.Provider>
  );
};

export { ModalContext, ModalProvider };
