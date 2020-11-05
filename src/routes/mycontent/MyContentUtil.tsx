import * as DataTypes from "data/types";
import React from "react";
import RESTAPIClient from "RESTAPIClient";

interface State {
  isLoading: boolean;
  myMissions: Array<DataTypes.Mission>;
  myPlaylists: Array<DataTypes.Playlist>;
  myResources: Array<DataTypes.Resource>;
  error?: Error;
}

const useFetchMyContentData = (
  authUser: firebase.User,
  pathname,
  matchParams,
): State => {
  const [data, updateData] = React.useState<State>({
    isLoading: true,
    myMissions: null,
    myPlaylists: null,
    myResources: null,
    error: null,
  });

  const fetchData = async (): Promise<void> => {
    try {
      const myResources = await RESTAPIClient.Resource.getUploadedByUser(
        authUser.uid,
      );
      const myMissions = await RESTAPIClient.Mission.getByContributorUserId(
        authUser.uid,
      );
      const myPlaylists = await RESTAPIClient.Playlist.getByContributorUserId(
        authUser.uid,
      );

      updateData({
        ...data,
        myMissions: myMissions,
        myPlaylists: myPlaylists,
        myResources: myResources,
        isLoading: false,
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

export { useFetchMyContentData };
