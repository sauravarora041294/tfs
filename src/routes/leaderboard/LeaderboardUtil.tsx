import * as DataTypes from "data/types";
import React from "react";
import RESTAPIClient from "RESTAPIClient";

interface LeaderboardData {
  isLoading: boolean;
  creators: Array<DataTypes.Creator>;
  error?: Error;
}

const useFetchLeaderboardData = (
  authUser: firebase.User,
  pathname,
  matchParams,
): LeaderboardData => {
  const [data, updateData] = React.useState<LeaderboardData>({
    isLoading: true,
    creators: null,
    error: null,
  });

  const fetchData = async (): Promise<void> => {
    try {
      const creators = await RESTAPIClient.Creator.getAllSortedByCurrentMonthPoints();
      updateData({
        ...data,
        creators: creators,
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

export { useFetchLeaderboardData };
