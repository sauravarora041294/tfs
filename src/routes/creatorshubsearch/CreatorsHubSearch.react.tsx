import { AppContext } from "App";
import React from "react";
import { Redirect } from "react-router-dom";
import { Location } from "history";
import LoadingView from "components/Views/LoadingView";
import { useFetchCreatorsHubSearchData } from "./CreatorsHubSearchUtil";
import CreatorsHubSearchView from "./CreatorsHubSearchView.react";
interface Props {
  location?: Location;
  match?: any;
}

const CreatorsHubSearch: React.FC<Props> = (props: Props) => {
  const [appState] = React.useContext(AppContext);
  const creatorsHubData = useFetchCreatorsHubSearchData(
    appState.authUser,
    props.location.pathname,
    props.match.params,
  );

  if (
    !props.match.params.searchText ||
    props.match.params.searchText.length === 0
  ) {
    return <Redirect to={"/"} />;
  } else if (creatorsHubData.isLoading || !appState.currentCreator) {
    return <LoadingView />;
  } else {
    return (
      <CreatorsHubSearchView
        currentUser={appState.currentCreator}
        pathname={props.location.pathname}
        searchText={props.match.params.searchText}
        contentSearchResults={creatorsHubData.contentSearchResults}
        creatorSearchResults={creatorsHubData.creatorSearchResults}
        viewlogs={creatorsHubData.viewlogs}
        error={creatorsHubData.error}
      />
    );
  }
};

export default CreatorsHubSearch;
