import { Button, Form, Modal, Result } from "antd";
import { AppContext } from "App";
import * as DataTypes from "data/types";
import React, { MutableRefObject } from "react";
import { Grid } from "semantic-ui-react";
import EditPlaylistDetailsForm from "./EditPlaylistDetailsForm.react";
import {
  EditPlaylistInfoModalStateActionTypes,
  editPlaylistReducer,
  editPlaylistStateInit,
} from "./EditPlaylistInfoModalReducer";
import { saveFormData } from "./EditPlaylistInfoModalUtil";
import { castFormToRefForwardingComponent } from "utilities/index";

interface Props {
  show: boolean;
  closeModal: (closeModalParams: DataTypes.Local.CloseModalParams) => void;
  playlist: DataTypes.Playlist;
}

const EditPlaylistInfoModal: React.FC<Props> = (props: Props) => {
  const [appState] = React.useContext(AppContext);
  const [editPlaylistState, dispatch] = React.useReducer(
    editPlaylistReducer,
    { playlist: props.playlist },
    editPlaylistStateInit,
  );

  const detailsFormRef: MutableRefObject<any> = React.useRef();
  const DetailsForm = Form.create({ name: "playlistdetails" })(
    React.forwardRef(castFormToRefForwardingComponent(EditPlaylistDetailsForm)),
  );

  const handleSubmit = async () => {
    detailsFormRef.current.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        dispatch({
          type: EditPlaylistInfoModalStateActionTypes.BEGIN_FORM_SUBMISSION,
        });
        const saveDataResponse = await saveFormData(
          values,
          appState.authUser.uid,
          editPlaylistState.playlist.objectID,
        );
        if (saveDataResponse.error) {
          dispatch({
            type:
              EditPlaylistInfoModalStateActionTypes.FINISHED_FORM_SUBMISSION_WITH_ERROR,
            submissionError: saveDataResponse.error,
          });
          props.closeModal({
            shouldReload: false,
            error: saveDataResponse.error,
          });
        } else {
          dispatch({
            type:
              EditPlaylistInfoModalStateActionTypes.FINISHED_FORM_SUBMISSION_SUCCESSFULLY,
          });
          props.closeModal({ shouldReload: true });
        }
      }
    });
  };

  const detailsForm = React.useMemo(
    () => (
      <DetailsForm
        {...{ ref: detailsFormRef, initialFormData: props.playlist }}
      />
    ),
    [detailsFormRef, props.playlist],
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
      loading={editPlaylistState.isSubmittingForm}
      onClick={handleSubmit}
    >
      {"Submit"}
    </Button>,
  ];
  return (
    <Modal
      visible={props.show}
      title={"Edit Playlist Info"}
      okText={"Finish"}
      footer={modalFooter}
      afterClose={() =>
        dispatch({
          type: EditPlaylistInfoModalStateActionTypes.CLEAR_MODAL_DATA,
        })
      }
      onCancel={() => props.closeModal({ shouldReload: false })}
      centered
    >
      {viewContent}
    </Modal>
  );
};

export default EditPlaylistInfoModal;
