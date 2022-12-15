import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  Firestore,
} from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyDTqzW4fCECsfqCJYQLdAzIsnXM9NXul2U",
  authDomain: "cerebrus-creaitors.firebaseapp.com",
  databaseURL:
    "https://cerebrus-creaitors-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "cerebrus-creaitors",
  storageBucket: "cerebrus-creaitors.appspot.com",
  messagingSenderId: "959138646112",
  appId: "1:959138646112:web:35349bdd2eeb0f728b9b05",
  measurementId: "G-C6JT5PL6LB",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Get a list of cities from your database
async function getItem(db: Firestore, collection: string = "activity_log") {
  //@ts-ignore
  const citiesCol = collection(db, collection);
  const citySnapshot = await getDocs(citiesCol);
  const cityList = citySnapshot.docs.map((doc) => doc.data());
  return cityList;
}

console.log(getItem(db));
