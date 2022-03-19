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
          max-width: 30rem;
          height: 100vh;
          background: ${theme.colors.background};
          color: ${theme.colors.text};
        }
      `}</style>
    </>
  );
};

export default Layout;
