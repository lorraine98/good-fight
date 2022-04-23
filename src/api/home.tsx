import { getAuth } from "firebase/auth";
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
const auth = getAuth();

export const postImageToStorage = async (file: Blob) => {
  const storage = getStorage();
  const storageRef = ref(storage, `homeBannerImage/${file.name + Date.now()}`);

  await uploadBytes(storageRef, file).then((snapshot) => {
    postImageUrlWithUID(snapshot.metadata.fullPath);
  });
};

export const postImageUrlWithUID = async (file: string) => {
  const uid = auth.currentUser?.uid ?? "";
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

export const getHomeBannerImageByUID = async () => {
  const uid = auth.currentUser?.uid ?? "";
  const homeBannerImageRef = collection(db, "homeBannerImage");
  const q = query(homeBannerImageRef, where("uid", "==", uid));
  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    console.log(doc.data().file);
    getDownloadURL(ref(storage, doc.data().file))
      .then((url) => {
        const xhr = new XMLHttpRequest();
        xhr.responseType = "blob";
        xhr.onload = (event) => {
          const blob = xhr.response;
          console.log(blob);
        };
        xhr.open("GET", url);
        xhr.send();
      })
      .catch((error) => {
        console.error(error);
      });
  });
};
