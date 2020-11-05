import { Badge, Icon, Menu } from "antd";
import React from "react";
import { withRouter } from "react-router";
import { compose } from "recompose";
import { History, Location } from "history";
import s from "./EmployeeAppPrimaryLayout.module.scss";

interface Props {
  history?: History;
  location?: Location;
}

const EmployeeAppPrimarySidebarMenu: React.FC<Props> = (props: Props) => {
  const onMenuItemClick = e => {
    props.history.push(e.key);
  };
  return (
    <Menu
      defaultSelectedKeys={[props.location.pathname]}
      mode="inline"
      className={s.sidebarMenu}
      onClick={onMenuItemClick}
    >
      <Menu.Item key="/creator-payouts">
        <Icon type="appstore" />
        <span>Creator Payouts</span>
      </Menu.Item>
    </Menu>
  );
};

export default compose<Props, Props>(withRouter)(EmployeeAppPrimarySidebarMenu);
