import React from "react";
import clsx from "clsx";
import Link from "next/link";

import styles from "./Button.module.scss";

interface IProps extends React.HTMLProps<HTMLButtonElement> {
  ariaLabel?: string;
  className?: string;
  color?: "primary" | "secondary";
  currentTabLinkTo?: string;
  inline?: boolean;
  isLoading?: boolean;
  linkTo?: string;
  onClick?: () => void;
  buttonSize?: "small" | "medium" | "large" | "full" | "fit" | undefined;
  borderRadius?: 1 | 2 | 3 | "none";
  textButton?: boolean;
  type?: "submit" | "reset" | "button";
}

export const Button: React.FC<IProps> = (props) => {
  const {
    children,
    disabled,
    linkTo,
    onClick,
    type = "button",
  } = props;

  const handleOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!!onClick && !disabled) {
      onClick();
    }
  };

  if (!!linkTo && !disabled) {
    return <Link href={linkTo}>{children}</Link>;
  }

  const mainClass = clsx(styles.button);

  return (
    <button className={mainClass} onClick={handleOnClick} type={type}>
      {children}
    </button>
  );
};
