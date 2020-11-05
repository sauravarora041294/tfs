import { Layout } from "antd";
import { AppContext } from "App";
import React from "react";
import { withRouter } from "react-router";
import { compose } from "recompose";
import s from "./CreatorAppPrimaryLayout.module.scss";
import {
  CreatorAppPrimaryLayoutStateActionTypes,
  creatorAppPrimaryLayoutReducer,
  creatorAppPrimaryLayoutStateInit,
} from "./CreatorAppPrimaryLayoutReducer";
import * as Util from "utilities/index";
import { useFetchCreatorAppPrimaryLayoutData } from "./CreatorAppPrimaryLayoutUtil";
import CreatorAppPrimarySidebarMenu from "./CreatorAppPrimarySidebarMenu.react";
import CreatorAppPrimaryTopbar from "./CreatorAppPrimaryTopbar.react";
import { Location } from "history";

interface Props {
  location?: Location;
  children: React.ReactNode;
  error?: Error;
}

const CreatorAppPrimaryLayout: React.FC<Props> = (props: Props) => {
  const [appState] = React.useContext(AppContext);
  const [creatorAppPrimaryLayoutState, dispatch] = React.useReducer(
    creatorAppPrimaryLayoutReducer,
    {},
    creatorAppPrimaryLayoutStateInit,
  );
  let creatorAppPrimaryLayoutData = useFetchCreatorAppPrimaryLayoutData(
    appState.authUser,
    props.location,
  );

  React.useEffect(() => {
    if (Util.isSearchRoute(props.location)) {
      dispatch({
        type: CreatorAppPrimaryLayoutStateActionTypes.UPDATE_SEARCHBAR_VALUE,
        searchBarValue: Util.getSeachValueFromRoute(props.location),
      });
    } else {
      dispatch({
        type: CreatorAppPrimaryLayoutStateActionTypes.UPDATE_SEARCHBAR_VALUE,
        searchBarValue: "",
      });
    }
  }, [props.location]);

  const onSidebarToggleButtonClick = () =>
    dispatch({
      type: CreatorAppPrimaryLayoutStateActionTypes.TOGGLE_SIDEBAR,
    });

  const onSearchBarInputChange = React.useCallback(
    (searchString: string) => {
      dispatch({
        type: CreatorAppPrimaryLayoutStateActionTypes.UPDATE_SEARCHBAR_VALUE,
        searchBarValue: searchString,
      });
    },
    [dispatch],
  );

  return (
    <Layout className={s.creatorLayout}>
      <CreatorAppPrimaryTopbar
        onSidebarToggleButtonClick={onSidebarToggleButtonClick}
        sidebarCollapsed={creatorAppPrimaryLayoutState.sidebarCollapsed}
        currentUser={appState.currentCreator}
        location={props.location}
        searchBarValue={creatorAppPrimaryLayoutState.searchBarValue}
        onSearchInputChange={onSearchBarInputChange}
      />
      <Layout.Header />
      <Layout>
        <Layout.Sider
          width={200}
          className={s.sider}
          collapsed={creatorAppPrimaryLayoutState.sidebarCollapsed}
        >
          <CreatorAppPrimarySidebarMenu
            attentionRequiringNotifications={
              creatorAppPrimaryLayoutData.attentionRequiringNotifications
            }
          />
        </Layout.Sider>
        <Layout
          id={"creatorAppPrimaryContentLayout"}
          className={s.contentLayout}
        >
          {props.children}
        </Layout>
      </Layout>
    </Layout>
  );
};

export default compose<Props, Props>(withRouter)(CreatorAppPrimaryLayout);
