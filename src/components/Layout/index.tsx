import React, { type PropsWithChildren } from "react";

import styles from "./Layout.module.scss";
import { Header } from "../Header";
import { Toaster } from "react-hot-toast";
import Footer from "../Footer";
import { ModalProvider } from "grindylocks/lib/context/ModalContext";
import { Roboto } from 'next/font/google'

const roboto = Roboto({
    weight: ['400', '700', '900'],
    style: ['normal', 'italic'],
    subsets: ['latin'],
    display: 'swap',
})


export const Layout: React.FC<PropsWithChildren> = ({ children }) => {


    return (
        <ModalProvider>
            <main className={roboto.className}>
                <Header />
                <Toaster position="bottom-center" />
                <div className={styles.Layout}>
                    {children}
                </div>
                <Footer />
            </main>
        </ModalProvider>
    );
};

export default Layout;
