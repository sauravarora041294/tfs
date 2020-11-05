import { Layout } from "antd";
import { AppContext } from "App";
import React from "react";
import { withRouter } from "react-router";
import { compose } from "recompose";
import { Location } from "history";
import s from "./UserAppPrimaryLayout.module.scss";
import UserAppPrimaryLayoutTopbar from "./UserAppPrimaryLayoutTopbar.react";
import {
  UserAppPrimaryLayoutStateActionTypes,
  userAppPrimaryLayoutReducer,
  userAppPrimaryLayoutStateInit,
} from "./UserAppPrimaryLayoutReducer.react";
import * as Util from "utilities/index";

interface Props {
  children: React.ReactNode;
  location?: Location;
}

const UserAppPrimaryLayout: React.FC<Props> = (props: Props) => {
  const [appState] = React.useContext(AppContext);
  const [userAppPrimaryLayoutState, dispatch] = React.useReducer(
    userAppPrimaryLayoutReducer,
    {},
    userAppPrimaryLayoutStateInit,
  );

  React.useEffect(() => {
    if (Util.isSearchRoute(props.location)) {
      dispatch({
        type: UserAppPrimaryLayoutStateActionTypes.UPDATE_SEARCHBAR_VALUE,
        searchBarValue: Util.getSeachValueFromRoute(props.location),
      });
    } else {
      dispatch({
        type: UserAppPrimaryLayoutStateActionTypes.UPDATE_SEARCHBAR_VALUE,
        searchBarValue: "",
      });
    }
  }, [props.location]);

  const onSearchBarInputChange = React.useCallback(
    (searchString: string) => {
      dispatch({
        type: UserAppPrimaryLayoutStateActionTypes.UPDATE_SEARCHBAR_VALUE,
        searchBarValue: searchString,
      });
    },
    [dispatch],
  );

  return (
    <Layout className={s.creatorLayout}>
      <UserAppPrimaryLayoutTopbar
        authUser={appState.authUser}
        currentUser={appState.currentUser}
        location={props.location}
        searchBarValue={userAppPrimaryLayoutState.searchBarValue}
        onSearchInputChange={onSearchBarInputChange}
      />
      <Layout.Header />
      <Layout>
        <Layout className={s.contentLayout}>{props.children}</Layout>
      </Layout>
    </Layout>
  );
};

export default compose<Props, Props>(withRouter)(UserAppPrimaryLayout);
