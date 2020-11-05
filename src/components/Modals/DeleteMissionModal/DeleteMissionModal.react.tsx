import { Button, Modal, Result, Typography } from "antd";
import { AppContext } from "App";
import * as DataTypes from "data/types";
import React from "react";
import { Grid } from "semantic-ui-react";
import {
  DeleteMissionModalStateActionTypes,
  deleteMissionModalReducer,
  deleteMissionModalStateInit,
} from "./DeleteMissionModalReducer";
import { saveFormData } from "./DeleteMissionModalUtil";

interface Props {
  show: boolean;
  closeModal: (closeModalParams: DataTypes.Local.CloseModalParams) => void;
  mission: DataTypes.Mission;
}

const DeleteMissionModal: React.FC<Props> = (props: Props) => {
  const [appState] = React.useContext(AppContext);
  const [deleteMissionState, dispatch] = React.useReducer(
    deleteMissionModalReducer,
    {
      mission: props.mission,
    },
    deleteMissionModalStateInit,
  );

  const handleSubmit = async () => {
    dispatch({
      type: DeleteMissionModalStateActionTypes.BEGIN_FORM_SUBMISSION,
    });
    const saveDataResponse = await saveFormData(
      deleteMissionState.mission.objectID,
      appState.authUser.uid,
    );
    if (saveDataResponse.error) {
      dispatch({
        type:
          DeleteMissionModalStateActionTypes.FINISHED_FORM_SUBMISSION_WITH_ERROR,
        submissionError: saveDataResponse.error,
      });
      props.closeModal({ shouldReload: false, error: saveDataResponse.error });
    } else {
      dispatch({
        type:
          DeleteMissionModalStateActionTypes.FINISHED_FORM_SUBMISSION_SUCCESSFULLY,
      });
      props.closeModal({ shouldReload: true });
    }
  };

  const viewContent = (
    <Grid>
      <Grid.Column width={16}>
        <Typography.Paragraph>
          {`Are you sure you want to delete the collection:  `}
          <Typography.Text strong>{`${props.mission.title}`}</Typography.Text>
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
      loading={deleteMissionState.isSubmittingForm}
      onClick={handleSubmit}
    >
      {"Confirm"}
    </Button>,
  ];

  return (
    <Modal
      visible={props.show}
      title={"Delete Collection"}
      okText={"Finish"}
      width={"800px"}
      footer={modalFooter}
      afterClose={() =>
        dispatch({
          type: DeleteMissionModalStateActionTypes.CLEAR_MODAL_DATA,
        })
      }
      onCancel={() => props.closeModal({ shouldReload: false })}
    >
      {viewContent}
    </Modal>
  );
};

export default DeleteMissionModal;
