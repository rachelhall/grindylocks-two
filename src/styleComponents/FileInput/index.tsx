import React from "react";

import styles from "./FileInput.module.scss";
import Text from "../Text";
import { type UseFormRegister } from "react-hook-form";



interface IProps {
    label?: string;

    id: string;
    register: UseFormRegister<any>
    name: string;
    required?: boolean;
}


export const FileInput: React.FC<IProps> = (props) => {
    const { id, label = "Choose File", register, required, name } = props;
    return (
        <div className={styles.FileInput}>
            <label>
                <Text >{label}</Text>
                <input id={id} {...register(name, { required })} type="file" />
            </label>
        </div>
    );
};

export default FileInput;
