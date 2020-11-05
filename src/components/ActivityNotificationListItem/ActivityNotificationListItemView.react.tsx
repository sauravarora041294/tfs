import React from "react";
import * as DataTypes from "data/types";
import s from "./ActivityNotificationListItem.module.scss";
import { Avatar } from "antd";
import Moment from "react-moment";
import {
  getActivityText,
  getActivityCreator,
} from "./ActivityNotificationsListItemUtil";
import CreatorProfilePopover from "../CreatorProfilePopover";

interface Props {
  activityNotification: DataTypes.ActivityNotification;
}

const ActivityNotificationListItemView: React.FC<Props> = (props: Props) => {
  const creator = getActivityCreator(props.activityNotification);

  return (
    <div className={s.activityCardListItem}>
      <div className={s.activityCardListItemCreatorAvatar}>
        <Avatar
          size="large"
          icon={"UserOutlined"}
          src={creator.profilePictureURL}
        />
      </div>
      <div className={s.activityCardListItemInfo}>
        <div className={s.activityCardListItemHeader}>
          <div className={s.activityCardListItemCreatorName}>
            <CreatorProfilePopover creator={creator}>
              {`${creator.firstName} ${creator.lastName}`}
            </CreatorProfilePopover>
          </div>
          <div className={s.activityCardListItemTimestamp}>
            <Moment unix fromNow ago>
              {props.activityNotification.dateCreated._seconds ||
                props.activityNotification.dateCreated.seconds}
            </Moment>
            {" ago"}
          </div>
        </div>
        <div className={s.activityCardListItemDescription}>
          {getActivityText(props.activityNotification)}
        </div>
      </div>
    </div>
  );
};

export default ActivityNotificationListItemView;
