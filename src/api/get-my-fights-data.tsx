import { app } from "../shared/FireBase";
import {
  collection,
  getFirestore,
  getDocs,
  orderBy,
  query,
  CollectionReference,
} from "firebase/firestore";
import { myFightsProps } from "./post-my-fights-form";

const db = getFirestore(app);

const getMyFightsData = async (): Promise<getMyFightsProps[]> => {
  const myFightsRef = collection(
    db,
    "myFights",
  ) as CollectionReference<getMyFightsProps>;

  const myFightsQuery = query(myFightsRef, orderBy("data.date", "desc"));
  const result = await getDocs(myFightsQuery);

  return result.docs.map((doc) => ({ ...doc.data() }));

  //todo: handle error
};

export default getMyFightsData;

export interface getMyFightsProps {
  user: {
    uid: string;
  };
  data: myFightsProps;
}
