import { Card, List } from "antd";
import * as DataTypes from "data/types";
import React from "react";
import { History } from "history";
import s from "./CreatorsHub.module.scss";
import ActivityNotificationListItem from "components/ActivityNotificationListItem";
import WhiteCard from "components/WhiteCard";

interface Props {
  activityNotifications: Array<DataTypes.ActivityNotification>;
  history?: History;
}

const ActivityCard: React.FC<Props> = (props: Props) => {
  return (
    <WhiteCard
      title="Activity"
      className={s.activityCard}
      smallSizeTitleAndSubtitle
      withDefaultBodyPadding
    >
      <List
        itemLayout="horizontal"
        className={s.activityCardList}
        dataSource={props.activityNotifications}
        renderItem={activityNotification => (
          <ActivityNotificationListItem
            activityNotification={activityNotification}
          />
        )}
      />
    </WhiteCard>
  );
};

export default ActivityCard;
