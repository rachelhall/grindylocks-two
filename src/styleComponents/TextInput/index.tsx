import React from "react";
import type { HTMLInputTypeAttribute } from 'react';
import type { UseFormRegister } from "react-hook-form";
import type { Path } from "react-hook-form";


import styles from "./TextInput.module.scss";
import TextFieldButton from "../TextFieldButton";

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
