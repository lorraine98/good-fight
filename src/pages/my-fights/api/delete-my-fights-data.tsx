import { doc, getFirestore, deleteDoc } from "firebase/firestore";
import { app } from "src/shared/FireBase";

const db = getFirestore(app);

const deleteMyFightsData = (id: string) => {
  return deleteDoc(doc(db, "myFights", id));
};

export default deleteMyFightsData;
