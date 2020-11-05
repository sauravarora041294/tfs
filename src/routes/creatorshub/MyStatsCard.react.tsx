import { Card, Statistic } from "antd";
import * as DataTypes from "data/types";
import React from "react";
import s from "./CreatorsHub.module.scss";
import { getCurrentMonthString } from "./CreatorsHubUtil";
import WhiteCard from "components/WhiteCard";

interface Props {
  currentUser: DataTypes.Creator;
  myResources: Array<DataTypes.Resource>;
  pointCounts: DataTypes.PointCounts;
  userViewCounts: DataTypes.UserViewCounts;
  userUniqueViewCounts: DataTypes.UserUniqueViewCounts;
}

const MyStatsCard: React.FC<Props> = (props: Props) => {
  const currentMonthString = getCurrentMonthString();

  return (
    <WhiteCard
      title="My Statistics"
      className={s.myStatisticsCard}
      smallSizeTitleAndSubtitle
    >
      <div className={s.statsRow}>
        <div className={s.statsColumn}>
          <Statistic
            title="Total views"
            value={
              props.userViewCounts && props.userViewCounts.totalViews
                ? props.userViewCounts.totalViews
                : 0
            }
          />
          <Statistic
            title="Total users helped"
            value={
              props.userUniqueViewCounts &&
              props.userUniqueViewCounts.totalUniqueViews
                ? props.userUniqueViewCounts.totalUniqueViews
                : 0
            }
          />
          <Statistic
            title="Total points"
            value={
              props.pointCounts && props.pointCounts.totalPoints
                ? props.pointCounts.totalPoints.toFixed(2)
                : 0
            }
          />
        </div>
        <div className={s.statsColumn}>
          <Statistic
            title="Views this month"
            value={
              props.userViewCounts &&
              props.userViewCounts.viewsByMonth &&
              props.userViewCounts.viewsByMonth[currentMonthString]
                ? props.userViewCounts.viewsByMonth[currentMonthString]
                : 0
            }
          />
          <Statistic
            title="Users helped this month"
            value={
              props.userUniqueViewCounts &&
              props.userUniqueViewCounts.uniqueViewsByMonth &&
              props.userUniqueViewCounts.uniqueViewsByMonth[currentMonthString]
                ? props.userUniqueViewCounts.uniqueViewsByMonth[
                    currentMonthString
                  ]
                : 0
            }
          />
          <Statistic
            title="Points this month"
            value={
              props.pointCounts &&
              props.pointCounts.pointsByMonth &&
              props.pointCounts.pointsByMonth[currentMonthString]
                ? props.pointCounts.pointsByMonth[currentMonthString].toFixed(2)
                : 0
            }
          />
        </div>
      </div>
    </WhiteCard>
  );
};

export default MyStatsCard;
