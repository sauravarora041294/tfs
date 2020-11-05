import { Button, Form, Modal, Result } from "antd";
import { AppContext } from "App";
import * as DataTypes from "data/types";
import React, { MutableRefObject } from "react";
import { Grid } from "semantic-ui-react";
import EditPlaylistSectionForm from "./EditPlaylistSectionForm.react";
import {
  EditPlaylistSectionModalStateActionTypes,
  editPlaylistSectionReducer,
  editPlaylistSectionStateInit,
} from "./EditPlaylistSectionModalReducer";
import { saveFormData } from "./EditPlaylistSectionModalUtil";
import { castFormToRefForwardingComponent } from "utilities/index";

interface Props {
  show: boolean;
  closeModal: (shouldReload: boolean) => void;
  playlist: DataTypes.Playlist;
  sectionIndex: number;
  sectionData: DataTypes.Section;
}

const EditPlaylistSectionModal: React.FC<Props> = (props: Props) => {
  const [appState] = React.useContext(AppContext);
  const [editPlaylistSectionState, dispatch] = React.useReducer(
    editPlaylistSectionReducer,
    {
      playlist: props.playlist,
      sectionIndex: props.sectionIndex,
      sectionData: props.sectionData,
    },
    editPlaylistSectionStateInit,
  );

  const sectionFormRef: MutableRefObject<any> = React.useRef();
  const SectionForm = Form.create({ name: "playlistsection" })(
    React.forwardRef(castFormToRefForwardingComponent(EditPlaylistSectionForm)),
  );

  const handleSubmit = async () => {
    sectionFormRef.current.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        dispatch({
          type: EditPlaylistSectionModalStateActionTypes.BEGIN_FORM_SUBMISSION,
        });
        const saveDataResponse = await saveFormData(
          values,
          editPlaylistSectionState.playlist.objectID,
          editPlaylistSectionState.sectionIndex,
          appState.authUser.uid,
        );
        if (saveDataResponse.error) {
          dispatch({
            type:
              EditPlaylistSectionModalStateActionTypes.FINISHED_FORM_SUBMISSION_WITH_ERROR,
            submissionError: saveDataResponse.error,
          });
        } else {
          dispatch({
            type:
              EditPlaylistSectionModalStateActionTypes.FINISHED_FORM_SUBMISSION_SUCCESSFULLY,
          });
        }
      }
    });
  };

  const sectionForm = React.useMemo(
    () => (
      <SectionForm
        {...{
          ref: sectionFormRef,
          initialFormData: editPlaylistSectionState.sectionData,
        }}
      />
    ),
    [sectionFormRef, editPlaylistSectionState.sectionData],
  );

  const viewContent = (
    <Grid>
      <Grid.Column width={16}>{sectionForm}</Grid.Column>
    </Grid>
  );

  const successResultUI = (
    <Result
      status="success"
      title="This section has been updated!"
      subTitle=""
    />
  );

  const errorResultUI = (
    <Result
      status="error"
      title="Update Failed"
      subTitle={`The following error occurred: ${
        editPlaylistSectionState.submissionError
          ? editPlaylistSectionState.submissionError
          : ""
        }. Please try again.`}
    />
  );

  const resultUI = editPlaylistSectionState.submissionError
    ? errorResultUI
    : successResultUI;

  const modalContent = editPlaylistSectionState.successfullySubmitted
    ? resultUI
    : viewContent;

  const modalFooter = editPlaylistSectionState.successfullySubmitted
    ? [
      <Button
        key="submit"
        type="primary"
        onClick={() => props.closeModal(true)}
      >
        {"Finish"}
      </Button>,
    ]
    : [
      <Button key="back" onClick={() => props.closeModal(false)}>
        {"Cancel"}
      </Button>,
      <Button
        key="submit"
        type="primary"
        loading={editPlaylistSectionState.isSubmittingForm}
        onClick={handleSubmit}
      >
        {"Submit"}
      </Button>,
    ];

  return (
    <Modal
      visible={props.show}
      title={`Edit Section ${editPlaylistSectionState.sectionIndex}: ${editPlaylistSectionState.sectionData.title}`}
      okText={"Finish"}
      width={"800px"}
      footer={modalFooter}
      afterClose={() =>
        dispatch({
          type: EditPlaylistSectionModalStateActionTypes.CLEAR_MODAL_DATA,
        })
      }
      onCancel={() => props.closeModal(false)}
    >
      {modalContent}
    </Modal>
  );
};

export default EditPlaylistSectionModal;
