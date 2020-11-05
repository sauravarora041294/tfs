import * as DataTypes from "data/types";
import React from "react";
import RESTAPIClient from "RESTAPIClient";

interface ResourceFilterItem {
  text: string;
  value: string;
}

interface MyFeedbackData {
  isLoading: boolean;
  ratings: Array<DataTypes.RatingWithMetadata>;
  resourceFilters: Array<ResourceFilterItem>;
  error?: Error;
}

const useFetchMyFeedbackData = (
  authUser: firebase.User,
  pathname: string,
  matchParams,
): MyFeedbackData => {
  const [data, updateData] = React.useState<MyFeedbackData>({
    isLoading: true,
    ratings: null,
    error: null,
    resourceFilters: null,
  });

  const fetchData = async (): Promise<void> => {
    try {
      const resources = await RESTAPIClient.Resource.getUploadedByUser(
        authUser.uid,
      );
      const ratingsPromises = resources.map(async resource => {
        return await RESTAPIClient.Rating.getLatestForUserByResourceId(
          resource.objectID,
        );
      });
      const ratings = (await Promise.all(ratingsPromises)).reduce((acc, curr) =>
        acc.concat(curr),
      );
      const resourceFilters = resources.map(resource => {
        return {
          text: resource.title,
          value: resource.objectID,
        };
      });
      updateData({
        ...data,
        ratings: ratings,
        isLoading: false,
        resourceFilters: resourceFilters,
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

export { useFetchMyFeedbackData };
