import { Button, Modal, Result, Typography } from "antd";
import { AppContext } from "App";
import * as DataTypes from "data/types";
import React from "react";
import { Grid } from "semantic-ui-react";
import {
  DeletePlaylistModalStateActionTypes,
  deletePlaylistModalReducer,
  deletePlaylistModalStateInit,
} from "./DeletePlaylistModalReducer";
import { saveFormData } from "./DeletePlaylistModalUtil";

interface Props {
  show: boolean;
  closeModal: (closeModalParams: DataTypes.Local.CloseModalParams) => void;
  playlist: DataTypes.Playlist;
}

const DeletePlaylistModal: React.FC<Props> = (props: Props) => {
  const [appState] = React.useContext(AppContext);
  const [deletePlaylistState, dispatch] = React.useReducer(
    deletePlaylistModalReducer,
    {
      playlist: props.playlist,
    },
    deletePlaylistModalStateInit,
  );

  const handleSubmit = async () => {
    dispatch({
      type: DeletePlaylistModalStateActionTypes.BEGIN_FORM_SUBMISSION,
    });
    const saveDataResponse = await saveFormData(
      deletePlaylistState.playlist.objectID,
      appState.authUser.uid,
    );
    if (saveDataResponse.error) {
      dispatch({
        type:
          DeletePlaylistModalStateActionTypes.FINISHED_FORM_SUBMISSION_WITH_ERROR,
        submissionError: saveDataResponse.error,
      });
      props.closeModal({ shouldReload: false, error: saveDataResponse.error });
    } else {
      dispatch({
        type:
          DeletePlaylistModalStateActionTypes.FINISHED_FORM_SUBMISSION_SUCCESSFULLY,
      });
      props.closeModal({ shouldReload: true });
    }
  };

  const viewContent = (
    <Grid>
      <Grid.Column width={16}>
        <Typography.Paragraph>
          {`Are you sure you want to delete the playlist:  `}
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
      loading={deletePlaylistState.isSubmittingForm}
      onClick={handleSubmit}
    >
      {"Confirm"}
    </Button>,
  ];

  return (
    <Modal
      visible={props.show}
      title={"Delete Playlist"}
      okText={"Finish"}
      width={"800px"}
      footer={modalFooter}
      afterClose={() =>
        dispatch({
          type: DeletePlaylistModalStateActionTypes.CLEAR_MODAL_DATA,
        })
      }
      onCancel={() => props.closeModal({ shouldReload: false })}
    >
      {viewContent}
    </Modal>
  );
};

export default DeletePlaylistModal;
