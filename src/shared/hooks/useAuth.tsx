import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "../FireBase";

export const useAuth = () => {
  const auth = getAuth(app);
  const { currentUser } = auth;
  const uid = currentUser?.uid ?? "";

  onAuthStateChanged(auth, (user) => {
    if (user) {
      //login logic
    } else {
      // logout logic
    }
  });

  return { currentUser, uid };
};
