import { Badge, Icon, Menu } from "antd";
import React from "react";
import { withRouter } from "react-router";
import { compose } from "recompose";
import { History, Location } from "history";
import s from "./CreatorAppPrimaryLayout.module.scss";

interface Props {
  history?: History;
  location?: Location;
  attentionRequiringNotifications: Array<Object>;
}

const CreatorAppPrimarySidebarMenu: React.FC<Props> = (props: Props) => {
  const onMenuItemClick = e => {
    props.history.push(e.key);
  };
  const notificationsIcon =
    props.attentionRequiringNotifications &&
    props.attentionRequiringNotifications.length > 0 ? (
      <Icon type="notification" theme="twoTone" twoToneColor="#F5212D" />
    ) : (
      <Icon type="notification" />
    );
  return (
    <Menu
      defaultSelectedKeys={[props.location.pathname]}
      mode="inline"
      className={s.sidebarMenu}
      onClick={onMenuItemClick}
    >
      <Menu.Item key="/">
        <Icon type="appstore" />
        <span>Dashboard</span>
      </Menu.Item>
      <Menu.Item key="/mycontent">
        <Icon type="play-square" />
        <span>My Content</span>
      </Menu.Item>
      <Menu.Item key="/creator-leaderboard">
        <Icon type="ordered-list" />
        <span>Leaderboard</span>
      </Menu.Item>
      <Menu.Item key="/creator-notifications">
        {notificationsIcon}
        <span>Notifications</span>
      </Menu.Item>
      <Menu.Item key="/edit-creator-profile">
        <Icon type="user" />
        <span>Creator Profile</span>
      </Menu.Item>
      <Menu.Item key="/myfeedback">
        <Icon type="star" />
        <span>My Feedback</span>
      </Menu.Item>
      <Menu.Item key="/info">
        <Icon type="info-circle" />
        <span>{`Help \& FAQ`}</span>
      </Menu.Item>
    </Menu>
  );
};

export default compose<Props, Props>(withRouter)(CreatorAppPrimarySidebarMenu);
