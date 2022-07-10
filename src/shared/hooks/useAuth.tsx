import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { authUserState } from "src/atoms/user";
import { app } from "../FireBase";

export const useAuth = () => {
  const [isAuthorized, setIsAuthorized] = useRecoilState(authUserState);
  const auth = getAuth(app);
  const { currentUser } = auth;

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log("call onAuthStateChanged");
      if (user) {
        setIsAuthorized(true);
      } else {
        setIsAuthorized(false);
      }
    });
  }, []);

  return { isAuthorized, currentUser };
};
