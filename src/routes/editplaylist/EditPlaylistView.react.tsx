import { Button, Card, Empty, notification } from "antd";
import AddPlaylistSectionModal from "components/Modals/AddPlaylistSectionModal";
import AddVideoToPlaylistSectionModal from "components/Modals/AddVideoToPlaylistSectionModal";
import DeletePlaylistSectionModal from "components/Modals/DeletePlaylistSectionModal";
import DeletePlaylistModal from "components/Modals/DeletePlaylistModal";
import EditPlaylistInfoModal from "components/Modals/EditPlaylistInfoModal";
import EditPlaylistSectionModal from "components/Modals/EditPlaylistSectionModal";
import RemoveContributorModal from "components/Modals/RemoveContributorModal";
import EditVideoModal from "components/Modals/EditVideoModal";
import JoinPlaylistModal from "components/Modals/JoinPlaylistModal";
import RemoveVideoModal from "components/Modals/RemoveVideoModal";
import ReorderSectionsModal from "components/Modals/ReorderSectionsModal";
import * as DataTypes from "data/types";
import React from "react";
import { withRouter } from "react-router";
import { compose } from "recompose";
import { Grid } from "semantic-ui-react";
import { History, Location } from "history";
import s from "./EditPlaylist.module.scss";
import EditPlaylistAccessAlert from "./EditPlaylistAccessAlert.react";
import EditPlaylistContributorsList from "./EditPlaylistContributorsList.react";
import EditPlaylistPageHeader from "./EditPlaylistPageHeader.react";
import {
  EditPlaylistStateActionTypes,
  editPlaylistReducer,
  editPlaylistStateInit,
  getSectionResourceIdsAfterShiftUp,
  getSectionResourceIdsAfterShiftDown,
} from "./EditPlaylistReducer";
import { updatePlaylistSection } from "./EditPlaylistUtil";
import PlaylistInfoSection from "./PlaylistInfoSection.react";
import PlaylistSectionList from "./PlaylistSectionList.react";
import { FirestoreRealtime } from "FirebaseClient";
import { debounce } from "lodash";
import DataSyncJobQueue, {
  DataSyncJobTypes,
  UpdatePlaylistSectionJobInfo,
} from "utilities/datasyncjobqueue";
import RESTAPIClient from "RESTAPIClient";

interface Props {
  currentUser: DataTypes.Creator;
  playlist: DataTypes.Playlist;
  playlistResources: Array<DataTypes.Resource>;
  playlistContributors: Array<DataTypes.User>;
  playlistCreator: DataTypes.User;
  pendingContributorRequestsForThisPlaylist: Array<DataTypes.Request>;
  history?: History;
  location?: Location;
  error?: Error;
  userLatestViewLogs?: DataTypes.UserLatestViewlogs;
}

const EditPlaylistView: React.FC<Props> = (props: Props) => {
  const [editPlaylistState, dispatch] = React.useReducer(
    editPlaylistReducer,
    {
      currentUser: props.currentUser,
      playlist: props.playlist,
      playlistResources: props.playlistResources,
      playlistContributors: props.playlistContributors,
      playlistCreator: props.playlistCreator,
      pendingContributorRequestsForThisPlaylist:
        props.pendingContributorRequestsForThisPlaylist,
      playlistSectionsToBeSynced: [],
      userLatestViewLogs: props.userLatestViewLogs,
    },
    editPlaylistStateInit,
  );

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
        description: `Some of your changes may not have been saved.This can occur if you try to add a duplicate video to the same section.`,
        placement: "bottomRight",
      });
    } else if (closeModalParams.shouldReload) {
      if (closeModalParams.duplicateFound) {
        notification.warning({
          message: "Saved",
          description:
            "Some videos were not added because they're already in the playlist.",
          placement: "bottomRight",
        });
      } else
        notification.success({
          message: "Saved",
          description: "Successfully saved your changes.",
          placement: "bottomRight",
        });
    }
  };

  const debouncedPlaylistSectionsSave = debounce(() => {
    DataSyncJobQueue.processJobsByType(
      DataSyncJobTypes.UPDATE_PLAYLIST_SECTION,
    );
  }, 3000);

  React.useEffect(() => debouncedPlaylistSectionsSave(), [
    editPlaylistState.playlistSectionsToBeSynced,
  ]);

  const refreshContributors = async () => {
    const contributors = await RESTAPIClient.Playlist.getContributors(
      editPlaylistState.playlist.objectID,
    );
    dispatch({
      type: EditPlaylistStateActionTypes.UPDATE_CONTRIBUTORS,
      contributors,
    });
  };

  const refreshPlaylistSections = async () => {
    const playlistResources = await RESTAPIClient.Resource.getByPlaylistId(
      editPlaylistState.playlist.objectID,
    );
    dispatch({
      type: EditPlaylistStateActionTypes.UPDATE_PLAYLIST_RESOURCES,
      playlistResources,
    });
  };

  React.useEffect(() => {
    refreshContributors();
    refreshPlaylistSections();
  }, [editPlaylistState.playlist]);

  const playlistListenerCallback = (object: any) => {
    object &&
      dispatch({
        type: EditPlaylistStateActionTypes.UPDATE_PLAYLIST,
        playlist: object as DataTypes.Playlist,
      });
  };

  React.useEffect(() => {
    const detachPlaylistObserver =
      props.playlist.objectID &&
      FirestoreRealtime.listenToDocument({
        collection: FirestoreRealtime.collections.PLAYLISTS,
        documentId: props.playlist.objectID,
        callback: playlistListenerCallback,
      });
    return () => detachPlaylistObserver && detachPlaylistObserver();
  }, [props.playlist.objectID]);

  const openAddVideoToSectionModal = React.useCallback(
    section =>
      dispatch({
        type: EditPlaylistStateActionTypes.SHOW_ADD_VIDEO_TO_SECTION_MODAL,
        sectionIndex: section.sectionIndex,
        sectionData: section,
      }),
    [dispatch],
  );

  const openRemoveVideoModal = React.useCallback(
    (resource: DataTypes.Resource, section: DataTypes.Section) =>
      dispatch({
        type: EditPlaylistStateActionTypes.SHOW_REMOVE_VIDEO_MODAL,
        resource: resource,
        section: section,
      }),
    [dispatch],
  );

  const didClickViewResource = (resource: DataTypes.Resource) => {
    const subdomain = process.env.NODE_ENV === "production" ? "www." : "";
    const url = `${window.location.origin.replace(
      "creators.",
      subdomain,
    )}/resource/${resource.objectID}`;
    window.open(url, "_blank");
  };

  const openEditVideoModal = React.useCallback(
    resource =>
      dispatch({
        type: EditPlaylistStateActionTypes.SHOW_EDIT_VIDEO_MODAL,
        resource: resource,
      }),
    [dispatch],
  );

  const openEditPlaylistInfoModal = React.useCallback(
    () =>
      dispatch({
        type: EditPlaylistStateActionTypes.SHOW_EDIT_PLAYLIST_INFO_MODAL,
        playlist: editPlaylistState.playlist,
      }),
    [editPlaylistState.playlist, dispatch],
  );

  const openAddPlaylistSectionModal = React.useCallback(
    () =>
      dispatch({
        type: EditPlaylistStateActionTypes.SHOW_ADD_PLAYLIST_SECTION_MODAL,
        playlist: editPlaylistState.playlist,
      }),
    [editPlaylistState.playlist, dispatch],
  );

  const openReorderSectionsModal = React.useCallback(
    () =>
      dispatch({
        type: EditPlaylistStateActionTypes.SHOW_REORDER_SECTIONS_MODAL,
        playlist: editPlaylistState.playlist,
      }),
    [editPlaylistState.playlist, dispatch],
  );

  const didClickEditSection = React.useCallback(
    section => {
      dispatch({
        type: EditPlaylistStateActionTypes.BEGIN_EDITING_SECTION,
        sectionIndex: section.sectionIndex,
      });
    },
    [dispatch],
  );

  const didClickCancelEdittingSection = React.useCallback(
    section =>
      dispatch({
        type: EditPlaylistStateActionTypes.CANCEL_EDITING_SECTION,
        sectionIndex: section.sectionIndex,
      }),
    [dispatch],
  );

  const didClickDeleteSection = React.useCallback(
    section =>
      dispatch({
        type: EditPlaylistStateActionTypes.SHOW_DELETE_SECTION_MODAL,
        section: section,
        playlist: editPlaylistState.playlist,
      }),
    [dispatch, editPlaylistState.playlist],
  );

  const didClickSaveAfterEdittingSection = React.useCallback(
    async (section, formRef) => {
      formRef.current.validateFieldsAndScroll(async (err, values) => {
        if (!err) {
          dispatch({
            type: EditPlaylistStateActionTypes.BEGIN_SECTION_DATA_SAVE,
            sectionIndex: section.sectionIndex,
          });
          const saveDataResponse = await updatePlaylistSection(
            section.resources,
            values.title,
            values.description,
            editPlaylistState.playlist.objectID,
            section.sectionIndex,
            editPlaylistState.currentUser.objectID,
          );
          if (saveDataResponse.error) {
            notification.error({
              message: "Error",
              description: `An error occurred while trying to save your changes: ${saveDataResponse.error}.`,
              placement: "bottomRight",
            });
            dispatch({
              type:
                EditPlaylistStateActionTypes.FINISHED_SECTION_DATA_SAVE_WITH_ERROR,
              sectionDataSubmissionError: saveDataResponse.error,
            });
          } else {
            notification.success({
              message: "Saved",
              description: "The playlist section was updated successfully!",
              placement: "bottomRight",
            });
            dispatch({
              type:
                EditPlaylistStateActionTypes.FINISHED_SECTION_DATA_SAVE_SUCCESSFULLY,
            });
          }
        }
      });
    },
    [
      dispatch,
      editPlaylistState.playlist,
      props.location,
      props.history,
      editPlaylistState.currentUser.objectID,
    ],
  );

  const shiftResourceUp = async (resourceId, sectionIndex) => {
    const updatedSectionResourceIds = getSectionResourceIdsAfterShiftUp(
      editPlaylistState.playlist.sections,
      sectionIndex,
      resourceId,
    );
    dispatch({
      type: EditPlaylistStateActionTypes.UPDATE_SECTION_RESOURCE_IDS,
      resourceIds: updatedSectionResourceIds,
      sectionIndex: sectionIndex,
    });
    const updatePlaylistSectionJobInfo: UpdatePlaylistSectionJobInfo = {
      sectionIndex,
      playlistId: editPlaylistState.playlist.objectID,
      userId: editPlaylistState.currentUser.objectID,
      resourceIds: updatedSectionResourceIds,
    };
    DataSyncJobQueue.replace(
      DataSyncJobTypes.UPDATE_PLAYLIST_SECTION,
      updatePlaylistSectionJobInfo,
      (jobInfo: UpdatePlaylistSectionJobInfo) =>
        jobInfo.playlistId === updatePlaylistSectionJobInfo.playlistId &&
        jobInfo.sectionIndex === updatePlaylistSectionJobInfo.sectionIndex,
    );
  };

  const shiftResourceDown = async (resourceId, sectionIndex) => {
    const updatedSectionResourceIds = getSectionResourceIdsAfterShiftDown(
      editPlaylistState.playlist.sections,
      sectionIndex,
      resourceId,
    );
    dispatch({
      type: EditPlaylistStateActionTypes.UPDATE_SECTION_RESOURCE_IDS,
      resourceIds: updatedSectionResourceIds,
      sectionIndex: sectionIndex,
    });
    const updatePlaylistSectionJobInfo: UpdatePlaylistSectionJobInfo = {
      sectionIndex,
      playlistId: editPlaylistState.playlist.objectID,
      userId: editPlaylistState.currentUser.objectID,
      resourceIds: updatedSectionResourceIds,
    };
    DataSyncJobQueue.replace(
      DataSyncJobTypes.UPDATE_PLAYLIST_SECTION,
      updatePlaylistSectionJobInfo,
      (jobInfo: UpdatePlaylistSectionJobInfo) =>
        jobInfo.playlistId === updatePlaylistSectionJobInfo.playlistId &&
        jobInfo.sectionIndex === updatePlaylistSectionJobInfo.sectionIndex,
    );
  };

  const playlistSections = React.useMemo(() => {
    return editPlaylistState.playlist.sections.map((section, index) => {
      const sectionResources = section.resources
        .map(resourceId =>
          editPlaylistState.playlistResources.find(
            resource => resource.objectID === resourceId,
          ),
        )
        .filter(Boolean);
      const isEditing =
        section.sectionIndex === editPlaylistState.editingSectionIndex;
      const isSaving = isEditing && editPlaylistState.isSavingSectionData;

      return (
        <PlaylistSectionList
          key={index}
          playlist={editPlaylistState.playlist}
          section={section}
          resources={sectionResources}
          index={index}
          didClickEditSection={didClickEditSection}
          openAddVideoToSectionModal={openAddVideoToSectionModal}
          openRemoveVideoModal={openRemoveVideoModal}
          openEditVideoModal={openEditVideoModal}
          shiftResourceUp={shiftResourceUp}
          shiftResourceDown={shiftResourceDown}
          isEditing={isEditing}
          isSaving={isSaving}
          didClickCancelEdittingSection={didClickCancelEdittingSection}
          didClickSaveAfterEdittingSection={didClickSaveAfterEdittingSection}
          didClickDeleteSection={didClickDeleteSection}
          didClickViewResource={didClickViewResource}
          currentUser={editPlaylistState.currentUser}
          isApprovedContributor={editPlaylistState.isApprovedContributor}
        />
      );
    });
  }, [
    editPlaylistState.playlist,
    editPlaylistState.playlist.sections,
    editPlaylistState.editingSectionIndex,
    editPlaylistState.playlistResources,
    editPlaylistState.isSavingSectionData,
    editPlaylistState.currentUser,
    editPlaylistState.isApprovedContributor,
  ]);

  const playlistSectionsEmptyDisplay = React.useMemo(() => {
    const userIsPlaylistCreator =
      props.playlist.creatorUserId === props.currentUser.objectID;
    const displayText = userIsPlaylistCreator
      ? "You haven't added any sections to your playlist yet. Add a section and then you can add videos to each section."
      : "This playlist has no sections, as of now. You must be the creator of this playlist to add new sections.";

    return (
      <Card>
        <Empty
          image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
          imageStyle={{
            height: 60,
          }}
          description={<span>{displayText}</span>}
        >
          <Button
            disabled={!userIsPlaylistCreator}
            type="primary"
            onClick={() => openAddPlaylistSectionModal()}
          >
            Add a Section
          </Button>
        </Empty>
      </Card>
    );
  }, [props.playlist, props.currentUser]);

  const playlistSectionsContent = React.useMemo(() => {
    return editPlaylistState.playlist.sections.length === 0
      ? playlistSectionsEmptyDisplay
      : playlistSections;
  }, [
    editPlaylistState.playlist,
    playlistSectionsEmptyDisplay,
    playlistSections,
    props.currentUser,
  ]);

  const editSectionModal = React.useMemo(
    () =>
      editPlaylistState.showEditSectionModal ? (
        <EditPlaylistSectionModal
          show={true}
          playlist={editPlaylistState.playlist}
          sectionIndex={editPlaylistState.editSectionModalInfo.sectionIndex}
          sectionData={editPlaylistState.editSectionModalInfo.sectionData}
          closeModal={_ =>
            dispatch({
              type: EditPlaylistStateActionTypes.HIDE_EDIT_SECTION_MODAL,
            })
          }
        />
      ) : null,
    [
      props.location,
      props.history,
      editPlaylistState.playlist,
      editPlaylistState.showEditSectionModal,
      editPlaylistState.editSectionModalInfo,
      dispatch,
    ],
  );

  const addVideoToSectionModal = React.useMemo(
    () =>
      editPlaylistState.showAddVideoToSectionModal ? (
        <AddVideoToPlaylistSectionModal
          show={true}
          playlist={editPlaylistState.playlist}
          sectionIndex={
            editPlaylistState.addVideoToSectionModalInfo.sectionIndex
          }
          sectionData={editPlaylistState.addVideoToSectionModalInfo.sectionData}
          closeModal={closeModalParams => {
            dispatch({
              type:
                EditPlaylistStateActionTypes.HIDE_ADD_VIDEO_TO_SECTION_MODAL,
            });
            handleModalClose(closeModalParams);
          }}
        />
      ) : null,
    [
      props.location,
      props.history,
      editPlaylistState.playlist,
      editPlaylistState.showAddVideoToSectionModal,
      editPlaylistState.addVideoToSectionModalInfo,
      dispatch,
    ],
  );

  const removeVideoModal = React.useMemo(
    () =>
      editPlaylistState.showRemoveVideoModal ? (
        <RemoveVideoModal
          show={true}
          playlistId={editPlaylistState.playlist.objectID}
          section={editPlaylistState.removeVideoModalInfo.section}
          resource={editPlaylistState.removeVideoModalInfo.resource}
          closeModal={closeModalParams => {
            dispatch({
              type: EditPlaylistStateActionTypes.HIDE_REMOVE_VIDEO_MODAL,
            });
            handleModalClose(closeModalParams);
          }}
        />
      ) : null,
    [
      props.location,
      props.history,
      editPlaylistState.playlist,
      editPlaylistState.showRemoveVideoModal,
      editPlaylistState.removeVideoModalInfo,
      dispatch,
    ],
  );

  const editVideoModal = React.useMemo(
    () =>
      editPlaylistState.showEditVideoModal ? (
        <EditVideoModal
          show={true}
          resource={editPlaylistState.editVideoModalInfo.resource}
          closeModal={shouldReload => {
            dispatch({
              type: EditPlaylistStateActionTypes.HIDE_EDIT_VIDEO_MODAL,
            });
            if (shouldReload) {
              props.history.replace({
                ...props.location,
                pathname: props.location.pathname,
              });
            }
          }}
        />
      ) : null,
    [
      props.location,
      props.history,
      editPlaylistState.showEditVideoModal,
      editPlaylistState.editVideoModalInfo,
      dispatch,
    ],
  );

  const editPlaylistInfoModal = React.useMemo(
    () =>
      editPlaylistState.showEditPlaylistInfoModal ? (
        <EditPlaylistInfoModal
          show={true}
          playlist={editPlaylistState.playlist}
          closeModal={closeModalParams => {
            dispatch({
              type: EditPlaylistStateActionTypes.HIDE_EDIT_PLAYLIST_INFO_MODAL,
            });
            handleModalClose(closeModalParams);
          }}
        />
      ) : null,
    [
      props.location,
      props.history,
      editPlaylistState.showEditPlaylistInfoModal,
      editPlaylistState.editPlaylistInfoModalInfo,
      editPlaylistState.playlist,
      dispatch,
    ],
  );

  const addSectionModal = React.useMemo(
    () =>
      editPlaylistState.showAddPlaylistSectionModal ? (
        <AddPlaylistSectionModal
          show={true}
          playlist={editPlaylistState.playlist}
          closeModal={closeModalParams => {
            dispatch({
              type:
                EditPlaylistStateActionTypes.HIDE_ADD_PLAYLIST_SECTION_MODAL,
            });
            handleModalClose(closeModalParams);
          }}
        />
      ) : null,
    [
      props.location,
      props.history,
      editPlaylistState.showAddPlaylistSectionModal,
      editPlaylistState.addPlaylistSectionModalInfo,
      dispatch,
      editPlaylistState.playlist,
    ],
  );

  const deleteSectionModal = React.useMemo(
    () =>
      editPlaylistState.showDeleteSectionModal ? (
        <DeletePlaylistSectionModal
          show={true}
          playlist={editPlaylistState.playlist}
          section={editPlaylistState.deleteSectionModalInfo.section}
          closeModal={closeModalParams => {
            dispatch({
              type: EditPlaylistStateActionTypes.HIDE_DELETE_SECTION_MODAL,
            });
            handleModalClose(closeModalParams);
          }}
        />
      ) : null,
    [
      props.location,
      props.history,
      editPlaylistState.showDeleteSectionModal,
      editPlaylistState.deleteSectionModalInfo,
      dispatch,
      editPlaylistState.playlist,
    ],
  );

  const reorderSectionsModal = React.useMemo(
    () =>
      editPlaylistState.showReorderSectionsModal ? (
        <ReorderSectionsModal
          show={true}
          playlist={editPlaylistState.playlist}
          closeModal={closeModalParams => {
            dispatch({
              type: EditPlaylistStateActionTypes.HIDE_REORDER_SECTIONS_MODAL,
            });
            handleModalClose(closeModalParams);
          }}
        />
      ) : null,
    [
      props.location,
      props.history,
      editPlaylistState.showReorderSectionsModal,
      editPlaylistState.reorderSectionsModalInfo,
      editPlaylistState.playlist,
      dispatch,
    ],
  );

  const deletePlaylistModal = React.useMemo(
    () =>
      editPlaylistState.showDeletePlaylistModal ? (
        <DeletePlaylistModal
          show={true}
          playlist={editPlaylistState.playlist}
          closeModal={_ => {
            dispatch({
              type: EditPlaylistStateActionTypes.HIDE_DELETE_PLAYLIST_MODAL,
            });
            props.history.push("/mycontent");
          }}
        />
      ) : null,
    [
      props.location,
      props.history,
      editPlaylistState.showDeletePlaylistModal,
      editPlaylistState.playlist,
      dispatch,
    ],
  );

  const openDeletePlaylistModal = React.useCallback(
    () =>
      dispatch({
        type: EditPlaylistStateActionTypes.SHOW_DELETE_PLAYLIST_MODAL,
      }),
    [dispatch],
  );

  const joinPlaylistModal = React.useMemo(
    () =>
      editPlaylistState.showJoinPlaylistModal ? (
        <JoinPlaylistModal
          show={editPlaylistState.showJoinPlaylistModal}
          closeModal={shouldReload => {
            dispatch({
              type: EditPlaylistStateActionTypes.CLOSE_JOIN_PLAYLIST_MODAL,
            });
            if (shouldReload) {
              props.history.replace({
                ...props.location,
                pathname: props.location.pathname,
              });
            }
          }}
          playlistToJoin={editPlaylistState.playlist}
        />
      ) : null,
    [
      props.location,
      props.history,
      editPlaylistState.showJoinPlaylistModal,
      editPlaylistState.playlist,
      dispatch,
    ],
  );

  const openJoinPlaylistModal = React.useCallback(
    () =>
      dispatch({ type: EditPlaylistStateActionTypes.SHOW_JOIN_PLAYLIST_MODAL }),
    [dispatch],
  );

  const didClickBeginEditingContributors = React.useCallback(
    () =>
      dispatch({
        type: EditPlaylistStateActionTypes.BEGIN_EDITING_PLAYLIST_CONTRIBUTORS,
      }),
    [dispatch],
  );

  const didClickCancelEditingContributors = React.useCallback(
    () =>
      dispatch({
        type: EditPlaylistStateActionTypes.CANCEL_EDITING_PLAYLIST_CONTRIBUTORS,
      }),
    [dispatch],
  );

  const openRemoveContributorModal = React.useCallback(
    contributor =>
      dispatch({
        type: EditPlaylistStateActionTypes.SHOW_REMOVE_CONTRIBUTOR_MODAL,
        contributor: contributor,
        playlist: props.playlist,
      }),
    [dispatch, props.playlist],
  );

  const removeContributorModal = React.useMemo(
    () =>
      editPlaylistState.showRemoveContributorModal ? (
        <RemoveContributorModal
          show={editPlaylistState.showRemoveContributorModal}
          contributor={editPlaylistState.removeContributorModalInfo.contributor}
          content={editPlaylistState.playlist}
          closeModal={closeModalParams => {
            dispatch({
              type: EditPlaylistStateActionTypes.HIDE_REMOVE_CONTRIBUTOR_MODAL,
            });
            handleModalClose(closeModalParams);
          }}
          isMission={false}
        />
      ) : null,
    [
      props.location,
      props.history,
      editPlaylistState.showRemoveContributorModal,
      editPlaylistState.removeContributorModalInfo,
      editPlaylistState.playlist,
    ],
  );

  return (
    <div className={s.editPlaylistRoot}>
      {editSectionModal}
      {addVideoToSectionModal}
      {removeVideoModal}
      {editVideoModal}
      {editPlaylistInfoModal}
      {addSectionModal}
      {deleteSectionModal}
      {reorderSectionsModal}
      {joinPlaylistModal}
      {removeContributorModal}
      {deletePlaylistModal}
      <EditPlaylistPageHeader
        playlist={editPlaylistState.playlist}
        currentUser={editPlaylistState.currentUser}
        isApprovedContributor={editPlaylistState.isApprovedContributor}
        hasRequestedContributorPermission={
          editPlaylistState.hasRequestedContributorPermission
        }
        openJoinPlaylistModal={openJoinPlaylistModal}
        openEditPlaylistInfoModal={openEditPlaylistInfoModal}
        openReorderSectionsModal={openReorderSectionsModal}
        openAddPlaylistSectionModal={openAddPlaylistSectionModal}
        openDeletePlaylistModal={openDeletePlaylistModal}
        userLatestViewLogs={editPlaylistState.userLatestViewLogs}
      />
      <Grid className={s.editPlaylistRootGrid}>
        <EditPlaylistAccessAlert
          isApprovedContributor={editPlaylistState.isApprovedContributor}
          hasRequestedContributorPermission={
            editPlaylistState.hasRequestedContributorPermission
          }
          playlist={editPlaylistState.playlist}
        />
        {!editPlaylistState.isApprovedContributor &&
        !props.playlist.isCollaborative ? null : (
          <React.Fragment>
            <Grid.Column width={7} className={s.playlistInfoSectionContainer}>
              <PlaylistInfoSection
                currentUser={editPlaylistState.currentUser}
                playlist={editPlaylistState.playlist}
                playlistCreator={editPlaylistState.playlistCreator}
                isApprovedContributor={editPlaylistState.isApprovedContributor}
              />
              <EditPlaylistContributorsList
                openRemoveContributorModal={openRemoveContributorModal}
                contributors={editPlaylistState.playlistContributors}
                playlist={editPlaylistState.playlist}
                isApprovedContributor={editPlaylistState.isApprovedContributor}
                hasPlaylistOwnerPermissions={
                  editPlaylistState.hasPlaylistOwnerPermissions
                }
                didClickBeginEditingContributors={
                  didClickBeginEditingContributors
                }
                didClickCancelEditingContributors={
                  didClickCancelEditingContributors
                }
                isEditingContributors={editPlaylistState.isEditingContributors}
                currentUser={editPlaylistState.currentUser}
              />
            </Grid.Column>
            <Grid.Column width={9} className={s.playlistSectionsContainer}>
              {playlistSectionsContent}
            </Grid.Column>
          </React.Fragment>
        )}
      </Grid>
    </div>
  );
};

export default compose<Props, Props>(withRouter)(EditPlaylistView);
