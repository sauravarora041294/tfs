import { AppContext } from "App";
import React from "react";
import { match } from "react-router";
import { Location } from "history";
import LoadingView from "components/Views/LoadingView";
import { useFetchCreatorsWithStripeAndRevenueData } from "./CreatorPayoutsUtil";
import CreatorPayoutsView from "./CreatorPayoutsView.react";

interface Props {
  location?: Location;
  match?: match;
}

const CreatorPayouts: React.FC<Props> = (props: Props) => {
  const [appState] = React.useContext(AppContext);
  //load data
  const creatorPayoutsData = useFetchCreatorsWithStripeAndRevenueData(
    appState.authUser,
    props.location.pathname,
    props.match.params,
  );
  if (
    !appState.authUser ||
    !appState.currentEmployee ||
    creatorPayoutsData.isLoading
  ) {
    return <LoadingView />;
  }
  return (
    <CreatorPayoutsView
      creators={creatorPayoutsData.creators}
      error={creatorPayoutsData.error}
    />
  );
};

export default CreatorPayouts;
