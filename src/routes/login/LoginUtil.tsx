import RESTAPIClient from "RESTAPIClient";
import React from "react";
import * as DataTypes from "data/types";

interface LoginData {
  isLoading: boolean;
  error?: Error;
}

const useFetchLoginData = (authUser, pathname, matchParams): LoginData => {
  const [data, updateData] = React.useState<LoginData>({
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

export { useFetchLoginData };
