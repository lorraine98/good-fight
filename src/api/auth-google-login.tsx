import { GoogleAuthProvider, getAuth, signInWithRedirect } from "firebase/auth";
import { app } from "../shared/FireBase";

export const loginGoogle = () => {
  const provider = new GoogleAuthProvider();
  const auth = getAuth(app);
  signInWithRedirect(auth, provider);
};
