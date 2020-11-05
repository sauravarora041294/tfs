import { Form, Modal, Typography, Row } from "antd";

import React from "react";
import { withRouter } from "react-router";
import { compose } from "recompose";
import {
  ResolveMissionContentRequestModalStateActionTypes,
  resolveMissionContentRequestModalStateInit,
  resolveMissionContentRequestModalReducer,
} from "./ResolveMissionContentRequestModalReducer";
import { saveFormData } from "./ResolveMissionContentRequestModalUtil";
import ResolveMissionContentRequestForm from "./ResolveMissionContentRequestForm.react";

import * as DataTypes from "data/types";
import Avatar from "components/Avatar";
import { getFormattedDate } from "utilities";
import s from "./ResolveMissionContentRequest.module.scss";
import { castFormToRefForwardingComponent } from "utilities/index";

interface Props {
  show: boolean;
  closeModal: (closeModalParams: DataTypes.Local.CloseModalParams) => void;
  contentRequest: DataTypes.ContentRequest;
  missionResources: Array<DataTypes.Resource>;
  missionPlaylists: Array<DataTypes.Playlist>;
  currentUser: DataTypes.Creator;
}

const ResolveMissionContentRequestModal: React.FC<Props> = (props: Props) => {
  const [resolveMissionContentRequestModalState, dispatch] = React.useReducer(
    resolveMissionContentRequestModalReducer,
    {
      missionResources: props.missionResources,
      missionPlaylists: props.missionPlaylists,
      contentRequest: props.contentRequest,
      currentUser: props.currentUser,
    },
    resolveMissionContentRequestModalStateInit,
  );

  const resolveMissionContentRequestFormRef: React.MutableRefObject<any> = React.useRef();

  const ResolveMissionContentRequestFormEnhanced = Form.create({
    name: "resolvecontent",
  })(React.forwardRef(castFormToRefForwardingComponent(ResolveMissionContentRequestForm)));

  const handleResolveRequest = (contentRequestId: string) => {
    resolveMissionContentRequestFormRef.current.validateFieldsAndScroll(
      async (err, values) => {
        if (!err) {
          dispatch({
            type:
              ResolveMissionContentRequestModalStateActionTypes.BEGIN_FORM_SUBMISSION,
          });
          dispatch({
            type:
              ResolveMissionContentRequestModalStateActionTypes.SET_FORM_DATA,
            formData: values,
          });
          const saveDataResponse = await saveFormData(
            contentRequestId,
            props.currentUser.objectID,
            values.contentIds,
            values.reviewDetails,
          );
          if (saveDataResponse.error) {
            dispatch({
              type:
                ResolveMissionContentRequestModalStateActionTypes.FINISHED_FORM_SUBMISSION_WITH_ERROR,
              submissionError: saveDataResponse.error,
            });
            props.closeModal({
              shouldReload: false,
              error: saveDataResponse.error,
            });
          } else {
            dispatch({
              type:
                ResolveMissionContentRequestModalStateActionTypes.FINISHED_FORM_SUBMISSION_SUCCESSFULLY,
            });
            dispatch({
              type:
                ResolveMissionContentRequestModalStateActionTypes.SET_FORM_DATA,
              formData: { contentIds: [], reviewDetails: "" },
            });
            props.closeModal({ shouldReload: true });
          }
        }
      },
    );
  };

  return (
    <Modal
      title="Resolve Content Request"
      visible={props.show}
      onCancel={() => props.closeModal({ shouldReload: false })}
      onOk={() => handleResolveRequest(props.contentRequest.objectID)}
      okText="Resolve"
    >
      {props.contentRequest && (
        <React.Fragment>
          <Row
            className={s.resolveMissionContentRequestModalRequester}
            type="flex"
            align="middle"
          >
            <Avatar user={props.contentRequest.metadata.requester} />
            <div className={s.resolveMissionContentRequestModalRequesterName}>
              {props.contentRequest.metadata.requester.firstName}{" "}
              {props.contentRequest.metadata.requester.lastName}
            </div>
          </Row>
          <Typography.Paragraph>
            {props.contentRequest.description}
          </Typography.Paragraph>
          <Typography.Paragraph>
            Requested on{" "}
            {getFormattedDate(props.contentRequest.dateCreated._seconds)}
          </Typography.Paragraph>
          <Row>
            <ResolveMissionContentRequestFormEnhanced
              ref={resolveMissionContentRequestFormRef}
              {...{
                ...props,
                formData: resolveMissionContentRequestModalState.formData,
              }}
            />
          </Row>
        </React.Fragment>
      )}
    </Modal>
  );
};

export default compose<Props, Props>(withRouter)(
  ResolveMissionContentRequestModal,
);
