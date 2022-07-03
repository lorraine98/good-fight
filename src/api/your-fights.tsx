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

export type LikesType = {
  like: number;
  hate: number;
};

type OptionListType = {
  optionValue: string;
  votes: number;
};

type WriterType = {
  uid: string;
  nickname: string;
};

type DataType = {
  content: string;
  likes: LikesType;
  optionList: IOptionListType;
};

interface DocType {
  documentID: string;
  createdAt: number;
  data: DataType;
  writer: WriterType;
  isLike: boolean;
  isHate: boolean;
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
  likes: LikesType;
}

export const postYourFightsForm = async ({
  content,
  optionList,
  likes,
}: Props) => {
  try {
    const nickname = await getRandomNickname();

    await addDoc(collection(db, "yourFights"), {
      createdAt: Date.now(),
      writer: {
        uid,
        nickname,
      },
      data: {
        content,
        optionList,
        likes,
      },
      likingUser: {},
      hatingUser: {},
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
      const { createdAt, data, writer, likingUser, hatingUser } = doc.data();
      const isLike = likingUser.hasOwnProperty(uid);
      const isHate = hatingUser.hasOwnProperty(uid);

      result.push({
        documentID: doc.id,
        createdAt,
        data,
        writer,
        isLike,
        isHate,
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
      const { createdAt, data, writer, likingUser, hatingUser } = doc.data();
      const isLike = likingUser.hasOwnProperty(uid);
      const isHate = hatingUser.hasOwnProperty(uid);

      result.push({
        documentID: doc.id,
        createdAt,
        data,
        writer,
        isLike,
        isHate,
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

export const postLike = async (documentID: string) => {
  try {
    const uid = getUID();
    const documentRef = doc(db, "yourFights", documentID);

    await updateDoc(documentRef, {});
  } catch (error) {
    console.error(error);
  }
};

export const postHate = async (documentID: string) => {};

export const postCancelLike = async (documentID: string) => {};

export const postCancelHate = async (documentID: string) => {};
