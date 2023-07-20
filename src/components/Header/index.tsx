import React, { useContext } from "react";

import styles from "./Header.module.scss";
import { Text } from "grindylocks/styleComponents";
import { SignInButton, SignOutButton, SignUpButton, useUser } from "@clerk/nextjs";


import NavBar from "../NavBar";
import Link from "next/link";
import Avatar from "grindylocks/styleComponents/Avatar";
import { AccountContext } from "grindylocks/lib/context/accountContext";
interface IProps {

}

export const Header: React.FC<IProps> = (props) => {
    const { } = props;
    const account = useContext(AccountContext)


    const { isSignedIn } = useUser()



    return (
        <header className={styles.Header}>
            <Link href="/">
                <Text className={styles.logo} color="accent" fontWeight="bold" fontSize="large">_/\___ grindylocks</Text>
            </Link>
            <NavBar />
            <div className={styles.account}>
                {account && <Link href={`/profile/@${account?.username}`}>
                    <Avatar initials={`${account?.first_name?.[0]} ${account?.last_name?.[0]}`} src={account?.profilePicture ?? ""} username={account.username ?? ""} />
                </Link>}
                {!isSignedIn ? <span><SignInButton /> <SignUpButton /></span> : <SignOutButton />}
            </div>

        </header>
    );
};

export default Header;
