import { getAuth } from "firebase/auth";
import { doc, getFirestore, updateDoc } from "firebase/firestore";
import { fightStatusType } from "src/shared/components/MyFightsStatusIcon";
import { app } from "src/shared/FireBase";

interface Props {
  docId: string;
  content: string;
  date: string;
  feedback: string;
  keyword: string;
  reason: string;
  solved: fightStatusType;
  target: string;
}

export const updateMyFightsData = ({
  docId,
  content,
  date,
  feedback,
  keyword,
  reason,
  solved,
  target,
}: Props) => {
  const db = getFirestore(app);
  const auth = getAuth();
  const uid = auth.currentUser?.uid ?? "";

  const myFightsRef = doc(db, "myFights", docId);

  return updateDoc(myFightsRef, {
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
};
