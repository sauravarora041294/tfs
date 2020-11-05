interface PlanCodeAction {
  type: string;
  submissionErrors?: any;
  selectedPlanCode?: string;
}

enum PlanCodeActionTypes {
  FINISHED_UPDATE_PLAN_CODE_FORM_SUBMISSION_SUCCESSFULLY = "FINISHED_UPDATE_PLAN_CODE_FORM_SUBMISSION_SUCCESSFULLY",
  FINISHED_PLAN_CODE_UPDATION_WITH_ERROR = "FINISHED_PLAN_CODE_UPDATION_WITH_ERROR",
  BEGIN_PLAN_CODE_FORM_SUBMISSION = "BEGIN_PLAN_CODE_FORM_SUBMISSION",
  UPDATE_SELECTED_PLAN = "UPDATE_SELECTED_PLAN",
}
interface PlanCodeState {
  planCode: string;
  updatePlanCodeSubmissionErrors?: Array<string>;
  isSubmittingUpdatePlancodeForm?: boolean;
  successfullySubmittedUpdatePlanCodeForm?: boolean;
  selectedPlanCode?: string;
}
const planCodeInitialState: PlanCodeState = {
  planCode: "",
  isSubmittingUpdatePlancodeForm: false,
  successfullySubmittedUpdatePlanCodeForm: false,
  updatePlanCodeSubmissionErrors: null,
  selectedPlanCode: "",
};

const planCodeInit = (initialState: PlanCodeState): PlanCodeState => {
  return { ...planCodeInitialState, ...initialState };
};

const planCodeReducer = (
  state: PlanCodeState,
  action: PlanCodeAction,
): PlanCodeState => {
  switch (action.type) {
    case PlanCodeActionTypes.BEGIN_PLAN_CODE_FORM_SUBMISSION:
      return { ...state, isSubmittingUpdatePlancodeForm: true };
    case PlanCodeActionTypes.FINISHED_PLAN_CODE_UPDATION_WITH_ERROR:
      return {
        ...state,
        updatePlanCodeSubmissionErrors: action.submissionErrors,
        isSubmittingUpdatePlancodeForm: false,
        successfullySubmittedUpdatePlanCodeForm: false,
      };

    case PlanCodeActionTypes.FINISHED_UPDATE_PLAN_CODE_FORM_SUBMISSION_SUCCESSFULLY:
      return {
        ...state,
        isSubmittingUpdatePlancodeForm: false,
        successfullySubmittedUpdatePlanCodeForm: true,
      };
    case PlanCodeActionTypes.UPDATE_SELECTED_PLAN:
      return {
        ...state,
        selectedPlanCode: action.selectedPlanCode,
      };
  }
};
export { planCodeInit, planCodeReducer, PlanCodeActionTypes };
