import * as DataTypes from "data/types";
import RESTAPIClient from "RESTAPIClient";
import firebaseApp from "firebase/app";
import {
  doCreateUserWithEmailAndPassword,
  handleThirdPartyAuthRedirect,
  doSignInWithEmailAndPassword,
} from "FirebaseClient";

interface RegisterResponse {
  savedUser: DataTypes.Creator;
  error?: Error;
}

interface SignInResponse {
  authResponse: firebaseApp.auth.UserCredential;
  error: Error;
}

const getUserIfExists = async (
  userId: string,
): Promise<DataTypes.User | null> => {
  try {
    return await RESTAPIClient.User.get(userId);
  } catch (error) {
    return null;
  }
};

const handleThirdPartyUserSignInRedirect = async (): Promise<RegisterResponse> => {
  try {
    const authResponse = await handleThirdPartyAuthRedirect();
    // Handles case where no redirect occurred
    if (authResponse.user === null) {
      return { savedUser: null, error: null };
    }
    const authUser = authResponse.user;
    const savedUser = authUser ? await getUserIfExists(authUser.uid) : null;
    if (savedUser) {
      return {
        savedUser: savedUser,
        error: null,
      };
    } else if (authResponse.user) {
      const authUserInfo = authResponse.user.providerData[0];
      const userName = authUserInfo.displayName.split(" ");
      const createUserResponse = await RESTAPIClient.User.create({
        firstName: userName[0],
        lastName: userName[userName.length - 1],
        email: authUser.email,
        userId: authUser.uid,
      });
      return {
        savedUser: createUserResponse,
        error: null,
      };
    } else {
      return {
        savedUser: null,
        error: null,
      };
    }
  } catch (error) {
    console.log(`SignInError: ${error}`);
    return {
      savedUser: null,
      error: error,
    };
  }
};

const handleThirdPartyCreatorSignInRedirect = async (): Promise<RegisterResponse> => {
  try {
    const authResponse = await handleThirdPartyAuthRedirect();
    // Handles case where no redirect occurred
    if (authResponse.user === null) {
      return { savedUser: null, error: null };
    }
    const authUser = authResponse.user;
    const savedUser = authUser.uid ? await getUserIfExists(authUser.uid) : null;
    if (savedUser) {
      return {
        savedUser: savedUser,
        error: null,
      };
    } else if (authResponse.user) {
      const authUserInfo = authResponse.user.providerData[0];
      const userName = authUserInfo.displayName.split(" ");
      const createUserResponse = await RESTAPIClient.Creator.create({
        firstName: userName[0],
        lastName: userName[userName.length - 1],
        email: authUser.email,
        userId: authUser.uid,
      });
      return {
        savedUser: createUserResponse,
        error: null,
      };
    } else {
      return {
        savedUser: null,
        error: null,
      };
    }
  } catch (error) {
    console.log(`SignInError: ${error}`);
    return {
      savedUser: null,
      error: error,
    };
  }
};

const handleThirdPartyEmployeeSignInRedirect = async (): Promise<RegisterResponse> => {
  try {
    const authResponse = await handleThirdPartyAuthRedirect();
    // Handles case where no redirect occurred
    if (authResponse.user === null) {
      return { savedUser: null, error: null };
    }
    const authUser = authResponse.user;
    const savedUser = authUser.uid ? await getUserIfExists(authUser.uid) : null;
    if (savedUser) {
      return {
        savedUser: savedUser,
        error: null,
      };
    } else if (authResponse.user) {
      const authUserInfo = authResponse.user.providerData[0];
      const userName = authUserInfo.displayName.split(" ");
      const createUserResponse = await RESTAPIClient.Employee.create({
        firstName: userName[0],
        lastName: userName[userName.length - 1],
        email: authUser.email,
        userId: authUser.uid,
      });
      return {
        savedUser: createUserResponse,
        error: null,
      };
    } else {
      return {
        savedUser: null,
        error: null,
      };
    }
  } catch (error) {
    console.log(`SignInError: ${error}`);
    return {
      savedUser: null,
      error: error,
    };
  }
};

const registerUserWithEmailAndPassword = async (
  email: string,
  password: string,
  firstName: string,
  lastName: string,
): Promise<RegisterResponse> => {
  try {
    const authResponse = await doCreateUserWithEmailAndPassword(
      email,
      password,
    );
    const createUserResponse = await RESTAPIClient.User.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      userId: authResponse.user.uid,
    });
    return {
      savedUser: createUserResponse,
      error: null,
    };
  } catch (error) {
    console.log(`SignUpError: ${error}`);
    return {
      savedUser: null,
      error: error,
    };
  }
};

const registerCreatorWithEmailAndPassword = async (
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  inviteCode?: string,
): Promise<RegisterResponse> => {
  try {
    console.log("beginning");
    const authResponse = await doCreateUserWithEmailAndPassword(
      email,
      password,
    );
    if (!inviteCode) {
      // const deleteInviteCode = await RESTAPIClient.Invite.invalidateInviteCode(
      //   inviteCode,
      // );
      const createUserResponse = await RESTAPIClient.Creator.create({
        firstName: firstName,
        lastName: lastName,
        email: email,
        userId: authResponse.user.uid,
      });
      console.log(createUserResponse);
      return {
        savedUser: createUserResponse,
        error: null,
      };
    } else {
      const createUserResponse = await RESTAPIClient.Creator.create({
        firstName: firstName,
        lastName: lastName,
        email: email,
        userId: authResponse.user.uid,
        inviteCode,
      });
      console.log(createUserResponse);
      return {
        savedUser: createUserResponse,
        error: null,
      };
    }
  } catch (error) {
    console.log(`SignUpError: ${error}`);
    return {
      savedUser: null,
      error: error,
    };
  }
};

const registerEmployeeWithEmailAndPassword = async (
  email: string,
  password: string,
  firstName: string,
  lastName: string,
): Promise<RegisterResponse> => {
  try {
    const authResponse = await doCreateUserWithEmailAndPassword(
      email,
      password,
    );
    const createUserResponse = await RESTAPIClient.Employee.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      userId: authResponse.user.uid,
    });
    console.log(createUserResponse);
    return {
      savedUser: createUserResponse,
      error: null,
    };
  } catch (error) {
    console.log(`SignUpError: ${error}`);
    return {
      savedUser: null,
      error: error,
    };
  }
};

const signInWithEmailAndPassword = async (
  email: string,
  password: string,
): Promise<SignInResponse> => {
  try {
    const authResponse = await doSignInWithEmailAndPassword(email, password);
    return {
      authResponse: authResponse,
      error: null,
    };
  } catch (error) {
    console.log(`SignInError: ${error}`);
    return {
      authResponse: null,
      error: error,
    };
  }
};

export default {
  signInWithEmailAndPassword,
  registerUserWithEmailAndPassword,
  registerCreatorWithEmailAndPassword,
  registerEmployeeWithEmailAndPassword,
  handleThirdPartyUserSignInRedirect,
  handleThirdPartyCreatorSignInRedirect,
  handleThirdPartyEmployeeSignInRedirect,
};
