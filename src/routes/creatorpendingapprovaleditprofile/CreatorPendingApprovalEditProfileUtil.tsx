import * as DataTypes from "data/types";
import React from "react";
import RESTAPIClient from "RESTAPIClient";

interface CreatorPendingApprovalEditProfileData {
  isLoading: boolean;
  error?: Error;
}

const useFetchCreatorPendingApprovalEditProfileData = (
  authUser,
  pathname,
  matchParams,
): CreatorPendingApprovalEditProfileData => {
  const [data, updateData] = React.useState<
    CreatorPendingApprovalEditProfileData
  >({
    isLoading: true,
    error: null,
  });

  const fetchData = async (): Promise<void> => {
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
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  return data;
};

export { useFetchCreatorPendingApprovalEditProfileData };
