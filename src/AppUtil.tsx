import { AppContext } from "App";
import React from "react";
import { Redirect } from "react-router-dom";
import RESTAPIClient from "RESTAPIClient";
import { Switch, Route } from "react-router";
import ErrorPage from "components/ErrorPage";
import { ERROR_TYPES } from "./data/types/enums";
import { Loader } from "semantic-ui-react";
import { AppState } from "./AppReducer";
import LoadingView from "components/Views/LoadingView";
import * as prettyURLs from "RESTAPIClient/PrettyURLs";
import { EmployeeStatus } from "data/types";
import { v4 as uuidV4 } from "uuid";

interface State {
  width: number;
  height: number;
}

const getWindowDimensions = (): State => {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
};

const useWindowDimensions = (): State => {
  const [windowDimensions, setWindowDimensions] = React.useState<State>(
    getWindowDimensions(),
  );

  React.useEffect(() => {
    const handleResize = () => {
      setWindowDimensions(getWindowDimensions());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
};

const creatorStatus = {
  NEEDS_PROFILE_DETAILS: "NEEDS_PROFILE_DETAILS",
  PENDING_APPROVAL: "PENDING_APPROVAL",
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
};

const useFetchAuthenticatedData = authUser => {
  const [data, updateData] = React.useState({
    isLoading: true,
    currentUser: null,
    error: null,
  });

  const fetchData = async (): Promise<void> => {
    if (authUser) {
      try {
        const currentUser = await RESTAPIClient.User.get(authUser.uid);
        updateData({
          ...data,
          currentUser: currentUser,
          isLoading: false,
        });
      } catch (error) {
        updateData({
          ...data,
          isLoading: false,
          error: error,
        });
      }
    } else {
      updateData({
        ...data,
        isLoading: false,
      });
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  return data;
};

const withEnsureUserAuth = WrappedComponent => props => {
  const [appState] = React.useContext(AppContext);
  const { isLoading } = useFetchAuthenticatedData(appState.authUser);
  if (isLoading) {
    return <Loader active>{"Loading"}</Loader>;
  } else if (!appState.authUser) {
    return <Redirect to={"/login"} />;
  } else {
    return <WrappedComponent {...props} />;
  }
};

const withEnsureUserAuthAndSubscriptionActive = WrappedComponent => props => {
  const [appState] = React.useContext(AppContext);
  if (!appState.authUser) {
    const loginURLWithReditectTarget =
      `/login?redirect=` + (appState.redirectTargetAfterAuth || "");
    return <Redirect to={loginURLWithReditectTarget} />;
  } else if (
    (appState.currentUser && !appState.currentUser.subscriptionStatus) ||
    (appState.currentUser &&
      appState.currentUser.subscriptionStatus === "Inactive")
  ) {
    return (
      <Redirect to={`/subscription?redirect=${window.location.pathname}`} />
    );
  } else {
    return <WrappedComponent {...props} />;
  }
};

const withEnsureUserAuthAndSubscriptionActiveForPublic = WrappedComponent => props => {
  const [appState] = React.useContext(AppContext);
  const currentUser = appState.currentUser;
  if (
    (currentUser && !currentUser.subscriptionStatus) ||
    (currentUser && currentUser.subscriptionStatus === "Inactive")
  ) {
    return (
      <Redirect to={`/subscription?redirect=${window.location.pathname}`} />
    );
  } else if (!appState.authUser) {
    return <WrappedComponent {...props} isPublic />;
  } else {
    return <WrappedComponent {...props} isPublic={false} />;
  }
};

const withEnsureCreatorAuth = WrappedComponent => props => {
  const [appState] = React.useContext(AppContext);
  if (!appState.authUser) {
    return <Redirect to={"/login-creator"} />;
  } else {
    return <WrappedComponent {...props} />;
  }
};

export const withEnsureCreatorExistsAndIsNew = WrappedComponent => props => {
  const [appState] = React.useContext(AppContext);
  if (!appState.authUser) {
    return <Redirect to={"/login-creator"} />;
  } else if (!appState?.currentCreator?.creatorStatus) {
    return <LoadingView />;
  } else if (
    appState?.currentCreator?.creatorStatus ===
    creatorStatus.NEEDS_PROFILE_DETAILS
  ) {
    return <WrappedComponent {...props} />;
  } else {
    return <Redirect to={"/"} />;
  }
};

export const withEnsureCreatorDataLoaded = WrappedComponent => props => {
  const [appState] = React.useContext(AppContext);
  if (!appState.authUser) {
    return <Redirect to={"/login-creator"} />;
  } else if (!appState?.currentCreator?.creatorStatus) {
    return <LoadingView />;
  } else if (appState?.currentCreator?.creatorStatus !== creatorStatus.ACTIVE) {
    return <WrappedComponent {...props} />;
  } else {
    return <Redirect to={"/"} />;
  }
};

const withEnsureCreatorAuthAndWithStatusNeedsProfileDetails = WrappedComponent => props => {
  const [appState] = React.useContext(AppContext);

  if (!appState.authUser) {
    return <Redirect to={"/login-creator"} />;
  } else if (
    appState.authUser &&
    appState.currentCreator &&
    appState.currentCreator.creatorStatus &&
    appState.currentCreator.creatorStatus === creatorStatus.ACTIVE
  ) {
    return <Redirect to={"/"} />;
  } else if (
    appState.currentCreator &&
    appState.currentCreator.creatorStatus === creatorStatus.PENDING_APPROVAL
  ) {
    return <Redirect to={"/creator-pending-approval"} />;
  } else {
    return <WrappedComponent {...props} />;
  }
};

const withEnsureCreatorAuthAndActiveStatus = WrappedComponent => props => {
  const [appState] = React.useContext(AppContext);
  if (!appState.authUser) {
    const registerURLWithReditectTarget =
      `/register-creator?redirect=` + (appState.redirectTargetAfterAuth || "");
    return <Redirect to={registerURLWithReditectTarget} />;
  } else if (
    appState.authUser &&
    appState.currentCreator &&
    appState.currentCreator.creatorStatus ===
      creatorStatus.NEEDS_PROFILE_DETAILS
  ) {
    return <Redirect to={"/creator-registration-details?"} />;
  } else if (
    appState.currentCreator &&
    appState.currentCreator.creatorStatus === creatorStatus.PENDING_APPROVAL
  ) {
    return <Redirect to={"/creator-pending-approval"} />;
  } else {
    return <WrappedComponent {...props} />;
  }
};

// Redirects to appropriate home page if creator is signed in and goes to the sign in page
const withEnsureCreatorDefaultRedirectIfSignedIn = WrappedComponent => props => {
  const [appState] = React.useContext(AppContext);
  if (
    appState.authUser &&
    appState.currentCreator &&
    appState.currentCreator.creatorStatus ===
      creatorStatus.NEEDS_PROFILE_DETAILS
  ) {
    return <Redirect to={"/creator-registration-details"} />;
  } else if (
    appState.authUser &&
    appState.currentCreator &&
    appState.currentCreator.creatorStatus === creatorStatus.PENDING_APPROVAL
  ) {
    return <Redirect to={"/creator-pending-approval"} />;
  } else if (
    appState.authUser &&
    appState.currentCreator &&
    appState.currentCreator.creatorStatus === creatorStatus.ACTIVE
  ) {
    return <Redirect to={"/"} />;
  } else {
    return <WrappedComponent {...props} />;
  }
};

const withEnsureEmployeeAuthAndApproveStatus = WrappedComponent => props => {
  const [appState] = React.useContext(AppContext);
  if (!appState.authUser) {
    const registerURLWithReditectTarget =
      `/register-employee?redirect=` + (appState.redirectTargetAfterAuth || "");
    return <Redirect to={registerURLWithReditectTarget} />;
  } else if (
    appState.authUser &&
    appState.currentEmployee &&
    appState.currentEmployee.employeeStatus === EmployeeStatus.NOT_APPROVED
  ) {
    return <Redirect to={"/login-employee"} />;
  } else {
    return <WrappedComponent {...props} />;
  }
};
const withEnsureValidRoute = props => WrappedComponent => {
  const { path } = props;
  const mappedPaths = () => (
    <div>
      <Switch>
        {path.map((item, idx) => {
          return (
            <Route
              key={uuidV4()}
              exact
              path={item}
              render={props => <WrappedComponent {...props} />}
            />
          );
        })}
        {prettyURLs.collections.map((item, idx) => {
          return (
            <Route
              key={uuidV4()}
              path={item.shortURL}
              render={props => (
                <WrappedComponent
                  {...{
                    ...props,
                    isShort: true,
                    pathName: item.longURL,
                    params: { missionId: item.collectionID },
                  }}
                />
              )}
            />
          );
        })}

        <Route
          path="/*"
          render={() => <ErrorPage error={ERROR_TYPES.NOT_FOUND_ERROR} />}
        />
      </Switch>
    </div>
  );
  return mappedPaths;
};

const topLevelComponentPaths = {
  editCollection: ["/editcollection/:missionId"],
  creatorsHub: ["/"],
  editPlaylist: ["/editplaylist/:playlistId"],
  editVideo: ["/editvideo/:resourceId"],
  myContent: ["/mycontent"],
  myFeedback: ["/myfeedback"],
  creatorsHubInfo: ["/info"],
  editCreatorProfile: ["/edit-creator-profile"],
  leaderboard: ["/creator-leaderboard"],
  creatorNotifications: ["/creator-notifications"],
  addCreatorDetails: ["/creator-registration-details"],
  creatorPendingApproval: ["/creator-pending-approval"],
  creatorPendingApprovalEditProfile: ["/creator-pending-approval-edit-profile"],
  myDashboard: [
    "/mydashboard/search/:searchText",
    "/mydashboard/featured",
    "/mydashboard/recentlyadded",
    "/mydashboard/recommended",
    "/mydashboard/toprated",
    "/mydashboard/",
  ],
  resourceDetail: [
    "/resource/:resourceId",
    `/playlist/:playlistId/resource/:resourceId`,
    "/playlist/:playlistId",
  ],
  collection: [
    "/collection/:missionId",
    "/collection/:missionId/search/:searchText",
  ],
  creatorPayouts: ["/creator-payouts"],
};
export {
  withEnsureUserAuth,
  withEnsureUserAuthAndSubscriptionActive,
  withEnsureUserAuthAndSubscriptionActiveForPublic,
  useFetchAuthenticatedData,
  withEnsureCreatorAuth,
  withEnsureCreatorAuthAndActiveStatus,
  withEnsureCreatorDefaultRedirectIfSignedIn,
  withEnsureCreatorAuthAndWithStatusNeedsProfileDetails,
  withEnsureEmployeeAuthAndApproveStatus,
  useWindowDimensions,
  withEnsureValidRoute,
  topLevelComponentPaths,
};
