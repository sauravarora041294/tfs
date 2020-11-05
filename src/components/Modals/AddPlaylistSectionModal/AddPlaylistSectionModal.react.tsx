import { Button, Form, Modal, Result } from "antd";
import { AppContext } from "App";
import * as DataTypes from "data/types";
import React from "react";
import { Grid } from "semantic-ui-react";
import AddPlaylistSectionForm from "./AddPlaylistSectionForm.react";
import {
  AddPlaylistSectionModalStateActionTypes,
  addPlaylistSectionReducer,
  addPlaylistSectionStateInit,
} from "./AddPlaylistSectionModalReducer";
import { saveFormData } from "./AddPlaylistSectionModalUtil";
import { castFormToRefForwardingComponent } from "utilities/index";

interface Props {
  show: boolean;
  closeModal: (closeModalParams: DataTypes.Local.CloseModalParams) => void;
  playlist: DataTypes.Playlist;
  sectionIndex?: number;
  sectionData?: DataTypes.Section;
}

const AddPlaylistSectionModal: React.FC<Props> = (props: Props) => {
  const [appState] = React.useContext(AppContext);
  const [addPlaylistSectionState, dispatch] = React.useReducer(
    addPlaylistSectionReducer,
    {
      playlist: props.playlist,
      sectionIndex: props.sectionIndex,
      sectionData: props.sectionData,
    },
    addPlaylistSectionStateInit,
  );

  const sectionFormRef: React.MutableRefObject<any> = React.useRef();
  const SectionForm = Form.create({ name: "playlistsection" })(
    React.forwardRef(castFormToRefForwardingComponent(AddPlaylistSectionForm)),
  );

  const handleSubmit = async (): Promise<void> => {
    sectionFormRef.current.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        dispatch({
          type: AddPlaylistSectionModalStateActionTypes.BEGIN_FORM_SUBMISSION,
        });
        const saveDataResponse = await saveFormData(
          values,
          addPlaylistSectionState.playlist.objectID,
          appState.authUser.uid,
        );
        if (saveDataResponse.error) {
          dispatch({
            type:
              AddPlaylistSectionModalStateActionTypes.FINISHED_FORM_SUBMISSION_WITH_ERROR,
            submissionError: saveDataResponse.error,
          });
          props.closeModal({
            shouldReload: false,
            error: saveDataResponse.error,
          });
        } else {
          dispatch({
            type:
              AddPlaylistSectionModalStateActionTypes.FINISHED_FORM_SUBMISSION_SUCCESSFULLY,
          });
          props.closeModal({ shouldReload: true });
        }
      }
    });
  };

  const sectionForm = React.useMemo(
    () => <SectionForm ref={sectionFormRef} />,
    [sectionFormRef],
  );

  const viewContent = (
    <Grid>
      <Grid.Column width={16}>{sectionForm}</Grid.Column>
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
      loading={addPlaylistSectionState.isSubmittingForm}
      onClick={handleSubmit}
    >
      {"Submit"}
    </Button>,
  ];

  return (
    <Modal
      visible={props.show}
      title={`Add Section`}
      okText={"Finish"}
      width={"800px"}
      footer={modalFooter}
      afterClose={() =>
        dispatch({
          type: AddPlaylistSectionModalStateActionTypes.CLEAR_MODAL_DATA,
        })
      }
      onCancel={() => props.closeModal({ shouldReload: false })}
      centered
    >
      {viewContent}
    </Modal>
  );
};

export default AddPlaylistSectionModal;
