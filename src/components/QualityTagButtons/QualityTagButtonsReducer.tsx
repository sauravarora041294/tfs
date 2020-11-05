import * as DataTypes from "data/types";

interface QualityTagState {
  show?: boolean;
  qualityVerifications: Array<DataTypes.QualityVerification>;
  contributorUserId?: string;
  resourceId?: string;
  isLoadingHighQualityTeachingButton?: boolean;
  isLoadingContentSeemsCorrectButton?: boolean;
  submissionError?: Error;
}

enum QualityTagStateActionTypes {
  BEGIN_HIGH_QUALITY_TEACHING_TAG_SUBMISSION = "BEGIN_HIGH_QUALITY_TEACHING_TAG_SUBMISSION",
  BEGIN_CONTENT_SEEMS_CORRECT_TAG_SUBMISSION = "BEGIN_CONTENT_SEEMS_CORRECT_TAG_SUBMISSION",
  FINISHED_SUBMISSION_WITH_ERROR = "FINISHED_SUBMISSION_WITH_ERROR",
  FINISHED_SUBMISSION_SUCCESSFULLY = "FINISHED_SUBMISSION_SUCCESSFULLY",
  REFRESH_QUALITY_VERIFICATIONS = "REFRESH_QUALITY_VERIFICATIONS",
  CANCEL_LOADING = "CANCEL_LOADING",
}

interface QualityTagStateAction {
  type: QualityTagStateActionTypes;
  qualityVerification?: DataTypes.QualityVerification;
  submissionError?: Error;
  qualityVerifications?: DataTypes.QualityVerification[];
}

const qualityTagStateInit = (
  initialState: QualityTagState,
): QualityTagState => ({
  ...initialState,
});

const qualityTagButtonsReducer = (
  state: QualityTagState,
  action: QualityTagStateAction,
) => {
  switch (action.type) {
    case QualityTagStateActionTypes.CANCEL_LOADING:
      return {
        ...state,
        isLoadingContentSeemsCorrectButton: false,
        isLoadingHighQualityTeachingButton: false,
      };
    case QualityTagStateActionTypes.REFRESH_QUALITY_VERIFICATIONS:
      return {
        ...state,
        qualityVerifications: action.qualityVerifications,
      };
    case QualityTagStateActionTypes.BEGIN_HIGH_QUALITY_TEACHING_TAG_SUBMISSION:
      return {
        ...state,
        isLoadingHighQualityTeachingButton: true,
      };
    case QualityTagStateActionTypes.BEGIN_CONTENT_SEEMS_CORRECT_TAG_SUBMISSION:
      return {
        ...state,
        isLoadingContentSeemsCorrectButton: true,
      };
    case QualityTagStateActionTypes.FINISHED_SUBMISSION_WITH_ERROR:
      return {
        ...state,
        isLoadingHighQualityTeachingButton: false,
        isLoadingContentSeemsCorrectButton: false,
        submissionError: action.submissionError,
      };
    case QualityTagStateActionTypes.FINISHED_SUBMISSION_SUCCESSFULLY:
      return {
        ...state,
        isLoadingHighQualityTeachingButton: false,
        isLoadingContentSeemsCorrectButton: false,
        qualityVerifications: [
          ...state.qualityVerifications,
          action.qualityVerification,
        ],
      };
    default:
      return state;
  }
};

export {
  QualityTagStateActionTypes,
  qualityTagStateInit,
  qualityTagButtonsReducer,
};
