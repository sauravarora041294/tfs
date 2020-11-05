import * as DataTypes from "data/types";
import React from "react";
import RESTAPIClient from "RESTAPIClient";

interface CreatorPendingApprovalData {
  isLoading: boolean;
  error?: Error;
}

const useFetchCreatorPendingApprovalData = (
  authUser,
  pathname,
  matchParams,
): CreatorPendingApprovalData => {
  const [data, updateData] = React.useState<CreatorPendingApprovalData>({
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

export { useFetchCreatorPendingApprovalData };
