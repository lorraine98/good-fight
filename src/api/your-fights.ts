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
  limit,
  increment,
  getDoc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import getRandomNickname from "./get-random-nickname";
import { getAuth } from "firebase/auth";

const db = getFirestore(app);
const uid = getAuth(app).currentUser?.uid;

export interface DocType {
  pid: string;
  createdAt: number;
  uid: string;
  nickname: string;
  content: string;
  optionList: string[];
  votes: number[];
  likes: number;
  hates: number;
}

interface LimitedDataType {
  content: string;
  likes: number;
  hates: number;
}

export interface IDocType extends Array<DocType> {}
export interface ILimitedDataType extends Array<LimitedDataType> {}

interface Props {
  content: string;
  optionList: string[];
}

export const postYourFightsForm = async ({ content, optionList }: Props) => {
  try {
    await getRandomNickname().then(async (nickname) => {
      const length = optionList.length;
      const votes = Array.from({ length }, () => 0);

      await addDoc(collection(db, "yourFights"), {
        createdAt: Date.now(),
        uid,
        nickname,
        content,
        optionList,
        votes,
        likes: 0,
        hates: 0,
      });
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
      const {
        createdAt,
        uid,
        nickname,
        content,
        optionList,
        votes,
        likes,
        hates,
      } = doc.data();

      result.push({
        pid: doc.id,
        createdAt,
        uid,
        nickname,
        content,
        optionList,
        votes,
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
      const {
        createdAt,
        uid,
        nickname,
        content,
        optionList,
        votes,
        likes,
        hates,
      } = doc.data();

      result.push({
        pid: doc.id,
        createdAt,
        uid,
        nickname,
        content,
        optionList,
        votes,
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

export const getLikesAndHates = async (pid: string) => {
  try {
    const ref = doc(db, "yourFights", pid);
    const result = await getDoc(ref);

    return {
      likes: result?.data()?.likes || 0,
      hates: result?.data()?.hates || 0,
    };
  } catch (e) {
    console.error("Error to get likes and hates!", e);
  }
};

export const getUserLikingPost = async (pid: string, uid: string) => {
  try {
    const ref = doc(db, "postLike", pid + uid);
    const data = await getDoc(ref);

    return data.exists();
  } catch (error) {
    console.error(error);
  }
};

export const getUserHatingPost = async (pid: string, uid: string) => {
  try {
    const ref = doc(db, "postHate", pid + uid);
    const data = await getDoc(ref);

    return data.exists();
  } catch (error) {
    console.error(error);
  }
};

export const getVotedIndex = async (pid: string, uid: string) => {
  try {
    const ref = doc(db, "postVoted", pid + uid);
    const data = await getDoc(ref);

    if (data.exists()) {
      return data.data().index;
    }

    return null;
  } catch (error) {
    console.error(error);
  }
};

export const getAllVotes = async (pid: string) => {
  try {
    const ref = doc(db, "yourFights", pid);
    const data = await getDoc(ref);

    return data?.data()?.votes;
  } catch (error) {
    console.error(error);
  }
};

export const postLike = async (pid: string, uid: string) => {
  try {
    const ref = collection(db, "postLike");

    if (await getUserLikingPost(pid, uid)) {
      postCancelLike(pid, uid);

      return false;
    }

    await setDoc(doc(ref, pid + uid), {
      pid,
      uid,
    });

    await updateDoc(doc(db, "yourFights", pid), {
      likes: increment(1),
    });

    return true;
  } catch (error) {
    console.error(error);

    return false;
  }
};

export const postHate = async (pid: string, uid: string) => {
  try {
    const ref = collection(db, "postHate");

    if (await getUserHatingPost(pid, uid)) {
      postCancelHate(pid, uid);

      return false;
    }

    await setDoc(doc(ref, pid + uid), {
      pid,
      uid,
    });

    await updateDoc(doc(db, "yourFights", pid), {
      hates: increment(1),
    });

    return true;
  } catch (error) {
    console.error(error);

    return false;
  }
};

export const postCancelLike = async (pid: string, uid: string) => {
  try {
    const ref = collection(db, "postLike");

    await deleteDoc(doc(ref, pid + uid));

    await updateDoc(doc(db, "yourFights", pid), {
      likes: increment(-1),
    });
  } catch (error) {
    console.error(error);
  }
};

export const postCancelHate = async (pid: string, uid: string) => {
  try {
    const ref = collection(db, "postHate");

    await deleteDoc(doc(ref, pid + uid));

    await updateDoc(doc(db, "yourFights", pid), {
      hates: increment(-1),
    });
  } catch (error) {
    console.error(error);
  }
};

export const postClickOption = async (
  pid: string,
  uid: string,
  index: number,
) => {
  try {
    const votedPostRef = doc(db, "votedPost", pid + uid);
    const yourFightsRef = doc(db, "yourFights", pid);
    const yourFights = await getDoc(yourFightsRef);
    const data = await getDoc(votedPostRef);
    const updatedVotes = yourFights?.data()?.votes;

    if (data.exists()) {
      const votedPostIndex = data.data().index;

      updatedVotes[votedPostIndex]--;

      if (votedPostIndex === index) {
        // cancel vote
        await updateDoc(yourFightsRef, {
          votes: updatedVotes,
        });

        await deleteDoc(votedPostRef);

        return;
      }

      await updateDoc(votedPostRef, {
        index,
      });
    } else {
      await setDoc(votedPostRef, {
        index,
      });
    }

    updatedVotes[index]++;

    await updateDoc(yourFightsRef, {
      votes: updatedVotes,
    });
  } catch (error) {
    console.error(error);
  }
};
