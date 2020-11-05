import { Button, PageHeader, Typography, notification } from "antd";
import CreateMissionModal from "components/Modals/CreateMissionModal";
import CreatePlaylistModal from "components/Modals/CreatePlaylistModal";
import UploadVideoModal from "components/Modals/UploadVideoModal";
import * as DataTypes from "data/types";
import React from "react";
import { withRouter } from "react-router";
import { compose } from "recompose";
import { Grid } from "semantic-ui-react";
import { History, Location } from "history";
import s from "./MyContent.module.scss";
import MyContentContentCard from "./MyContentContentCard.react";
import {
  MyContentStateActionTypes,
  myContentReducer,
  myContentStateInit,
} from "./MyContentReducer";
import DeletePlaylistModal from "components/Modals/DeletePlaylistModal";
import RESTAPIClient from "RESTAPIClient";
import DeleteResourceModal from "components/Modals/DeleteResourceModal";
import DeleteMissionModal from "components/Modals/DeleteMissionModal";
import WhiteCard from "components/WhiteCard";
import { FirestoreRealtime } from "FirebaseClient";

interface Props {
  currentUser: DataTypes.Creator;
  myMissions: Array<DataTypes.Mission>;
  myPlaylists: Array<DataTypes.Playlist>;
  myResources: Array<DataTypes.Resource>;
  history?: History;
  location?: Location;
  error?: Error;
}

const MyContentView: React.FC<Props> = (props: Props) => {
  const [myContentState, dispatch] = React.useReducer(
    myContentReducer,
    {
      currentUser: props.currentUser,
      myMissions: props.myMissions || [],
      myPlaylists: props.myPlaylists || [],
      myResources: props.myResources || [],
    },
    myContentStateInit,
  );

  const refreshMyContent = async () => {
    const myResources = await RESTAPIClient.Resource.getUploadedByUser(
      myContentState.currentUser.objectID,
    );
    const myMissions = await RESTAPIClient.Mission.getByContributorUserId(
      myContentState.currentUser.objectID,
    );
    const myPlaylists = await RESTAPIClient.Playlist.getByContributorUserId(
      myContentState.currentUser.objectID,
    );
    dispatch({
      type: MyContentStateActionTypes.UPDATE_MY_CONTENT,
      myMissions,
      myResources,
      myPlaylists,
    });
  };

  React.useEffect(() => {
    refreshMyContent();
  }, [
    myContentState.showDeleteMissionModal,
    myContentState.showDeleteVideoModal,
    myContentState.showDeletePlaylistModal,
  ]);

  const handleModalClose = closeModalParams => {
    if (closeModalParams.error) {
      notification.error({
        message: "Error",
        description: `An error occurred while trying to save your changes: ${closeModalParams.error}`,
        placement: "bottomRight",
      });
    } else if (closeModalParams.errors) {
      notification.error({
        message: "Error",
        description: `Some of your changes may not have saved.`,
        placement: "bottomRight",
      });
    } else if (closeModalParams.shouldReload) {
      notification.success({
        message: "Saved",
        description: "Successfully saved your changes.",
        placement: "bottomRight",
      });
    }
  };

  const deletePlaylistModal = React.useMemo(
    () =>
      myContentState.showDeletePlaylistModal ? (
        <DeletePlaylistModal
          show={true}
          playlist={myContentState.deletePlaylistModalInfo}
          closeModal={closeModalParams => {
            dispatch({
              type: MyContentStateActionTypes.CLOSE_DELETE_PLAYLIST_MODAL,
            });
            handleModalClose(closeModalParams);
          }}
        />
      ) : null,
    [
      props.location,
      props.history,
      myContentState.showDeletePlaylistModal,
      myContentState.deletePlaylistModalInfo,
      dispatch,
    ],
  );

  const deleteVideoModal = React.useMemo(
    () =>
      myContentState.showDeleteVideoModal ? (
        <DeleteResourceModal
          show={true}
          resource={myContentState.deleteVideoModalInfo}
          closeModal={closeModalParams => {
            dispatch({
              type: MyContentStateActionTypes.CLOSE_DELETE_VIDEO_MODAL,
            });
            handleModalClose(closeModalParams);
          }}
        />
      ) : null,
    [
      props.location,
      props.history,
      myContentState.showDeleteVideoModal,
      myContentState.deleteVideoModalInfo,
      dispatch,
    ],
  );

  const deleteMissionModal = React.useMemo(
    () =>
      myContentState.showDeleteMissionModal ? (
        <DeleteMissionModal
          show={true}
          mission={myContentState.deleteMissionModalInfo}
          closeModal={closeModalParams => {
            dispatch({
              type: MyContentStateActionTypes.CLOSE_DELETE_MISSION_MODAL,
            });
            handleModalClose(closeModalParams);
          }}
        />
      ) : null,
    [
      props.location,
      props.history,
      myContentState.showDeleteMissionModal,
      myContentState.deleteMissionModalInfo,
      dispatch,
    ],
  );

  const openUploadVideoModal = React.useCallback(() => {
    dispatch({
      type: MyContentStateActionTypes.OPEN_UPLOAD_VIDEO_MODAL
    })
  }, [dispatch]);

  const closeUploadVideoModal = React.useCallback((shouldReload: boolean) => {
    dispatch({
      type: MyContentStateActionTypes.CLOSE_UPLOAD_VIDEO_MODAL
    })
    shouldReload && window.location.reload();
  }, [dispatch])


  const uploadVideoModal = React.useMemo(() => {
    return myContentState.showUploadVideoModal && (
      <UploadVideoModal
        isVisible={myContentState.showUploadVideoModal}
        onCancel={() => closeUploadVideoModal(false)}
        currentCreator={props.currentUser}
        creatorMissions={props.myMissions}
        creatorPlaylists={props.myPlaylists}
        onFinish={() => closeUploadVideoModal(false)}
      />
    )
  }, [myContentState.showUploadVideoModal, props.currentUser, props.myMissions, props.myPlaylists]);

  const createPlaylistModal = React.useMemo(
    () => (
      <CreatePlaylistModal
        show={myContentState.showCreatePlaylistModal}
        closeModal={shouldReload => {
          dispatch({ type: MyContentStateActionTypes.CLOSE_PLAYLIST_MODAL });
        }}
      />
    ),
    [
      myContentState.showCreatePlaylistModal,
      dispatch,
      props.history,
      props.location,
    ],
  );

  const playlistsListenerCallback = async (
    objects: Array<DataTypes.DataModelObject>,
  ) => {
    objects && await refreshMyContent();
  };

  React.useEffect(() => {
    const detachNewPlaylistObserver =
      props.currentUser && props.currentUser.objectID &&
      FirestoreRealtime.listenToMultipleDocuments({
        query: FirestoreRealtime.collections.PLAYLISTS.where(
          "creatorUserId",
          "==",
          props.currentUser.objectID,
        ),
        callback: (objects) => playlistsListenerCallback(objects),
      });
    return () => detachNewPlaylistObserver && detachNewPlaylistObserver();
  }, [props.currentUser]);

  const createMissionModal = React.useMemo(
    () => (
      <CreateMissionModal
        show={myContentState.showCreateMissionModal}
        closeModal={shouldReload => {
          dispatch({
            type: MyContentStateActionTypes.CLOSE_CREATE_MISSION_MODAL,
          });
          if (shouldReload) {
            props.history.replace({
              ...props.location,
              pathname: props.location.pathname,
            });
          }
        }}
      />
    ),
    [
      myContentState.showCreateMissionModal,
      dispatch,
      props.history,
      props.location,
    ],
  );

  const openCreateMissionModal = React.useCallback(
    () =>
      dispatch({ type: MyContentStateActionTypes.OPEN_CREATE_MISSION_MODAL }),
    [dispatch],
  );

  const openCreatePlaylistModal = React.useCallback(
    () =>
      dispatch({ type: MyContentStateActionTypes.OPEN_CREATE_PLAYLIST_MODAL }),
    [dispatch],
  );

  const openDeleteVideoModal = React.useCallback(
    (content: DataTypes.Content) =>
      dispatch({
        type: MyContentStateActionTypes.OPEN_DELETE_VIDEO_MODAL,
        deleteVideoModalInfo: content as DataTypes.Resource,
      }),
    [dispatch],
  );

  const openDeletePlaylistModal = React.useCallback(
    (content: DataTypes.Content) =>
      dispatch({
        type: MyContentStateActionTypes.OPEN_DELETE_PLAYLIST_MODAL,
        deletePlaylistModalInfo: content as DataTypes.Playlist,
      }),
    [dispatch],
  );

  const openDeleteMissionModal = React.useCallback(
    (content: DataTypes.Content) =>
      dispatch({
        type: MyContentStateActionTypes.OPEN_DELETE_MISSION_MODAL,
        deleteMissionModalInfo: content as DataTypes.Mission,
      }),
    [dispatch],
  );

  const didClickDeleteContent = (content: DataTypes.Content) => {
    switch (content.contentType) {
      case "playlist":
        openDeletePlaylistModal(content);
        return;
      case "resource":
        openDeleteVideoModal(content);
        return;
      case "mission":
        openDeleteMissionModal(content);
        return;
      default:
        return;
    }
  };

  const didClickEditContent = (contentType: string, objectID: string) => {
    switch (contentType) {
      case "playlist":
        props.history.push(`/editplaylist/${objectID}`);
        return;
      case "resource":
        props.history.push(`/editvideo/${objectID}`);
        return;
      case "mission":
        props.history.push(`/editcollection/${objectID}`);
        return;
      default:
        return;
    }
  };

  const didClickViewContent = (contentType: string, objectID: string) => {
    const subdomain = process.env.NODE_ENV === "production" ? "www." : "";
    switch (contentType) {
      case "playlist":
        window.open(
          `${window.location.origin.replace(
            "creators.",
            subdomain,
          )}/playlist/${objectID}`,
          "_blank",
        );
        return;
      case "resource":
        window.open(
          `${window.location.origin.replace(
            "creators.",
            subdomain,
          )}/resource/${objectID}`,
          "_blank",
        );
        return;
      case "mission":
        window.open(
          `${window.location.origin.replace(
            "creators.",
            subdomain,
          )}/collection/${objectID}`,
          "_blank",
        );
        return;
      default:
        return;
    }
  };

  const openDragAndDropModal = React.useCallback(
    () => dispatch({ type: MyContentStateActionTypes.OPEN_UPLOAD_FILE_MODAL }),
    [dispatch],
  );

  const uploadVideoButton = (
    <Button
      onClick={() => openUploadVideoModal()}
      className={s.myContentActionButton}
    >
      Upload a Video
  </Button>
  )

  const createPlaylistButton = (
    <Button
      onClick={() => openCreatePlaylistModal()}
      className={s.myContentActionButton}
    >
      Create a Playlist
    </Button>
  );

  const createMissionButton = (
    <Button onClick={() => openCreateMissionModal()}>
      Create a Collection
    </Button>
  );

  const actionButtons =
    props.currentUser && props.currentUser.isSuperAdminCreator
      ? [createMissionButton, createPlaylistButton, uploadVideoButton]
      : [createPlaylistButton, uploadVideoButton];

  return (
    <WhiteCard
      className={s.myContentRoot}
      title="My Content"
      subTitle="You can easily access and manage all your content here."
    >
      <div className={s.myContentActionButtons}>{actionButtons}</div>
      {createPlaylistModal}
      {createMissionModal}
      {deleteMissionModal}
      {deleteVideoModal}
      {deletePlaylistModal}
      {uploadVideoModal}
      <Grid>
        <Grid.Column width={16}>
          <MyContentContentCard
            myMissions={myContentState.myMissions}
            myPlaylists={myContentState.myPlaylists}
            myResources={myContentState.myResources}
            didClickDeleteContent={didClickDeleteContent}
            didClickEditContent={didClickEditContent}
            didClickViewContent={didClickViewContent}
            currentUser={myContentState.currentUser}
          />
        </Grid.Column>
      </Grid>
    </WhiteCard>
  );
};

export default compose<Props, Props>(withRouter)(MyContentView);
