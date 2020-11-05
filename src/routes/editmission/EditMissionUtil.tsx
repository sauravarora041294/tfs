import * as DataTypes from "data/types";
import React from "react";
import RESTAPIClient from "RESTAPIClient";

interface EditMissionData {
  isLoading: boolean;
  mission: DataTypes.Mission;
  missionCreator: DataTypes.Creator;
  missionContributors: Array<DataTypes.Creator>;
  missionContentRequests: Array<DataTypes.ContentRequest>;
  pendingContributorRequestsForThisMission: Array<DataTypes.Request>;
  removeContributorInfo: {
    contributor: DataTypes.User;
    mission: DataTypes.Mission;
  };
  isRemoveContributorModalVisible: boolean;
  showEditMissionContributorsCard: boolean;
  myContentInMission: Array<DataTypes.Content>;
  missionPlaylists: Array<DataTypes.Playlist>;
  missionResources: Array<DataTypes.Resource>;
  error?: Error;
}

const useFetchEditMissionData = (
  authUser,
  pathname,
  matchParams,
): EditMissionData => {
  const [data, updateData] = React.useState<EditMissionData>({
    isLoading: true,
    mission: null,
    missionCreator: null,
    missionContributors: null,
    missionContentRequests: null,
    pendingContributorRequestsForThisMission: null,
    removeContributorInfo: {
      contributor: null,
      mission: null,
    },
    isRemoveContributorModalVisible: null,
    showEditMissionContributorsCard: null,
    error: null,
    myContentInMission: null,
    missionPlaylists: null,
    missionResources: null,
  });

  const fetchData = async (): Promise<void> => {
    try {
      const mission = await RESTAPIClient.Mission.get(matchParams.missionId);
      const missionContributors = await RESTAPIClient.Mission.getContributors(
        matchParams.missionId,
      );
      const missionCreator = await RESTAPIClient.User.get(
        mission.creatorUserId,
      );
      const myContentInMission = await RESTAPIClient.Content.getByMissionAndCreator(
        matchParams.missionId,
        authUser.uid,
      );
      const missionResources = await RESTAPIClient.Resource.getByMissionId(
        matchParams.missionId,
      );
      const missionPlaylists = await RESTAPIClient.Playlist.getByMissionId(
        matchParams.missionId,
      );
      const missionContentRequests = await RESTAPIClient.ContentRequest.getByMissionIdWithMetadata(
        matchParams.missionId,
      );
      const pendingContributorRequestsForThisMission = await RESTAPIClient.Request.getPendingMissionContributorRequestsForUserAndMission(
        { requesterUserId: authUser.uid, missionId: matchParams.missionId },
      );

      updateData({
        ...data,
        mission,
        isLoading: false,
        missionCreator,
        missionContributors,
        missionContentRequests,
        myContentInMission,
        pendingContributorRequestsForThisMission,
        isRemoveContributorModalVisible: false,
        showEditMissionContributorsCard: false,
        missionPlaylists,
        missionResources,
        removeContributorInfo: {
          contributor: null,
          mission: null,
        },
        error: null,
      });
    } catch (error) {
      console.log(`RouteFetchDataError: ${error}`);
      updateData({
        ...data,
        isLoading: false,
        error: error,
      });
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  return data;
};

const removeContentFromMissionServerCall = async (
  missionId: string,
  objectIDToRemove: string,
  contentType: string,
  currentUserId: string,
) => {
  try {
    const removeContentResponse = await RESTAPIClient.Mission.removeContent(
      missionId,
      objectIDToRemove,
      contentType,
      currentUserId,
    );
    return {
      removeContentResponse: removeContentResponse,
      error: null,
    };
  } catch (error) {
    console.log(`RouteSubmitDataError: ${error}`);
    return {
      removeContentResponse: null,
      error: error,
    };
  }
};

export { useFetchEditMissionData, removeContentFromMissionServerCall };
