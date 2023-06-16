import React from "react";


import styles from "./TextFieldButton.module.scss";
import { Button } from "../Button";

interface IProps {
  children: JSX.Element | string;
  onSubmit?: () => void;
}

export const TextFieldButton: React.FC<IProps> = (props) => {
  const { children, onSubmit } = props;

  return (
    <div className={styles.TextFieldButton}>
      <Button color="primary" textButton onClick={onSubmit}>
        {children}
      </Button>
    </div>
  );
};

export default TextFieldButton;
