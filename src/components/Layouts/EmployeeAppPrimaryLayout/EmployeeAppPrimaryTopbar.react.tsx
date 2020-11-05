import { Button, Dropdown, Icon, Menu } from "antd";
import logoSmall from "assets/images/fbrocketlogo.png";
import Avatar from "components/Avatar";
import * as DataTypes from "data/types";
import React from "react";
import { withRouter } from "react-router";
import { compose } from "recompose";
import { Grid, Responsive } from "semantic-ui-react";
import { History, Location } from "history";
import s from "./EmployeeAppPrimaryLayout.module.scss";

interface Props {
  history?: History;
  onSidebarToggleButtonClick: () => void;
  sidebarCollapsed: boolean;
  currentUser: DataTypes.Employee;
  location?: Location;
  searchBarValue?: string;
}

const EmployeeAppPrimaryTopbar: React.FC<Props> = (props: Props) => {
  const profileDropdownMenu = (
    <Menu onClick={e => props.history.push(e.key)}>
      <Menu.Item key="/sign-out-employee">{"Sign Out"}</Menu.Item>
    </Menu>
  );

  return (
    <Grid className={s.dashboardTopBar}>
      <Grid.Column width={2} className={s.topBarToggleButtonColumn}>
        <Button
          onClick={props.onSidebarToggleButtonClick}
          className={s.toggleButton}
        >
          <Icon type={props.sidebarCollapsed ? "menu-unfold" : "menu-fold"} />
        </Button>
      </Grid.Column>
      <Grid.Column width={4} className={s.topBarLogoColumn}>
        <span>EMPLOYEE HUB</span>
      </Grid.Column>
      <Grid.Column width={6} className={s.topBarSearchbarColumn}></Grid.Column>
      <Grid.Column width={4} className={s.topBarAvatarColumn}>
        <Dropdown overlay={profileDropdownMenu}>
          <a href="/sign-out-employee">
            <Avatar
              size="large"
              user={props.currentUser}
              className={s.dropdownAvatar}
            />
          </a>
        </Dropdown>
      </Grid.Column>
    </Grid>
  );
};

export default compose<Props, Props>(withRouter)(EmployeeAppPrimaryTopbar);
