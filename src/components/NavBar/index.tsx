import React, { useContext } from "react";
import { LuPlusSquare } from "react-icons/lu"
import { GiRollerSkate } from 'react-icons/gi'
import { AiOutlineBell } from 'react-icons/ai'
import { CiMap } from 'react-icons/ci'

import styles from "./NavBar.module.scss";
import Link from "next/link";
import { ModalContext } from "grindylocks/lib/context/ModalContext";
import NewPostForm from "grindylocks/components/NewPostForm";
import Notifications from "../Notifications";
import clsx from "clsx";

interface IProps {
    isFooter?: boolean;
}

export const NavBar: React.FC<IProps> = (props) => {
    const { isFooter } = props;

    const { handleModal } = useContext(ModalContext);

    const handleOpenNewPostForm = () => {
        handleModal(<NewPostForm />)
    }

    const handleOpenNotificationsModal = () => {
        handleModal(<Notifications />)
    }


    const mainClass = clsx(styles.NavBar, isFooter ? styles.footer : styles.header)
    const buttonStyles = clsx(styles.icon, isFooter ? styles.footer : styles.header)

    return (
        <div className={mainClass}>
            <button onClick={handleOpenNewPostForm} className={styles.newPostIcon}>
                <LuPlusSquare className={buttonStyles} />
            </button>
            <Link href="/parks" className={styles.parksIcon}>
                <GiRollerSkate className={buttonStyles} />
            </Link>
            <Link href="/map" className={styles.parksIcon}>
                <CiMap className={buttonStyles} />
            </Link>
            <AiOutlineBell className={styles.icon} onClick={handleOpenNotificationsModal} />
        </div>
    );
};

export default NavBar;
