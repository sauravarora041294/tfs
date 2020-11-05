import { Button, Modal, Result, Typography } from "antd";
import { AppContext } from "App";
import * as DataTypes from "data/types";
import React from "react";
import { Grid } from "semantic-ui-react";
import {
  JoinMissionModalStateActionTypes,
  joinMissionModalReducer,
  joinMissionModalStateInit,
} from "./JoinMissionModalReducer";
import { saveFormData } from "./JoinMissionModalUtil";

interface Props {
  show: boolean;
  closeModal: (shouldReload: boolean) => void;
  missionToJoin: DataTypes.Mission;
}

const JoinMissionModal: React.FC<Props> = (props: Props) => {
  const [appState] = React.useContext(AppContext);
  const [joinMissionState, dispatch] = React.useReducer(
    joinMissionModalReducer,
    {
      mission: props.missionToJoin,
    },
    joinMissionModalStateInit,
  );

  const handleSubmit = async () => {
    dispatch({ type: JoinMissionModalStateActionTypes.BEGIN_FORM_SUBMISSION });
    const saveDataResponse = await saveFormData(
      joinMissionState.mission.objectID,
      appState.authUser.uid,
    );
    if (saveDataResponse.error) {
      dispatch({
        type:
          JoinMissionModalStateActionTypes.FINISHED_FORM_SUBMISSION_WITH_ERROR,
        submissionError: saveDataResponse.error,
      });
    } else {
      dispatch({
        type:
          JoinMissionModalStateActionTypes.FINISHED_FORM_SUBMISSION_SUCCESSFULLY,
      });
    }
  };
  const viewContent = (
    <Grid>
      <Grid.Column width={16}>
        <Typography.Paragraph>
          {`You're about to request permission to become a contributor for the collection: `}
          <Typography.Text
            strong
          >{`${joinMissionState.mission.title}`}</Typography.Text>
          {`. Do you meet the qualifications for this collection?`}
        </Typography.Paragraph>
        <Typography.Paragraph>
          <Typography.Text strong>{`Required Qualifications:`}</Typography.Text>
          <Typography.Text>{`${joinMissionState.mission.creatorQualifications}`}</Typography.Text>
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
        joinMissionState.submissionError ? joinMissionState.submissionError : ""
      }. Please try again.`}
    />
  );

  const resultUI = joinMissionState.submissionError
    ? errorResultUI
    : successResultUI;

  const modalContent = joinMissionState.successfullySubmitted
    ? resultUI
    : viewContent;

  const modalFooter = joinMissionState.successfullySubmitted
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
          loading={joinMissionState.isSubmittingForm}
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
        dispatch({ type: JoinMissionModalStateActionTypes.CLEAR_MODAL_DATA })
      }
      onCancel={() => props.closeModal(false)}
    >
      {modalContent}
    </Modal>
  );
};

export default JoinMissionModal;
