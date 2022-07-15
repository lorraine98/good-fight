import { app } from "../shared/FireBase";
import {
  addDoc,
  updateDoc,
  doc,
  collection,
  getFirestore,
  getDocs,
  query,
  orderBy,
  CollectionReference,
  limit,
  where,
  increment,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import getRandomNickname from "./get-random-nickname";
import { getUID } from "./auth-google-login";

const db = getFirestore(app);
const auth = getAuth();
const uid = auth.currentUser?.uid ?? "";

interface option {
  optionValue: string;
  votes: number;
}

type OptionListType = {
  optionValue: string;
  votes: number;
};

export interface DocType {
  pid: string;
  createdAt: number;
  uid: string;
  nickname: string;
  content: string;
  optionList: IOptionListType;
  likes: number;
  hates: number;
}

interface LimitedDataType {
  content: string;
  likes: number;
  hates: number;
}

export interface IOptionListType extends Array<OptionListType> {}
export interface IDocType extends Array<DocType> {}
export interface ILimitedDataType extends Array<LimitedDataType> {}

interface Props {
  content: string;
  optionList: option[];
}

export const postYourFightsForm = async ({ content, optionList }: Props) => {
  try {
    const nickname = await getRandomNickname();

    await addDoc(collection(db, "yourFights"), {
      createdAt: Date.now(),
      uid,
      nickname,
      content,
      optionList,
      likes: 0,
      hates: 0,
    });
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const getYourFightsOrderByDate = async () => {
  try {
    const q = query(collection(db, "yourFights"), orderBy("createdAt", "desc"));
    const data = await getDocs(q);
    const result: IDocType = [];

    data.forEach((doc) => {
      const { createdAt, uid, nickname, content, optionList, likes, hates } =
        doc.data();

      result.push({
        pid: doc.id,
        createdAt,
        uid,
        nickname,
        content,
        optionList,
        likes,
        hates,
      });
    });

    return result;
  } catch (e) {
    console.error("Error to get data ordered by date!", e);
  }
};

export const getYourFightsOrderByPopularity = async (count?: number) => {
  try {
    const q = query(
      collection(db, "yourFights"),
      orderBy("data.likes.like", "desc"),
    );
    const data = await getDocs(q);
    const result: IDocType = [];

    data.forEach((doc) => {
      const { createdAt, uid, nickname, content, optionList, likes, hates } =
        doc.data();

      result.push({
        pid: doc.id,
        createdAt,
        uid,
        nickname,
        content,
        optionList,
        likes,
        hates,
      });
    });

    return count ? result.slice(0, count) : result;
  } catch (e) {
    console.error("Error to get data ordered by popularity!", e);
  }
};

export const getYourFightsLimitData = async (count: number) => {
  try {
    const q = query(
      collection(db, "yourFights"),
      orderBy("data.likes.like", "desc"),
      limit(count),
    );
    const data = await getDocs(q);
    const result: ILimitedDataType = [];

    data.forEach((doc) => {
      const { data } = doc.data();
      const { content, likes } = data;

      result.push({
        content,
        likes: likes.like,
        hates: likes.hate,
      });
    });

    return result;
  } catch (e) {
    console.error("Error to get limited data!", e);
  }
};

export const getUserLikingPost = async (pid: string, uid: string) => {
  try {
    const ref = doc(db, "postLike", pid + uid);
    const snap = await getDoc(ref);

    return snap.exists();
  } catch (error) {
    console.error(error);
  }
};

export const postLike = async (pid: string, uid: string) => {
  try {
    if (await getUserLikingPost(pid, uid)) {
      return;
    }
    const ref = collection(db, "postLike");

    await setDoc(doc(ref, pid + uid), {
      pid,
      uid,
    });

    await updateDoc(doc(db, "yourFights", pid), {
      likes: increment(1),
    });
  } catch (error) {
    console.error(error);
  }
};

export const postHate = async (documentID: string) => {};

export const postCancelLike = async (documentID: string) => {};

export const postCancelHate = async (documentID: string) => {};
