import { getAuth } from "firebase/auth";
import {
  doc,
  getFirestore,
  deleteDoc,
  collection,
  CollectionReference,
  query,
  orderBy,
  getDocs,
  getDoc,
  limit,
  addDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { fightStatusType } from "src/shared/components/MyFightsStatusIcon";
import { app } from "src/shared/FireBase";
import { useAuth } from "src/shared/hooks/useAuth";

const db = getFirestore(app);

export const deleteMyFightsData = (id: string) => {
  return deleteDoc(doc(db, "myFights", id));
};

export const getMyFightsAllData = async (): Promise<getMyFightsProps[]> => {
  const myFightsRef = collection(
    db,
    "myFights",
  ) as CollectionReference<getMyFightsProps>;

  const myFightsQuery = query(
    myFightsRef,
    orderBy("data.date", "desc"),
    // where("uid", "==", uid),
  );
  const result = await getDocs(myFightsQuery);

  return result.docs.map((doc) => ({ ...doc.data(), docId: doc.id }));
};

export const getMyFightsLimitData = async (count: number) => {
  const myFightsRef = collection(
    db,
    "myFights",
  ) as CollectionReference<getMyFightsProps>;

  const myFightsQuery = query(
    myFightsRef,
    // where("uid", "==", uid),
    orderBy("data.date", "desc"),
    limit(count),
  );
  const result = await getDocs(myFightsQuery);

  return result.docs.map((doc) => ({
    ...doc.data().data,
  }));
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

export const postMyFightsData = async ({
  content,
  date,
  feedback,
  keyword,
  reason,
  solved,
  target,
}: postMyFightsProps) => {
  const { uid } = useAuth();
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

export interface postMyFightsProps {
  content: string;
  date: string;
  feedback: string;
  keyword: string;
  reason: string;
  solved: fightStatusType;
  target: string;
}

interface updateMyFightsProps {
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
}: updateMyFightsProps) => {
  const db = getFirestore(app);
  const { uid } = useAuth();

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
