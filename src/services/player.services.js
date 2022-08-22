import { db } from "../firebase-config";

import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  orderBy,
  query,
} from "firebase/firestore";

const playersCollectionRef = collection(db, "Players");
class PlayersDataService {
  addPlayer = (newPlayer) => {
    console.log("adding players");
    return addDoc(playersCollectionRef, newPlayer);
  };

  updatePlayer = (id, updatedPlayer) => {
    const playerDoc = doc(db, "Players", id);
    return updateDoc(playerDoc, updatedPlayer);
  };

  deletePlayer = (id) => {
    const playerDoc = doc(db, "Players", id);
    return deleteDoc(playerDoc);
  };

  getAllPlayers = () => {
    return getDocs(
      query(
        playersCollectionRef,
        orderBy("teamName", "asc"),
        orderBy("name", "asc")
      )
    );
  };

  getPlayer = (id) => {
    const playerDoc = doc(db, "Players", id);
    return getDoc(playerDoc);
  };
}

export default new PlayersDataService();
