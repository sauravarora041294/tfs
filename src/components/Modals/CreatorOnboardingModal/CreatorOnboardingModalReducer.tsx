import * as DataTypes from "data/types";

interface CreatorOnboardingModalState {
  creator: DataTypes.Creator;
  currentStep: number;
  numTotalSteps: number;
  progressSaveError?: Error;
  isSavingCompletedStatus: boolean;
  viewedStepNums: Array<number>;
}

enum CreatorOnboardingModalStateActionTypes {
  NEXT_STEP = "NEXT_STEP",
  PREV_STEP = "PREV_STEP",
  SET_STEP = "SET_STEP",
  FINISHED_SAVING_WITH_ERROR = "FINISHED_SAVING_WITH_ERROR",
  FINISHED_SAVING_SUCCESSFULLY = "FINISHED_SAVING_SUCCESSFULLY",
  BEGIN_SAVE_COMPLETION_STATUS = "BEGIN_SAVE_COMPLETION_STATUS",
  CLEAR_MODAL_DATA = "CLEAR_MODAL_DATA",
  VIEWED_STEP = "VIEWED_STEP",
}

interface CreatorOnboardingModalStateAction {
  type: CreatorOnboardingModalStateActionTypes;
  progressSaveError?: Error;
  currentStep?: number;
  viewedStepNum?: number;
}

const creatorOnboardingModalStateInit = (
  initialState: CreatorOnboardingModalState,
): CreatorOnboardingModalState => ({
  ...initialState,
});

const creatorOnboardingModalReducer = (
  state: CreatorOnboardingModalState,
  action: CreatorOnboardingModalStateAction,
): CreatorOnboardingModalState => {
  switch (action.type) {
    case CreatorOnboardingModalStateActionTypes.NEXT_STEP:
      const nextStepNum =
        state.currentStep + 1 < state.numTotalSteps
          ? state.currentStep + 1
          : state.currentStep;
      return { ...state, currentStep: nextStepNum };
    case CreatorOnboardingModalStateActionTypes.PREV_STEP:
      const prevStepNum = state.currentStep > 0 ? state.currentStep - 1 : 0;
      return { ...state, currentStep: prevStepNum };
    case CreatorOnboardingModalStateActionTypes.SET_STEP:
      return { ...state, currentStep: action.currentStep };
    case CreatorOnboardingModalStateActionTypes.FINISHED_SAVING_WITH_ERROR:
      return {
        ...state,
        progressSaveError: action.progressSaveError,
        isSavingCompletedStatus: false,
      };
    case CreatorOnboardingModalStateActionTypes.BEGIN_SAVE_COMPLETION_STATUS:
      return { ...state, isSavingCompletedStatus: true };
    case CreatorOnboardingModalStateActionTypes.FINISHED_SAVING_SUCCESSFULLY:
      return {
        ...state,
        isSavingCompletedStatus: false,
        progressSaveError: null,
      };
    case CreatorOnboardingModalStateActionTypes.CLEAR_MODAL_DATA:
      return {
        ...state,
        isSavingCompletedStatus: false,
        progressSaveError: null,
        currentStep: 0,
      };
    case CreatorOnboardingModalStateActionTypes.VIEWED_STEP:
      const viewedStepNums = state.viewedStepNums;
      if (!viewedStepNums.includes(action.viewedStepNum)) {
        viewedStepNums.push(action.viewedStepNum);
      }
      return {
        ...state,
        viewedStepNums,
      };
    default:
      return state;
  }
};

export {
  creatorOnboardingModalStateInit,
  creatorOnboardingModalReducer,
  CreatorOnboardingModalStateActionTypes,
};
