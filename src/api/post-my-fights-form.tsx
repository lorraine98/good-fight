import { app } from "../shared/FireBase";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const db = getFirestore(app);
const auth = getAuth();
const uid = auth.currentUser?.uid ?? "";

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
    await addDoc(collection(db, "myFights"), {
      user: {
        uid,
      },
      data: {
        content,
        date,
        feedback,
        keyword,
        reason,
        solved,
        target,
      },
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
