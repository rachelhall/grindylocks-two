import React from "react";

import styles from "./{{pascalCase name}}.module.scss";

interface IProps {

}

export const {{pascalCase name}}: React.FC<IProps> = (props) => {
    const { } = props;

    return (
        <div className={ styles.{{pascalCase name}} }>

        </div>
    );
};

export default {{pascalCase name}};
