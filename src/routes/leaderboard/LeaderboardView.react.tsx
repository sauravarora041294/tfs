import { Card, PageHeader, Typography } from "antd";
import * as DataTypes from "data/types";
import React from "react";
import s from "./Leaderboard.module.scss";
import LeaderboardList from "./LeaderboardList.react";
import { leaderboardReducer, leaderboardStateInit } from "./LeaderboardReducer";
import WhiteCard from "components/WhiteCard";

interface Props {
  creators: Array<DataTypes.Creator>;
  error?: Error;
}

const LeaderboardView: React.FC<Props> = (props: Props) => {
  const [leaderboardState] = React.useReducer(
    leaderboardReducer,
    {
      creators: props.creators,
    },
    leaderboardStateInit,
  );

  return (
    <WhiteCard
      className={s.leaderboardRoot}
      title="Leaderboard"
      subTitle="Here are the top Future School Creators sorted by points earned this month."
    >
      <div className={s.leaderboardCard}>
        <LeaderboardList creators={leaderboardState.creators} />
      </div>
    </WhiteCard>
  );
};

export default LeaderboardView;
