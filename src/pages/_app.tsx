import { type AppType } from "next/app";
import { api } from "grindylocks/utils/api";
import { ClerkProvider } from "@clerk/nextjs";
import Layout from "../components/Layout"

import "grindylocks/styles/globals.scss";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ClerkProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);
