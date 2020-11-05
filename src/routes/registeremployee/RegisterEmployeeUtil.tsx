import React from "react";
interface RegisterEmployeeData {
  isLoading: boolean;
  error?: Error;
}

const useFetchRegisterEmployeeData = (
  authUser,
  pathname,
  matchParams,
): RegisterEmployeeData => {
  const [data, updateData] = React.useState<RegisterEmployeeData>({
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

export { useFetchRegisterEmployeeData };
