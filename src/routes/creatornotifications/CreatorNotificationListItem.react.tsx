import React from "react";
import RequestNotificationListItem from "./CreatorNotificationListItems/RequestNotificationListItem.react";
import RequestResolvedNotificationListItem from "./CreatorNotificationListItems/RequestResolvedNotificationListItem.react";
import { NOTIFICATION_TYPES } from "./CreatorNotificationsUtil";

interface Props {
  notification: any;
  didClickApproveRequest: (request: Object) => void;
  didClickDenyRequest: (request: Object) => void;
  notificationsProcessing?: Array<string>;
}

const CreatorNotificationListItem: React.FC<Props> = (props: Props) => {
  switch (props.notification.notificationType) {
    case NOTIFICATION_TYPES.PENDING_REQUEST:
      return (
        <RequestNotificationListItem
          notification={props.notification}
          didClickApproveRequest={props.didClickApproveRequest}
          didClickDenyRequest={props.didClickDenyRequest}
          notificationsProcessing={props.notificationsProcessing}
        />
      );
    case NOTIFICATION_TYPES.RESOLVED_REQUEST:
      return (
        <RequestResolvedNotificationListItem
          notification={props.notification}
        />
      );
    default:
      return <div></div>;
  }
};

export default CreatorNotificationListItem;
