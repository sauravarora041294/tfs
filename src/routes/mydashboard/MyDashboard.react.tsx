import { AppContext } from "App";
import React from "react";
import { match } from "react-router-dom";
import { Location } from "history";
import LoadingView from "components/Views/LoadingView";
import { useFetchMyDashboardData } from "./MyDashboardUtil";
import MyDashboardView from "./MyDashboardView.react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

interface Props {
  location?: Location;
  match?: match;
}

const MyDashboard: React.FC<Props> = (props: Props) => {
  const [appState] = React.useContext(AppContext);
  const myDashboardData = useFetchMyDashboardData(
    appState.authUser,
    props.location.pathname,
    props.match.params,
  );

  if (myDashboardData.isLoading) {
    return <LoadingView />;
  } else {
    return (
      <ReactCSSTransitionGroup
        transitionName="fadeAppear"
        transitionAppear={true}
        transitionAppearTimeout={1000}
        transitionEnter={false}
        transitionLeave={false}
      >
        <MyDashboardView
          currentUser={appState.currentUser}
          featuredResults={myDashboardData.featuredResults}
          userLatestViewlogs={myDashboardData.userLatestViewlogs}
          recentResults={myDashboardData.recentResults}
          topRatedContent={myDashboardData.topRatedContent}
          recommendedContent={myDashboardData.recommendedContent}
          windowLocation={props.location}
          error={myDashboardData.error}
        />
      </ReactCSSTransitionGroup>
    );
  }
};

export default MyDashboard;
