import { Button, Modal, Result, Typography } from "antd";
import { AppContext } from "App";
import * as DataTypes from "data/types";
import React from "react";
import { Grid } from "semantic-ui-react";
import {
  RemoveVideoModalStateActionTypes,
  removeVideoModalReducer,
  removeVideoModalStateInit,
} from "./RemoveVideoModalReducer";
import { saveFormData } from "./RemoveVideoModalUtil";

interface Props {
  show: boolean;
  closeModal: (closeModalParams: DataTypes.Local.CloseModalParams) => void;
  resource: DataTypes.Resource;
  section: DataTypes.Section;
  playlistId: string;
}

const RemoveVideoModal: React.FC<Props> = (props: Props) => {
  const [appState] = React.useContext(AppContext);
  const [removeVideoState, dispatch] = React.useReducer(
    removeVideoModalReducer,
    {
      resource: props.resource,
      section: props.section,
      playlistId: props.playlistId,
    },
    removeVideoModalStateInit,
  );

  const handleSubmit = async () => {
    dispatch({ type: RemoveVideoModalStateActionTypes.BEGIN_FORM_SUBMISSION });
    const saveDataResponse = await saveFormData(
      removeVideoState.resource.objectID,
      removeVideoState.playlistId,
      removeVideoState.section.sectionIndex,
      appState.authUser.uid,
    );
    if (saveDataResponse.error) {
      dispatch({
        type:
          RemoveVideoModalStateActionTypes.FINISHED_FORM_SUBMISSION_WITH_ERROR,
        submissionError: saveDataResponse.error,
      });
      props.closeModal({ shouldReload: false, error: saveDataResponse.error });
    } else {
      dispatch({
        type:
          RemoveVideoModalStateActionTypes.FINISHED_FORM_SUBMISSION_SUCCESSFULLY,
      });
      props.closeModal({ shouldReload: true });
    }
  };

  const viewContent = (
    <Grid>
      <Grid.Column width={16}>
        <Typography.Paragraph>
          {`Are you sure you want to remove the video `}
          <Typography.Text strong>{`${props.resource.title}`}</Typography.Text>
          {` from the playlist section`}{" "}
          <Typography.Text strong>{`${props.section.title}`}</Typography.Text>
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
      loading={removeVideoState.isSubmittingForm}
      onClick={handleSubmit}
    >
      {"Confirm"}
    </Button>,
  ];

  return (
    <Modal
      visible={props.show}
      title={"Remove Video"}
      okText={"Finish"}
      width={"800px"}
      footer={modalFooter}
      afterClose={() =>
        dispatch({ type: RemoveVideoModalStateActionTypes.CLEAR_MODAL_DATA })
      }
      onCancel={() => props.closeModal({ shouldReload: false })}
      centered
    >
      {viewContent}
    </Modal>
  );
};

export default RemoveVideoModal;
