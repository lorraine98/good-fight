import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useRecoilValue } from "recoil";
import { authUserState } from "../atoms/user";
import AuthPage from "../pages/auth";

interface Props {
  children: React.ReactNode;
}

const PrivateRoute = ({ children }: Props) => {
  const isAuthenticated = useRecoilValue(authUserState);
  const { pathname, push } = useRouter();

  const isloginRequiredPage =
    pathname === "/my-fights" || pathname === "/my-page";

  if (!isAuthenticated && isloginRequiredPage) {
    push("/auth");
    return <AuthPage />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
