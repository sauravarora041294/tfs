import React from "react";

interface LoginEmployeeData {
  isLoading: boolean;
  error?: Error;
}

const useFetchLoginEmployeeData = (
  authUser: firebase.User,
  pathname,
  matchParams,
): LoginEmployeeData => {
  const [data, updateData] = React.useState<LoginEmployeeData>({
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
        console.log(`RouteFechDataError: ${error}`);
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

export { useFetchLoginEmployeeData };
