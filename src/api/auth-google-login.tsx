import { GoogleAuthProvider, getAuth, signInWithRedirect } from "firebase/auth";
import { app } from "src/shared/FireBase";

export const loginGoogle = () => {
  const provider = new GoogleAuthProvider();
  const auth = getAuth(app);
  signInWithRedirect(auth, provider);
};

export const getUID = () => {
  try {
    return getAuth(app).currentUser?.uid;
  } catch (error) {
    console.log(error);
  }
};
