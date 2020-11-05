import * as DataTypes from "data/types";
import React from "react";
import { withRouter } from "react-router";
import { compose } from "recompose";
import { Grid, Image } from "semantic-ui-react";
import { Button, Card, Form, Typography, notification, Icon } from "antd";
import { History, Location } from "history";
import {
  EditVideoStateActionTypes,
  editVideoReducer,
  editVideoStateInit,
} from "./EditVideoReducer";
import EditVideoPageHeader from "./EditVideoPageHeader.react";
import EditVideoDetailsForm from "./EditVideoDetailsForm.react";
import EditVideoResourcePreview from "./EditVideoResourcePreview";
import { updateVideoDetails } from "./EditVideoUtil";
import s from "./EditVideo.module.scss";
import { FirestoreRealtime } from "FirebaseClient";
import DeleteResourceModal from "components/Modals/DeleteResourceModal";
import WhiteCard from "components/WhiteCard";
import { castFormToRefForwardingComponent } from "utilities/index";

interface Props {
  currentUser: DataTypes.Creator;
  resource: DataTypes.Resource;
  history?: History;
  location?: Location;
}

const EditVideoView: React.FC<Props> = (props: Props) => {
  const [editVideoState, dispatch] = React.useReducer(
    editVideoReducer,
    { resource: props.resource, currentUser: props.currentUser },
    editVideoStateInit,
  );

  const resourceListenerCallback = (object: any) => {
    object &&
      dispatch({
        type: EditVideoStateActionTypes.UPDATE_RESOURCE,
        resource: object as DataTypes.Resource,
      });
  };

  React.useEffect(() => {
    const detachResourceObserver =
      props.resource.objectID &&
      FirestoreRealtime.listenToDocument({
        collection: FirestoreRealtime.collections.RESOURCES,
        documentId: props.resource.objectID,
        callback: resourceListenerCallback,
      });
    return () => detachResourceObserver && detachResourceObserver();
  }, [props.resource.objectID]);

  const openVideoDetailsEditForm = React.useCallback(
    () =>
      dispatch({
        type: EditVideoStateActionTypes.SHOW_VIDEO_DETAILS_EDIT_FORM,
      }),
    [dispatch],
  );

  const closeVideoDetailsEditForm = React.useCallback(
    () =>
      dispatch({
        type: EditVideoStateActionTypes.HIDE_VIDEO_DETAILS_EDIT_FORM,
      }),
    [dispatch],
  );

  const videoDetailsEditFormRef: React.MutableRefObject<any> = React.useRef();
  const VideoDetailsEditFormEnhanced = Form.create({
    name: "edit-video-details",
  })(React.forwardRef(castFormToRefForwardingComponent(EditVideoDetailsForm)));

  const handleSubmit = async (e): Promise<void> => {
    e.preventDefault();
    videoDetailsEditFormRef.current.validateFieldsAndScroll(
      async (err, values) => {
        if (!err) {
          dispatch({ type: EditVideoStateActionTypes.BEGIN_FORM_SUBMISSION });
          const saveDataResponse = await updateVideoDetails(
            values,
            props.resource,
            props.currentUser,
          );
          if (saveDataResponse.error) {
            dispatch({
              type: EditVideoStateActionTypes.FINISH_FORM_SUBMISSION,
            });
            notification.error({
              message: "Error",
              description: `An error occurred while trying to save your changes: ${saveDataResponse.error}`,
              placement: "bottomRight",
            });
          } else {
            dispatch({
              type: EditVideoStateActionTypes.FINISH_FORM_SUBMISSION,
            });
            notification.success({
              message: "Saved",
              description: "Successfully saved your changes.",
              placement: "bottomRight",
            });
          }
        }
      },
    );
  };

  const openDeleteVideoModal = React.useCallback(
    () =>
      dispatch({
        type: EditVideoStateActionTypes.OPEN_DELETE_VIDEO_MODAL,
      }),
    [dispatch],
  );

  const VideoDetails = React.useMemo(
    () =>
      editVideoState.showVideoDetailsEditForm ? (
        <VideoDetailsEditFormEnhanced
          {...{
            ref: videoDetailsEditFormRef,
            initialFormData: editVideoState.resource,
            handleSubmit: handleSubmit,
            onClose: closeVideoDetailsEditForm,
            isLoading: editVideoState.isSubmittingForm,
          }}
        />
      ) : (
          <React.Fragment>
            <Grid.Row className={s.resourceInfoSectionHeader}>
              <Typography.Title level={4}>
                {editVideoState.resource && editVideoState.resource.title}
              </Typography.Title>
              <Button icon={"edit"} onClick={openVideoDetailsEditForm} />
            </Grid.Row>
            <Grid.Row>
              {editVideoState.resource &&
                editVideoState.resource.description.split("\n").map(text => {
                  return <Typography.Paragraph>{text}</Typography.Paragraph>;
                })}
            </Grid.Row>
          </React.Fragment>
        ),
    [
      editVideoState.resource,
      videoDetailsEditFormRef,
      editVideoState.showVideoDetailsEditForm,
      handleSubmit,
      openVideoDetailsEditForm,
      closeVideoDetailsEditForm,
      editVideoState.isSubmittingForm,
    ],
  );

  const deleteVideoModal = React.useMemo(
    () =>
      editVideoState.showDeleteVideoModal ? (
        <DeleteResourceModal
          show={true}
          resource={editVideoState.resource}
          closeModal={_ => {
            dispatch({
              type: EditVideoStateActionTypes.CLOSE_DELETE_VIDEO_MODAL,
            });
            props.history.push("/mycontent");
            notification.open({
              message: "Success!",
              description: "Your video was successfully deleted!",
              icon: (
                <Icon
                  type="check-circle"
                  theme="filled"
                  style={{ color: "#46e946" }}
                />
              ),
              duration: 5,
              placement: "bottomRight",
              onClick: () => { },
            });
          }}
        />
      ) : null,
    [
      props.location,
      props.history,
      editVideoState.showDeleteVideoModal,
      editVideoState.resource,
      dispatch,
    ],
  );

  const ThumbnailWrapper = () => (
    <div
      className={s.thumbnailWrapper}
      style={{
        background: `url(${props.resource.thumbnailUrl})`,
        width: "100%",
        height: 0,
        paddingBottom: "56.25%",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    ></div>
  );
  return (
    <div className={s.editVideoRoot}>
      {deleteVideoModal}
      <EditVideoPageHeader
        resource={editVideoState.resource}
        currentUser={editVideoState.currentUser}
        openDeleteVideoModal={openDeleteVideoModal}
      />
      <Grid className={s.editVideoRootGrid}>
        <Grid.Column width={7} className={s.resourceInfoSectionContainer}>
          <Card cover={<ThumbnailWrapper />}>{VideoDetails}</Card>
        </Grid.Column>
        <Grid.Column width={9} className={s.resourcePreviewContainer}>
          <WhiteCard
            smallSizeTitleAndSubtitle
            title={" Video Preview"}
            className={s.editVideoResourcePreviewContainer}
            customBodyPaddingValues={{
              top: "0rem",
              bottom: "1rem",
              right: "1rem",
              left: "1rem",
            }}
          >
            <EditVideoResourcePreview
              videoURL={props.resource.resourceUrl}
              setVideoDuration={videoDuration =>
                dispatch({
                  type: EditVideoStateActionTypes.SET_VIDEO_DURATION,
                  videoDuration: videoDuration,
                })
              }
            />
          </WhiteCard>
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default compose<Props, Props>(withRouter)(EditVideoView);
