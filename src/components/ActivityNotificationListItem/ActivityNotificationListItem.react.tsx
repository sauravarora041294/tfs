import React from "react";
import * as DataTypes from "data/types";
import ActivityNotificationListItemView from "./ActivityNotificationListItemView.react"

interface Props {
  activityNotification: DataTypes.ActivityNotification;
}

const ActivityNotificationListItem: React.FC<Props> = (props: Props) => {
  return <ActivityNotificationListItemView {...props} />
};

export default ActivityNotificationListItem;
