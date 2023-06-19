import React, { useContext } from "react";

import styles from "./Header.module.scss";
import { Button, Text } from "grindylocks/styleComponents";
import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import Image from 'next/image'

import NavBar from "../NavBar";
import Link from "next/link";
import Avatar from "grindylocks/styleComponents/Avatar";
import { ModalContext } from "grindylocks/lib/context/ModalContext";
import { NewAccountForm } from "../NewAccountForm";
interface IProps {

}

export const Header: React.FC<IProps> = (props) => {
    const { } = props;
    const { user, isSignedIn } = useUser();

    const { handleModal } = useContext(ModalContext);

    const handleSignUp = () => {
        handleModal(<NewAccountForm />)
    }


    return (
        <header className={styles.Header}>
            <Link href="/">
                <Text color="accent" fontWeight="bold" fontSize="large">_/\___ grindylocks</Text>
            </Link>
            <NavBar />
            <div className={styles.account}>
                {user && <Avatar src={user.profileImageUrl} username={user.username ?? ""} />}
                <Button onClick={handleSignUp}>Sign Up</Button>
                {!isSignedIn ? <SignInButton /> : <SignOutButton />}
            </div>

        </header>
    );
};

export default Header;
