interface EmployeeAppPrimaryLayoutState {
  sidebarCollapsed?: boolean;
  searchBarValue?: string;
}

enum EmployeeAppPrimaryLayoutStateActionTypes {
  TOGGLE_SIDEBAR = "TOGGLE_SIDEBAR",
  UPDATE_SEARCHBAR_VALUE = "UPDATE_SEARCHBAR_VALUE",
}

interface EmployeeAppPrimaryLayoutStateAction {
  type: EmployeeAppPrimaryLayoutStateActionTypes;
  submissionError?: Error;
  searchBarValue?: string;
}

const employeeAppPrimaryLayoutStateInit = (
  initialState: EmployeeAppPrimaryLayoutState,
): EmployeeAppPrimaryLayoutState => ({
  ...initialState,
  sidebarCollapsed: false,
  searchBarValue: "",
});

const employeeAppPrimaryLayoutReducer = (
  state: EmployeeAppPrimaryLayoutState,
  action: EmployeeAppPrimaryLayoutStateAction,
): EmployeeAppPrimaryLayoutState => {
  switch (action.type) {
    case EmployeeAppPrimaryLayoutStateActionTypes.TOGGLE_SIDEBAR:
      return { ...state, sidebarCollapsed: !state.sidebarCollapsed };
    case EmployeeAppPrimaryLayoutStateActionTypes.UPDATE_SEARCHBAR_VALUE:
      return { ...state, searchBarValue: action.searchBarValue };
    default:
      return state;
  }
};

export {
  EmployeeAppPrimaryLayoutStateActionTypes,
  employeeAppPrimaryLayoutStateInit,
  employeeAppPrimaryLayoutReducer,
};
