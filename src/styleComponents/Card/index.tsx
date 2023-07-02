import React from "react";

import styles from "./Card.module.scss";
import clsx from "clsx";

interface IProps {
  children: JSX.Element;
  className?: string
  size?: "xSmall" | "small"
  onClick?: () => void;
}

export const Card: React.FC<IProps> = (props) => {
  const { children, className, onClick, size = "small" } = props;

  const mainClass = clsx(styles.Card, styles[size], className)
  if (onClick) {
    return <button className={mainClass} onClick={onClick}>
      {children}
    </button>
  }
  return <div className={mainClass}>{children}</div>;
};

export default Card;
