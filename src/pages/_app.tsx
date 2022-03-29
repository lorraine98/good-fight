import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import Head from "next/head";
import Layout from "../components/Layout";
import "../styles/globals.css";
import PrivateRoute from "../route/PrivateRoute";
import { ThemeProvider } from "@mui/material";
import { getDesignToken } from "../styles/theme";
import CssBaseLine from "@mui/material/CssBaseline";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <CssBaseLine />
      <Head>
        <link rel="shortcut icon" href="/static/favicon.ico" />
        <title>good fight</title>
      </Head>
      <RecoilRoot>
        <ThemeProvider theme={getDesignToken("light")}>
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
