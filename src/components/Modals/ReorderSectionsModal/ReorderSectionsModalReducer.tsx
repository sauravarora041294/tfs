import * as DataTypes from "data/types";
import arrayMove from "array-move";

interface ReorderSectionsModalState {
  playlist: DataTypes.Playlist;
  isSubmittingForm?: boolean;
  successfullySubmitted?: boolean;
  submissionError?: Error;
}

enum ReorderSectionsModalStateActionTypes {
  BEGIN_FORM_SUBMISSION = "BEGIN_FORM_SUBMISSION",
  FINISHED_FORM_SUBMISSION_SUCCESSFULLY = "FINISHED_FORM_SUBMISSION_SUCCESSFULLY",
  FINISHED_FORM_SUBMISSION_WITH_ERROR = "FINISHED_FORM_SUBMISSION_WITH_ERROR",
  CLEAR_MODAL_DATA = "CLEAR_MODAL_DATA",
  SHIFT_SECTION_UP = "SHIFT_SECTION_UP",
  SHIFT_SECTION_DOWN = "SHIFT_SECTION_DOWN",
}

interface ReorderSectionsModalStateAction {
  type: ReorderSectionsModalStateActionTypes;
  sectionIndex?: number;
  submissionError?: Error;
}

const reorderSectionsStateInit = (
  initialState: ReorderSectionsModalState,
): ReorderSectionsModalState => ({
  ...initialState,
  isSubmittingForm: false,
  successfullySubmitted: false,
  submissionError: null,
});

const reorderSectionsReducer = (
  state: ReorderSectionsModalState,
  action: ReorderSectionsModalStateAction,
): ReorderSectionsModalState => {
  switch (action.type) {
    case ReorderSectionsModalStateActionTypes.BEGIN_FORM_SUBMISSION:
      return { ...state, isSubmittingForm: true };
    case ReorderSectionsModalStateActionTypes.FINISHED_FORM_SUBMISSION_SUCCESSFULLY:
      return { ...state, isSubmittingForm: false, successfullySubmitted: true };
    case ReorderSectionsModalStateActionTypes.FINISHED_FORM_SUBMISSION_WITH_ERROR:
      return {
        ...state,
        isSubmittingForm: false,
        successfullySubmitted: false,
        submissionError: action.submissionError,
      };
    case ReorderSectionsModalStateActionTypes.CLEAR_MODAL_DATA:
      return {
        playlist: null,
        isSubmittingForm: false,
        successfullySubmitted: false,
      };
    case ReorderSectionsModalStateActionTypes.SHIFT_SECTION_UP: {
      const sections = state.playlist.sections;
      const oldIndex = sections.findIndex(
        section => section.sectionIndex === action.sectionIndex,
      );
      const newIndex = oldIndex > 0 ? oldIndex - 1 : 0;
      const updatedSections = arrayMove(sections, oldIndex, newIndex).map(
        (section, index) => ({
          ...(section as DataTypes.Section),
          sectionIndex: index + 1,
        }),
      );
      const newPlaylist = state.playlist;
      newPlaylist.sections = updatedSections;
      return {
        ...state,
        playlist: newPlaylist,
      };
    }
    case ReorderSectionsModalStateActionTypes.SHIFT_SECTION_DOWN: {
      const sections = state.playlist.sections;
      const oldIndex = sections.findIndex(
        section => section.sectionIndex === action.sectionIndex,
      );
      const newIndex = oldIndex < sections.length - 1 ? oldIndex + 1 : 0;
      const updatedSections = arrayMove(sections, oldIndex, newIndex).map(
        (section, index) => ({
          ...(section as DataTypes.Section),
          sectionIndex: index + 1,
        }),
      );
      const newPlaylist = state.playlist;
      newPlaylist.sections = updatedSections;
      return {
        ...state,
        playlist: newPlaylist,
      };
    }
    default:
      return state;
  }
};

export {
  ReorderSectionsModalStateActionTypes,
  reorderSectionsStateInit,
  reorderSectionsReducer,
};
