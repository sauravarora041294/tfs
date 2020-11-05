import { Button, Dropdown, Icon, Menu } from "antd";
import logoRegular from "assets/images/creatorshublogo.png";
import logoSmall from "assets/images/fbrocketlogo.png";
import Avatar from "components/Avatar";
import * as DataTypes from "data/types";
import React from "react";
import { withRouter } from "react-router";
import { compose } from "recompose";
import { Grid, Responsive } from "semantic-ui-react";
import { History, Location } from "history";
import s from "./CreatorAppPrimaryLayout.module.scss";
import CreatorAppSearchbar from "./CreatorAppSearchbar.react";

interface Props {
  history?: History;
  onSidebarToggleButtonClick: () => void;
  sidebarCollapsed: boolean;
  currentUser: DataTypes.Creator;
  location?: Location;
  searchBarValue?: string;
  onSearchInputChange?: (searchString: string) => void;
}

const CreatorAppPrimaryTopbar: React.FC<Props> = (props: Props) => {
  const profileDropdownMenu = (
    <Menu onClick={e => props.history.push(e.key)}>
      <Menu.Item key="/sign-out-creator">{"Sign Out"}</Menu.Item>
    </Menu>
  );

  const navToCreatorsHub = () => {
    props.history.push("/");
    window.location.reload();
  };

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
        <Responsive maxWidth={749}>
          <img
            onClick={() => navToCreatorsHub()}
            alt="TFS_Logo"
            src={logoSmall}
            className={s.logoMobile}
          />
        </Responsive>
        <Responsive minWidth={750}>
          <img
            onClick={() => navToCreatorsHub()}
            alt="TFS_Logo"
            src={logoRegular}
            className={s.logo}
          />
        </Responsive>
      </Grid.Column>
      <Grid.Column width={6} className={s.topBarSearchbarColumn}>
        <CreatorAppSearchbar
          location={props.location}
          history={props.history}
          defaultSearchedText={props.searchBarValue}
          onSearchInputChange={props.onSearchInputChange}
        />
      </Grid.Column>
      <Grid.Column width={4} className={s.topBarAvatarColumn}>
        <Dropdown overlay={profileDropdownMenu}>
          <a href="/edit-creator-profile">
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

export default compose<Props, Props>(withRouter)(CreatorAppPrimaryTopbar);
