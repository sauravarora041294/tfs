import * as DataTypes from "data/types";
import React from "react";
import RESTAPIClient from "RESTAPIClient";

interface CreatorAppPrimaryLayoutState {
  isLoading: boolean;
  pendingMissionContributorRequests: null;
  attentionRequiringNotifications: Array<Object>;
  error?: Error;
}

const useFetchCreatorAppPrimaryLayoutData = (
  authUser,
  location,
): CreatorAppPrimaryLayoutState => {
  const [data, updateData] = React.useState<CreatorAppPrimaryLayoutState>({
    isLoading: true,
    pendingMissionContributorRequests: null,
    attentionRequiringNotifications: [],
    error: null,
  });

  const fetchData = async (): Promise<void> => {
    if (authUser) {
      try {
        const attentionRequiringNotifications = await RESTAPIClient.Notification.getAttentionRequiring(
          {
            userId: authUser.uid,
          },
        );
        updateData({
          ...data,
          attentionRequiringNotifications: attentionRequiringNotifications,
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

export { useFetchCreatorAppPrimaryLayoutData };
