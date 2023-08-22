import React, { ReactNode } from "react";
import { Text } from '../index'

import styles from "./MenuItem.module.scss";

export interface IMenuItem {
    title?: string;
    link?: string;
    onClick?: () => void;
    component?: ReactNode;
}

interface IMenuItemProps {
    item: IMenuItem
}

export const MenuItem: React.FC<IMenuItemProps> = (props) => {
    const { item, } = props;

    return (
        <div className={styles.MenuItem}>
            <Text>{item.title}</Text>
            {item.component}
        </div>
    );
};

export default MenuItem;
