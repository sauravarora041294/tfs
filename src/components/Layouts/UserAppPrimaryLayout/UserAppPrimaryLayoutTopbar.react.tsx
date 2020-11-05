import { Dropdown, Menu, Button } from "antd";
import logoSmall from "assets/images/fbrocketlogo.png";
import logoRegular from "assets/images/futureschoollogo.png";
import Avatar from "components/Avatar";
import * as DataTypes from "data/types";
import React from "react";
import { withRouter } from "react-router";
import { compose } from "recompose";
import { Grid, Responsive } from "semantic-ui-react";
import { History, Location } from "history";
import s from "./UserAppPrimaryLayout.module.scss";
import UserAppSearchbar from "./UserAppSearchbar.react";
import { firebaseApp } from "FirebaseClient";

interface Props {
  history?: History;
  currentUser: DataTypes.User;
  authUser: firebaseApp.User;
  location?: Location;
  searchBarValue?: string;
  onSearchInputChange?: (searchString: string) => void;
}

const UserAppPrimaryLayoutTopbar: React.FC<Props> = (props: Props) => {
  const profileDropdownMenu = (
    <Menu onClick={e => props.history.push(e.key)}>
      <Menu.Item key="/myaccount">{"My Account"}</Menu.Item>
      <Menu.Item key="/sign-out">{"Sign Out"}</Menu.Item>
    </Menu>
  );

  const navToMyDashboard = () => {
    props.history.push("/mydashboard");
  };

  const searchBar = props.currentUser &&
    props.currentUser.subscriptionStatus === "Active" && (
      <UserAppSearchbar
        location={props.location}
        history={props.history}
        defaultSearchedText={props.searchBarValue}
        onSearchInputChange={props.onSearchInputChange}
      />
    );

  const userAvatar = React.useMemo(() => {
    return props.authUser ? (
      <Dropdown overlay={profileDropdownMenu} trigger={["click", "hover"]}>
        <a href="/myaccount" onClick={e => e.preventDefault()}>
          <Avatar size="large" user={props.currentUser} />
        </a>
      </Dropdown>
    ) : (
      <Button
        type="primary"
        htmlType="submit"
        className={s.publicAuthButton}
        onClick={e =>
          props.history.push(`/login?redirect=${window.location.pathname}`)
        }
      >
        {"Sign In"}
      </Button>
    );
  }, [props.currentUser, props.authUser]);

  return (
    <Grid className={s.dashboardTopBar}>
      <Grid.Column width={1} className={s.topBarToggleButtonColumn} />
      <Grid.Column
        computer={4}
        tablet={4}
        mobile={3}
        className={s.topBarLogoColumn}
      >
        <Responsive maxWidth={749}>
          <img
            alt="TFS_logo"
            onClick={() => navToMyDashboard()}
            src={logoSmall}
            className={s.logoMobile}
          />
        </Responsive>
        <Responsive minWidth={750}>
          <img
            alt="TFS_Logo"
            onClick={() => navToMyDashboard()}
            src={logoRegular}
            className={s.logo}
          />
        </Responsive>
      </Grid.Column>
      <Grid.Column
        computer={6}
        mobile={9}
        tablet={6}
        className={s.topBarSearchbarColumn}
      >
        {searchBar}
      </Grid.Column>
      <Grid.Column width={5} className={s.topBarAvatarColumn}>
        {userAvatar}
      </Grid.Column>
    </Grid>
  );
};

export default compose<Props, Props>(withRouter)(UserAppPrimaryLayoutTopbar);
