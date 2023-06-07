import React from "react";
import { ModalProvider } from "lib/context/ModalContext";

import SideNav from "components/SideNav";

import styles from "./Layout.module.scss";

interface IProps {
  children: JSX.Element;
}

export const Layout: React.FC<IProps> = (props) => {
  const { children } = props;

  return (
    <ModalProvider>
      <div className={styles.Layout}>
        <SideNav />
        <main className={styles.main}>{children}</main>
      </div>
    </ModalProvider>
  );
};

export default Layout;
