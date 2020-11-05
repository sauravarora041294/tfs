import { Button, Form, Modal, Result } from "antd";
import { AppContext } from "App";
import React, { MutableRefObject } from "react";
import { withRouter } from "react-router";
import { compose } from "recompose";
import { Grid } from "semantic-ui-react";
import { History } from "history";
import {
  CreatorMissionModalStateActionTypes,
  createMissionReducer,
  createMissionStateInit,
} from "./CreateMissionModalReducer";
import { saveFormData } from "./CreateMissionModalUtil";
import MissionDetailsForm from "./MissionDetailsForm.react";
import { castFormToRefForwardingComponent } from "utilities/index";

interface Props {
  history?: History;
  show: boolean;
  closeModal: (shouldReload: boolean) => void;
}

const CreateMissionModal: React.FC<Props> = (props: Props) => {
  const [appState] = React.useContext(AppContext);
  const [createMissionState, dispatch] = React.useReducer(
    createMissionReducer,
    {},
    createMissionStateInit,
  );

  const detailsFormRef: MutableRefObject<any> = React.useRef();
  const DetailsForm = Form.create({ name: "missiondetails" })(
    React.forwardRef(castFormToRefForwardingComponent(MissionDetailsForm)),
  );

  const handleSubmit = async () => {
    detailsFormRef.current.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        dispatch({
          type: CreatorMissionModalStateActionTypes.BEGIN_FORM_SUBMISSION,
        });
        const saveDataResponse = await saveFormData(
          values,
          appState.authUser.uid,
        );
        if (saveDataResponse.error) {
          dispatch({
            type:
              CreatorMissionModalStateActionTypes.FINISHED_FORM_SUBMISSION_WITH_ERROR,
            submissionError: saveDataResponse.error,
          });
        } else {
          dispatch({
            type:
              CreatorMissionModalStateActionTypes.FINISHED_FORM_SUBMISSION_SUCCESSFULLY,
            savedMissionId: saveDataResponse.saveMissionResponse.objectID,
          });
        }
      }
    });
  };

  const detailsForm = React.useMemo(
    () => <DetailsForm ref={detailsFormRef} />,
    [detailsFormRef],
  );

  const viewContent = (
    <Grid>
      <Grid.Column width={16}>{detailsForm}</Grid.Column>
    </Grid>
  );

  const successResultUI = (
    <Result
      status="success"
      title="Successfully Created Your Collection!"
      subTitle="You can now customize it by adding videos and sections."
      extra={[
        <Button key="later" onClick={() => props.closeModal(true)}>
          Maybe Later
        </Button>,
        <Button
          type="primary"
          key="console"
          onClick={() =>
            props.history.push(
              `/editcollection/${createMissionState.savedMissionId}`,
            )
          }
        >
          Customize Now
        </Button>,
      ]}
    />
  );

  const errorResultUI = (
    <Result
      status="error"
      title="Upload Failed"
      subTitle={`The following error occurred: ${
        createMissionState.submissionError
          ? createMissionState.submissionError
          : ""
        }. Please try again.`}
    />
  );

  const resultUI = createMissionState.submissionError
    ? errorResultUI
    : successResultUI;

  const modalContent = createMissionState.successfullySubmitted
    ? resultUI
    : viewContent;

  const modalFooter = createMissionState.successfullySubmitted
    ? null
    : [
      <Button key="back" onClick={() => props.closeModal(false)}>
        {"Cancel"}
      </Button>,
      <Button
        key="submit"
        type="primary"
        loading={createMissionState.isSubmittingForm}
        onClick={handleSubmit}
      >
        {"Submit"}
      </Button>,
    ];

  return (
    <Modal
      visible={props.show}
      title={"Create a Collection"}
      okText={"Finish"}
      width={"800px"}
      footer={modalFooter}
      afterClose={() =>
        dispatch({ type: CreatorMissionModalStateActionTypes.CLEAR_MODAL_DATA })
      }
      onCancel={() => props.closeModal(false)}
    >
      {modalContent}
    </Modal>
  );
};

export default compose<Props, Props>(withRouter)(CreateMissionModal);
