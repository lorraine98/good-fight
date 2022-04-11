import {
  doc,
  getDoc,
  collection,
  getFirestore,
  getDocs,
  orderBy,
  query,
  CollectionReference,
  DocumentReference,
} from "firebase/firestore";
import { app } from "src/shared/FireBase";
import { postMyFightsProps } from "./post-my-fights-data";

const db = getFirestore(app);

export const getMyFightsAllData = async (): Promise<getMyFightsProps[]> => {
  const myFightsRef = collection(
    db,
    "myFights",
  ) as CollectionReference<getMyFightsProps>;

  const myFightsQuery = query(myFightsRef, orderBy("data.date", "desc"));
  const result = await getDocs(myFightsQuery);

  return result.docs.map((doc) => ({ ...doc.data(), docId: doc.id }));
};

export const getMyFightsData = async (id: string) => {
  const myFightsRef = doc(db, "myFights", id);
  const result = await getDoc(myFightsRef);

  return result.data();
};

export interface getMyFightsProps {
  user: {
    uid: string;
  };
  data: postMyFightsProps;
  docId: string;
}
