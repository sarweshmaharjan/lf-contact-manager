import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBnNpIgXrrIJdfhlXOq6LO9Aic_AJ-Ooac",
  authDomain: "contact-management-2a00c.firebaseapp.com",
  projectId: "contact-management-2a00c",
  storageBucket: "contact-management-2a00c.appspot.com",
  messagingSenderId: "243205932233",
  appId: "1:243205932233:web:bbb2ece9848c8b0a7af918",
  measurementId: "G-4NX46ESCKT",
};

const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

export { storage, app };