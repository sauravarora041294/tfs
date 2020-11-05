import { AppContext } from "App";
import React from "react";
import { match } from "react-router-dom";
import { useFetchMyAccountData } from "./MyAccountUtil";
import LoadingView from "components/Views/LoadingView";
import MyAccountView from "./MyAccountView.react";

interface Props {
  history?: History;
  location?: Location;
  match?: match;
}

const MyAcccount: React.FC<Props> = (props: Props) => {
  const [appState] = React.useContext(AppContext);
  const myAccountData = useFetchMyAccountData(
    appState.authUser,
    props.location.pathname,
    props.match.params,
  );

  if (myAccountData.isLoading || !appState.currentUser) {
    return <LoadingView />;
  } else {
    return (
      <MyAccountView
        currentUser={appState.currentUser}
        currentBillingInfo={myAccountData.currentBillingInfo}
        currentSubscription={myAccountData.currentSubscription}
        error={myAccountData.error}
      />
    );
  }
};

export default MyAcccount;
