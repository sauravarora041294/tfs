import { Button, Modal, Result, Typography } from "antd";
import { AppContext } from "App";
import * as DataTypes from "data/types";
import React from "react";
import { Grid } from "semantic-ui-react";
import {
  DeleteResourceModalStateActionTypes,
  deleteResourceModalReducer,
  deleteResourceModalStateInit,
} from "./DeleteResourceModalReducer";
import { saveFormData } from "./DeleteResourceModalUtil";

interface Props {
  show: boolean;
  closeModal: (closeModalParams: DataTypes.Local.CloseModalParams) => void;
  resource: DataTypes.Resource;
}

const DeleteResourceModal: React.FC<Props> = (props: Props) => {
  const [appState] = React.useContext(AppContext);
  const [deleteResourceState, dispatch] = React.useReducer(
    deleteResourceModalReducer,
    {
      resource: props.resource,
    },
    deleteResourceModalStateInit,
  );

  const handleSubmit = async () => {
    dispatch({
      type: DeleteResourceModalStateActionTypes.BEGIN_FORM_SUBMISSION,
    });
    const saveDataResponse = await saveFormData(
      deleteResourceState.resource.objectID,
      appState.authUser.uid,
    );
    if (saveDataResponse.error) {
      dispatch({
        type:
          DeleteResourceModalStateActionTypes.FINISHED_FORM_SUBMISSION_WITH_ERROR,
        subresourceError: saveDataResponse.error,
      });
      props.closeModal({ shouldReload: false, error: saveDataResponse.error });
    } else {
      dispatch({
        type:
          DeleteResourceModalStateActionTypes.FINISHED_FORM_SUBMISSION_SUCCESSFULLY,
      });
      props.closeModal({ shouldReload: true });
    }
  };

  const viewContent = (
    <Grid>
      <Grid.Column width={16}>
        <Typography.Paragraph>
          {`Are you sure you want to delete the video:  `}
          <Typography.Text strong>{`${props.resource.title}`}</Typography.Text>
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
      loading={deleteResourceState.isSubmittingForm}
      onClick={handleSubmit}
    >
      {"Confirm"}
    </Button>,
  ];

  return (
    <Modal
      visible={props.show}
      title={"Delete Video"}
      okText={"Finish"}
      width={"800px"}
      footer={modalFooter}
      afterClose={() =>
        dispatch({
          type: DeleteResourceModalStateActionTypes.CLEAR_MODAL_DATA,
        })
      }
      onCancel={() => props.closeModal({ shouldReload: false })}
    >
      {viewContent}
    </Modal>
  );
};

export default DeleteResourceModal;
