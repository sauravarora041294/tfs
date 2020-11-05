import { AppContext } from "App";
import React from "react";
import { match } from "react-router-dom";
import { Location } from "history";
import LoadingView from "components/Views/LoadingView";
import { useFetchMyContentData } from "./MyContentUtil";
import MyContentView from "./MyContentView.react";
interface Props {
  location?: Location;
  match?: match;
}

const MyContent: React.FC<Props> = (props: Props) => {
  const [appState] = React.useContext(AppContext);
  const myContentData = useFetchMyContentData(
    appState.authUser,
    props.location.pathname,
    props.match.params,
  );

  if (myContentData.isLoading) {
    return <LoadingView />;
  } else {
    return (
      <MyContentView
        currentUser={appState.currentCreator}
        myMissions={myContentData.myMissions}
        myPlaylists={myContentData.myPlaylists}
        myResources={myContentData.myResources}
        error={myContentData.error}
      />
    );
  }
};

export default MyContent;
