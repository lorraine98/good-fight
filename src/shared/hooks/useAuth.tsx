import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRecoilState } from "recoil";
import { authUserState } from "src/atoms/user";

export const useAuth = () => {
  const [isAuthorized, setIsAuthorized] = useRecoilState(authUserState);
  const auth = getAuth();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setIsAuthorized(true);
    } else {
      setIsAuthorized(false);
    }
  });

  return isAuthorized;
};
