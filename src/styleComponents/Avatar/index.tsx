import React from "react";
import Image from 'next/image'

import styles from "./Avatar.module.scss";
import clsx from "clsx";

interface IProps {
    className?: string;
    src: string;
    username: string
    size?: "x-small" | "small" | "medium" | "large"

}

export const Avatar: React.FC<IProps> = (props) => {
    const { className, src, username, size = "small" } = props;

    const dimension = size === "large" ? 128 : size === "x-small" ? 32 : 48

    const mainClass = clsx(styles.Avatar, className)

    return (
        <div className={mainClass} style={{ height: dimension, width: dimension }}>
            <Image src={src} alt={`${username} profile picture`} fill />
        </div>
    );
};

export default Avatar;
