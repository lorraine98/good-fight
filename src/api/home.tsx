import { getAuth } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { app } from "src/shared/FireBase";

const db = getFirestore(app);
const auth = getAuth();
const uid = auth.currentUser?.uid ?? "";

export const postImageToStorage = async (file: Blob) => {
  const storage = getStorage();
  const storageRef = ref(storage, `homeBannerImage/${file.name + Date.now()}`);

  await uploadBytes(storageRef, file).then((snapshot) => {
    postImageUrlWithUID(snapshot.metadata.fullPath);
  });
};

export const postImageUrlWithUID = async (file: string) => {
  console.log(file);
  try {
    await addDoc(collection(db, "homeBannerImage"), {
      uid,
      file,
    });
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};
