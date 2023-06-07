import React from "react";
import clsx from "clsx";

import { Button, Text } from "..";

import utilStyles from "../../styles/utils.module.css";
import styles from "./NavButton.module.scss";

interface IProps {
  icon: JSX.Element;
  onClick: (route?: string) => void;
  title: string;
  route?: string;
}

export const NavButton: React.FC<IProps> = (props) => {
  const { icon, onClick, route, title } = props;

  const handleClick = () => {
    if (route) {
      onClick(route);
    } else {
      onClick();
    }
  };

  return (
    <div className={styles.NavButton}>
      <Button onClick={handleClick} textButton>
        <div className={clsx(utilStyles.marginRightMd, utilStyles.flex)}>
          {icon}
        </div>

        <Text uppercase fontSize="small" className={utilStyles.hideMobile}>
          {title}
        </Text>
      </Button>
    </div>
  );
};

export default NavButton;
