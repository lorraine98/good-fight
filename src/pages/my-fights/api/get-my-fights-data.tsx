import {
  collection,
  getFirestore,
  getDocs,
  orderBy,
  query,
  CollectionReference,
} from "firebase/firestore";
import { app } from "src/shared/FireBase";
import { postMyFightsProps } from "./post-my-fights-form";

const db = getFirestore(app);

const getMyFightsData = async (): Promise<getMyFightsProps[]> => {
  const myFightsRef = collection(
    db,
    "myFights",
  ) as CollectionReference<getMyFightsProps>;

  const myFightsQuery = query(myFightsRef, orderBy("data.date", "desc"));
  const result = await getDocs(myFightsQuery);

  return result.docs.map((doc) => ({ ...doc.data(), docId: doc.id }));
};

export default getMyFightsData;

export interface getMyFightsProps {
  user: {
    uid: string;
  };
  data: postMyFightsProps;
  docId: string;
}
