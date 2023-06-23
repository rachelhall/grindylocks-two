import React from "react";

import styles from "./Card.module.scss";
import clsx from "clsx";

interface IProps {
  children: JSX.Element;
  className?: string
  size?: "xSmall" | "small"
}

export const Card: React.FC<IProps> = (props) => {
  const { children, className, size = "small" } = props;

  const mainClass = clsx(styles.Card, styles[size], className)

  return <div className={mainClass}>{children}</div>;
};

export default Card;
