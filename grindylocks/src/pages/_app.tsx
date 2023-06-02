import { type AppType } from "next/app";
import { api } from "grindylocks/utils/api";
import "grindylocks/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default api.withTRPC(MyApp);
