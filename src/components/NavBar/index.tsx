import React, { useContext } from "react";
import { LuPlusSquare } from "react-icons/lu"
import { GiRollerSkate } from 'react-icons/gi'
import { AiOutlineBell } from 'react-icons/ai'

import styles from "./NavBar.module.scss";
import Link from "next/link";
import { ModalContext } from "grindylocks/lib/context/ModalContext";
import NewPostForm from "grindylocks/components/NewPostForm";
import Notifications from "../Notifications";

interface IProps {

}

export const NavBar: React.FC<IProps> = (props) => {
    const { } = props;

    const { handleModal } = useContext(ModalContext);

    const handleOpenNewPostForm = () => {
        handleModal(<NewPostForm />)
    }

    const handleOpenNotificationsModal = () => {
        handleModal(<Notifications />)
    }

    return (
        <div className={styles.NavBar}>
            <button onClick={handleOpenNewPostForm}>
                <LuPlusSquare className={styles.icon} />
            </button>
            <Link href="/parks">
                <GiRollerSkate className={styles.icon} />
            </Link>
            <AiOutlineBell className={styles.icon} onClick={handleOpenNotificationsModal} />
        </div>
    );
};

export default NavBar;
