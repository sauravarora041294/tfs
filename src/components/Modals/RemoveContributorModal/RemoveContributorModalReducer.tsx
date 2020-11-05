import * as DataTypes from "data/types";

interface RemoveContributorState {
  show?: boolean;
  closeModal?: (shouldReload: boolean) => void;
  onRemoveContributorSuccess?: (contributors: Array<DataTypes.User>) => void;
  contributor: DataTypes.User;
  content: DataTypes.Content;
  isMission: boolean;
}

interface RemoveContributorStateAction {
  type: string;
}

const removeContributorModalStateInit = (
  initialState: RemoveContributorState,
): RemoveContributorState => ({
  ...initialState,
  content: initialState.isMission
    ? (initialState.content as DataTypes.Mission)
    : (initialState.content as DataTypes.Playlist),
});

const removeContributorModalReducer = (
  state: RemoveContributorState,
  action: RemoveContributorStateAction,
) => {
  switch (action.type) {
    default:
      return state;
  }
};

export { removeContributorModalStateInit, removeContributorModalReducer };
