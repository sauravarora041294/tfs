import { List, Empty } from "antd";
import React from "react";
import CreatorNotificationListItem from "./CreatorNotificationListItem.react";

interface Props {
  notifications: Array<Object>;
  didClickApproveRequest: (request: Object) => void;
  didClickDenyRequest: (request: Object) => void;
  notificationsProcessing?: Array<string>;
}

const CreatorNotificationsList: React.FC<Props> = (props: Props) => {
  return (
    <List
      loading={false}
      itemLayout="horizontal"
      loadMore={<div />}
      dataSource={props.notifications}
      bordered
      locale={{
        emptyText: (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="There are no notifications for you yet"
          />
        ),
      }}
      renderItem={notification => (
        <CreatorNotificationListItem
          notification={notification}
          didClickApproveRequest={props.didClickApproveRequest}
          didClickDenyRequest={props.didClickDenyRequest}
          notificationsProcessing={props.notificationsProcessing}
        />
      )}
    />
  );
};

export default CreatorNotificationsList;
