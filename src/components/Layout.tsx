import Header from "./Header";
import NavBar from "./NavBar";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { useTheme } from "@mui/material";

type AppLayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: AppLayoutProps) => {
  const { pathname } = useRouter();
  const theme = useTheme();

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
      <div className="main">{children}</div>
      <style jsx global>{`
        body {
          position: relative;
          max-width: 30rem;
          height: 100vh;
          background: ${theme.palette.background};
          color: ${theme.palette.text};
        }
      `}</style>
      <style jsx>{`
        .main {
          height: calc(100vh - 60px);
          overflow-y: scroll;
        }

        .main::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </>
  );
};

export default Layout;
