import * as DataTypes from "data/types";
import React from "react";
import RESTAPIClient from "RESTAPIClient";

interface LoginCreatorData {
  isLoading: boolean;
  error?: Error;
}

const upgradeUserToCreatorIfNecessary = async (userId: string) => {
  const creator = await RESTAPIClient.Creator.get(userId);
  if (!creator.creatorStatus) {
    await RESTAPIClient.Creator.upgradeUserToCreator(userId);
  }
};

const useFetchLoginCreatorData = (
  authUser: firebase.User,
  pathname,
  matchParams,
): LoginCreatorData => {
  const [data, updateData] = React.useState<LoginCreatorData>({
    isLoading: true,
    error: null,
  });

  const fetchData = async (): Promise<void> => {
    if (authUser) {
      try {
        updateData({
          ...data,
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
    } else {
      updateData({
        ...data,
        isLoading: false,
      });
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  return data;
};

export { useFetchLoginCreatorData, upgradeUserToCreatorIfNecessary };
