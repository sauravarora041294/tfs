import arrayMove from "array-move";
import * as DataTypes from "data/types";

interface EditPlaylistState {
  userLatestViewLogs?: DataTypes.UserLatestViewlogs;
  currentUser: DataTypes.User;
  playlist: DataTypes.Playlist;
  playlistResources: Array<DataTypes.Resource>;
  playlistCreator: DataTypes.User;
  playlistContributors: Array<DataTypes.User>;
  pendingContributorRequestsForThisPlaylist: Array<DataTypes.Request>;
  section?: DataTypes.Section;
  sectionData?: DataTypes.Section;
  sectionIndex?: number;
  resource?: DataTypes.Resource;
  resourceId?: string;
  sectionDataSubmissionError?: Error;
  editingSectionIndex?: number;
  isSavingSectionData?: boolean;
  isApprovedContributor?: boolean;
  showEditSectionModal?: boolean;
  editSectionModalInfo?: {
    sectionIndex: number;
    sectionData: DataTypes.Section;
  };
  showAddVideoToSectionModal?: boolean;
  addVideoToSectionModalInfo?: {
    sectionData: DataTypes.Section;
    sectionIndex: number;
  };
  showRemoveVideoModal?: boolean;
  removeVideoModalInfo?: {
    section: DataTypes.Section;
    resource: DataTypes.Resource;
  };
  showEditVideoModal?: boolean;
  editVideoModalInfo?: {
    resource: DataTypes.Resource;
  };
  showEditPlaylistInfoModal?: boolean;
  editPlaylistInfoModalInfo?: {
    playlist: DataTypes.Playlist;
  };
  showAddPlaylistSectionModal?: boolean;
  addPlaylistSectionModalInfo?: {
    playlist: DataTypes.Playlist;
  };
  showDeleteSectionModal?: boolean;
  deleteSectionModalInfo?: {
    playlist: DataTypes.Playlist;
    section: DataTypes.Section;
  };
  showReorderSectionsModal?: boolean;
  reorderSectionsModalInfo?: {
    playlist: DataTypes.Playlist;
  };
  showJoinPlaylistModal?: boolean;
  showRemoveContributorModal?: boolean;
  removeContributorModalInfo?: {
    contributor: DataTypes.User;
    playlist: DataTypes.Playlist;
  };
  showDeletePlaylistModal?: boolean;
  hasPlaylistOwnerPermissions?: boolean;
  hasRequestedContributorPermission?: boolean;
  isEditingContributors?: boolean;
  playlistSectionsToBeSynced: Array<number>;
}

enum EditPlaylistStateActionTypes {
  UPDATE_PLAYLIST = "UPDATE_PLAYLIST",
  UPDATE_CONTRIBUTORS = "UPDATE_CONTRIBUTORS",
  BEGIN_EDITING_PLAYLIST_CONTRIBUTORS = "BEGIN_EDITING_PLAYLIST_CONTRIBUTORS",
  CANCEL_EDITING_PLAYLIST_CONTRIBUTORS = "CANCEL_EDITING_PLAYLIST_CONTRIBUTORS",
  SHOW_REMOVE_CONTRIBUTOR_MODAL = "SHOW_REMOVE_CONTRIBUTOR_MODAL",
  HIDE_REMOVE_CONTRIBUTOR_MODAL = "HIDE_REMOVE_CONTRIBUTOR_MODAL",
  UPDATE_PLAYLIST_CONTRIBUTORS = "UPDATE_PLAYLIST_CONTRIBUTORS",
  SHOW_EDIT_SECTION_MODAL = "SHOW_EDIT_SECTION_MODAL",
  HIDE_EDIT_SECTION_MODAL = "HIDE_EDIT_SECTION_MODAL",
  SHOW_ADD_VIDEO_TO_SECTION_MODAL = "SHOW_ADD_VIDEO_TO_SECTION_MODAL",
  HIDE_ADD_VIDEO_TO_SECTION_MODAL = "HIDE_ADD_VIDEO_TO_SECTION_MODAL",
  SHOW_REMOVE_VIDEO_MODAL = "SHOW_REMOVE_VIDEO_MODAL",
  HIDE_REMOVE_VIDEO_MODAL = "HIDE_REMOVE_VIDEO_MODAL",
  SHOW_EDIT_VIDEO_MODAL = "SHOW_EDIT_VIDEO_MODAL",
  HIDE_EDIT_VIDEO_MODAL = "HIDE_EDIT_VIDEO_MODAL",
  BEGIN_SECTION_DATA_SAVE = "BEGIN_SECTION_DATA_SAVE",
  BEGIN_EDITING_SECTION = "BEGIN_EDITING_SECTION",
  FINISHED_SECTION_DATA_SAVE_SUCCESSFULLY = "FINISHED_SECTION_DATA_SAVE_SUCCESSFULLY",
  FINISHED_SECTION_DATA_SAVE_WITH_ERROR = "FINISHED_SECTION_DATA_SAVE_wITH_ERROR",
  CANCEL_EDITING_SECTION = "CANCEL_EDITING_SECTION",
  SHOW_EDIT_PLAYLIST_INFO_MODAL = "SHOW_EDIT_PLAYLIST_INFO_MODAL",
  HIDE_EDIT_PLAYLIST_INFO_MODAL = "HIDE_EDIT_PLAYLIST_INFO_MODAL",
  SHOW_ADD_PLAYLIST_SECTION_MODAL = "SHOW_ADD_PLAYLIST_SECTION_MODAL",
  HIDE_ADD_PLAYLIST_SECTION_MODAL = "HIDE_ADD_PLAYLIST_SECTION_MODAL",
  SHOW_DELETE_SECTION_MODAL = "SHOW_DELETE_SECTION_MODAL",
  HIDE_DELETE_SECTION_MODAL = "HIDE_DELETE_SECTION_MODAL",
  SHOW_REORDER_SECTIONS_MODAL = "SHOW_REORDER_SECTIONS_MODAL",
  HIDE_REORDER_SECTIONS_MODAL = "HIDE_REORDER_SECTIONS_MODAL",
  SHOW_JOIN_PLAYLIST_MODAL = "SHOW_JOIN_PLAYLIST_MODAL",
  CLOSE_JOIN_PLAYLIST_MODAL = "CLOSE_JOIN_PLAYLIST_MODAL",
  SHOW_DELETE_PLAYLIST_MODAL = "SHOW_DELETE_PLAYLIST_MODAL",
  HIDE_DELETE_PLAYLIST_MODAL = "HIDE_DELETE_PLAYLIST_MODAL",
  UPDATE_SECTION_RESOURCE_IDS = "UPDATE_SECTION_RESOURCE_IDS",
  UPDATE_PLAYLIST_RESOURCES = "UPDATE_PLAYLIST_RESOURCES",
}

interface EditPlaylistStateAction {
  type: EditPlaylistStateActionTypes;
  section?: DataTypes.Section;
  sectionData?: DataTypes.Section;
  sectionIndex?: number;
  resource?: DataTypes.Resource;
  resourceId?: string;
  resourceIds?: Array<string>;
  sectionDataSubmissionError?: Error;
  playlist?: DataTypes.Playlist;
  currentUser?: DataTypes.User;
  playlistResources?: Array<DataTypes.Resource>;
  editingSectionIndex?: number;
  isSavingSectionData?: boolean;
  isApprovedContributor?: boolean;
  showEditSectionModal?: boolean;
  editSectionModalInfo?: {
    sectionIndex: number;
    sectionData: DataTypes.Section;
  };
  showAddVideoToSectionModal?: boolean;
  addVideoToSectionModalInfo?: {
    sectionData: DataTypes.Section;
    sectionIndex: number;
  };
  showRemoveVideoModal?: boolean;
  removeVideoModalInfo?: {
    section: DataTypes.Section;
    resource: DataTypes.Resource;
  };
  showEditVideoModal?: boolean;
  editVideoModalInfo?: {
    section: DataTypes.Section;
    resource: DataTypes.Resource;
  };
  showEditPlaylistInfoModal?: boolean;
  editPlaylistInfoModalInfo?: {
    playlist: DataTypes.Playlist;
  };
  showAddPlaylistSectionModal?: boolean;
  addPlaylistSectionModalInfo?: {
    playlist: DataTypes.Playlist;
  };
  showDeleteSectionModal?: boolean;
  deleteSectionModalInfo?: {
    playlist: DataTypes.Playlist;
    section: DataTypes.Section;
  };
  showReorderSectionsModal?: boolean;
  reorderSectionsModalInfo?: {
    playlist: DataTypes.Playlist;
  };
  showJoinPlaylistModal?: boolean;
  hasRequestedContributorPermission?: boolean;
  playlistCreator?: DataTypes.Creator;
  playlistContributors?: Array<DataTypes.Creator>;
  pendingContributorRequestsForThisPlaylist?: Array<DataTypes.Request>;
  contributor?: DataTypes.Creator;
  contributors?: Array<DataTypes.Creator>;
  isEditingContributors?: boolean;
  showRemoveContributorModal?: boolean;
  removeContributorModalInfo?: {
    contributor: DataTypes.User;
    playlist: DataTypes.Playlist;
  };
}

const editPlaylistStateInit = (
  initialState: EditPlaylistState,
): EditPlaylistState => {
  const isApprovedContributor =
    initialState.currentUser &&
    initialState.playlist.contributors.includes(
      initialState.currentUser.objectID,
    );
  const hasRequestedContributorPermission =
    initialState.pendingContributorRequestsForThisPlaylist.length > 0;
  const hasPlaylistOwnerPermissions =
    initialState.playlist &&
    initialState.currentUser &&
    initialState.playlist.creatorUserId === initialState.currentUser.objectID;
  return {
    ...initialState,
    showEditSectionModal: false,
    editSectionModalInfo: null,
    showAddVideoToSectionModal: false,
    addVideoToSectionModalInfo: null,
    showRemoveVideoModal: false,
    removeVideoModalInfo: null,
    showEditVideoModal: false,
    editVideoModalInfo: null,
    editingSectionIndex: null,
    sectionDataSubmissionError: null,
    isSavingSectionData: false,
    showEditPlaylistInfoModal: false,
    editPlaylistInfoModalInfo: null,
    isApprovedContributor,
    hasRequestedContributorPermission,
    hasPlaylistOwnerPermissions,
    showJoinPlaylistModal: false,
    isEditingContributors: false,
    showRemoveContributorModal: false,
    removeContributorModalInfo: {
      contributor: null,
      playlist: null,
    },
    showDeletePlaylistModal: false,
    playlistSectionsToBeSynced: [],
  };
};

const editPlaylistReducer = (
  state: EditPlaylistState,
  action: EditPlaylistStateAction,
): EditPlaylistState => {
  switch (action.type) {
    case EditPlaylistStateActionTypes.UPDATE_PLAYLIST:
      return {
        ...state,
        playlist: action.playlist,
        isApprovedContributor: action.playlist.contributors.find(
          contributorID => contributorID === state.currentUser.objectID,
        )
          ? true
          : false,
        playlistSectionsToBeSynced: [],
      };
    case EditPlaylistStateActionTypes.UPDATE_CONTRIBUTORS:
      return {
        ...state,
        playlistContributors: action.contributors,
      };
    case EditPlaylistStateActionTypes.BEGIN_EDITING_PLAYLIST_CONTRIBUTORS:
      return {
        ...state,
        isEditingContributors: true,
      };
    case EditPlaylistStateActionTypes.CANCEL_EDITING_PLAYLIST_CONTRIBUTORS:
      return {
        ...state,
        isEditingContributors: false,
      };
    case EditPlaylistStateActionTypes.SHOW_REMOVE_CONTRIBUTOR_MODAL:
      const removeContributorInfo = {
        contributor: action.contributor,
        playlist: action.playlist,
      };
      return {
        ...state,
        showRemoveContributorModal: true,
        removeContributorModalInfo: removeContributorInfo,
      };
    case EditPlaylistStateActionTypes.HIDE_REMOVE_CONTRIBUTOR_MODAL:
      return {
        ...state,
        showRemoveContributorModal: false,
      };
    case EditPlaylistStateActionTypes.UPDATE_PLAYLIST_CONTRIBUTORS:
      return {
        ...state,
        playlistContributors: action.contributors,
      };
    case EditPlaylistStateActionTypes.SHOW_EDIT_SECTION_MODAL:
      const editSectionModalInfo = {
        sectionData: action.sectionData,
        sectionIndex: action.sectionIndex,
      };
      return {
        ...state,
        showEditSectionModal: true,
        editSectionModalInfo: editSectionModalInfo,
      };
    case EditPlaylistStateActionTypes.HIDE_EDIT_SECTION_MODAL:
      return {
        ...state,
        showEditSectionModal: false,
        editSectionModalInfo: null,
      };
    case EditPlaylistStateActionTypes.SHOW_ADD_VIDEO_TO_SECTION_MODAL:
      const addVideoToSectionModalInfo = {
        sectionData: action.sectionData,
        sectionIndex: action.sectionIndex,
      };
      return {
        ...state,
        showAddVideoToSectionModal: true,
        addVideoToSectionModalInfo: addVideoToSectionModalInfo,
      };
    case EditPlaylistStateActionTypes.HIDE_ADD_VIDEO_TO_SECTION_MODAL:
      return {
        ...state,
        showAddVideoToSectionModal: false,
        addVideoToSectionModalInfo: null,
      };
    case EditPlaylistStateActionTypes.SHOW_REMOVE_VIDEO_MODAL:
      const removeVideoModalInfo = {
        resource: action.resource,
        section: action.section,
      };
      return {
        ...state,
        showRemoveVideoModal: true,
        removeVideoModalInfo: removeVideoModalInfo,
      };
    case EditPlaylistStateActionTypes.HIDE_REMOVE_VIDEO_MODAL:
      return {
        ...state,
        showRemoveVideoModal: false,
        removeVideoModalInfo: null,
      };
    case EditPlaylistStateActionTypes.SHOW_EDIT_VIDEO_MODAL:
      const editVideoModalInfo = {
        resource: action.resource,
      };
      return {
        ...state,
        showEditVideoModal: true,
        editVideoModalInfo: editVideoModalInfo,
      };
    case EditPlaylistStateActionTypes.HIDE_EDIT_VIDEO_MODAL:
      return {
        ...state,
        showEditVideoModal: false,
        editVideoModalInfo: null,
      };
    case EditPlaylistStateActionTypes.UPDATE_SECTION_RESOURCE_IDS:
      const playlistSections = state.playlist.sections || [];
      const relevantSection = playlistSections[action.sectionIndex - 1];
      relevantSection.resources = action.resourceIds;
      playlistSections[action.sectionIndex - 1] = relevantSection;
      const sectionsToBeSynced = Array.from(
        new Set(state.playlistSectionsToBeSynced.concat([action.sectionIndex])),
      );
      return {
        ...state,
        playlist: { ...state.playlist, sections: playlistSections },
        playlistSectionsToBeSynced: sectionsToBeSynced,
      };
    case EditPlaylistStateActionTypes.BEGIN_SECTION_DATA_SAVE:
      return { ...state, isSavingSectionData: true };
    case EditPlaylistStateActionTypes.BEGIN_EDITING_SECTION:
      return { ...state, editingSectionIndex: action.sectionIndex };
    case EditPlaylistStateActionTypes.FINISHED_SECTION_DATA_SAVE_SUCCESSFULLY:
      return {
        ...state,
        editingSectionIndex: null,
        isSavingSectionData: false,
        sectionDataSubmissionError: null,
      };
    case EditPlaylistStateActionTypes.FINISHED_SECTION_DATA_SAVE_WITH_ERROR:
      return {
        ...state,
        sectionDataSubmissionError: action.sectionDataSubmissionError,
        isSavingSectionData: false,
      };
    case EditPlaylistStateActionTypes.CANCEL_EDITING_SECTION:
      return {
        ...state,
        isSavingSectionData: false,
        editingSectionIndex: null,
        sectionDataSubmissionError: null,
      };
    case EditPlaylistStateActionTypes.SHOW_EDIT_PLAYLIST_INFO_MODAL:
      const editPlaylistInfoModalInfo = {
        playlist: action.playlist,
      };
      return {
        ...state,
        showEditPlaylistInfoModal: true,
        editPlaylistInfoModalInfo: editPlaylistInfoModalInfo,
      };
    case EditPlaylistStateActionTypes.HIDE_EDIT_PLAYLIST_INFO_MODAL:
      return {
        ...state,
        showEditPlaylistInfoModal: false,
        editPlaylistInfoModalInfo: null,
      };
    case EditPlaylistStateActionTypes.SHOW_ADD_PLAYLIST_SECTION_MODAL:
      const addPlaylistSectionModalInfo = {
        playlist: action.playlist,
      };
      return {
        ...state,
        addPlaylistSectionModalInfo: addPlaylistSectionModalInfo,
        showAddPlaylistSectionModal: true,
      };
    case EditPlaylistStateActionTypes.HIDE_ADD_PLAYLIST_SECTION_MODAL:
      return {
        ...state,
        showAddPlaylistSectionModal: false,
        addPlaylistSectionModalInfo: null,
      };
    case EditPlaylistStateActionTypes.SHOW_DELETE_SECTION_MODAL:
      const deleteSectionModalInfo = {
        section: action.section,
        playlist: action.playlist,
      };
      return {
        ...state,
        deleteSectionModalInfo: deleteSectionModalInfo,
        showDeleteSectionModal: true,
      };
    case EditPlaylistStateActionTypes.HIDE_DELETE_SECTION_MODAL:
      return {
        ...state,
        showDeleteSectionModal: false,
        deleteSectionModalInfo: null,
        isSavingSectionData: false,
        editingSectionIndex: null,
        sectionDataSubmissionError: null,
      };
    case EditPlaylistStateActionTypes.SHOW_REORDER_SECTIONS_MODAL:
      const reorderSectionsModalInfo = {
        playlist: action.playlist,
      };
      return {
        ...state,
        reorderSectionsModalInfo: reorderSectionsModalInfo,
        showReorderSectionsModal: true,
      };
    case EditPlaylistStateActionTypes.HIDE_REORDER_SECTIONS_MODAL:
      return {
        ...state,
        showReorderSectionsModal: false,
        reorderSectionsModalInfo: null,
      };
    case EditPlaylistStateActionTypes.SHOW_JOIN_PLAYLIST_MODAL:
      return {
        ...state,
        showJoinPlaylistModal: true,
      };
    case EditPlaylistStateActionTypes.CLOSE_JOIN_PLAYLIST_MODAL:
      return {
        ...state,
        showJoinPlaylistModal: false,
      };
    case EditPlaylistStateActionTypes.SHOW_DELETE_PLAYLIST_MODAL:
      return {
        ...state,
        showDeletePlaylistModal: true,
      };
    case EditPlaylistStateActionTypes.HIDE_DELETE_PLAYLIST_MODAL:
      return {
        ...state,
        showDeletePlaylistModal: false,
      };
    case EditPlaylistStateActionTypes.UPDATE_PLAYLIST_RESOURCES:
      return {
        ...state,
        playlistResources: action.playlistResources,
      };
    default:
      return state;
  }
};

const getSectionResourceIdsAfterShiftUp = (
  sections: Array<DataTypes.Section>,
  sectionIndex: number,
  resourceId: string,
) => {
  const index = sections.findIndex(
    section => section.sectionIndex === sectionIndex,
  );
  const resourceIds = (sections && sections[index].resources) || [];
  const oldIndex = resourceIds.findIndex(id => resourceId === id);
  const newIndex = oldIndex > 0 ? oldIndex - 1 : 0;
  const updatedResourceIds = arrayMove(resourceIds, oldIndex, newIndex);
  return updatedResourceIds;
};

const getSectionResourceIdsAfterShiftDown = (
  sections: Array<DataTypes.Section>,
  sectionIndex: number,
  resourceId: string,
) => {
  const index = sections.findIndex(
    section => section.sectionIndex === sectionIndex,
  );
  const resourceIds = (sections && sections[index].resources) || [];
  const oldIndex = resourceIds.findIndex(id => resourceId === id);
  const newIndex =
    oldIndex < resourceIds.length - 1 ? oldIndex + 1 : resourceIds.length - 1;
  const updatedResourceIds = arrayMove(resourceIds, oldIndex, newIndex);
  return updatedResourceIds;
};

export {
  EditPlaylistStateActionTypes,
  editPlaylistStateInit,
  editPlaylistReducer,
  getSectionResourceIdsAfterShiftUp,
  getSectionResourceIdsAfterShiftDown,
};
