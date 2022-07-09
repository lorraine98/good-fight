import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import Head from "next/head";
import Layout from "../components/Layout";
import "../styles/globals.css";
import PrivateRoute from "../route/PrivateRoute";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { getDesignToken } from "../styles/theme";
import CssBaseLine from "@mui/material/CssBaseline";
import { QueryClient, QueryClientProvider } from "react-query";
import { SnackbarProvider } from "notistack";

const App = ({ Component, pageProps }: AppProps) => {
  const theme = createTheme(getDesignToken("light"));
  const queryClient = new QueryClient();

  return (
    <>
      <CssBaseLine />
      <Head>
        <link rel="shortcut icon" href="/static/favicon.ico" />
        <title>good fight</title>
      </Head>
      <SnackbarProvider>
        <RecoilRoot>
          <ThemeProvider theme={theme}>
            <QueryClientProvider client={queryClient}>
              <Layout>
                <PrivateRoute>
                  <Component {...pageProps} />
                </PrivateRoute>
              </Layout>
            </QueryClientProvider>
          </ThemeProvider>
        </RecoilRoot>
      </SnackbarProvider>
    </>
  );
};

export default App;
