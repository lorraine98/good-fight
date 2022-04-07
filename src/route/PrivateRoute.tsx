import { useRouter } from "next/router";
import React from "react";
import { useAuth } from "src/pages/auth/hook/useAuth";
import AuthPage from "../pages/auth";

interface Props {
  children: React.ReactNode;
}

const PrivateRoute = ({ children }: Props) => {
  const { pathname } = useRouter();
  const isAuthorized = useAuth();

  const isloginRequiredPage =
    pathname !== "/home" && pathname !== "/your-fights";

  if (!isAuthorized && isloginRequiredPage) {
    return <AuthPage />;
  }

  if (isAuthorized || (!isAuthorized && !isloginRequiredPage)) {
    return <>{children}</>;
  }

  return <h1>is loading...</h1>;
};

export default PrivateRoute;
