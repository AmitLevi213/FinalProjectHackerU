import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA1aGHDCSDQt9_eKygbrsr_3YsZYy1tqHk",
  authDomain: "mp3-storage-58830.firebaseapp.com",
  projectId: "mp3-storage-58830",
  storageBucket: "mp3-storage-58830.appspot.com",
  messagingSenderId: "558744293013",
  appId: "1:558744293013:web:3239a9521ccddfc355d59c",
};

const fireStoreApp = initializeApp(firebaseConfig);
const storage = getStorage(fireStoreApp);

export { storage };
