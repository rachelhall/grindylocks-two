import React from "react";
import Image from 'next/image'

import styles from "./Avatar.module.scss";

interface IProps {
    src: string;
    username: string
    size?: "x-small" | "small" | "medium" | "large"
}

export const Avatar: React.FC<IProps> = (props) => {
    const { src, username, size = "small" } = props;

    const dimension = size === "large" ? 128 : size === "x-small" ? 32 : 48

    return (
        <div className={styles.Avatar} style={{ height: dimension, width: dimension }}>
            <Image src={src} alt={`${username} profile picture`} fill />
        </div>
    );
};

export default Avatar;
