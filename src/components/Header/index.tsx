import React from "react";
import fetchJson from "lib/fetchJson";
import useUser from "lib/hooks/useUser";
import { useRouter } from "next/router";

import styles from "./Header.module.scss";

interface IProps {}

export const Header: React.FC<IProps> = (props) => {
  const {} = props;

  const { mutateUser } = useUser();
  const router = useRouter();

  return (
    <div className={styles.Header}>
      <a
        href={"/api/logout"}
        onClick={async (e) => {
          e.preventDefault();
          mutateUser(await fetchJson("/api/logout", { method: "POST" }), false);
          router.push("/login");
        }}
      >
        Logout
      </a>
    </div>
  );
};

export default Header;
