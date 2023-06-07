import React, { useContext } from "react";
import { AiOutlineHome, AiOutlineSearch } from "react-icons/ai";
import { BsFillTreeFill } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { IoIosCreate } from "react-icons/io";
import { ModalContext } from "lib/context/ModalContext";
import fetchJson from "lib/fetchJson";
import { useRouter } from "next/router";
import NavButton from "styleComponents/NavButton";

import NewPostForm from "components/NewPostForm";
import ToggleAuthButton from "components/ToggleAuthButton";

import { Text } from "../../styleComponents";

import utilStyles from "../../styles/utils.module.css";
import styles from "./SideNav.module.scss";

interface IProps {}

export const SideNav: React.FC<IProps> = (props) => {
  const {} = props;

  const router = useRouter();

  const handleNavigate = (route?: string) => {
    router.push(`/${route}`);
  };

  const { handleModal } = useContext(ModalContext);

  const handleCreate = () => {
    handleModal(<NewPostForm />);
  };
  return (
    <div className={styles.SideNav}>
      <Text className={utilStyles.hideMobile}>Grindylocks</Text>
      <nav>
        <NavButton
          icon={
            <AiOutlineHome
              style={{
                height: "1.5rem",
                width: "1.5rem",
                color: "var(--light)",
              }}
            />
          }
          onClick={handleNavigate}
          route="posts"
          title="Home"
        />
        <NavButton
          icon={
            <AiOutlineSearch
              style={{
                height: "1.5rem",
                width: "1.5rem",
                color: "var(--light)",
              }}
            />
          }
          onClick={handleNavigate}
          route="search"
          title="Search"
        />
        <NavButton
          icon={
            <IoIosCreate
              style={{
                height: "1.5rem",
                width: "1.5rem",
                color: "var(--light)",
              }}
            />
          }
          onClick={handleCreate}
          title="Create"
        />
        <NavButton
          icon={
            <BsFillTreeFill
              style={{
                height: "1.5rem",
                width: "1.5rem",
                color: "var(--light)",
              }}
            />
          }
          onClick={handleNavigate}
          route="parks"
          title="Parks"
        />
        <NavButton
          icon={
            <CgProfile
              style={{
                height: "1.5rem",
                width: "1.5rem",
                color: "var(--light)",
              }}
            />
          }
          onClick={handleNavigate}
          route="account"
          title="Profile"
        />
      </nav>

      <div className={styles.logout}>
        <ToggleAuthButton />
      </div>
    </div>
  );
};

export default SideNav;
