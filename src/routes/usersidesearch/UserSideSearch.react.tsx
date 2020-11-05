import { AppContext } from "App";
import React from "react";
import { Redirect } from "react-router-dom";
import { Location } from "history";
import LoadingView from "components/Views/LoadingView";
import { useFetchUserSideSearchData } from "./UserSideSearchUtil";
import UserSideSearchView from "./UserSideSearchView.react";

interface Props {
  location?: Location;
  match?: any;
}

const UserSideSearch: React.FC<Props> = (props: Props) => {
  const [appState] = React.useContext(AppContext);
  const userSideSearchData = useFetchUserSideSearchData(
    appState.authUser,
    props.location.pathname,
    props.match.params,
  );

  if (
    !props.match.params.searchText ||
    props.match.params.searchText.length === 0
  ) {
    return <Redirect to={"/mydashboard"} />;
  } else if (userSideSearchData.isLoading) {
    return <LoadingView />;
  } else {
    return (
      <UserSideSearchView
        currentUser={appState.currentUser}
        userLatestViewlogs={userSideSearchData.userLatestViewlogs}
        windowLocation={props.location}
        searchText={userSideSearchData.searchText}
        contentSearchResults={userSideSearchData.contentSearchResults}
        error={userSideSearchData.error}
        numHits={userSideSearchData.numHits}
      />
    );
  }
};

export default UserSideSearch;
