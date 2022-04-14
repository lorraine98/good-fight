import { app } from "../shared/FireBase";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import getRandomNickname from "./get-random-nickname";

const db = getFirestore(app);
const auth = getAuth();
const uid = auth.currentUser?.uid ?? "";

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

interface Props {
  content: string;
  optionList: option[];
  likes: {
    like: number;
    hate: number;
  };
}

interface option {
  optionValue: string;
  votes: number;
}
