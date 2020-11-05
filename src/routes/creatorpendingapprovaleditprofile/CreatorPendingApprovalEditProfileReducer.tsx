import * as DataTypes from "data/types";

interface CreatorPendingApprovalEditProfileState {
  currentUser: DataTypes.User;
}

interface CreatorPendingApprovalEditProfileStateAction {
  type: string;
}

const creatorPendingApprovalEditProfileStateInit = (
  initialState: CreatorPendingApprovalEditProfileState,
) => {
  return {
    ...initialState,
  };
};

const creatorPendingApprovalEditProfileReducer = (
  state: CreatorPendingApprovalEditProfileState,
  action: CreatorPendingApprovalEditProfileStateAction,
): CreatorPendingApprovalEditProfileState => {
  switch (action.type) {
    default:
      return state;
  }
};

export {
  creatorPendingApprovalEditProfileStateInit,
  creatorPendingApprovalEditProfileReducer,
};
