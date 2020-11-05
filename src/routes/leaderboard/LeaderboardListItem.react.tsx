import { List, Statistic, Typography } from "antd";
import Avatar from "components/Avatar";
import CreatorProfilePopover from "components/CreatorProfilePopover";
import { Creator } from "data/types";
import React from "react";
import s from "./Leaderboard.module.scss";
import CreatorAvatar from "components/CreatorAvatar";

interface Props {
  creator: Creator;
  index?: number;
}

const LeaderboardListItem: React.FC<Props> = (props: Props) => {
  return (
    <List.Item
      className={s.leaderboardListItem}
      style={{ display: "flex", alignItems: "center" }}
      key={props.creator.email}
    >
      <Typography.Text className={s.creatorRank}>
        {props.creator.rank}
      </Typography.Text>
      <div className={s.profileAvatarContainer}>
        <CreatorAvatar
          large
          showCreatorDescription
          creator={props.creator}
        ></CreatorAvatar>
      </div>
      {/* <div className={s.profileHeaderTextContainer}>
        <CreatorProfilePopover creator={props.creator}>
          <Typography.Paragraph className={s.creatorProfileName}>
            {`${props.creator.firstName} ${props.creator.lastName}`}
          </Typography.Paragraph>
        </CreatorProfilePopover>
        <Typography.Paragraph className={s.creatorProfileRoleTitle}>
          {`${props.creator.creatorDetails.title} @ ${props.creator.creatorDetails.company}`}
        </Typography.Paragraph>
      </div> */}
      <div className={s.pointsContainer}>
        <Statistic
          style={{
            textAlign: "right",
          }}
          valueStyle={{ fontSize: "1.3em" }}
          title="Points"
          value={
            props.creator.currentMonthPoints
              ? props.creator.currentMonthPoints.toFixed(0)
              : 0
          }
        />
      </div>
    </List.Item>
  );
};

export default LeaderboardListItem;
