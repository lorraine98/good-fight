import { app } from "../shared/FireBase";
import { addDoc, collection, getFirestore } from "firebase/firestore";

const db = getFirestore(app);

export const postMyFightsForm = async ({
  content,
  date,
  feedback,
  keyword,
  reason,
  solved,
  target,
}: myFightsProps) => {
  try {
    const docRef = await addDoc(collection(db, "myFights"), {
      content,
      date,
      feedback,
      keyword,
      reason,
      solved,
      target,
    });
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export interface myFightsProps {
  content: string;
  date: string;
  feedback: string;
  keyword: string;
  reason: string;
  solved: string;
  target: string;
}
