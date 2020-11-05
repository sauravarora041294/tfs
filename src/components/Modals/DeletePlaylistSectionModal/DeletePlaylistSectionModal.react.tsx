import { Button, Modal, Result, Typography } from "antd";
import { AppContext } from "App";
import * as DataTypes from "data/types";
import React from "react";
import { Grid } from "semantic-ui-react";
import {
  DeletePlaylistSectionModalStateActionTypes,
  deletePlaylistSectionModalReducer,
  deletePlaylistSectionModalStateInit,
} from "./DeletePlaylistSectionModalReducer";
import { saveFormData } from "./DeletePlaylistSectionModalUtil";

interface Props {
  show: boolean;
  closeModal: (closeModalParams: DataTypes.Local.CloseModalParams) => void;
  section: DataTypes.Section;
  playlist: DataTypes.Playlist;
}

const DeletePlaylistSectionModal: React.FC<Props> = (props: Props) => {
  const [appState] = React.useContext(AppContext);
  const [deletePlaylistSectionState, dispatch] = React.useReducer(
    deletePlaylistSectionModalReducer,
    {
      section: props.section,
      playlist: props.playlist,
    },
    deletePlaylistSectionModalStateInit,
  );

  const handleSubmit = async () => {
    dispatch({
      type: DeletePlaylistSectionModalStateActionTypes.BEGIN_FORM_SUBMISSION,
    });
    const saveDataResponse = await saveFormData(
      deletePlaylistSectionState.playlist.objectID,
      deletePlaylistSectionState.section.sectionIndex,
      appState.authUser.uid,
    );
    if (saveDataResponse.error) {
      dispatch({
        type:
          DeletePlaylistSectionModalStateActionTypes.FINISHED_FORM_SUBMISSION_WITH_ERROR,
        submissionError: saveDataResponse.error,
      });
      props.closeModal({ shouldReload: false, error: saveDataResponse.error });
    } else {
      dispatch({
        type:
          DeletePlaylistSectionModalStateActionTypes.FINISHED_FORM_SUBMISSION_SUCCESSFULLY,
      });
      props.closeModal({ shouldReload: true });
    }
  };

  const viewContent = (
    <Grid>
      <Grid.Column width={16}>
        <Typography.Paragraph>
          {`Are you sure you want to delete the section `}
          <Typography.Text strong>{`${props.section.title}`}</Typography.Text>
          {` from the playlist`}{" "}
          <Typography.Text strong>{`${props.playlist.title}`}</Typography.Text>
          {`?`}
        </Typography.Paragraph>
      </Grid.Column>
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
      loading={deletePlaylistSectionState.isSubmittingForm}
      onClick={handleSubmit}
    >
      {"Confirm"}
    </Button>,
  ];

  return (
    <Modal
      visible={props.show}
      title={"Delete Playlist Section"}
      okText={"Finish"}
      width={"800px"}
      footer={modalFooter}
      afterClose={() =>
        dispatch({
          type: DeletePlaylistSectionModalStateActionTypes.CLEAR_MODAL_DATA,
        })
      }
      onCancel={() => props.closeModal({ shouldReload: false })}
    >
      {viewContent}
    </Modal>
  );
};

export default DeletePlaylistSectionModal;
