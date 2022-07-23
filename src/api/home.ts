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

const db = getFirestore(app);
const storage = getStorage();

interface ImageToStorageState {
  file: File;
  uid: string;
}

export const postImageToStorage = async ({
  file,
  uid,
}: ImageToStorageState) => {
  const storage = getStorage();
  const storageRef = ref(storage, `homeBannerImage/${file.name + Date.now()}`);

  await uploadBytes(storageRef, file).then((snapshot) => {
    postImageUrlWithUID(snapshot.metadata.fullPath, uid);
  });
};

export const postImageUrlWithUID = async (file: string, uid: string) => {
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

export const getHomeBannerImageByUID = async (uid: string): Promise<string> => {
  const homeBannerImageRef = collection(db, "homeBannerImage");
  const q = query(homeBannerImageRef, where("uid", "==", uid));
  const querySnapshot = await getDocs(q);

  const docDataList = querySnapshot.docs
    .map((doc) => doc.data())
    .filter((docData) => docData?.date)
    .sort((d1, d2) => d2.date - d1.date);

  if (!docDataList.length) {
    return "";
  }
  const recentDocData = docDataList[0];
  const url = getDownloadURL(ref(storage, recentDocData.file));
  return url;
};
