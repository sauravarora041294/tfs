import * as DataTypes from "data/types";

export interface ResourceFilterItem {
  text: string;
  value: string;
}

interface MyFeedbackState {
  currentUser: DataTypes.User;
  ratings: Array<DataTypes.RatingWithMetadata>;
}

interface MyFeedbackStateAction {
  type: string;
}

const myFeedbackStateInit = (
  initialState: MyFeedbackState,
): MyFeedbackState => {
  return {
    ...initialState,
  };
};

const myFeedbackReducer = (
  state: MyFeedbackState,
  action: MyFeedbackStateAction,
): MyFeedbackState => {
  switch (action.type) {
    default:
      return state;
  }
};

export { myFeedbackStateInit, myFeedbackReducer };
