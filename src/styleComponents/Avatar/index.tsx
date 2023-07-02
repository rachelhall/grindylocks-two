import React from "react";
import Image from 'next/image'

import { Text } from "grindylocks/styleComponents"

import styles from "./Avatar.module.scss";
import clsx from "clsx";
import { Account } from "@prisma/client";

interface IProps {
    className?: string;
    src?: string | null;
    username: string
    initials: string;
    size?: "x-small" | "small" | "medium" | "large"

}

export const Avatar: React.FC<IProps> = (props) => {
    const { initials, className, src, username, size = "small" } = props;

    const dimension = size === "large" ? 128 : size === "x-small" ? 32 : 48

    const mainClass = clsx(styles.Avatar, className)

    return (
        <div className={mainClass} style={{ height: dimension, width: dimension }}>
            {src ? <Image src={src} alt={`${username} profile picture`} fill /> : <Text>{initials}</Text>}
        </div>
    );
};

export default Avatar;
