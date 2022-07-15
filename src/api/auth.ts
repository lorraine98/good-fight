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

export const getLinkCode = async (UID: string) => {
  const data = await getUser(UID);
  return data?.linkCode;
};

export const setUser = async (UID: string) => {
  const data = await getUser(UID);
  if (data) {
    return;
  }
  try {
    await setDoc(doc(db, "users", `${UID}`), {
      name: "test",
      linkedUser: "",
      linkCode: uuid,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getUser = async (UID: string) => {
  const docRef = doc(db, "users", `${UID}`);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    return null;
  }
};
