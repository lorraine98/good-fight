import Header from "./Header";
import NavBar from "./NavBar";
import React, { useState } from "react";
import { useTheme } from "@emotion/react";

type AppLayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: AppLayoutProps) => {
  const theme = useTheme();
  return (
    <>
      <Header />
      <div>{children}</div>
      <NavBar />
      <style jsx global>{`
        body {
          position: relative;
          max-width: 42vw;
          height: 100vh;
          background: ${theme.colors.background};
          color: ${theme.colors.black};
        }
      `}</style>
    </>
  );
};

export default Layout;
