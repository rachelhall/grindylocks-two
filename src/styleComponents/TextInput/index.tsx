import React from "react";
import { type UseFormRegister } from "react-hook-form";

import styles from "./TextInput.module.scss";



interface IProps {
    name: string;
    required?: boolean;
    placeholder?: string
    register: UseFormRegister<any>
    type: "email" | "text" | "phone" | "code" | "password";
}

export const TextInput: React.FC<IProps> = (props) => {
    const { name, required = false, placeholder, register, type } = props;



    return (
        <div className={styles.TextInput}>
            <input {...register(name, { required })} placeholder={placeholder} type={type} />
        </div>
    );
};

export default TextInput;
