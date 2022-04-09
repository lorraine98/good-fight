import { app } from "../shared/FireBase";
import { collection, getFirestore, getDocs } from "firebase/firestore";

const db = getFirestore(app);

const getMyFightsData = async () => {
  try {
    const result = await getDocs(collection(db, "myFights"));

    return result.docs.map((doc) => ({ ...doc.data() }));
  } catch (e) {
    console.error("Error get collection!", e);
  }
};

export default getMyFightsData;
