import { notification } from "antd";
import AddContentToMissionModal from "components/Modals/AddContentToMissionModal";
import EditMissionInfoModal from "components/Modals/EditMissionInfoModal";
import DeleteMissionModal from "components/Modals/DeleteMissionModal";
import JoinMissionModal from "components/Modals/JoinMissionModal";
import * as DataTypes from "data/types";
import React from "react";
import { withRouter } from "react-router";
import { compose } from "recompose";
import { Grid } from "semantic-ui-react";
import { History, Location } from "history";
import s from "./EditMission.module.scss";
import EditMissionAccessAlert from "./EditMissionAccessAlert.react";
import RemoveContributorModal from "components/Modals/RemoveContributorModal";
import EditMissionContentCard from "./EditMissionContentCard.react";
import EditMissionContentRequestsCard from "./EditMissionContentRequestsCard.react";
import EditMissionContributorsList from "./EditMissionContributorsList.react";
import EditMissionPageHeader from "./EditMissionPageHeader.react";
import ResolveMissionContentRequestModal from "components/Modals/ResolveMissionContentRequestModal";
import {
  EditMissionStateActionTypes,
  editMissionReducer,
  editMissionStateInit,
} from "./EditMissionReducer";
import { removeContentFromMissionServerCall } from "./EditMissionUtil";
import MissionInfoSection from "./MissionInfoSection.react";
import { FirestoreRealtime } from "FirebaseClient";
import RESTAPIClient from "RESTAPIClient";

interface Props {
  currentUser: DataTypes.Creator;
  mission: DataTypes.Mission;
  missionContributors: Array<DataTypes.User>;
  missionCreator: DataTypes.User;
  missionResources: Array<DataTypes.Resource>;
  missionPlaylists: Array<DataTypes.Playlist>;
  myContentInMission: Array<DataTypes.Content>;
  missionContentRequests: Array<DataTypes.ContentRequest>;
  pendingMissionContributorRequests?: Array<Object>;
  removeContributorInfo?: {
    contributor?: DataTypes.User;
    mission?: DataTypes.Mission;
  };
  isRemoveContributorModalVisible?: boolean;
  isEditingMissionContributors?: boolean;
  pendingContributorRequestsForThisMission: Array<DataTypes.Request>;
  error?: Error;
  history?: History;
  location?: Location;
}

const EditMissionView: React.FC<Props> = (props: Props) => {
  const [editMissionState, dispatch] = React.useReducer(
    editMissionReducer,
    {
      currentUser: props.currentUser,
      mission: props.mission,
      missionContributors: props.missionContributors,
      missionCreator: props.missionCreator,
      myContentInMission: props.myContentInMission,
      missionContentRequests: props.missionContentRequests,
      pendingContributorRequestsForThisMission:
        props.pendingContributorRequestsForThisMission,
      removeContributorInfo: props.removeContributorInfo,
      isRemoveContributorModalVisible: props.isRemoveContributorModalVisible,
      isEditingMissionContributors: props.isEditingMissionContributors,
      missionPlaylists: props.missionPlaylists,
      missionResources: props.missionResources,
    },
    editMissionStateInit,
  );

  const refreshMyContentInMission = async () => {
    const myContentInMission = await RESTAPIClient.Content.getByMissionAndCreator(
      editMissionState.mission.objectID,
      editMissionState.currentUser.objectID,
    );
    dispatch({
      type: EditMissionStateActionTypes.UPDATE_MY_CONTENT_IN_MISSION,
      myContentInMission,
    });
  };

  const refreshContentRequests = async () => {
    const missionContentRequests = await RESTAPIClient.ContentRequest.getByMissionIdWithMetadata(
      editMissionState.mission.objectID,
    );
    dispatch({
      type: EditMissionStateActionTypes.UPDATE_CONTENT_REQUESTS,
      missionContentRequests,
    });
  };

  React.useEffect(() => {
    refreshMyContentInMission();
  }, [
    editMissionState.showAddContentToMissionModal,
    editMissionState.isRemovingContent,
  ]);

  const refreshContributors = async () => {
    const contributors = await RESTAPIClient.Mission.getContributors(
      editMissionState.mission.objectID,
    );
    dispatch({
      type: EditMissionStateActionTypes.UPDATE_CONTRIBUTORS,
      missionContributors: contributors,
    });
  };

  React.useEffect(() => {
    refreshContributors();
  }, [editMissionState.mission.contributors]);

  const missionListenerCallback = (object: any) => {
    object &&
      dispatch({
        type: EditMissionStateActionTypes.UPDATE_MISSION,
        mission: object as DataTypes.Mission,
      });
  };

  React.useEffect(() => {
    const detachMissionObserver =
      props.mission.objectID &&
      FirestoreRealtime.listenToDocument({
        collection: FirestoreRealtime.collections.MISSIONS,
        documentId: props.mission.objectID,
        callback: missionListenerCallback,
      });
    return () => detachMissionObserver && detachMissionObserver();
  }, [props.mission.objectID]);

  React.useEffect(() => {
    const detachContentRequestObserver =
      props.mission.objectID &&
      FirestoreRealtime.listenToMultipleDocuments({
        query: FirestoreRealtime.collections.CONTENT_REQUESTS.where(
          "missionId",
          "==",
          editMissionState.mission.objectID,
        ),
        callback: refreshContentRequests,
      });
    return () => detachContentRequestObserver && detachContentRequestObserver();
  }, [props.mission.objectID]);

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
        description: `Unable to save your changes.`,
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
  const deleteMissionModal = React.useMemo(
    () =>
      editMissionState.showDeleteMissionModal ? (
        <DeleteMissionModal
          show={true}
          mission={editMissionState.mission}
          closeModal={_ => {
            dispatch({
              type: EditMissionStateActionTypes.HIDE_DELETE_MISSION_MODAL,
            });
            props.history.push("/mycontent");
          }}
        />
      ) : null,

    [
      editMissionState.showDeleteMissionModal,
      dispatch,
      props.location,
      props.history,
      editMissionState.mission,
    ],
  );
  const editMissionInfoModal = React.useMemo(
    () =>
      editMissionState.showEditMissionInfoModal ? (
        <EditMissionInfoModal
          show={true}
          mission={editMissionState.mission}
          closeModal={modalCloseParams => {
            dispatch({
              type: EditMissionStateActionTypes.HIDE_EDIT_MISSION_INFO_MODAL,
            });
            handleModalClose(modalCloseParams);
          }}
        />
      ) : null,
    [
      editMissionState.showEditMissionInfoModal,
      editMissionState.editMissionInfoModalInfo,
      dispatch,
      props.location,
      props.history,
      editMissionState.mission,
    ],
  );

  const addContentToMissionModal = React.useMemo(
    () =>
      editMissionState.showAddContentToMissionModal ? (
        <AddContentToMissionModal
          show={true}
          mission={editMissionState.mission}
          closeModal={async closeModalParams => {
            dispatch({
              type:
                EditMissionStateActionTypes.HIDE_ADD_CONTENT_TO_MISSION_MODAL,
            });
            handleModalClose(closeModalParams);
          }}
        />
      ) : null,
    [
      editMissionState.showAddContentToMissionModal,
      editMissionState.addContentToMissionModalInfo,
      dispatch,
      editMissionState.mission,
    ],
  );

  const didClickBeginEditingContributors = React.useCallback(
    () =>
      dispatch({
        type: EditMissionStateActionTypes.BEGIN_EDITING_MISSION_CONTRIBUTORS,
      }),
    [dispatch],
  );

  const didClickCancelEditingContributors = React.useCallback(
    () =>
      dispatch({
        type: EditMissionStateActionTypes.CANCEL_EDITING_MISSION_CONTRIBUTORS,
      }),
    [dispatch],
  );

  const openEditMissionModal = React.useCallback(
    () =>
      dispatch({
        type: EditMissionStateActionTypes.SHOW_EDIT_MISSION_INFO_MODAL,
        mission: editMissionState.mission,
      }),
    [dispatch, editMissionState.mission],
  );
  const openDeleteMissionModal = React.useCallback(() => {
    dispatch({
      type: EditMissionStateActionTypes.SHOW_DELETE_MISSION_MODAL,
      mission: editMissionState.mission,
    });
  }, [dispatch, editMissionState.mission]);
  const openAddContentToMissionModal = React.useCallback(
    () =>
      dispatch({
        type: EditMissionStateActionTypes.SHOW_ADD_CONTENT_TO_MISSION_MODAL,
        mission: editMissionState.mission,
      }),
    [dispatch, editMissionState.mission],
  );

  const didClickRemoveContent = React.useCallback(
    async (contentType, objectID) => {
      dispatch({
        type: EditMissionStateActionTypes.BEGIN_REMOVE_CONTENT_FROM_MISSION,
      });
      const removeContentResponse = await removeContentFromMissionServerCall(
        editMissionState.mission.objectID,
        objectID,
        contentType,
        editMissionState.currentUser.objectID,
      );
      if (removeContentResponse.error) {
        dispatch({
          type: EditMissionStateActionTypes.FINISH_REMOVE_CONTENT_FROM_MISSION,
        });
        notification.error({
          message: "Error",
          description: `An error occurred while trying to save your changes: ${removeContentResponse.error}`,
          placement: "bottomRight",
        });
      } else {
        dispatch({
          type: EditMissionStateActionTypes.FINISH_REMOVE_CONTENT_FROM_MISSION,
        });
        notification.success({
          message: "Saved",
          description: "Successfully saved your changes.",
          placement: "bottomRight",
        });
      }
    },
    [editMissionState.mission, editMissionState.currentUser],
  );

  const didClickEditContent = (contentType: string, objectID: string) => {
    switch (contentType) {
      case "playlist":
        props.history.push(`/editplaylist/${objectID}`);
        return;
      case "resource":
        props.history.push(`/editvideo/${objectID}`);
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
      default:
        return;
    }
  };

  const joinMissionModal = React.useMemo(
    () =>
      editMissionState.showJoinMissionModal ? (
        <JoinMissionModal
          show={editMissionState.showJoinMissionModal}
          closeModal={shouldReload => {
            dispatch({
              type: EditMissionStateActionTypes.CLOSE_JOIN_MISSION_MODAL,
            });
            if (shouldReload) {
              props.history.replace({
                ...props.location,
                pathname: props.location.pathname,
              });
            }
          }}
          missionToJoin={editMissionState.mission}
        />
      ) : null,
    [
      editMissionState.showJoinMissionModal,
      editMissionState.mission,
      dispatch,
      props.location,
      props.history,
    ],
  );

  const openJoinMissionModal = React.useCallback(
    () =>
      dispatch({ type: EditMissionStateActionTypes.SHOW_JOIN_MISSION_MODAL }),
    [dispatch],
  );

  const showResolveContentRequestModal = (
    contentRequest: DataTypes.ContentRequest,
  ) => {
    dispatch({
      type: EditMissionStateActionTypes.SHOW_RESOLVE_CONTENT_REQUEST_MODAL,
      contentRequest: contentRequest,
    });
  };

  const hideResolveContentRequestModal = (shouldReload: boolean) => {
    dispatch({
      type: EditMissionStateActionTypes.HIDE_RESOLVE_CONTENT_REQUEST_MODAL,
    });
    if (shouldReload) {
      props.history.replace({
        ...props.location,
        pathname: props.location.pathname,
      });
    }
  };

  const setResolvingContentData = (resolvingContentId: string) => { };

  const setResolutionReasonData = (resolutionReasonData: string) => { };

  React.useEffect(() => {
  }, [editMissionState]);
  const resolveContentRequestModal = React.useMemo(
    () => (
      <ResolveMissionContentRequestModal
        show={editMissionState.showResolveContentRequestModal}
        contentRequest={editMissionState.resolveContentRequestModalInfo}
        missionResources={
          editMissionState.myContentInMission.filter(
            content => content.contentType === "resource",
          ) as DataTypes.Resource[]
        }
        missionPlaylists={
          editMissionState.myContentInMission.filter(
            content => content.contentType === "playlist",
          ) as DataTypes.Playlist[]
        }
        currentUser={editMissionState.currentUser}
        closeModal={closeModalParams => {
          dispatch({
            type:
              EditMissionStateActionTypes.HIDE_RESOLVE_CONTENT_REQUEST_MODAL,
          });
          handleModalClose(closeModalParams);
        }}
      />
    ),
    [
      editMissionState.showResolveContentRequestModal,
      editMissionState.missionPlaylists,
      editMissionState.missionResources,
      editMissionState.resolveContentRequestModalInfo,
      editMissionState.currentUser,
      editMissionState.myContentInMission,
    ],
  );

  const openRemoveMissionContributorModal = React.useCallback(
    (contributor: DataTypes.User) => {
      dispatch({
        type: EditMissionStateActionTypes.SHOW_REMOVE_CONTRIBUTOR_MODAL,
        contributor: contributor,
        mission: props.mission,
      });
    },
    [dispatch, props.mission],
  );

  const removeMissionContributorModal = React.useMemo(
    () =>
      editMissionState.showRemoveContributorModal ? (
        <RemoveContributorModal
          show={editMissionState.showRemoveContributorModal}
          contributor={editMissionState.removeContributorModalInfo.contributor}
          content={editMissionState.mission}
          closeModal={closeModalParams => {
            dispatch({
              type: EditMissionStateActionTypes.HIDE_REMOVE_CONTRIBUTOR_MODAL,
            });
            handleModalClose(closeModalParams);
          }}
          isMission={true}
        />
      ) : null,
    [
      editMissionState.showRemoveContributorModal,
      editMissionState.removeContributorModalInfo,
      props.location,
      props.history,
      editMissionState.mission,
    ],
  );

  return (
    <div className={s.editMissionRoot}>
      {editMissionInfoModal}
      {deleteMissionModal}
      {addContentToMissionModal}
      {joinMissionModal}
      {resolveContentRequestModal}
      {removeMissionContributorModal}
      <EditMissionPageHeader
        mission={editMissionState.mission}
        currentUser={editMissionState.currentUser}
        isApprovedContributor={editMissionState.isApprovedContributor}
        hasRequestedContributorPermission={
          editMissionState.hasRequestedContributorPermission
        }
        openJoinMissionModal={openJoinMissionModal}
        openAddContentModal={openAddContentToMissionModal}
        openEditMissionInfoModal={openEditMissionModal}
        openDeleteMissionModal={openDeleteMissionModal}
        hasMissionOwnerPermissions={editMissionState.hasMissionOwnerPermissions}
      />
      <Grid className={s.editMissionRootGrid}>
        <Grid.Row className={s.infoCardsRow}>
          <EditMissionAccessAlert
            isApprovedContributor={editMissionState.isApprovedContributor}
            hasRequestedContributorPermission={
              editMissionState.hasRequestedContributorPermission
            }
          />
          <Grid.Column width={8} className={s.missionInfoSectionContainer}>
            <MissionInfoSection
              mission={editMissionState.mission}
              isApprovedContributor={editMissionState.isApprovedContributor}
              hasMissionOwnerPermissions={
                editMissionState.hasMissionOwnerPermissions
              }
            />
          </Grid.Column>
          <Grid.Column width={8} className={s.missionSectionsContainer}>
            <EditMissionContributorsList
              currentUser={props.currentUser}
              userIsCreator={
                props.currentUser.userId === props.missionCreator.userId
              }
              contributors={editMissionState.missionContributors}
              didClickBeginEditingContributors={
                didClickBeginEditingContributors
              }
              didClickCancelEditingContributors={
                didClickCancelEditingContributors
              }
              mission={editMissionState.mission}
              isApprovedContributor={editMissionState.isApprovedContributor}
              isEditingMissionContributors={
                editMissionState.isEditingMissionContributors
              }
              showRemoveContributorModal={openRemoveMissionContributorModal}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <EditMissionContentRequestsCard
            mission={editMissionState.mission}
            missionResources={editMissionState.missionResources}
            missionPlaylists={editMissionState.missionPlaylists}
            missionContentRequests={editMissionState.missionContentRequests}
            showResolveContentRequestModal={showResolveContentRequestModal}
            hideResolveContentRequestModal={hideResolveContentRequestModal}
          />
        </Grid.Row>
        <Grid.Row className={s.contentCardRow}>
          <Grid.Column width={16} className={s.contentCardColumn}>
            <EditMissionContentCard
              mission={editMissionState.mission}
              myContent={editMissionState.myContentInMission}
              openAddContentToMissionModal={openAddContentToMissionModal}
              didClickRemoveContent={didClickRemoveContent}
              didClickEditContent={didClickEditContent}
              isApprovedContributor={editMissionState.isApprovedContributor}
              didClickViewContent={didClickViewContent}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default compose<Props, Props>(withRouter)(EditMissionView);
