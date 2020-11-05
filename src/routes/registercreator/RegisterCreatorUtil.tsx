import * as DataTypes from "data/types";
import React from "react";
import RESTAPIClient from "RESTAPIClient";
interface RegisterCreatorData {
  isLoading: boolean;
  error?: Error;
}

const useFetchRegisterCreatorData = (
  authUser,
  pathname,
  matchParams,
): RegisterCreatorData => {
  const [data, updateData] = React.useState<RegisterCreatorData>({
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

export { useFetchRegisterCreatorData };
