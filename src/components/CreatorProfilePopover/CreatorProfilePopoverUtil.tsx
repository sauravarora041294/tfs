import * as DataTypes from "data/types";
import React from "react";
import RESTAPIClient from "RESTAPIClient";

interface State {
  isLoading: boolean;
  creatorWithMetadata: DataTypes.CreatorWithMetadata;
  error?: Error;
}

const useFetchCreatorProfilePopoverData = (creatorUserId: string): State => {
  const [data, updateData] = React.useState({
    isLoading: true,
    creatorWithMetadata: null,
    error: null,
  });

  const fetchData = async (): Promise<void> => {
    try {
      const creatorWithMetadata = await RESTAPIClient.Public.getWithMetadata(
        creatorUserId,
      );

      updateData({
        ...data,
        creatorWithMetadata,
        isLoading: false,
      });
    } catch (error) {
      console.log(`ComponentFetchDataError: ${error}`);
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

export { useFetchCreatorProfilePopoverData };
