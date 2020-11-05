import { List, Typography } from "antd";
import Avatar from "components/Avatar";
import React from "react";
import { Grid } from "semantic-ui-react";
import s from "../CreatorNotifications.module.scss";
import { getTimeSinceString } from "utilities";
import * as DataTypes from "data/types";

interface Params {
  notification: DataTypes.Notification | any;
  actions: Array<Object>;
  messageContent: Object;
  avatarImageURL: string;
  avatarUser: DataTypes.User;
}

const CreatorNotificationBaseListItem = ({
  notification,
  actions,
  messageContent,
  avatarImageURL,
  avatarUser,
}: Params) => {
  const dateInfo = (
    <Typography.Text className={s.notificationListItemDate}>
      {getTimeSinceString(notification.dateCreated._seconds).toLowerCase()}
    </Typography.Text>
  );
  return (
    <List.Item
      className={s.notificationListItem}
      actions={actions}
      extra={dateInfo}
    >
      <Grid className={s.notificationListItemGrid}>
        <Avatar
          user={avatarImageURL ? null : avatarUser}
          imageURL={avatarImageURL}
          fitParent={true}
          size={50}
          containerStyle={{
            marginLeft: "10px",
            marginTop: "20px",
            marginBottom: "20px",
            marginRight: "0px",
          }}
        />
        <Typography.Text className={s.notificationListItemMessage}>
          {messageContent}
        </Typography.Text>
      </Grid>
    </List.Item>
  );
};

export default CreatorNotificationBaseListItem;
