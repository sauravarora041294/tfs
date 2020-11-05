interface MyAccountState {
  showUpdateProfileModal?: boolean;
  showUpdatePaymentModal?: boolean;
  showUpdatePlanModal?: boolean;
  showCancelMembershipModal?: boolean;
}
const myAccountInitialState = {
  showUpdateProfileModal: false,
  showUpdatePaymentModal: false,
  showUpdatePlanModal: false,
  showCancelMembershipModal: false,
};

enum MyAccountStateActionTypes {
  OPEN_UPDATE_PAYMENT = "OPEN_UPDATE_PAYMENT",
  OPEN_CANCEL_MEMBERSHIP = "OPEN_CANCEL_MEMBERSHIP",
  OPEN_UPDATE_PLAN = "OPEN_UPDATE_PLAN",
  OPEN_UPDATE_PROFILE = "OPEN_UPDATE_PROFILE",
  CLOSE_MODAL = "CLOSE_MODAL",
}

interface MyAccountStateAction {
  type: MyAccountStateActionTypes;
  data?: MyAccountState;
}

const myAccountInit = (initialState: MyAccountState): MyAccountState => {
  return {
    ...myAccountInitialState,
    ...initialState,
  };
};

const myAccountReducer = (
  state: MyAccountState,
  action: MyAccountStateAction,
): MyAccountState => {
  switch (action.type) {
    case MyAccountStateActionTypes.CLOSE_MODAL:
      return {
        ...action.data,
        showUpdatePaymentModal: false,
        showUpdatePlanModal: false,
        showUpdateProfileModal: false,
        showCancelMembershipModal: false,
      };
    case MyAccountStateActionTypes.OPEN_UPDATE_PAYMENT:
      return { ...state, showUpdatePaymentModal: true };
    case MyAccountStateActionTypes.OPEN_UPDATE_PROFILE:
      return { ...state, showUpdateProfileModal: true };
    case MyAccountStateActionTypes.OPEN_UPDATE_PLAN:
      return { ...state, showUpdatePlanModal: true };
    case MyAccountStateActionTypes.OPEN_CANCEL_MEMBERSHIP:
      return { ...state, showCancelMembershipModal: true };
    default:
      return state;
  }
};

export { myAccountReducer, myAccountInit, MyAccountStateActionTypes };
