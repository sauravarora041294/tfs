import { Dropdown, Menu } from "antd";
import logoRegular from "assets/images/creatorshublogo.png";
import logoSmall from "assets/images/fbrocketlogo.png";
import Avatar from "components/Avatar";
import * as DataTypes from "data/types";
import React from "react";
import { withRouter } from "react-router";
import { compose } from "recompose";
import { Grid, Responsive } from "semantic-ui-react";
import { History } from "history";
import s from "./CreatorPendingApprovalAppLayout.module.scss";

interface Props {
  history?: History;
  currentUser: DataTypes.Creator;
}

const CreatorAppPendingApprovalTopbar: React.FC<Props> = (props: Props) => {
  const profileDropdownMenu = (
    <Menu onClick={e => props.history.push(e.key)}>
      <Menu.Item key="/sign-out-creator">{"Sign Out"}</Menu.Item>
    </Menu>
  );
  return (
    <Grid className={s.dashboardTopBar}>
      <Grid.Column width={6} className={s.topBarLogoColumn}>
        <Responsive maxWidth={749}>
          <img alt="TFS_logo" src={logoSmall} className={s.logoMobile} />
        </Responsive>
        <Responsive minWidth={750}>
          <img alt="TFS_logo" src={logoRegular} className={s.logo} />
        </Responsive>
      </Grid.Column>
      <Grid.Column width={6} className={s.topBarSearchbarColumn} />
      <Grid.Column width={4} className={s.topBarAvatarColumn}>
        <Dropdown overlay={profileDropdownMenu}>
          <a href="#">
            <Avatar
              size={"large"}
              user={props.currentUser}
              className={s.dropdownAvatar}
            />
          </a>
        </Dropdown>
      </Grid.Column>
    </Grid>
  );
};

export default compose<Props, Props>(withRouter)(
  CreatorAppPendingApprovalTopbar,
);
