import Header from "./Header";
import NavBar from "./NavBar";
import React, { useState } from "react";
import { useTheme } from "@emotion/react";
import { useRouter } from "next/router";

type AppLayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: AppLayoutProps) => {
  const theme = useTheme();
  const { pathname } = useRouter();

  const showLayoutByPathname = () => {
    switch (pathname) {
      case "/auth":
        return;
      default:
        return (
          <>
            <Header />
            <NavBar />
          </>
        );
    }
  };

  return (
    <>
      {showLayoutByPathname()}
      <div>{children}</div>
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
