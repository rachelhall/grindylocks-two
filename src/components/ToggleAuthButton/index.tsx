import React from "react";
import { BsDoorOpen } from "react-icons/bs";
import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";
import { Text } from "styleComponents";

import utilStyles from "../../styles/utils.module.css";
import styles from "./ToggleAuthButton.module.scss";

interface IProps {}

export const ToggleAuthButton: React.FC<IProps> = (props) => {
  const {} = props;

  const { user } = useUser();

  return (
    <div>
      {user ? (
        <Link href="/api/auth/logout">
          <a className={styles.ToggleAuthButton}>
            <div className={utilStyles.marginRightMd}>
              <BsDoorOpen
                style={{
                  height: "1.5rem",
                  width: "1.5rem",
                  color: "var(--light)",
                }}
              />
            </div>
            <Text>Logout</Text>
          </a>
        </Link>
      ) : (
        <Link href="/api/auth/login">
          <a className={styles.ToggleAuthButton}>
            <div className={utilStyles.marginRightMd}>
              <BsDoorOpen
                style={{
                  height: "1.5rem",
                  width: "1.5rem",
                  color: "var(--light)",
                }}
              />
            </div>
            <Text>Login</Text>
          </a>
        </Link>
      )}
    </div>
  );
};

export default ToggleAuthButton;
