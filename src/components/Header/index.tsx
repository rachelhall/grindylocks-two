import React, { useContext } from "react";

import styles from "./Header.module.scss";
import { Button, Text } from "grindylocks/styleComponents";
import { SignInButton, SignOutButton, SignUpButton, useUser } from "@clerk/nextjs";


import NavBar from "../NavBar";
import Link from "next/link";
import Avatar from "grindylocks/styleComponents/Avatar";
import { useMediaQuery } from "grindylocks/lib/hooks/useMediaQuery";
interface IProps {

}

export const Header: React.FC<IProps> = (props) => {
    const { } = props;
    const { user, isSignedIn } = useUser();





    return (
        <header className={styles.Header}>
            <Link href="/">
                <Text className={styles.logo} color="accent" fontWeight="bold" fontSize="large">_/\___ grindylocks</Text>
            </Link>
            <NavBar />
            <div className={styles.account}>
                {user && <Link href={`/profile/@${user.username}`}>
                    <Avatar src={user.profileImageUrl} username={user.username ?? ""} />
                </Link>}
                {!isSignedIn ? <span><SignInButton /> <SignUpButton /></span> : <SignOutButton />}
            </div>

        </header>
    );
};

export default Header;
