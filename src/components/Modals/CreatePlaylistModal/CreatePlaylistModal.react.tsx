import { Button, Form, Modal, Result } from "antd";
import { AppContext } from "App";
import React, { MutableRefObject } from "react";
import { withRouter } from "react-router";
import { compose } from "recompose";
import { Grid } from "semantic-ui-react";
import { History } from "history";
import {
  CreatePlaylistModalStateActionTypes,
  createPlaylistReducer,
  createPlaylistStateInit,
} from "./CreatePlaylistModalReducer";
import { saveFormData } from "./CreatePlaylistModalUtil";
import PlaylistDetailsForm from "./PlaylistDetailsForm.react";
import { castFormToRefForwardingComponent } from "utilities/index";

interface Props {
  history?: History;
  show: boolean;
  closeModal: (shouldReload: boolean) => void;
}

const CreatePlaylistModal: React.FC<Props> = (props: Props) => {
  const [appState] = React.useContext(AppContext);
  const [createPlaylistState, dispatch] = React.useReducer(
    createPlaylistReducer,
    {},
    createPlaylistStateInit,
  );

  const detailsFormRef: MutableRefObject<any> = React.useRef();
  const DetailsForm = Form.create({ name: "playlistdetails" })(
    React.forwardRef(castFormToRefForwardingComponent(PlaylistDetailsForm)),
  );

  const handleSubmit = async () => {
    detailsFormRef.current.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        dispatch({
          type: CreatePlaylistModalStateActionTypes.BEGIN_FORM_SUBMISSION,
        });
        if (values.thumbnail && values.thumbnail[0])
          values.thumbnailUrl = URL.createObjectURL(
            values.thumbnail[0].originFileObj,
          );
        const saveDataResponse = await saveFormData(
          values,
          appState.authUser.uid,
        );
        if (saveDataResponse.error) {
          dispatch({
            type:
              CreatePlaylistModalStateActionTypes.FINISHED_FORM_SUBMISSION_WITH_ERROR,
            submissionError: saveDataResponse.error,
          });
        } else {
          dispatch({
            type:
              CreatePlaylistModalStateActionTypes.FINISHED_FORM_SUBMISSION_SUCCESSFULLY,
            savedPlaylistId: saveDataResponse.savePlaylistResponse.objectID,
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
      title="Successfully Created Your Playlist!"
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
              `/editplaylist/${createPlaylistState.savedPlaylistId}`,
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
        createPlaylistState.submissionError
          ? createPlaylistState.submissionError
          : ""
        }. Please try again.`}
    />
  );

  const resultUI = createPlaylistState.submissionError
    ? errorResultUI
    : successResultUI;

  const modalContent = createPlaylistState.successfullySubmitted
    ? resultUI
    : viewContent;

  const modalFooter = createPlaylistState.successfullySubmitted
    ? null
    : [
      <Button key="back" onClick={() => props.closeModal(false)}>
        {"Cancel"}
      </Button>,
      <Button
        key="submit"
        type="primary"
        loading={createPlaylistState.isSubmittingForm}
        onClick={handleSubmit}
      >
        {"Submit"}
      </Button>,
    ];

  return (
    <Modal
      visible={props.show}
      title={"Create a Playlist"}
      okText={"Finish"}
      width={"800px"}
      footer={modalFooter}
      afterClose={() =>
        dispatch({ type: CreatePlaylistModalStateActionTypes.CLEAR_MODAL_DATA })
      }
      onCancel={() => props.closeModal(false)}
    >
      {modalContent}
    </Modal>
  );
};

export default compose<Props, Props>(withRouter)(CreatePlaylistModal);
