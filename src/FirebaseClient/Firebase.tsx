import firebaseApp from "firebase/app";
import "firebase/auth";
import "firebase/storage";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
};
if (!firebaseApp.apps.length) {
  firebaseApp.initializeApp(firebaseConfig);
}

export { firebaseApp };
