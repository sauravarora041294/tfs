import * as DataTypes from "data/types";

interface EditCreatorProfileState {
  currentUser: DataTypes.User;
}

interface EditCreatorProfileStateAction {
  type: string;
}

const editCreatorProfileStateInit = (
  initialState: EditCreatorProfileState,
): EditCreatorProfileState => {
  return {
    ...initialState,
  };
};

const editCreatorProfileReducer = (
  state: EditCreatorProfileState,
  action: EditCreatorProfileStateAction,
): EditCreatorProfileState => {
  switch (action.type) {
    default:
      return state;
  }
};

export { editCreatorProfileStateInit, editCreatorProfileReducer };
