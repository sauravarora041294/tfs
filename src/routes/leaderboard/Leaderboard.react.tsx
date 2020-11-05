import { AppContext } from "App";
import React from "react";
import { match } from "react-router";
import { Location } from "history";
import LoadingView from "components/Views/LoadingView";
import { useFetchLeaderboardData } from "./LeaderboardUtil";
import LeaderboardView from "./LeaderboardView.react";

interface Props {
  location?: Location;
  match?: match;
}

const Leaderboard: React.FC<Props> = (props: Props) => {
  const [appState] = React.useContext(AppContext);
  const leaderboardData = useFetchLeaderboardData(
    appState.authUser,
    props.location.pathname,
    props.match.params,
  );

  if (leaderboardData.isLoading) {
    return <LoadingView />;
  }
  return (
    <LeaderboardView
      creators={leaderboardData.creators}
      error={leaderboardData.error}
    />
  );
};

export default Leaderboard;
