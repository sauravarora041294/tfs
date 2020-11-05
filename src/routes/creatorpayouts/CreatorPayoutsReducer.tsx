import * as DataTypes from "data/types";

interface CreatorPayoutsState {
  creators: Array<DataTypes.Creator>;
  transferringMoneyTo: {
    userId: string;
    amount: number;
  };
  transferError: {
    userId: string;
    message: string;
  };
}

enum CreatorPayoutsStateActionTypes {
  UPDATE_CREATOR_PAYOUT_AMOUNT = "UPDATE_CREATOR_PAYOUT_AMOUNT",
  BEGIN_TRANSFER = "BEGIN_TRANSFER",
  SUCCESSFULL_TRANSFER = "SUCCESSFULL_TRANSFER",
  UNSUCCESSFULL_TRANSFER = "UNSUCCESSFULL_TRANSFER",
}

interface CreatorPayoutsStateAction {
  type: string;
  data?: { userId: string; amount?: number };
  error?: {
    userId: string;
    message: string;
  };
}

const creatorPayoutsStateInit = (
  initialState: CreatorPayoutsState,
): CreatorPayoutsState => {
  return {
    ...initialState,
  };
};

const creatorPayoutsReducer = (
  state: CreatorPayoutsState,
  action: CreatorPayoutsStateAction,
): CreatorPayoutsState => {
  switch (action.type) {
    case CreatorPayoutsStateActionTypes.UPDATE_CREATOR_PAYOUT_AMOUNT:
      return {
        ...state,
        transferError: null,
        creators: state.creators.map(creator =>
          creator.userId === action.data.userId
            ? { ...creator, currentMonthRevenue: action.data.amount }
            : creator,
        ),
      };
    case CreatorPayoutsStateActionTypes.BEGIN_TRANSFER:
      return {
        ...state,
        transferError: null,
        transferringMoneyTo: {
          userId: action.data.userId,
          amount: action.data.amount,
        },
      };
    case CreatorPayoutsStateActionTypes.SUCCESSFULL_TRANSFER:
      return {
        ...state,
        creators: state.creators.map(creator =>
          creator.userId === action.data.userId
            ? { ...creator, isCurrentMonthPaid: true }
            : creator,
        ),
        transferError: null,
        transferringMoneyTo: null,
      };
    case CreatorPayoutsStateActionTypes.UNSUCCESSFULL_TRANSFER:
      return {
        ...state,
        transferError: action.error,
        transferringMoneyTo: null,
      };
    default:
      return state;
  }
};

export {
  creatorPayoutsReducer,
  creatorPayoutsStateInit,
  CreatorPayoutsStateActionTypes,
};
