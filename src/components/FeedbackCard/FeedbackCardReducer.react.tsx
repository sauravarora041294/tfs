interface FeedbackCardState {
  rating: number;
  feedback: string;
  error?: string;
  disableSubmitButton?: boolean;
}

enum FeedbackCardStateActionTypes {
  SET_ERROR = "SET_ERROR",
  SET_RATING = "SET_RATING",
  SET_FEEDBACK = "SET_FEEDBACK",
  DISABLE_SUBMIT_BUTTON = "DISABLE_SUBMIT_BUTTON"
}

interface FeedbackCardStateAction {
  type: FeedbackCardStateActionTypes;
  rating?: number;
  feedback?: string;
  error?: string;
  disableSubmitButton?: boolean;
}

const feedbackCardStateInit = (
  initialState: FeedbackCardState,
): FeedbackCardState => ({
  ...initialState,
});

const feedbackCardReducer = (
  state: FeedbackCardState,
  action: FeedbackCardStateAction,
): FeedbackCardState => {
  switch (action.type) {
    case FeedbackCardStateActionTypes.SET_ERROR:
      return {
        ...state,
        error: action.error,
      };
    case FeedbackCardStateActionTypes.SET_RATING:
      return {
        ...state,
        rating: action.rating,
      };
    case FeedbackCardStateActionTypes.SET_FEEDBACK:
      return {
        ...state,
        feedback: action.feedback,
      };
    case FeedbackCardStateActionTypes.DISABLE_SUBMIT_BUTTON:
      return {
        ...state,
        disableSubmitButton: action.disableSubmitButton
      }
    default:
      return state;
  }
};

export {
  FeedbackCardStateActionTypes,
  feedbackCardStateInit,
  feedbackCardReducer,
};
