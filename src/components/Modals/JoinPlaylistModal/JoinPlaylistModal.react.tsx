import { Button, Modal, Result, Typography } from "antd";
import { AppContext } from "App";
import * as DataTypes from "data/types";
import React from "react";
import { Grid } from "semantic-ui-react";
import {
  JoinPlaylistModalStateActionTypes,
  joinPlaylistModalReducer,
  joinPlaylistModalStateInit,
} from "./JoinPlaylistModalReducer";
import { saveFormData } from "./JoinPlaylistModalUtil";

interface Props {
  show: boolean;
  closeModal: (shouldReload: boolean) => void;
  playlistToJoin: DataTypes.Playlist;
}

const JoinPlaylistModal: React.FC<Props> = (props: Props) => {
  const [appState] = React.useContext(AppContext);
  const [joinPlaylistState, dispatch] = React.useReducer(
    joinPlaylistModalReducer,
    {
      playlist: props.playlistToJoin,
    },
    joinPlaylistModalStateInit,
  );

  const handleSubmit = async () => {
    dispatch({ type: JoinPlaylistModalStateActionTypes.BEGIN_FORM_SUBMISSION });
    const saveDataResponse = await saveFormData(
      joinPlaylistState.playlist.objectID,
      appState.authUser.uid,
    );
    if (saveDataResponse.error) {
      dispatch({
        type:
          JoinPlaylistModalStateActionTypes.FINISHED_FORM_SUBMISSION_WITH_ERROR,
        subplaylistError: saveDataResponse.error,
      });
    } else {
      dispatch({
        type:
          JoinPlaylistModalStateActionTypes.FINISHED_FORM_SUBMISSION_SUCCESSFULLY,
      });
    }
  };
  const viewContent = (
    <Grid>
      <Grid.Column width={16}>
        <Typography.Paragraph>
          {`You're about to request permission to become a contributor for the playlist: `}
          <Typography.Text
            strong
          >{`${joinPlaylistState.playlist.title}`}</Typography.Text>
          {`. Do you meet the qualifications for this playlist?`}
        </Typography.Paragraph>
        <Typography.Paragraph>
          <Typography.Text strong>{`Required Qualifications:`}</Typography.Text>
          <Typography.Text>{`${joinPlaylistState.playlist.creatorQualifications}`}</Typography.Text>
        </Typography.Paragraph>
      </Grid.Column>
    </Grid>
  );

  const successResultUI = (
    <Result
      status="success"
      title="Done. You've requested to be a contributor!"
      subTitle="You'll receive a notification once your request has been reviewed."
    />
  );

  const errorResultUI = (
    <Result
      status="error"
      title="Failed to Request Permission"
      subTitle={`The following error occurred: ${
        joinPlaylistState.subplaylistError
          ? joinPlaylistState.subplaylistError
          : ""
      }. Please try again.`}
    />
  );

  const resultUI = joinPlaylistState.subplaylistError
    ? errorResultUI
    : successResultUI;

  const modalContent = joinPlaylistState.successfullySubmitted
    ? resultUI
    : viewContent;

  const modalFooter = joinPlaylistState.successfullySubmitted
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
          loading={joinPlaylistState.isSubmittingForm}
          onClick={handleSubmit}
        >
          {"Submit"}
        </Button>,
      ];

  return (
    <Modal
      visible={props.show}
      title={"Become A Contributor"}
      okText={"Finish"}
      width={"800px"}
      footer={modalFooter}
      afterClose={() =>
        dispatch({ type: JoinPlaylistModalStateActionTypes.CLEAR_MODAL_DATA })
      }
      onCancel={() => props.closeModal(false)}
    >
      {modalContent}
    </Modal>
  );
};

export default JoinPlaylistModal;
