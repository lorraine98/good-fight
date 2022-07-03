import {
  addDoc,
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { app } from "src/shared/FireBase";
import { getUID } from "./auth-google-login";

const db = getFirestore(app);
const storage = getStorage();

export const postImageToStorage = async (file: File) => {
  const storage = getStorage();
  const storageRef = ref(storage, `homeBannerImage/${file.name + Date.now()}`);

  await uploadBytes(storageRef, file).then((snapshot) => {
    postImageUrlWithUID(snapshot.metadata.fullPath);
  });
};

export const postImageUrlWithUID = async (file: string) => {
  const uid = getUID();
  try {
    await addDoc(collection(db, "homeBannerImage"), {
      uid,
      file,
      date: Date.now(),
    });
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const getHomeBannerImageByUID: () => Promise<
  string | undefined
> = async () => {
  const uid = getUID();
  const homeBannerImageRef = collection(db, "homeBannerImage");
  const q = query(homeBannerImageRef, where("uid", "==", uid));
  const querySnapshot = await getDocs(q);

  const docDataList = querySnapshot.docs
    .map((doc) => doc.data())
    .filter((docData) => docData?.date)
    .sort((d1, d2) => d2.date - d1.date);

  if (!docDataList.length) {
    return;
  }
  const recentDocData = docDataList[0];

  return getDownloadURL(ref(storage, recentDocData.file));
};