import React, { HTMLInputTypeAttribute } from "react";
import { UseFormRegister } from "react-hook-form";
import { Path } from "react-hook-form";
import { Button } from "styleComponents/Button";
import TextFieldButton from "styleComponents/TextFieldButton";

import styles from "./TextInput.module.scss";

interface IProps {
  autoComplete?: "address-line1";
  className?: string;
  id?: string;
  label: Path<any>;
  required: boolean;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  withClear?: boolean;
  withDollarSign?: boolean;
  withPercentSign?: boolean;
  register?: UseFormRegister<any>;
  submitButton?: boolean;
  onSubmit?: () => void;
}

export const TextInput: React.FC<IProps> = ({
  autoComplete,
  id,
  label,
  register,
  required,
  placeholder,
  submitButton = false,
  type,
  onSubmit,
}) => {
  return (
    <div className={styles.textInput}>
      {label && <label className={styles.label}>{label}</label>}
      <div className={styles.textInputField}>
        {register ? (
          <input
            autoComplete={autoComplete}
            className={styles.input}
            id={id}
            type={type}
            {...register(label, { required })}
          />
        ) : (
          <input
            autoComplete={autoComplete}
            className={styles.input}
            id={id}
            placeholder={placeholder}
            type={type}
          />
        )}
        {submitButton && (
          <TextFieldButton onSubmit={onSubmit}>Post</TextFieldButton>
        )}
      </div>
    </div>
  );
};
