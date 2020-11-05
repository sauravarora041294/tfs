import * as DataTypes from "data/types";

interface CreatorPendingApprovalState {
  currentUser: DataTypes.User;
}

interface CreatorPendingApprovalStateAction {
  type: string;
}

const creatorPendingApprovalStateInit = (
  initialState: CreatorPendingApprovalState,
): CreatorPendingApprovalState => {
  return {
    ...initialState,
  };
};

const creatorPendingApprovalReducer = (
  state: CreatorPendingApprovalState,
  action: CreatorPendingApprovalStateAction,
): CreatorPendingApprovalState => {
  switch (action.type) {
    default:
      return state;
  }
};

export { creatorPendingApprovalStateInit, creatorPendingApprovalReducer };
