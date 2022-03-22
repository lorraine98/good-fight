import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import Head from "next/head";
import Layout from "../components/Layout";
import "../styles/globals.css";
import { ThemeProvider } from "@emotion/react";
import { lightTheme } from "../styles/theme";
import PrivateRoute from "../route/PrivateRoute";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/static/favicon.ico" />
        <title>good fight</title>
      </Head>
      <RecoilRoot>
        <ThemeProvider theme={lightTheme}>
          <Layout>
            <PrivateRoute>
              <Component {...pageProps} />
            </PrivateRoute>
          </Layout>
        </ThemeProvider>
      </RecoilRoot>
    </>
  );
};

export default App;
