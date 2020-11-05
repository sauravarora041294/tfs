import * as DataTypes from "data/types";
import React from "react";
import RESTAPIClient from "RESTAPIClient";

interface CreatorPayoutsData {
  isLoading: boolean;
  creators: Array<DataTypes.Creator>;
  error?: Error;
}

const useFetchCreatorsWithStripeAndRevenueData = (
  authUser: firebase.User,
  pathname,
  matchParams,
): CreatorPayoutsData => {
  const [data, updateData] = React.useState<CreatorPayoutsData>({
    isLoading: true,
    creators: null,
    error: null,
  });

  const fetchData = async (): Promise<void> => {
    try {
      const creators = await RESTAPIClient.Creator.getAllWithStripeAccounts();
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

export { useFetchCreatorsWithStripeAndRevenueData };
