import React from "react";

import styles from "./Footer.module.scss";
import NavBar from "../NavBar";

interface IProps {

}

export const Footer: React.FC<IProps> = (props) => {
    const { } = props;

    return (
        <footer className={styles.Footer}>
            Copyright 2023, Rachel Raspberry Rules
            <NavBar isFooter={true} />
        </footer>
    );
};

export default Footer;
