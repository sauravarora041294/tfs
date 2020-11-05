interface UserAppPrimaryLayoutState {
  searchBarValue?: string;
}

enum UserAppPrimaryLayoutStateActionTypes {
  UPDATE_SEARCHBAR_VALUE = "UPDATE_SEARCHBAR_VALUE",
}

interface CreatorAppPrimaryLayoutStateAction {
  type: UserAppPrimaryLayoutStateActionTypes;
  searchBarValue?: string;
}

const userAppPrimaryLayoutStateInit = (
  initialState: UserAppPrimaryLayoutState,
): UserAppPrimaryLayoutState => ({
  ...initialState,
  searchBarValue: "",
});

const userAppPrimaryLayoutReducer = (
  state: UserAppPrimaryLayoutState,
  action: CreatorAppPrimaryLayoutStateAction,
): UserAppPrimaryLayoutState => {
  switch (action.type) {
    case UserAppPrimaryLayoutStateActionTypes.UPDATE_SEARCHBAR_VALUE:
      return { ...state, searchBarValue: action.searchBarValue };
    default:
      return state;
  }
};

export {
  UserAppPrimaryLayoutStateActionTypes,
  userAppPrimaryLayoutStateInit,
  userAppPrimaryLayoutReducer,
};
