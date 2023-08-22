import React, { useContext, useState } from "react";

import styles from "./Header.module.scss";
import { Text } from "grindylocks/styleComponents";
import {
  SignInButton,
  SignOutButton,
  useUser,
} from "@clerk/nextjs";

import NavBar from "../NavBar";
import Link from "next/link";
import Avatar from "grindylocks/styleComponents/Avatar";
import { AccountContext } from "grindylocks/lib/context/accountContext";
import DropdownMenu from "grindylocks/styleComponents/DropdownMenu";
import { IMenuItem } from "grindylocks/styleComponents/MenuItem";
interface IProps { }

export const Header: React.FC<IProps> = (props) => {
  const { } = props;

  const [showMenu, setShowMenu] = useState(false)
  const account = useContext(AccountContext);


  const { isSignedIn } = useUser();

  const handleAvatarClick = () => {
    setShowMenu(!showMenu)
  }

  const headerDropDownMenuItems: IMenuItem[] = [
    { component: <Link href={`/profile/@${account?.username}`}><Text>Profile</Text></Link> },
    { component: <Link href={`/messages`}><Text>Messages</Text></Link> },
    { component: isSignedIn ? <SignOutButton /> : <SignInButton /> }
  ]

  return (
    <header className={styles.Header}>
      <Link href="/">
        <Text
          className={styles.logo}
          color="accent"
          fontWeight="bold"
          fontSize="large"
        >
          _/\___ grindylocks
        </Text>
      </Link>
      <NavBar />
      <div className={styles.account}>
        <button onClick={handleAvatarClick}>

          {account && (
            <Link href={`/profile/@${account?.username}`}>
              <Avatar
                src={account?.profilePicture ?? ""}
                className={styles.avatar}
              />
            </Link>
          )}
        </button>
        <DropdownMenu items={headerDropDownMenuItems} className={styles.headerDropdownMenu} />
      </div>
    </header>
  );
};

export default Header;
