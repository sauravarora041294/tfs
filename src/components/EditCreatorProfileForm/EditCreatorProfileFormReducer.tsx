import * as DataTypes from "data/types";

interface BasicDetailsFormData {
  company: string;
  firstName: string;
  lastName: string;
  title: string;
}

interface LinksFormData {
  linkedinURL: string;
  resumeURL: string;
}

interface PayoutFormData {
  venmoHandle: string;
}

interface SkillsFormData {
  skills: Array<SkillsFormDataItem>;
}

interface SkillsFormDataItem {
  justification: string;
  title: string;
}

interface CreatorDetailsFormData extends DataTypes.CreatorDetails {
  firstName?: string;
  lastName?: string;
}

interface EditCreatorProfileFormState {
  currentUser: DataTypes.Creator;
  creatorDetails: CreatorDetailsFormData;
  isEditingSkillsSection?: boolean;
  isEditingLinksSection?: boolean;
  isEditingBasicDetailsSection?: boolean;
  isEditingPayoutSection?: boolean;
  isSubmittingSkillsSectionForm?: boolean;
  isSubmittingLinksSectionForm?: boolean;
  isSubmittingBasicDetailsSectionForm?: boolean;
  isSubmittingPayoutSectionForm?: boolean;
  skillsSectionFormSubmissionError?: Error;
  linksSectionFormSubmissionError?: Error;
  basicDetailsSectionFormSubmissionError?: Error;
  payoutSectionFormSubmissionError?: Error;
}

enum EditCreatorProfileFormStateActionTypes {
  BEGIN_EDITING_SKILLS = "BEGIN_EDITING_SKILLS",
  CANCEL_EDITING_SKILLS = "CANCEL_EDITING_SKILLS",
  BEGIN_EDITING_LINKS = "BEGIN_EDITING_LINKS",
  CANCEL_EDITING_LINKS = "CANCEL_EDITING_LINKS",
  BEGIN_EDITING_BASIC_DETAILS = "BEGIN_EDITING_BASIC_DETAILS",
  CANCEL_EDITING_BASIC_DETAILS = "CANCEL_EDITING_BASIC_DETAILS",
  BEGIN_EDITING_PAYOUT = "BEGIN_EDITING_PAYOUT",
  CANCEL_EDITING_PAYOUT = "CANCEL_EDITING_PAYOUT",
  BEGIN_SKILLS_FORM_SUBMISSION = "BEGIN_SKILLS_FORM_SUBMISSION",
  SET_SKILLS_FORM_DATA = "SET_SKILLS_FORM_DATA",
  FINISHED_SKILLS_FORM_SUBMISSION_WITH_ERROR = "FINISHED_SKILLS_FORM_SUBMISSION_WITH_ERROR",
  FINISHED_SKILLS_FORM_SUBMISSION_SUCCESSFULLY = "FINISHED_SKILLS_FORM_SUBMISSION_SUCCESSFULLY",
  BEGIN_LINKS_FORM_SUBMISSION = "BEGIN_LINKS_FORM_SUBMISSION",
  SET_LINKS_FORM_DATA = "SET_LINKS_FORM_DATA",
  FINISHED_LINKS_FORM_SUBMISSION_WITH_ERROR = "FINISHED_LINKS_FORM_SUBMISSION_WITH_ERROR",
  FINISHED_LINKS_FORM_SUBMISSION_SUCCESSFULLY = "FINISHED_LINKS_FORM_SUBMISSION_SUCCESSFULLY",
  BEGIN_BASIC_DETAILS_FORM_SUBMISSION = "BEGIN_BASIC_DETAILS_FORM_SUBMISSION",
  SET_BASIC_DETAILS_FORM_DATA = "SET_BASIC_DETAILS_FORM_DATA",
  FINISHED_BASIC_DETAILS_FORM_SUBMISSION_WITH_ERROR = "FINISHED_BASIC_DETAILS_FORM_SUBMISSION_WITH_ERROR",
  FINISHED_BASIC_DETAILS_FORM_SUBMISSION_SUCCESSFULLY = "FINISHED_BASIC_DETAILS_FORM_SUBMISSION_SUCCESSFULLY",
  BEGIN_PAYOUT_FORM_SUBMISSION = "BEGIN_PAYOUT_FORM_SUBMISSION",
  SET_PAYOUT_FORM_DATA = "SET_PAYOUT_FORM_DATA",
  FINISHED_PAYOUT_FORM_SUBMISSION_WITH_ERROR = "FINISHED_PAYOUT_FORM_SUBMISSION_WITH_ERROR",
  FINISHED_PAYOUT_FORM_SUBMISSION_SUCCESSFULLY = "FINISHED_PAYOUT_FORM_SUBMISSION_SUCCESSFULLY",
  UPDATE_USER_DETAILS = "UPDATE_USER_DETAILS"
}

interface EditCreatorProfileFormStateAction {
  type: EditCreatorProfileFormStateActionTypes;
  basicDetailsFormData?: BasicDetailsFormData;
  linksFormData?: LinksFormData;
  payoutFormData?: PayoutFormData;
  skillsFormData?: SkillsFormData;
  submissionError?: Error;
  currentUser?: DataTypes.Creator;
}

const editCreatorProfileFormStateInit = (
  initialState: EditCreatorProfileFormState,
): EditCreatorProfileFormState => {
  return {
    ...initialState,
    isEditingSkillsSection: false,
    isEditingLinksSection: false,
    isEditingBasicDetailsSection: false,
    isEditingPayoutSection: false,
    isSubmittingSkillsSectionForm: false,
    isSubmittingLinksSectionForm: false,
    isSubmittingBasicDetailsSectionForm: false,
    isSubmittingPayoutSectionForm: false,
    skillsSectionFormSubmissionError: null,
    linksSectionFormSubmissionError: null,
    basicDetailsSectionFormSubmissionError: null,
    payoutSectionFormSubmissionError: null,
  };
};

const editCreatorProfileFormReducer = (
  state: EditCreatorProfileFormState,
  action: EditCreatorProfileFormStateAction,
): EditCreatorProfileFormState => {
  switch (action.type) {
    case EditCreatorProfileFormStateActionTypes.BEGIN_EDITING_SKILLS:
      return { ...state, isEditingSkillsSection: true };
    case EditCreatorProfileFormStateActionTypes.CANCEL_EDITING_SKILLS:
      return { ...state, isEditingSkillsSection: false };
    case EditCreatorProfileFormStateActionTypes.BEGIN_EDITING_LINKS:
      return { ...state, isEditingLinksSection: true };
    case EditCreatorProfileFormStateActionTypes.CANCEL_EDITING_LINKS:
      return { ...state, isEditingLinksSection: false };
    case EditCreatorProfileFormStateActionTypes.BEGIN_EDITING_BASIC_DETAILS:
      return { ...state, isEditingBasicDetailsSection: true };
    case EditCreatorProfileFormStateActionTypes.CANCEL_EDITING_BASIC_DETAILS:
      return { ...state, isEditingBasicDetailsSection: false };
    case EditCreatorProfileFormStateActionTypes.BEGIN_EDITING_PAYOUT:
      return { ...state, isEditingPayoutSection: true };
    case EditCreatorProfileFormStateActionTypes.CANCEL_EDITING_PAYOUT:
      return { ...state, isEditingPayoutSection: false };
    case EditCreatorProfileFormStateActionTypes.BEGIN_SKILLS_FORM_SUBMISSION:
      return { ...state, isSubmittingSkillsSectionForm: true };
    case EditCreatorProfileFormStateActionTypes.SET_SKILLS_FORM_DATA:
      return {
        ...state,
        creatorDetails: {
          ...state.creatorDetails,
          ...action.skillsFormData,
        },
      };
    case EditCreatorProfileFormStateActionTypes.FINISHED_SKILLS_FORM_SUBMISSION_WITH_ERROR:
      return {
        ...state,
        isSubmittingSkillsSectionForm: false,
        skillsSectionFormSubmissionError: action.submissionError,
      };
    case EditCreatorProfileFormStateActionTypes.FINISHED_SKILLS_FORM_SUBMISSION_SUCCESSFULLY:
      return {
        ...state,
        isSubmittingSkillsSectionForm: false,
        isEditingSkillsSection: false,
      };
    case EditCreatorProfileFormStateActionTypes.BEGIN_LINKS_FORM_SUBMISSION:
      return { ...state, isSubmittingLinksSectionForm: true };
    case EditCreatorProfileFormStateActionTypes.SET_LINKS_FORM_DATA:
      return {
        ...state,
        creatorDetails: {
          ...state.creatorDetails,
          ...action.linksFormData,
        },
      };
    case EditCreatorProfileFormStateActionTypes.FINISHED_LINKS_FORM_SUBMISSION_WITH_ERROR:
      return {
        ...state,
        isSubmittingLinksSectionForm: false,
        linksSectionFormSubmissionError: action.submissionError,
      };
    case EditCreatorProfileFormStateActionTypes.FINISHED_LINKS_FORM_SUBMISSION_SUCCESSFULLY:
      return {
        ...state,
        isSubmittingLinksSectionForm: false,
        isEditingLinksSection: false,
      };
    case EditCreatorProfileFormStateActionTypes.BEGIN_BASIC_DETAILS_FORM_SUBMISSION:
      return { ...state, isSubmittingBasicDetailsSectionForm: true };
    case EditCreatorProfileFormStateActionTypes.SET_BASIC_DETAILS_FORM_DATA:
      return {
        ...state,
        creatorDetails: {
          ...state.creatorDetails,
          ...action.basicDetailsFormData,
        },
      };
    case EditCreatorProfileFormStateActionTypes.FINISHED_BASIC_DETAILS_FORM_SUBMISSION_WITH_ERROR:
      return {
        ...state,
        isSubmittingBasicDetailsSectionForm: false,
        basicDetailsSectionFormSubmissionError: action.submissionError,
      };
    case EditCreatorProfileFormStateActionTypes.FINISHED_BASIC_DETAILS_FORM_SUBMISSION_SUCCESSFULLY:
      return {
        ...state,
        isSubmittingBasicDetailsSectionForm: false,
        isEditingBasicDetailsSection: false,
      };
    case EditCreatorProfileFormStateActionTypes.BEGIN_PAYOUT_FORM_SUBMISSION:
      return { ...state, isSubmittingPayoutSectionForm: true };
    case EditCreatorProfileFormStateActionTypes.SET_PAYOUT_FORM_DATA:
      return {
        ...state,
        creatorDetails: {
          ...state.creatorDetails,
          ...action.payoutFormData,
        },
      };
    case EditCreatorProfileFormStateActionTypes.FINISHED_PAYOUT_FORM_SUBMISSION_WITH_ERROR:
      return {
        ...state,
        isSubmittingPayoutSectionForm: false,
        payoutSectionFormSubmissionError: action.submissionError,
      };
    case EditCreatorProfileFormStateActionTypes.FINISHED_PAYOUT_FORM_SUBMISSION_SUCCESSFULLY:
      return {
        ...state,
        isSubmittingPayoutSectionForm: false,
        isEditingPayoutSection: false,
      };
    case EditCreatorProfileFormStateActionTypes.UPDATE_USER_DETAILS:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          ...action.currentUser
        },
        creatorDetails: {
          ...state.creatorDetails,
          ...action.currentUser.creatorDetails
        }
      }
    default:
      return state;
  }
};

export {
  EditCreatorProfileFormStateActionTypes,
  editCreatorProfileFormStateInit,
  editCreatorProfileFormReducer,
};
