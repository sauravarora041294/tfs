import * as DataTypes from "data/types";

interface LeaderboardState {
  creators: Array<DataTypes.Creator>;
}

interface LeaderboardStateAction {
  type: string;
}

const leaderboardStateInit = (
  initialState: LeaderboardState,
): LeaderboardState => {
  return {
    ...initialState,
  };
};

const leaderboardReducer = (
  state: LeaderboardState,
  action: LeaderboardStateAction,
): LeaderboardState => {
  switch (action.type) {
    default:
      return state;
  }
};

export { leaderboardReducer, leaderboardStateInit };
