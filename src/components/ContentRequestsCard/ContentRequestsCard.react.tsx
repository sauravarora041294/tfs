import React from "react";
import * as DataTypes from "data/types";
import { useFetchContentRequestsData } from "./ContentRequestsCardUtil";
import ContentRequestsCardLoadingView from "./ContentRequestsCardLoadingView.react";
import ContentRequestsCardView from "./ContentRequestsCardView.react";

interface Props {
  currentUser: DataTypes.User;
  missionId: string;
}

const ContentRequestsCard: React.FC<Props> = (props: Props) => {
  const contentRequestsData = useFetchContentRequestsData(props.missionId);

  if (contentRequestsData.isLoading) {
    return <ContentRequestsCardLoadingView />;
  } else {
    return (
      <ContentRequestsCardView
        currentUser={props.currentUser}
        missionId={props.missionId}
        contentRequests={contentRequestsData.contentRequests}
      />
    );
  }
};

export default ContentRequestsCard;
