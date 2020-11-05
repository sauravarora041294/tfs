import { Layout } from "antd";
import App, { AppContext } from "App";
import React from "react";
import { withRouter } from "react-router";
import { compose } from "recompose";
import s from "./EmployeeAppPrimaryLayout.module.scss";
import * as Util from "utilities/index";
import { Location } from "history";
import {
  employeeAppPrimaryLayoutReducer,
  employeeAppPrimaryLayoutStateInit,
  EmployeeAppPrimaryLayoutStateActionTypes,
} from "./EmployeeAppPrimaryLayoutReducer";
import { useFetchEmployeeAppPrimaryLayoutData } from "./EmployeeAppPrimaryLayoutUtil";
import EmployeeAppPrimaryTopbar from "./EmployeeAppPrimaryTopbar.react";
import EmployeeAppPrimarySidebarMenu from "./EmployeeAppPrimarySidebarMenu.react";

interface Props {
  location?: Location;
  children: React.ReactNode;
  error?: Error;
}

const EmployeeAppPrimaryLayout: React.FC<Props> = (props: Props) => {
  const [appState] = React.useContext(AppContext);
  const [employeeAppPrimaryLayoutState, dispatch] = React.useReducer(
    employeeAppPrimaryLayoutReducer,
    {},
    employeeAppPrimaryLayoutStateInit,
  );

  //TODO:Build Search Bar StateActions here

  const onSidebarToggleButtonClick = () =>
    dispatch({
      type: EmployeeAppPrimaryLayoutStateActionTypes.TOGGLE_SIDEBAR,
    });

  //TODO:Build search bar value callback here

  return (
    <Layout className={s.creatorLayout}>
      <EmployeeAppPrimaryTopbar
        onSidebarToggleButtonClick={onSidebarToggleButtonClick}
        sidebarCollapsed={employeeAppPrimaryLayoutState.sidebarCollapsed}
        currentUser={appState.currentEmployee}
        location={props.location}
        searchBarValue={employeeAppPrimaryLayoutState.searchBarValue}
      />
      <Layout.Header />
      <Layout>
        <Layout.Sider
          width={200}
          className={s.sider}
          collapsed={employeeAppPrimaryLayoutState.sidebarCollapsed}
        >
          <EmployeeAppPrimarySidebarMenu />
        </Layout.Sider>
        <Layout
          id={"employeeAppPrimaryContentLayout"}
          className={s.contentLayout}
        >
          {props.children}
        </Layout>
      </Layout>
    </Layout>
  );
};

export default compose<Props, Props>(withRouter)(EmployeeAppPrimaryLayout);
