import { useRouter } from "next/router";
import React from "react";
import { useAuth } from "src/shared/hooks/useAuth";
import AuthPage from "../pages/auth";

interface Props {
  children: React.ReactNode;
}

const PrivateRoute = ({ children }: Props) => {
  const { pathname } = useRouter();
  const { uid } = useAuth();

  const isLoginRequiredPage =
    pathname !== "/home" && pathname !== "/your-fights";

  if (!uid && isLoginRequiredPage) {
    return <AuthPage />;
  }

  if (uid || !isLoginRequiredPage) {
    return <>{children}</>;
  }

  return <h1>is loading...</h1>;
};

export default PrivateRoute;
