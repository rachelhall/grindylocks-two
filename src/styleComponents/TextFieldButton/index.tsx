import React from "react";
import { Button } from "styleComponents/Button";

import styles from "./TextFieldButton.module.scss";

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
