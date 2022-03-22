import { getAuth, getRedirectResult } from "firebase/auth";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { authUserState } from "../../atoms/user";
import { loginGoogle } from "./api/auth-google-login";

export default function AuthPage() {
  const auth = getAuth();
  const { push } = useRouter();
  const setIsAuthenticated = useSetRecoilState(authUserState);

  useEffect(() => {
    getRedirectResult(auth)
      .then((result) => {
        const user = result?.user;
        setIsAuthenticated(true);
        user && push("/");
      })
      .catch((error) => {
        console.error(error.code);
      });
  }, [auth]);

  const handleClick = () => {
    loginGoogle();
  };

  return (
    <>
      <button onClick={handleClick}>google login</button>
    </>
  );
}
