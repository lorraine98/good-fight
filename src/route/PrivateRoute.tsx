import { useRouter } from "next/router";
import React from "react";
import { useAuth } from "src/shared/hooks/useAuth";
import AuthPage from "../pages/auth";

interface Props {
  children: React.ReactNode;
}

const PrivateRoute = ({ children }: Props) => {
  const { pathname } = useRouter();
  const { hasAuth } = useAuth();

  const isLoginRequiredPage =
    pathname !== "/home" && pathname !== "/your-fights";

  if (!hasAuth && isLoginRequiredPage) {
    return <AuthPage />;
  }

  if (hasAuth || !isLoginRequiredPage) {
    return <>{children}</>;
  }

  return <h1>is loading...</h1>;
};

export default PrivateRoute;
