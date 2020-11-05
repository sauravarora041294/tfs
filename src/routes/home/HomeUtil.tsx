import * as DataTypes from "data/types";
import React from "react";
import RESTAPIClient from "RESTAPIClient";
import { CountTypes } from "RESTAPIClient/Public";

export interface LandingPageCountData {
  isLoading: boolean;
  count: {
    missionCount: number;
    creatorsCount: number;
    resourcesCount: number;
  };
  error?: Error;
}

export interface LandingPageTopCollections {
  isLoading: boolean;
  collections: DataTypes.Mission[];
  error?: Error;
}

const useFetchLandingPageCountData = (): LandingPageCountData => {
  const [data, updateData] = React.useState<LandingPageCountData>({
    isLoading: true,
    count: null,
    error: null,
  });

  const fetchData = async (): Promise<void> => {
    try {
      const missionCountPromise = RESTAPIClient.Public.getCount(
        CountTypes.MISSIONS,
      );
      const creatorsCountPromise = RESTAPIClient.Public.getCount(
        CountTypes.CREATORS,
      );
      const resourcesCountPromise = RESTAPIClient.Public.getCount(
        CountTypes.RESOURCES,
      );

      const result = await Promise.all([
        missionCountPromise,
        creatorsCountPromise,
        resourcesCountPromise,
      ]);

      updateData({
        ...data,
        count: {
          missionCount: result[0],
          creatorsCount: result[1],
          resourcesCount: result[2],
        },
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

const useFetchLandingPageTopCollectionsData = (): LandingPageTopCollections => {
  const [data, updateData] = React.useState<LandingPageTopCollections>({
    isLoading: true,
    collections: null,
    error: null,
  });

  const fetchData = async (): Promise<void> => {
    try {
      const result = await RESTAPIClient.Public.getTopMissions(3);

      updateData({
        ...data,
        collections: result.slice(0, 3), //Todo remove slice function once this is implemented at backend
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

export { useFetchLandingPageCountData, useFetchLandingPageTopCollectionsData };
