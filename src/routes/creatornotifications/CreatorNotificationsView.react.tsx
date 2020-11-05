import { Card, notification, PageHeader, Typography } from "antd";
import * as DataTypes from "data/types";
import React from "react";
import { withRouter } from "react-router";
import { compose } from "recompose";
import { Grid } from "semantic-ui-react";
import { History, Location } from "history";
import s from "./CreatorNotifications.module.scss";
import CreatorNotificationsList from "./CreatorNotificationsList.react";
import {
  creatorNotificationsReducer,
  creatorNotificationsStateInit,
  CreatorNotificationsStateActionTypes,
} from "./CreatorNotificationsReducer";
import {
  approveRequest,
  denyRequest,
  markNotificationsAsSeen,
} from "./CreatorNotificationsUtil";
import { FirestoreRealtime } from "FirebaseClient";
import RESTAPIClient from "RESTAPIClient";
import WhiteCard from "components/WhiteCard";

interface Props {
  currentUser: DataTypes.Creator;
  notifications: Array<DataTypes.Notification>;
  history?: History;
  location?: Location;
  error?: Error;
}

const CreatorNotificationsView: React.FC<Props> = (props: Props) => {
  const [creatorNotificationsState, dispatch] = React.useReducer(
    creatorNotificationsReducer,
    {
      currentUser: props.currentUser,
      notifications: props.notifications,
      shouldRefreshNotifications: false,
    },
    creatorNotificationsStateInit,
  );

  const refreshNotifications = async () => {
    const notifications = await RESTAPIClient.Notification.getToShowForUser({
      userId: props.currentUser.objectID,
    });
    dispatch({
      type: CreatorNotificationsStateActionTypes.UPDATE_NOTIFICATIONS,
      notifications,
    });
  };

  React.useEffect(() => {
    creatorNotificationsState.shouldRefreshNotifications &&
      refreshNotifications();
  }, [creatorNotificationsState.shouldRefreshNotifications]);

  const notificationsListenerCallback = (
    objects: Array<DataTypes.DataModelObject>,
  ) => {
    objects &&
      dispatch({
        type: CreatorNotificationsStateActionTypes.SHOULD_REFRESH_NOTIFICATIONS,
      });
  };

  React.useEffect(() => {
    const detachNotificationsObserver =
      props.currentUser.objectID &&
      FirestoreRealtime.listenToMultipleDocuments({
        query: FirestoreRealtime.collections.NOTIFICATIONS.where(
          "receiverUserId",
          "==",
          props.currentUser.objectID,
        )
          .where("shouldShow", "==", true)
          .orderBy("dateCreated", "desc"),
        callback: notificationsListenerCallback,
      });
    return () => detachNotificationsObserver && detachNotificationsObserver();
  }, [props.currentUser.objectID]);

  const didClickApproveRequest = React.useCallback(
    async request => {
      dispatch({
        type: CreatorNotificationsStateActionTypes.START_NOTIFICATION_RESPONSE,
        notificationProcessing: request.objectID,
      });
      const approveRequestResponse = await approveRequest({
        reviewerUserId: creatorNotificationsState.currentUser.objectID,
        requestId: request.objectID,
      });

      if (approveRequestResponse.error) {
        notification.error({
          message: "Error",
          description: `An error occurred while trying to approve the request: ${approveRequestResponse.error}`,
          placement: "bottomRight",
        });
        dispatch({
          type: CreatorNotificationsStateActionTypes.END_NOTIFICATION_RESPONSE,
          notificationProcessing: request.objectID,
        });
      } else {
        await markNotificationsSeen();
      }
    },
    [props.history, props.location, creatorNotificationsState.currentUser],
  );

  const didClickDenyRequest = React.useCallback(
    async request => {
      dispatch({
        type: CreatorNotificationsStateActionTypes.START_NOTIFICATION_RESPONSE,
        notificationProcessing: request.objectID,
      });

      const denyRequestResponse = await denyRequest({
        reviewerUserId: creatorNotificationsState.currentUser.objectID,
        requestId: request.objectID,
      });

      if (denyRequestResponse.error) {
        notification.error({
          message: "Error",
          description: `An error occurred while trying to deny the request: ${denyRequestResponse.error}`,
          placement: "bottomRight",
        });
        dispatch({
          type: CreatorNotificationsStateActionTypes.END_NOTIFICATION_RESPONSE,
          notificationProcessing: request.objectID,
        });
      } else {
        await markNotificationsSeen();
      }
    },
    [props.history, props.location, creatorNotificationsState.currentUser],
  );
  React.useEffect(() => {
    console.log(creatorNotificationsState.notificationsProcessing);
  }, [creatorNotificationsState.notificationsProcessing]);
  const markNotificationsSeen = React.useCallback(async () => {
    const notificationIds = creatorNotificationsState.notifications.map(
      n => n.objectID,
    );
    await markNotificationsAsSeen({ notificationIds });
  }, [creatorNotificationsState.notifications]);

  React.useEffect(() => {
    markNotificationsSeen();
  }, [markNotificationsSeen]);

  return (
    <WhiteCard
      title="Notifications"
      subTitle="Notifications and requests for me."
      className={s.creatorNotificationsRoot}
      withDefaultBodyPadding
    >
      <CreatorNotificationsList
        notifications={creatorNotificationsState.notifications}
        didClickApproveRequest={didClickApproveRequest}
        didClickDenyRequest={didClickDenyRequest}
        notificationsProcessing={
          creatorNotificationsState.notificationsProcessing
        }
      />
    </WhiteCard >
  );
};

export default compose<Props, Props>(withRouter)(CreatorNotificationsView);
