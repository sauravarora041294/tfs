import * as DataTypes from "data/types";
import React from "react";
import RESTAPIClient from "RESTAPIClient";

interface CreatorNotificationsData {
  isLoading: boolean;
  notifications: Array<DataTypes.Notification>;
  error?: Error;
}

const useFetchCreatorNotificationsData = (
  authUser,
  pathname,
  matchParams,
): CreatorNotificationsData => {
  const [data, updateData] = React.useState<CreatorNotificationsData>({
    isLoading: true,
    notifications: null,
    error: null,
  });

  const fetchData = async (): Promise<void> => {
    try {
      const notifications = await RESTAPIClient.Notification.getToShowForUser({
        userId: authUser.uid,
      });
      updateData({
        ...data,
        notifications: notifications,
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

const REQUEST_TYPES = {
  PLAYLIST_CONTRIBUTOR: "PLAYLIST_CONTRIBUTOR",
  MISSION_CONTRIBUTOR: "MISSION_CONTRIBUTOR",
};

const REQUEST_STATUS = {
  PENDING_APPROVAL: "PENDING_APPROVAL",
  APPROVED: "APPROVED",
  DENIED: "DENIED",
};

const NOTIFICATION_TYPES = {
  PENDING_REQUEST: "PENDING_REQUEST",
  RESOLVED_REQUEST: "RESOLVED_REQUEST",
};

const approveRequest = async ({ reviewerUserId, requestId }) => {
  try {
    const approveRequestResponse = await RESTAPIClient.Request.approve({
      reviewerUserId,
      requestId,
    });

    return {
      approveRequestResponse: approveRequestResponse,
      error: null,
    };
  } catch (error) {
    console.log(`RouteSubmitDataError: ${error}`);
    return {
      approveRequestResponse: null,
      error: error,
    };
  }
};

const denyRequest = async ({ reviewerUserId, requestId }) => {
  try {
    const denyRequestResponse = await RESTAPIClient.Request.deny({
      reviewerUserId,
      requestId,
    });

    return {
      denyRequestResponse: denyRequestResponse,
      error: null,
    };
  } catch (error) {
    console.log(`RouteSubmitDataError: ${error}`);
    return {
      denyRequestResponse: null,
      error: error,
    };
  }
};

const markNotificationsAsSeen = async ({ notificationIds }) => {
  try {
    const saveNotificationsResponse = await RESTAPIClient.Notification.markAsSeen(
      {
        notificationIds,
      },
    );
    return {
      saveNotificationsResponse: saveNotificationsResponse,
      error: null,
    };
  } catch (error) {
    console.log(`RouteSubmitDataError: ${error}`);
    return {
      saveNotificationsResponse: null,
      error: error,
    };
  }
};

export {
  useFetchCreatorNotificationsData,
  REQUEST_TYPES,
  NOTIFICATION_TYPES,
  REQUEST_STATUS,
  approveRequest,
  denyRequest,
  markNotificationsAsSeen,
};
