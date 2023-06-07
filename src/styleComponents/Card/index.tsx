import React from "react";

import styles from "./Card.module.scss";

interface IProps {
  children: JSX.Element;
}

export const Card: React.FC<IProps> = (props) => {
  const { children } = props;

  return <div className={styles.Card}>{children}</div>;
};

export default Card;
