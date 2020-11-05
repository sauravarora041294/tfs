interface CreatorAppPrimaryLayoutState {
  sidebarCollapsed?: boolean;
  searchBarValue?: string;
}

enum CreatorAppPrimaryLayoutStateActionTypes {
  TOGGLE_SIDEBAR = "TOGGLE_SIDEBAR",
  UPDATE_SEARCHBAR_VALUE = "UPDATE_SEARCHBAR_VALUE",
}

interface CreatorAppPrimaryLayoutStateAction {
  type: CreatorAppPrimaryLayoutStateActionTypes;
  submissionError?: Error;
  searchBarValue?: string;
}

const creatorAppPrimaryLayoutStateInit = (
  initialState: CreatorAppPrimaryLayoutState,
): CreatorAppPrimaryLayoutState => ({
  ...initialState,
  sidebarCollapsed: false,
  searchBarValue: "",
});

const creatorAppPrimaryLayoutReducer = (
  state: CreatorAppPrimaryLayoutState,
  action: CreatorAppPrimaryLayoutStateAction,
): CreatorAppPrimaryLayoutState => {
  switch (action.type) {
    case CreatorAppPrimaryLayoutStateActionTypes.TOGGLE_SIDEBAR:
      return { ...state, sidebarCollapsed: !state.sidebarCollapsed };
    case CreatorAppPrimaryLayoutStateActionTypes.UPDATE_SEARCHBAR_VALUE:
      return { ...state, searchBarValue: action.searchBarValue };
    default:
      return state;
  }
};

export {
  CreatorAppPrimaryLayoutStateActionTypes,
  creatorAppPrimaryLayoutStateInit,
  creatorAppPrimaryLayoutReducer,
};
