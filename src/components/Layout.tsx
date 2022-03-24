import Header from "./Header";
import NavBar from "./NavBar";
import React, { useState } from "react";
import { lightTheme as theme } from "../styles/theme";
import { useRouter } from "next/router";

type AppLayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: AppLayoutProps) => {
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
