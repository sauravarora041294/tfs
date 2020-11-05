import { Button, Form, Modal, Result } from "antd";
import { AppContext } from "App";
import * as DataTypes from "data/types";
import React, { MutableRefObject } from "react";
import { Grid } from "semantic-ui-react";
import EditMissionDetailsForm from "./EditMissionDetailsForm.react";
import {
  EditMissionInfoModalStateActionTypes,
  editMissionReducer,
  editMissionStateInit,
} from "./EditMissionInfoModalReducer";
import { saveFormData } from "./EditMissionInfoModalUtil";
import { castFormToRefForwardingComponent } from "utilities/index";

interface Props {
  show: boolean;
  closeModal: (modalCloseParams: {
    shouldReload: boolean;
    error?: Error;
  }) => void;
  mission: DataTypes.Mission;
}

const EditMissionInfoModal: React.FC<Props> = (props: Props) => {
  const [appState] = React.useContext(AppContext);
  const [editMissionState, dispatch] = React.useReducer(
    editMissionReducer,
    { mission: props.mission },
    editMissionStateInit,
  );

  const detailsFormRef: MutableRefObject<any> = React.useRef();
  const DetailsForm = Form.create({ name: "missiondetails" })(
    React.forwardRef(castFormToRefForwardingComponent(EditMissionDetailsForm)),
  );

  const handleSubmit = async () => {
    detailsFormRef.current.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        dispatch({
          type: EditMissionInfoModalStateActionTypes.BEGIN_FORM_SUBMISSION,
        });
        const saveDataResponse = await saveFormData(
          values,
          appState.authUser.uid,
          editMissionState.mission.objectID,
        );
        if (saveDataResponse.error) {
          dispatch({
            type:
              EditMissionInfoModalStateActionTypes.FINISHED_FORM_SUBMISSION_WITH_ERROR,
            submissionError: saveDataResponse.error,
          });
          props.closeModal({
            shouldReload: false,
            error: saveDataResponse.error,
          });
        } else {
          dispatch({
            type:
              EditMissionInfoModalStateActionTypes.FINISHED_FORM_SUBMISSION_SUCCESSFULLY,
          });
          props.closeModal({ shouldReload: true });
        }
      }
    });
  };

  const detailsForm = React.useMemo(
    () => (
      <DetailsForm
        {...{ ref: detailsFormRef, initialFormData: props.mission }}
      />
    ),
    [detailsFormRef, props.mission],
  );

  const viewContent = (
    <Grid>
      <Grid.Column width={16}>{detailsForm}</Grid.Column>
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
      loading={editMissionState.isSubmittingForm}
      onClick={handleSubmit}
    >
      {"Submit"}
    </Button>,
  ];

  return (
    <Modal
      visible={props.show}
      title={"Edit Collection Info"}
      okText={"Finish"}
      footer={modalFooter}
      afterClose={() =>
        dispatch({
          type: EditMissionInfoModalStateActionTypes.CLEAR_MODAL_DATA,
        })
      }
      onCancel={() => props.closeModal({ shouldReload: false })}
      centered
    >
      {viewContent}
    </Modal>
  );
};

export default EditMissionInfoModal;
