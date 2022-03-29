import { GoogleAuthProvider, getAuth, signInWithRedirect } from "firebase/auth";
import { app } from "../shared/FireBase";

const provider = new GoogleAuthProvider();
const auth = getAuth(app);

export const loginGoogle = () => {
  signInWithRedirect(auth, provider);
};
