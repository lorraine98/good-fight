import { GoogleAuthProvider, getAuth, signInWithRedirect } from "firebase/auth";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import { app } from "src/shared/FireBase";
import shortUUID from "short-uuid";

const db = getFirestore(app);
const uuid = shortUUID.generate();

export const loginGoogle = () => {
  const provider = new GoogleAuthProvider();
  const auth = getAuth(app);
  signInWithRedirect(auth, provider);
};

interface UserDataState {
  name: string;
  linkedUser: string;
  linkCode: string;
}

export const createUser = async (
  UID: string,
): Promise<UserDataState | undefined> => {
  const data = await getUser(UID);
  if (data) {
    return;
  }
  try {
    const userData = {
      name: "test",
      linkedUser: "",
      linkCode: uuid,
    };
    await setDoc(doc(db, "users", `${UID}`), userData);

    return userData;
  } catch (error) {}
};

export const getUser = async (UID: string) => {
  const docSnap = await getDoc(doc(db, "users", `${UID}`));

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    return null;
  }
};
