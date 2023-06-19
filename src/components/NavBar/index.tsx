import React, { useContext } from "react";
import { LuPlusSquare } from "react-icons/lu"
import { GiRollerSkate } from 'react-icons/gi'

import styles from "./NavBar.module.scss";
import Link from "next/link";
import { ModalContext } from "grindylocks/lib/context/ModalContext";
import NewPostForm from "grindylocks/components/NewPostForm";

interface IProps {

}

export const NavBar: React.FC<IProps> = (props) => {
    const { } = props;

    const { handleModal } = useContext(ModalContext);

    const handleOpenNewPostForm = () => {
        handleModal(<NewPostForm />)
    }

    return (
        <div className={styles.NavBar}>
            <button onClick={handleOpenNewPostForm}>
                <LuPlusSquare className={styles.icon} />
            </button>
            <Link href="/parks">
                <GiRollerSkate className={styles.icon} />
            </Link>
        </div>
    );
};

export default NavBar;
