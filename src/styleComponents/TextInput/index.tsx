import React, { ReactNode } from "react";

import styles from "./TextInput.module.scss";



interface IProps {
    name: string;
    required?: boolean;
    placeholder?: string
    type: "email" | "text" | "phone" | "code" | "password";
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    icon?: ReactNode;
}

export const TextInput: React.FC<IProps> = (props) => {
    const { icon, name, required = false, placeholder, type, onChange } = props;



    return (
        <div className={styles.TextInput}>
            {icon}
            <input name={name} placeholder={placeholder} type={type} required={required} onChange={onChange} />
        </div>
    );
};

export default TextInput;
