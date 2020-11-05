import { AppContext } from "App";
import React from "react";
import { match } from "react-router-dom";
import { Location } from "history";
import LoadingView from "components/Views/LoadingView";
import { useFetchCreatorsHubInfoData } from "./CreatorsHubInfoUtil";
import CreatorsHubInfoView from "./CreatorsHubInfoView.react";

interface Props {
  location?: Location;
  match?: match;
}

const CreatorsHubInfo: React.FC<Props> = (props: Props) => {
  const [appState] = React.useContext(AppContext);
  const creatorsHubInfoData = useFetchCreatorsHubInfoData(
    appState.authUser,
    props.location.pathname,
    props.match.params,
  );

  if (creatorsHubInfoData.isLoading) {
    return <LoadingView />;
  } else {
    return (
      <CreatorsHubInfoView
        currentUser={appState.currentCreator}
        error={creatorsHubInfoData.error}
      />
    );
  }
};

export default CreatorsHubInfo;
