import React from "react";

import styles from "./DropdownMenu.module.scss";
import MenuItem, { IMenuItem } from "../MenuItem";
import clsx from "clsx";

interface IProps {
    className?: string;
    items: IMenuItem[];
}

export const DropdownMenu: React.FC<IProps> = (props) => {
    const { className, items } = props;
    const mainClass = clsx(styles.DropdownMenu, className)
    return (
        <div className={mainClass}>
            {items.map(item =>
                <MenuItem item={item} />
            )}
        </div>
    );
};

export default DropdownMenu;
