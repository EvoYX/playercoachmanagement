import { db } from "../firebase-config";

import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const coachCollectionRef = collection(db, "Coach");
class CoachDataService {
  addCoach = (newCoach) => {
    console.log("adding Coach");
    return addDoc(coachCollectionRef, newCoach);
  };

  updateCoach = (id, updatedCoach) => {
    const coachDoc = doc(db, "Coach", id);
    return updateDoc(coachDoc, updatedCoach);
  };

  deleteCoach = (id) => {
    const coachDoc = doc(db, "Coach", id);
    return deleteDoc(coachDoc);
  };

  getAllCoach = () => {
    return getDocs(coachCollectionRef);
  };

  getCoach = (id) => {
    const playerDoc = doc(db, "Coach", id);
    return getDoc(playerDoc);
  };
}

export default new CoachDataService();
