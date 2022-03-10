import Header from "./Header";
import NavBar from "./NavBar";
import React, { useState } from "react";

type AppLayoutProps = {
    children: React.ReactNode;
};

const Layout = ({ children }: AppLayoutProps) => {
    return (
        <>
            <Header />
            <div>{children}</div>
            <NavBar />
        </>
    );
};

export default Layout;
