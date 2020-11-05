import { Button, Form, Modal, Result } from "antd";
import { AppContext } from "App";
import * as DataTypes from "data/types";
import React, { MutableRefObject } from "react";
import { Grid } from "semantic-ui-react";
import EditVideoDetailsForm from "./EditVideoDetailsForm.react";
import EditVideoModalPreview from "./EditVideoModalPreview.react";
import {
  EditVideoModalStateActionTypes,
  editVideoReducer,
  editVideoStateInit,
} from "./EditVideoModalReducer";
import { saveFormData } from "./EditVideoModalUtil";
import { castFormToRefForwardingComponent } from "utilities/index";

interface Props {
  show: boolean;
  resource: DataTypes.Resource;
  closeModal: (shouldReload: boolean) => void;
}

const EditVideoModal: React.FC<Props> = (props: Props) => {
  const [appState] = React.useContext(AppContext);
  const [editVideoState, dispatch] = React.useReducer(
    editVideoReducer,
    { resource: props.resource },
    editVideoStateInit,
  );

  const detailsFormRef: MutableRefObject<any> = React.useRef();
  const DetailsForm = Form.create({ name: "videodetails" })(
    React.forwardRef(castFormToRefForwardingComponent(EditVideoDetailsForm)),
  );

  const handleSubmit = async () => {
    detailsFormRef.current.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        dispatch({
          type: EditVideoModalStateActionTypes.BEGIN_FORM_SUBMISSION,
        });
        const saveDataResponse = await saveFormData(
          editVideoState.resource.objectID,
          values,
          appState.authUser.uid,
        );
        if (saveDataResponse.error) {
          dispatch({
            type:
              EditVideoModalStateActionTypes.FINISHED_FORM_SUBMISSION_WITH_ERROR,
            submissionError: saveDataResponse.error,
          });
        } else {
          dispatch({
            type:
              EditVideoModalStateActionTypes.FINISHED_FORM_SUBMISSION_SUCCESSFULLY,
          });
        }
      }
    });
  };

  const videoPreview = React.useMemo(
    () => (
      <EditVideoModalPreview
        videoURL={editVideoState.resource.resourceUrl}
        setVideoDuration={videoDuration =>
          dispatch({
            type: EditVideoModalStateActionTypes.SET_VIDEO_DURATION,
            videoDuration: videoDuration,
          })
        }
      />
    ),
    [editVideoState.resource.resourceUrl, dispatch],
  );

  const detailsForm = React.useMemo(
    () => (
      <DetailsForm
        {...{ ref: detailsFormRef, initialFormData: editVideoState.resource }}
      />
    ),
    [detailsFormRef, editVideoState.resource],
  );

  const viewContent = (
    <Grid>
      <Grid.Column width={7}>{videoPreview}</Grid.Column>
      <Grid.Column width={9}>{detailsForm}</Grid.Column>
    </Grid>
  );

  const successResultUI = (
    <Result
      status="success"
      title="Successfully Edited Your Video!"
      subTitle="Your changes should be live."
    />
  );

  const errorResultUI = (
    <Result
      status="error"
      title="Edit Failed"
      subTitle={`The following error occurred: ${
        editVideoState.submissionError ? editVideoState.submissionError : ""
        }. Please try again.`}
    />
  );

  const resultUI = editVideoState.submissionError
    ? errorResultUI
    : successResultUI;

  const modalContent = editVideoState.successfullySubmitted
    ? resultUI
    : viewContent;

  const modalFooter = editVideoState.successfullySubmitted
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
        loading={editVideoState.isSubmittingForm}
        onClick={handleSubmit}
      >
        {"Submit"}
      </Button>,
    ];

  return (
    <Modal
      visible={props.show}
      title={`Edit Video`}
      okText={"Finish"}
      width={"800px"}
      footer={modalFooter}
      afterClose={() =>
        dispatch({ type: EditVideoModalStateActionTypes.CLEAR_MODAL_DATA })
      }
      onCancel={() => props.closeModal(false)}
    >
      {modalContent}
    </Modal>
  );
};

export default EditVideoModal;
