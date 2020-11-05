import { firebaseApp } from "./Firebase";

const firebaseAuth: firebase.auth.Auth = firebaseApp.auth();

const doSignInWithEmailAndPassword = (
  email: string,
  password: string,
): Promise<firebaseApp.auth.UserCredential> =>
  firebaseAuth.signInWithEmailAndPassword(email, password);

const doCreateUserWithEmailAndPassword = (
  email: string,
  password: string,
): Promise<firebaseApp.auth.UserCredential> => {
  return firebaseAuth.createUserWithEmailAndPassword(email, password);
};

const doUpdateAuthEmail = async (
  email: string,
  password: string,
): Promise<void> => {
  await doSignInWithEmailAndPassword(firebaseAuth.currentUser.email, password);
  return await firebaseAuth.currentUser.updateEmail(email);
};

const doSignInWithGoogleAuth = async (): Promise<void> => {
  const provider = new firebaseApp.auth.GoogleAuthProvider();
  provider.addScope("https://www.googleapis.com/auth/userinfo.email");
  try {
    await firebaseAuth.signInWithRedirect(provider);
  } catch (e) {
    return e;
  }
};

const doSignInWithFacebookAuth = async (): Promise<firebaseApp.auth.UserCredential> => {
  const provider = new firebaseApp.auth.FacebookAuthProvider();
  try {
    await firebaseAuth.signInWithRedirect(provider);
    return await firebaseAuth.getRedirectResult();
  } catch (e) {
    return e;
  }
};

const handleThirdPartyAuthRedirect = async (): Promise<firebaseApp.auth.UserCredential> => {
  try {
    const redirectResult = await firebaseAuth.getRedirectResult();
    return redirectResult;
  } catch (error) {
    return error;
  }
};

const doSignOut = (): Promise<void> => firebaseAuth.signOut();

const sendPasswordResetEmail = async (email: string, continueURL: string) => {
  return continueURL
    ? await firebaseAuth.sendPasswordResetEmail(email, { url: continueURL })
    : await firebaseAuth.sendPasswordResetEmail(email);
};

const verifyPasswordResetCode = async (actionCode: string): Promise<string> => {
  return await firebaseAuth.verifyPasswordResetCode(actionCode);
};

const resetPassword = async (
  actionCode: string,
  newPassword: string,
): Promise<void> => {
  return await firebaseAuth.confirmPasswordReset(actionCode, newPassword);
};

export {
  firebaseAuth,
  handleThirdPartyAuthRedirect,
  doCreateUserWithEmailAndPassword,
  doSignInWithEmailAndPassword,
  doSignOut,
  doUpdateAuthEmail,
  doSignInWithGoogleAuth,
  doSignInWithFacebookAuth,
  sendPasswordResetEmail,
  verifyPasswordResetCode,
  resetPassword,
};
