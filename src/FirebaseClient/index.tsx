import { firebaseApp } from "./Firebase";
import {
  handleThirdPartyAuthRedirect,
  doCreateUserWithEmailAndPassword,
  doSignInWithEmailAndPassword,
  doSignInWithFacebookAuth,
  doSignInWithGoogleAuth,
  doSignOut,
  doUpdateAuthEmail,
  firebaseAuth,
  sendPasswordResetEmail,
  verifyPasswordResetCode,
  resetPassword,
} from "./FirebaseAuth";
import { uploadFile } from "./FirebaseStorage";
import FirestoreRealtime from "./FirestoreRealtime";

export {
  firebaseApp,
  firebaseAuth,
  doCreateUserWithEmailAndPassword,
  doSignInWithEmailAndPassword,
  doSignInWithFacebookAuth,
  handleThirdPartyAuthRedirect,
  doSignInWithGoogleAuth,
  doSignOut,
  doUpdateAuthEmail,
  uploadFile,
  sendPasswordResetEmail,
  verifyPasswordResetCode,
  resetPassword,
  FirestoreRealtime,
};
