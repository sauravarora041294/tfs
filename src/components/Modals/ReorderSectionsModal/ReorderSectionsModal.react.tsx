import { Button, Modal, Result } from "antd";
import { AppContext } from "App";
import * as DataTypes from "data/types";
import React from "react";
import { Grid } from "semantic-ui-react";
import {
  ReorderSectionsModalStateActionTypes,
  reorderSectionsReducer,
  reorderSectionsStateInit,
} from "./ReorderSectionsModalReducer";
import { saveFormData } from "./ReorderSectionsModalUtil";
import SectionsList from "./SectionsList.react";

interface Props {
  show: boolean;
  closeModal: (closeModalParams: DataTypes.Local.CloseModalParams) => void;
  playlist: DataTypes.Playlist;
}

const ReorderSectionsModal: React.FC<Props> = (props: Props) => {
  const [appState] = React.useContext(AppContext);
  const [reorderSectionsState, dispatch] = React.useReducer(
    reorderSectionsReducer,
    {
      playlist: props.playlist,
    },
    reorderSectionsStateInit,
  );

  const shiftSectionUp = React.useCallback(
    sectionIndex =>
      dispatch({
        type: ReorderSectionsModalStateActionTypes.SHIFT_SECTION_UP,
        sectionIndex: sectionIndex,
      }),
    [dispatch],
  );

  const shiftSectionDown = React.useCallback(
    sectionIndex =>
      dispatch({
        type: ReorderSectionsModalStateActionTypes.SHIFT_SECTION_DOWN,
        sectionIndex: sectionIndex,
      }),
    [dispatch],
  );

  const handleSubmit = async () => {
    dispatch({
      type: ReorderSectionsModalStateActionTypes.BEGIN_FORM_SUBMISSION,
    });
    const orderedSectionUIDs = reorderSectionsState.playlist.sections.map(
      section => section.sectionUID,
    );
    const saveDataResponse = await saveFormData(
      orderedSectionUIDs,
      reorderSectionsState.playlist.objectID,
      appState.authUser.uid,
    );
    if (saveDataResponse.error) {
      dispatch({
        type:
          ReorderSectionsModalStateActionTypes.FINISHED_FORM_SUBMISSION_WITH_ERROR,
        submissionError: saveDataResponse.error,
      });
      props.closeModal({ shouldReload: false, error: saveDataResponse.error });
    } else {
      dispatch({
        type:
          ReorderSectionsModalStateActionTypes.FINISHED_FORM_SUBMISSION_SUCCESSFULLY,
      });
      props.closeModal({ shouldReload: true });
    }
  };

  const sectionsList = React.useMemo(() => {
    return (
      <SectionsList
        playlist={reorderSectionsState.playlist}
        shiftSectionUp={shiftSectionUp}
        shiftSectionDown={shiftSectionDown}
      />
    );
  }, [reorderSectionsState, shiftSectionUp, shiftSectionDown]);

  const viewContent = (
    <Grid>
      <Grid.Column width={16}>{sectionsList}</Grid.Column>
    </Grid>
  );

  const modalFooter = [
    <Button
      key="back"
      onClick={() => props.closeModal({ shouldReload: false })}
    >
      {"Cancel"}
    </Button>,
    <Button
      key="submit"
      type="primary"
      loading={reorderSectionsState.isSubmittingForm}
      onClick={handleSubmit}
    >
      {"Save"}
    </Button>,
  ];

  return (
    <Modal
      visible={props.show}
      title={`Edit Playlist: ${reorderSectionsState.playlist.title}`}
      okText={"Save"}
      width={"800px"}
      footer={modalFooter}
      afterClose={() =>
        dispatch({
          type: ReorderSectionsModalStateActionTypes.CLEAR_MODAL_DATA,
        })
      }
      onCancel={() => props.closeModal({ shouldReload: false })}
      centered
    >
      {viewContent}
    </Modal>
  );
};

export default ReorderSectionsModal;
