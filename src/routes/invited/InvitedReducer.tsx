import * as DataTypes from "data/types";

interface InvitedState {
  invitee: string;
  error: any;
  isLoading?: boolean;
  inviteCode?: string;
}

interface InvitedStateAction {
  type: string;
  isLoading?: boolean;
  error?: any;
  invitee?: string;
  code?: string;
}
enum InvitedStateActionTypes {
  START_FETCHING = "START_FETCHING",
  FINISHED_FETCHING_WITH_ERROR = "FINISHED_FETCHING_WITH_ERROR",
  FINISHED_FETCHING_SUCCESSFULLY = "FINISHED_FETCHING_SUCCESSFULLY",
  SET_INVITE_CODE = "SET_INVITE_CODE",
}
const invitedStateInit = (initialState: InvitedState): InvitedState => {
  return {
    ...initialState,
    isLoading: false,
  };
};

const invitedReducer = (
  state: InvitedState,
  action: InvitedStateAction,
): InvitedState => {
  switch (action.type) {
    case InvitedStateActionTypes.SET_INVITE_CODE:
      return { ...state, inviteCode: action.code };
    case InvitedStateActionTypes.START_FETCHING:
      return { ...state, isLoading: true };
    case InvitedStateActionTypes.FINISHED_FETCHING_WITH_ERROR:
      return { ...state, isLoading: false, error: action.error };
    case InvitedStateActionTypes.FINISHED_FETCHING_SUCCESSFULLY:
      return {
        ...state,
        isLoading: false,
        error: null,
        invitee: action.invitee,
      };
    default:
      return { ...state };
  }
};

export { invitedReducer, invitedStateInit, InvitedStateActionTypes };
