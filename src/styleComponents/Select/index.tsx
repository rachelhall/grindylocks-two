import React from "react";

import styles from "./Select.module.scss";
import { type UseFormRegister } from "react-hook-form";

interface IProps {
    register: UseFormRegister<any>;
    options?: {
        key: string;
        name: string;
        value: string;
    }[];
    name: string;
}

export const Select: React.FC<IProps> = (props) => {
    const { register, options, name, ...rest } = props;

    if (!options) return;

    return (
        <select defaultValue={options[0]?.value} className={styles.Select} {...register(name)} {...rest}>
            {options.map(option => <option key={option.key} value={option.value}>{option.name}</option>)}
        </select>
    );
};

export default Select;
