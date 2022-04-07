import { app } from "../shared/FireBase";
import { collection, getFirestore, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const db = getFirestore(app);

const getYourFights = async () => {
  try {
    const result = await getDocs(collection(db, "yourFights"));

    result.forEach((doc) => {
      console.log(doc.id, doc.data());
    });
  } catch (e) {
    console.error("Error get collection!", e);
  }
};

export default getYourFights;
