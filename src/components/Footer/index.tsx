import React from "react";

import styles from "./Footer.module.scss";

interface IProps {

}

export const Footer: React.FC<IProps> = (props) => {
    const { } = props;

    return (
        <div className={styles.Footer}>
            Copyright 2023, Rachel Raspberry Rules
        </div>
    );
};

export default Footer;
