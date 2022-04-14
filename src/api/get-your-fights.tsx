import { app } from "../shared/FireBase";
import { collection, getFirestore, getDocs } from "firebase/firestore";

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
  data: DataType;
  user: UserType;
}

export interface IOptionListType extends Array<OptionListType> {}
export interface IDocType extends Array<DocType> {}

const db = getFirestore(app);

const getYourFights = async () => {
  try {
    const data = await getDocs(collection(db, "yourFights"));
    const result: IDocType = [];

    data.forEach((doc) => {
      const { data, user } = doc.data();

      result.push({
        data,
        user,
      });
    });

    return result;
  } catch (e) {
    console.error("Error get collection!", e);
  }
};

export default getYourFights;
