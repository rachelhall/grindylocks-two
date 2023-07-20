import React, { type PropsWithChildren } from "react";

import styles from "./Layout.module.scss";
import { Header } from "../Header";
import { Toaster } from "react-hot-toast";
import Footer from "../Footer";
import { ModalProvider } from "grindylocks/lib/context/ModalContext";
import { Roboto } from 'next/font/google'
import { useUser } from "@clerk/nextjs";
import { api } from "grindylocks/utils/api";
import { AccountContext } from "grindylocks/lib/context/accountContext";
import clsx from "clsx";

const roboto = Roboto({
    weight: ['400', '700', '900'],
    style: ['normal', 'italic'],
    subsets: ['latin'],
    display: 'swap',
})

export const Layout: React.FC<PropsWithChildren> = ({ children }) => {
    const { user } = useUser();

    const { data } = api.account.getAccountByUsername.useQuery({ username: user?.username ?? "" })


    const account = data ?? null;

    const mainClass = clsx(roboto.className, styles.main)

    return (
        <AccountContext.Provider value={account}>
            <ModalProvider>
                <main className={mainClass}>
                    <Header />
                    <Toaster position="bottom-center" />
                    <div className={styles.Layout}>
                        {children}
                    </div>
                    <Footer />
                </main>
            </ModalProvider>
        </AccountContext.Provider>
    );
};

export default Layout;
