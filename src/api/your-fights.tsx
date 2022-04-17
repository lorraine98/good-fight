import { app } from "../shared/FireBase";
import {
  addDoc,
  collection,
  getFirestore,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import getRandomNickname from "./get-random-nickname";

const db = getFirestore(app);
const auth = getAuth();
const uid = auth.currentUser?.uid ?? "";

interface Props {
  content: string;
  optionList: option[];
  likes: LikesType;
}

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

type UserType = {
  uid: string;
  nickname: string;
};

type DataType = {
  content: string;
  likes: LikesType;
  optionList: IOptionListType;
};

interface DocType {
  createdAt: Date;
  data: DataType;
  user: UserType;
}

export interface IOptionListType extends Array<OptionListType> {}
export interface IDocType extends Array<DocType> {}

export const postYourFightsForm = async ({
  content,
  optionList,
  likes,
}: Props) => {
  try {
    const nickname = await getRandomNickname();

    await addDoc(collection(db, "yourFights"), {
      createdAt: Date.now(),
      user: {
        uid,
        nickname,
      },
      data: {
        content,
        optionList,
        likes,
      },
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
      const { createdAt, data, user } = doc.data();

      result.push({
        createdAt: new Date(createdAt),
        data,
        user,
      });
    });

    return result;
  } catch (e) {
    console.error("Error to get data ordered by date!", e);
  }
};

export const getYourFightsOrderByPopularity = async () => {
  try {
    const q = query(
      collection(db, "yourFights"),
      orderBy("data.likes.like", "desc"),
    );
    const data = await getDocs(q);
    const result: IDocType = [];

    data.forEach((doc) => {
      const { createdAt, data, user } = doc.data();

      result.push({
        createdAt: new Date(createdAt),
        data,
        user,
      });
    });

    return result;
  } catch (e) {
    console.error("Error to get data ordered by popularity!", e);
  }
};
