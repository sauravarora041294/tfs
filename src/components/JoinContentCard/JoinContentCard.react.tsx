import React from "react";
import { History } from "history";
import * as DataTypes from "data/types";
import JoinContentCardView from "./JoinContentCardView.react"

interface Props {
  history?: History;
  mission?: DataTypes.Mission;
  playlist?: DataTypes.Playlist;
  pendingMissionContributorRequests?: Array<any>;
  isPendingPlaylistRequest?: boolean;
  joinRequestInit?: (contentId: String, contentType: String) => void;
}

const JoinContentCard: React.FC<Props> = (props: Props) => {
  return (
    <JoinContentCardView {...props} />
  );
};

export default JoinContentCard;
