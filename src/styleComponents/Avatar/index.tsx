import React from "react";
import Image from 'next/image'

import { Text } from "grindylocks/styleComponents"

import styles from "./Avatar.module.scss";
import clsx from "clsx";

interface IProps {
    className?: string;
    src?: string | null;
    firstName?: string;
    lastName?: string;
    size?: "x-small" | "small" | "medium" | "large"

}

export const Avatar: React.FC<IProps> = (props) => {
    const { className, src, firstName, lastName, size = "small" } = props;

    const dimension = size === "large" ? 128 : size === "x-small" ? 32 : 48

    const initials = `${firstName && firstName[0]} ${lastName && lastName[0]}` ?? ""

    const mainClass = clsx(styles.Avatar, className)

    return (
        <div className={mainClass} style={{ height: dimension, width: dimension }}>
            {src ?
                <Image src={src} alt={`${firstName} ${lastName}'s profile picture`} fill />
                :
                <div className={styles.fallback} style={{ height: dimension, width: dimension }}>
                    <Text color="light">{initials}</Text>
                </div>
            }
        </div>
    );
};

export default Avatar;
