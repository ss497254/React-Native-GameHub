import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
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

export const collections = ["activity_log", "result"] as const;

export async function getItem(
  item: typeof collections[number] = "activity_log"
) {
  const itemCollection = collection(db, item);
  const itemSnapshot = await getDocs(itemCollection);

  return itemSnapshot.docs.map((x) => ({
    id: x.id,
    doc: x.data(),
  }));
}

export async function addItem(
  item: typeof collections[number] = "activity_log",
  data: Object
) {
  const itemCollection = collection(db, item);
  const result = await addDoc(itemCollection, data);

  console.log("result: ", result.id);

  return result.id;
}
