import {
  appReducer,
  appStateInit,
  AppStateActionTypes,
  AppState,
  AppStateAction,
} from "AppReducer";
import {
  withEnsureCreatorAuthAndActiveStatus,
  withEnsureUserAuth,
  withEnsureUserAuthAndSubscriptionActive,
  withEnsureCreatorDataLoaded,
  withEnsureCreatorExistsAndIsNew,
  withEnsureEmployeeAuthAndApproveStatus,
} from "AppUtil";
import CreatorAppPrimaryLayout from "components/Layouts/CreatorAppPrimaryLayout";
import EmployeeAppPrimaryLayout from "components/Layouts/EmployeeAppPrimaryLayout";
import CreatorPendingApprovalAppLayout from "components/Layouts/CreatorPendingApprovalAppLayout";
import UserAppPrimaryLayout from "components/Layouts/UserAppPrimaryLayout";
import * as DataTypes from "data/types";
import window from "global";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { compose } from "recompose";
import Loadable from "react-loadable";
import { firebaseAuth, FirestoreRealtime, firebaseApp } from "./FirebaseClient";
import "antd/dist/antd.css";
import "./App.scss";
import ErrorPage from "./components/ErrorPage";
import { withEnsureValidRoute, topLevelComponentPaths } from "AppUtil";
import DataSyncJobQueue from "./utilities/datasyncjobqueue";
import { ERROR_TYPES } from "./data/types/enums";
import * as prettyURLs from "RESTAPIClient/PrettyURLs";
import FontFaceObserver from "fontfaceobserver";
import { v4 as uuidV4 } from "uuid";

// Observe loading of Open Sans (to remove open sans, remove the <link> tag in
// the index.html file and this observer)
const poppinsFontObserver = new FontFaceObserver("Poppins", {});

// When Open Sans is loaded, add a font-family using Open Sans to the body
poppinsFontObserver.load().then(() => {
  document.body.classList.add("fontLoaded");
});

const AppContext: React.Context<[
  AppState,
  React.Dispatch<AppStateAction>,
]> = React.createContext(null);

const Loading = () => <div />;

const MainApp = props => {
  const [appState, dispatch] = React.useReducer(
    appReducer,
    { authUser: firebaseAuth.currentUser },
    appStateInit,
  );

  React.useEffect(() => {
    if (!appState.redirectTargetAfterAuth)
      dispatch({
        type: AppStateActionTypes.UPDATE_REDIRECT_TARGET_AFTER_AUTH,
        redirectTargetAfterAuth: window.location.pathname,
      });
  }, []);

  React.useEffect(() => {
    const onAuthedUser = async (authUser: firebaseApp.User) => {
      dispatch({
        type: AppStateActionTypes.CURRENT_USER_LOGGED_IN,
        authUser: authUser,
      });
      await DataSyncJobQueue.processAllJobs();
    };
    firebaseAuth.onAuthStateChanged(authUser => {
      if (authUser) {
        onAuthedUser(authUser);
      } else {
        dispatch({ type: AppStateActionTypes.CURRENT_USER_LOGGED_OUT });
      }
    });
  }, []);

  const userListenerCallback = (object: any) => {
    object &&
      dispatch({
        type: AppStateActionTypes.UPDATE_CURRENT_USER,
        currentUser: object as DataTypes.User,
      });
    object &&
      object.creatorStatus &&
      dispatch({
        type: AppStateActionTypes.UPDATE_CURRENT_CREATOR,
        currentCreator: object as DataTypes.Creator,
      });
    object &&
      object.employeeStatus &&
      dispatch({
        type: AppStateActionTypes.UPDATE_CURRENT_EMPLOYEE,
        currentEmployee: object as DataTypes.Employee,
      });
  };

  React.useEffect(() => {
    const detachUserObserver =
      appState.authUser &&
      FirestoreRealtime.listenToDocument({
        collection: FirestoreRealtime.collections.USERS,
        documentId: appState.authUser.uid,
        callback: userListenerCallback,
      });
    return () => detachUserObserver && detachUserObserver();
  }, [appState.authUser]);

  if (appState.isLoading) {
    return <div />;
  }
  return (
    <AppContext.Provider value={[appState, dispatch]}>
      {props.children}
    </AppContext.Provider>
  );
};

const AuthenticatedCreatorApp = props => {
  const CreatorsHubLoadable = Loadable({
    loader: () => import("routes/creatorshub"),
    loading: Loading,
  });
  const CreatorsHubSearchLoadable = Loadable({
    loader: () => import("routes/creatorshubsearch"),
    loading: Loading,
  });
  const EditPlaylistLodable = Loadable({
    loader: () => import("routes/editplaylist"),
    loading: Loading,
  });
  const EditCollectionLoadable = Loadable({
    loader: () => import("routes/editmission"),
    loading: Loading,
  });
  const EditVideoLodable = Loadable({
    loader: () => import("routes/editvideo"),
    loading: Loading,
  });
  const MyContentLodable = Loadable({
    loader: () => import("routes/mycontent"),
    loading: Loading,
  });
  const MyFeedbackLodable = Loadable({
    loader: () => import("routes/myfeedback"),
    loading: Loading,
  });
  const CreatorsHubInfoLoadable = Loadable({
    loader: () => import("routes/creatorshubinfo"),
    loading: Loading,
  });
  const EditCreatorProfileLodable = Loadable({
    loader: () => import("routes/editcreatorprofile"),
    loading: Loading,
  });
  const LeaderboardLoadable = Loadable({
    loader: () => import("routes/leaderboard"),
    loading: Loading,
  });
  const CreatorNotificationsLodable = Loadable({
    loader: () => import("routes/creatornotifications"),
    loading: Loading,
  });
  const CreatorsHubPage = compose(
    withEnsureCreatorAuthAndActiveStatus,
    withEnsureValidRoute({ path: topLevelComponentPaths.creatorsHub }),
  )(CreatorsHubLoadable);

  const EditPlaylistPage = compose(
    withEnsureCreatorAuthAndActiveStatus,
    withEnsureValidRoute({ path: topLevelComponentPaths.editPlaylist }),
  )(EditPlaylistLodable);

  const EditCollectionPage = compose(
    withEnsureCreatorAuthAndActiveStatus,
    withEnsureValidRoute({ path: topLevelComponentPaths.editCollection }),
  )(EditCollectionLoadable);

  const EditVideoPage = compose(
    withEnsureCreatorAuthAndActiveStatus,
    withEnsureValidRoute({ path: topLevelComponentPaths.editVideo }),
  )(EditVideoLodable);

  const MyContentPage = compose(
    withEnsureCreatorAuthAndActiveStatus,
    withEnsureValidRoute({ path: topLevelComponentPaths.myContent }),
  )(MyContentLodable);

  const MyFeedbackPage = compose(
    withEnsureCreatorAuthAndActiveStatus,
    withEnsureValidRoute({ path: topLevelComponentPaths.myFeedback }),
  )(MyFeedbackLodable);

  const CreatorsHubInfoPage = compose(
    withEnsureCreatorAuthAndActiveStatus,
    withEnsureValidRoute({ path: topLevelComponentPaths.creatorsHubInfo }),
  )(CreatorsHubInfoLoadable);

  const EditCreatorProfilePage = compose(
    withEnsureCreatorAuthAndActiveStatus,
    withEnsureValidRoute({ path: topLevelComponentPaths.editCreatorProfile }),
  )(EditCreatorProfileLodable);

  const LeaderboardPage = compose(
    withEnsureCreatorAuthAndActiveStatus,
    withEnsureValidRoute({ path: topLevelComponentPaths.leaderboard }),
  )(LeaderboardLoadable);

  const CreatorNotificationsPage = compose(
    withEnsureCreatorAuthAndActiveStatus,
    withEnsureValidRoute({ path: topLevelComponentPaths.creatorNotifications }),
  )(CreatorNotificationsLodable);

  const CreatorsHubSearchPage = compose(withEnsureCreatorAuthAndActiveStatus)(
    CreatorsHubSearchLoadable,
  );
  return (
    <CreatorAppPrimaryLayout>
      <Switch>
        <Route
          exact
          path={"/"}
          render={props => <CreatorsHubPage {...props} />}
        />
        <Route
          path={"/search"}
          render={props => <CreatorsHubSearchPage {...props} />}
        />
        <Route
          path={"/mycontent"}
          render={props => <MyContentPage {...props} />}
        />
        <Route
          path={"/myfeedback"}
          render={props => <MyFeedbackPage {...props} />}
        />
        <Route
          path={"/info"}
          render={props => <CreatorsHubInfoPage {...props} />}
        />
        <Route
          path={"/editplaylist"}
          render={props => <EditPlaylistPage {...props} />}
        />
        <Route
          path={"/editcollection"}
          render={props => <EditCollectionPage {...props} />}
        />
        <Route
          path={"/editvideo"}
          render={props => <EditVideoPage {...props} />}
        />
        <Route
          path={"/creator-notifications"}
          render={props => <CreatorNotificationsPage {...props} />}
        />
        <Route
          path={"/edit-creator-profile"}
          render={props => <EditCreatorProfilePage {...props} />}
        />
        <Route
          path={"/creator-leaderboard"}
          render={props => <LeaderboardPage {...props} />}
        />
      </Switch>
    </CreatorAppPrimaryLayout>
  );
};

const CreatorPendingApprovalApp = props => {
  const AddCreatorDetailsLoadable = Loadable({
    loader: () => import("routes/addcreatordetails"),
    loading: Loading,
  });
  const CreatorPendingApprovalLoadable = Loadable({
    loader: () => import("routes/creatorpendingapproval"),
    loading: Loading,
  });
  const CreatorPendingApprovalEditProfileLoadable = Loadable({
    loader: () => import("routes/creatorpendingapprovaleditprofile"),
    loading: Loading,
  });
  const AddCreatorDetailsPage = compose(
    withEnsureCreatorExistsAndIsNew,
    withEnsureValidRoute({ path: topLevelComponentPaths.addCreatorDetails }),
  )(AddCreatorDetailsLoadable);

  const CreatorPendingApprovalPage = compose(
    withEnsureCreatorDataLoaded,
    withEnsureValidRoute({
      path: topLevelComponentPaths.creatorPendingApproval,
    }),
  )(CreatorPendingApprovalLoadable);

  const CreatorPendingApprovalEditProfilePage = compose(
    withEnsureCreatorDataLoaded,
    withEnsureValidRoute({
      path: topLevelComponentPaths.creatorPendingApprovalEditProfile,
    }),
  )(CreatorPendingApprovalEditProfileLoadable);

  return (
    <CreatorPendingApprovalAppLayout>
      <Switch>
        <Route
          path={"/creator-registration-details"}
          render={props => <AddCreatorDetailsPage {...props} />}
        />
        <Route
          path={"/creator-pending-approval"}
          render={props => <CreatorPendingApprovalPage {...props} />}
        />
        <Route
          path={"/creator-pending-approval-edit-profile"}
          render={props => <CreatorPendingApprovalEditProfilePage {...props} />}
        />
      </Switch>
    </CreatorPendingApprovalAppLayout>
  );
};

const AuthenticatedUserApp = props => {
  const MyDashboardLoadable = Loadable({
    loader: () => import("routes/mydashboard"),
    loading: Loading,
  });
  const UserSideSearchLoadable = Loadable({
    loader: () => import("routes/usersidesearch"),
    loading: Loading,
  });
  const ResourceDetailLoadable = Loadable({
    loader: () => import("routes/resourcedetail"),
    loading: Loading,
  });
  const CollectionLoadable = Loadable({
    loader: () => import("routes/mission"),
    loading: Loading,
  });
  const MyAccountLoadable = Loadable({
    loader: () => import("routes/myaccount"),
    loading: Loading,
  });
  const SubscriptionLoadable = Loadable({
    loader: () => import("routes/subscription"),
    loading: Loading,
  });

  const UserSideSearchPage = compose(withEnsureUserAuthAndSubscriptionActive)(
    UserSideSearchLoadable,
  );
  const MyDashboardPage = compose(
    withEnsureUserAuthAndSubscriptionActive,
    withEnsureValidRoute({ path: topLevelComponentPaths.myDashboard }),
  )(MyDashboardLoadable);

  const ResourceDetailPage = compose(
    withEnsureValidRoute({ path: topLevelComponentPaths.resourceDetail }),
  )(ResourceDetailLoadable);

  const CollectionPage = compose(
    withEnsureValidRoute({ path: topLevelComponentPaths.collection }),
  )(CollectionLoadable);

  const MyAccountPage = compose(withEnsureUserAuthAndSubscriptionActive)(
    MyAccountLoadable,
  );
  const SubscriptionPage = compose(withEnsureUserAuth)(SubscriptionLoadable);

  return (
    <UserAppPrimaryLayout>
      <Switch>
        <Route
          path={"/mydashboard"}
          render={props => {
            return <MyDashboardPage {...props} />;
          }}
        />
        <Route
          path={"/search"}
          render={props => {
            return <UserSideSearchPage {...props} />;
          }}
        />
        <Route
          path={"/playlist"}
          render={props => <ResourceDetailPage {...props} />}
        />
        <Route
          path={"/collection"}
          render={props => <CollectionPage {...props} />}
        />
        <Route
          path={"/resource"}
          render={props => <ResourceDetailPage {...props} />}
        />
        <Route
          path={"/myaccount"}
          render={props => <MyAccountPage {...props} />}
        />
        <Route
          exact
          path={"/subscription"}
          render={props => <SubscriptionPage {...props} />}
        />
        {prettyURLs.collections.map((item, idx) => {
          return (
            <Route
              key={uuidV4()}
              path={item.shortURL}
              render={props => <CollectionPage />}
            />
          );
        })}
      </Switch>
    </UserAppPrimaryLayout>
  );
};

const AuthenticatedEmployeeApp = props => {
  const CreatorPayoutsLoadable = Loadable({
    loader: () => import("routes/creatorpayouts"),
    loading: Loading,
  });
  const CreatorPayoutsPage = compose(
    withEnsureEmployeeAuthAndApproveStatus,
    withEnsureValidRoute({ path: topLevelComponentPaths.creatorPayouts }),
  )(CreatorPayoutsLoadable);

  return (
    <EmployeeAppPrimaryLayout>
      <Switch>
        <Route
          exact
          path="/creator-payouts"
          render={props => <CreatorPayoutsPage {...props} />}
        ></Route>
      </Switch>
    </EmployeeAppPrimaryLayout>
  );
};

const CreatorsAppRouter = props => {
  const SignOutCreatorLoadable = Loadable({
    loader: () => import("routes/signoutcreator"),
    loading: Loading,
  });
  const RegisterCreatorLoadable = Loadable({
    loader: () => import("routes/registercreator"),
    loading: Loading,
  });
  const LoginCreatorLoadable = Loadable({
    loader: () => import("routes/logincreator"),
    loading: Loading,
  });
  const ResetPasswordCreatorLoadable = Loadable({
    loader: () => import("routes/resetpasswordcreator"),
    loading: Loading,
  });
  const InvitedCreatorLoadable = Loadable({
    loader: () => import("routes/invited"),
    loading: Loading,
  });

  return (
    <Router>
      <Switch>
        <Route
          exact
          path={"/"}
          render={props => <AuthenticatedCreatorApp {...props} />}
        />
        <Route
          path={"/search"}
          render={props => <AuthenticatedCreatorApp {...props} />}
        />
        <Route
          exact
          path={"/sign-out-creator"}
          render={props => <SignOutCreatorLoadable {...props} />}
        />
        <Route
          exact
          path={"/invited"}
          render={props => <InvitedCreatorLoadable {...props} />}
        />
        <Route
          path={"/mycontent"}
          render={props => <AuthenticatedCreatorApp {...props} />}
        />
        <Route
          path={"/myfeedback"}
          render={props => <AuthenticatedCreatorApp {...props} />}
        />
        <Route
          path={"/info"}
          render={props => <AuthenticatedCreatorApp {...props} />}
        />
        <Route
          path={"/editplaylist"}
          render={props => <AuthenticatedCreatorApp {...props} />}
        />
        <Route
          path={"/editvideo"}
          render={props => <AuthenticatedCreatorApp {...props} />}
        />
        <Route
          path={"/editcollection"}
          render={props => <AuthenticatedCreatorApp {...props} />}
        />
        <Route
          path={"/edit-creator-profile"}
          render={props => <AuthenticatedCreatorApp {...props} />}
        />
        <Route
          path={"/creator-leaderboard"}
          render={props => <AuthenticatedCreatorApp {...props} />}
        />
        <Route
          path={"/creator-notifications"}
          render={props => <AuthenticatedCreatorApp {...props} />}
        />
        <Route
          path={"/register-creator"}
          render={props => <RegisterCreatorLoadable {...props} />}
        />
        <Route
          path={"/login-creator"}
          render={props => <LoginCreatorLoadable {...props} />}
        />
        <Route
          path={"/resetpassword-creator"}
          render={props => <ResetPasswordCreatorLoadable {...props} />}
        />
        <Route
          path={"/creator-registration-details"}
          render={props => <CreatorPendingApprovalApp {...props} />}
        />
        <Route
          path={"/creator-pending-approval"}
          render={props => <CreatorPendingApprovalApp {...props} />}
        />
        <Route
          path={"/creator-pending-approval-edit-profile"}
          render={props => <CreatorPendingApprovalApp {...props} />}
        />
        <Route
          path="/*"
          render={props => <ErrorPage error={ERROR_TYPES.NOT_FOUND_ERROR} />}
        />
      </Switch>
    </Router>
  );
};

const AppRouter = props => {
  const CreatorsHomeLoadable = Loadable({
    loader: () => import("routes/creators"),
    loading: Loading,
  });

  const HomeLoadable = Loadable({
    loader: () => import("routes/home/Home.react"),
    loading: Loading,
  });
  const LoginLoadable = Loadable({
    loader: () => import("routes/login"),
    loading: Loading,
  });
  const SignupLoadable = Loadable({
    loader: () => import("routes/signup"),
    loading: Loading,
  });
  const SignoutLoadable = Loadable({
    loader: () => import("routes/signout"),
    loading: Loading,
  });
  const ResetPasswordLoadable = Loadable({
    loader: () => import("routes/resetpassword"),
    loading: Loading,
  });

  return (
    <Router>
      <Switch>
        <Route exact path={"/"} render={props => <HomeLoadable {...props} />} />
        <Route
          exact
          path={"/creators"}
          render={props => <CreatorsHomeLoadable {...props} />}
        />
        <Route
          exact
          path={"/login"}
          render={props => <LoginLoadable {...props} />}
        />
        <Route
          exact
          path={"/resetpassword"}
          render={props => <ResetPasswordLoadable {...props} />}
        />
        <Route
          exact
          path={"/signup"}
          render={props => <SignupLoadable {...props} />}
        />
        <Route
          exact
          path={"/sign-out"}
          render={props => <SignoutLoadable {...props} />}
        />
        <Route
          exact
          path={"/subscription"}
          render={props => <AuthenticatedUserApp {...props} />}
        />
        <Route
          path={"/search"}
          render={props => {
            return <AuthenticatedUserApp {...props} />;
          }}
        />
        <Route
          path={"/mydashboard"}
          render={props => <AuthenticatedUserApp {...props} />}
        />
        <Route
          path={"/playlist"}
          render={props => <AuthenticatedUserApp {...props} />}
        />
        <Route
          path={"/collection"}
          render={props => <AuthenticatedUserApp {...props} />}
        />
        <Route
          path={"/resource"}
          render={props => <AuthenticatedUserApp {...props} />}
        />
        <Route
          path={"/myaccount"}
          render={props => <AuthenticatedUserApp {...props} />}
        />
        {prettyURLs.collections.map((item, idx) => {
          return (
            <Route
              key={uuidV4()}
              path={item.shortURL}
              render={props => <AuthenticatedUserApp {...props} />}
            />
          );
        })}
        <Route
          path="/*"
          render={props => <ErrorPage error={ERROR_TYPES.NOT_FOUND_ERROR} />}
        />
      </Switch>
    </Router>
  );
};

const EmployeeAppRouter = props => {
  const SignOutEmployeeLoadable = Loadable({
    loader: () => import("routes/signoutemployee"),
    loading: Loading,
  });
  const RegisterEmployeeLoadable = Loadable({
    loader: () => import("routes/registeremployee"),
    loading: Loading,
  });
  const LoginEmployeeLoadable = Loadable({
    loader: () => import("routes/loginemployee"),
    loading: Loading,
  });
  return (
    <Router>
      <Switch>
        <Route
          exact
          path={"/creator-payouts"}
          render={props => <AuthenticatedEmployeeApp {...props} />}
        />
        <Route
          exact
          path={"/sign-out-employee"}
          render={props => <SignOutEmployeeLoadable {...props} />}
        />
        <Route
          exact
          path={"/register-employee"}
          render={props => <RegisterEmployeeLoadable {...props} />}
        />
        <Route
          exact
          path={"/login-employee"}
          render={props => <LoginEmployeeLoadable {...props} />}
        />
        <Route
          path="/*"
          render={props => <ErrorPage error={ERROR_TYPES.NOT_FOUND_ERROR} />}
        />
      </Switch>
    </Router>
  );
};

const App = () => {
  const mainAppRouter = React.useMemo(() => {
    const parsedData = window.location.host.split(".");
    const subdomain = parsedData && parsedData.length >= 2 && parsedData[0];
    switch (subdomain) {
      case "creators":
        return <CreatorsAppRouter />;
      case "intern":
        return <EmployeeAppRouter />;
      default:
        return <AppRouter />;
    }
  }, []);

  return <MainApp>{mainAppRouter}</MainApp>;
};

export default App;

export { AppContext };
