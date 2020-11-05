import { AppContext } from "App";
import React from "react";
import { Redirect } from "react-router-dom";
import LoadingView from "components/Views/LoadingView";
import SubscriptionView from "./SubscriptionView.react";
import { useFetchSubscriptionData } from "./SubscriptionUtil";

const Subscription: React.FC = () => {
  const [appState] = React.useContext(AppContext);
  const subscriptionData = useFetchSubscriptionData(appState.authUser);

  if (subscriptionData.isLoading) {
    return <LoadingView />;
  } else if (!appState.authUser) {
    return <Redirect to={"/login"} />;
  } else if (
    appState.currentUser &&
    appState.currentUser.subscriptionStatus === "Active"
  ) {
    const urlParams = new URLSearchParams(window.location.search);
    const redirectTarget = urlParams.get("redirect") || "/mydashboard";
    return <Redirect to={redirectTarget} />;
  } else {
    return <SubscriptionView currentUser={appState.currentUser} />;
  }
};

export default Subscription;
