import { useState } from "react";

export const useModal = () => {
    const [modal, setModal] = useState < boolean > (false);
    const [modalContent, setModalContent] = useState < JSX.Element > ();

    const handleModal = (content?: JSX.Element) => {
        setModal(!modal);
        if (content) {
            setModalContent(content);
        }
    };
    return { modal, modalContent, handleModal };
};
