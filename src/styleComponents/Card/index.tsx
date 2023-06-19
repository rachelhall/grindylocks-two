import React from "react";

import styles from "./Card.module.scss";
import clsx from "clsx";

interface IProps {
  children: JSX.Element;
  size?: "small"
}

export const Card: React.FC<IProps> = (props) => {
  const { children, size = "small" } = props;

  const mainClass = clsx(styles.Card, size === "small" ? styles.small : styles.medium)

  return <div className={mainClass}>{children}</div>;
};

export default Card;
