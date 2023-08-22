import React from "react";

import styles from "./SearchItemCard.module.scss";
import Link from "next/link";
import { Avatar, Text } from "grindylocks/styleComponents";

interface IProps {
    href: string;
    avatarSrc?: string | null;
    name?: string;
}

export const SearchItemCard: React.FC<IProps> = (props) => {
    const { href, avatarSrc, name } = props;

    return (
        <Link href={href} className={styles.SearchItemCard}>
            <Avatar src={avatarSrc} size="x-small" className={styles.avatar} />
            <Text>{name}</Text>
        </Link>
    );
};

export default SearchItemCard;
