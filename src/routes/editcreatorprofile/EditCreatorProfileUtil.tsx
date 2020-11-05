import * as DataTypes from "data/types";
import React from "react";
import RESTAPIClient from "RESTAPIClient";

interface EditCreatorProfileData {
  isLoading: boolean;
  error?: Error;
}

const useFetchEditCreatorProfileData = (authUser): EditCreatorProfileData => {
  const [data, updateData] = React.useState<EditCreatorProfileData>({
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

export { useFetchEditCreatorProfileData };
