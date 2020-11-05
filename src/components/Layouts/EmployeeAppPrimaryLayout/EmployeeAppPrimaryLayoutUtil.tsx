import React from "react";
import RESTAPIClient from "RESTAPIClient";

interface EmployeeAppPrimaryLayoutState {
  isLoading: boolean;
  error?: Error;
}

const useFetchEmployeeAppPrimaryLayoutData = (
  authUser,
  location,
): EmployeeAppPrimaryLayoutState => {
  const [data, updateData] = React.useState<EmployeeAppPrimaryLayoutState>({
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
  }, [location]);

  return data;
};

export { useFetchEmployeeAppPrimaryLayoutData };
