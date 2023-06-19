import React from "react";
import { Card } from "../Card";
import Image from 'next/image'

import styles from "./MediaCard.module.scss";

interface IProps {
    src: string
}

export const MediaCard: React.FC<IProps> = (props) => {
    const { src } = props;

    return (
        <div className={styles.MediaCard}>
            <Card size="small">
                <Image fill={true} src={src} alt="photo of the park" />
            </Card>
        </div>
    );
};

export default MediaCard;
