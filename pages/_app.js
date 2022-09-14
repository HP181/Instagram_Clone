import { SessionProvider } from "next-auth/react";
import "../styles/globals.css";
import GlobalState from "./Context/GlobalState";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session} refetchInterval={5 * 60}>
      <GlobalState>
        <Component {...pageProps} />
      </GlobalState>
    </SessionProvider>
  );
}

export default MyApp;
