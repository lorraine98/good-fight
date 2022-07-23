import type { AppProps } from "next/app";
import Head from "next/head";
import Layout from "../components/Layout";
import "../styles/globals.css";
import PrivateRoute from "../route/PrivateRoute";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { getDesignToken } from "../styles/theme";
import CssBaseLine from "@mui/material/CssBaseline";
import { QueryClient, QueryClientProvider } from "react-query";
import { SnackbarProvider } from "notistack";
import { AuthProvider } from "src/shared/hooks/useAuth";

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
      <AuthProvider>
        <SnackbarProvider>
          <ThemeProvider theme={theme}>
            <QueryClientProvider client={queryClient}>
              <Layout>
                <PrivateRoute>
                  <Component {...pageProps} />
                </PrivateRoute>
              </Layout>
            </QueryClientProvider>
          </ThemeProvider>
        </SnackbarProvider>
      </AuthProvider>
    </>
  );
};

export default App;
