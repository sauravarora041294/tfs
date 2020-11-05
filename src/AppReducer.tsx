import * as DataTypes from "data/types";
import { firebaseApp } from "FirebaseClient";

export interface AppState {
  authUser?: firebaseApp.User;
  isLoading?: boolean;
  currentUser?: DataTypes.User;
  currentCreator?: DataTypes.Creator;
  currentEmployee?: DataTypes.Employee;
  invalidAuthTokenError?: Error;
  redirectTargetAfterAuth?: string;
}

enum AppStateActionTypes {
  CURRENT_USER_LOGGED_IN = "CURRENT_USER_LOGGED_IN",
  CURRENT_USER_LOGGED_OUT = "CURRENT_USER_LOGGED_OUT",
  UPDATE_CURRENT_USER = "UPDATE_CURRENT_USER",
  UPDATE_CURRENT_CREATOR = "UPDATE_CURRENT_CREATOR",
  UPDATE_CURRENT_EMPLOYEE = "UPDATE_CURRENT_EMPLOYEE",
  UPDATE_REDIRECT_TARGET_AFTER_AUTH = "UPDATE_REDIRECT_TARGET_AFTER_AUTH",
  SET_INVALID_AUTH_TOKEN_ERROR = "SET_INVALID_AUTH_TOKEN_ERROR",
}

export interface AppStateAction {
  type: AppStateActionTypes;
  authUser?: firebaseApp.User;
  currentUser?: DataTypes.User;
  currentCreator?: DataTypes.Creator;
  currentEmployee?: DataTypes.Employee;
  invalidAuthTokenError?: Error;
  redirectTargetAfterAuth?: string;
}

const appStateInit = (initialState: AppState): AppState => ({
  authUser: initialState.authUser,
  isLoading: true,
  currentUser: null,
  currentCreator: null,
  currentEmployee: null,
  invalidAuthTokenError: null,
  redirectTargetAfterAuth: "",
});

const appReducer = (state: AppState, action: AppStateAction) => {
  switch (action.type) {
    case AppStateActionTypes.CURRENT_USER_LOGGED_IN:
      return {
        ...state,
        authUser: action.authUser,
        isLoading: false,
      };
    case AppStateActionTypes.UPDATE_REDIRECT_TARGET_AFTER_AUTH:
      return {
        ...state,
        redirectTargetAfterAuth: action.redirectTargetAfterAuth,
      };
    case AppStateActionTypes.CURRENT_USER_LOGGED_OUT:
      return { ...state, authUser: null, isLoading: false };
    case AppStateActionTypes.UPDATE_CURRENT_USER:
      return { ...state, currentUser: action.currentUser };
    case AppStateActionTypes.UPDATE_CURRENT_CREATOR:
      return { ...state, currentCreator: action.currentCreator };
    case AppStateActionTypes.UPDATE_CURRENT_EMPLOYEE:
      return { ...state, currentEmployee: action.currentEmployee };
    case AppStateActionTypes.SET_INVALID_AUTH_TOKEN_ERROR:
      return { ...state, invalidAuthTokenError: action.invalidAuthTokenError };
    default:
      return state;
  }
};

export { appStateInit, appReducer, AppStateActionTypes };
