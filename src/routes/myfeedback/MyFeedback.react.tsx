import { AppContext } from "App";
import React from "react";
import { match } from "react-router-dom";
import { Location } from "history";
import LoadingView from "components/Views/LoadingView";
import { useFetchMyFeedbackData } from "./MyFeedbackUtil";
import MyFeedbackView from "./MyFeedbackView.react";

interface Props {
  location?: Location;
  match?: match;
}

const MyFeedback: React.FC<Props> = (props: Props) => {
  const [appState] = React.useContext(AppContext);
  const myFeedbackData = useFetchMyFeedbackData(
    appState.authUser,
    props.location.pathname,
    props.match.params,
  );

  if (myFeedbackData.isLoading) {
    return <LoadingView />;
  } else {
    return (
      <MyFeedbackView
        currentUser={appState.currentCreator}
        ratings={myFeedbackData.ratings}
        error={myFeedbackData.error}
        resourceFilters={myFeedbackData.resourceFilters}
      />
    );
  }
};

export default MyFeedback;
