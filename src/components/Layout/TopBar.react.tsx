import { AppContext } from "App";
import React from "react";
import { withRouter } from "react-router";
import { compose } from "recompose";
import s from "./Layout.module.scss";
import SearchBox from "./SearchBox.react";
import Title from "./Title.react";
import TopBarProfileButton from "./TopBarProfileButton.react";
import * as DataTypes from "data/types";
import { History } from "history";

interface Props {
  history?: History;
  show?: boolean;
  currentUser?: DataTypes.User;
  showHamburgerIcon?: boolean;
}

const TopBar: React.FC<Props> = (props: Props) => {
  const [appState] = React.useContext(AppContext);

  const queryFunc = async searchText => {
    props.history.push(`/mydashboard/search/${searchText}`);
  };

  return (
    <div className={s.dashboardTopBar}>
      <Title showHamburgerIcon={false} />
      <SearchBox queryFunc={queryFunc} />
      <TopBarProfileButton currentUser={appState.currentUser} />
    </div>
  );
};

export default compose<Props, Props>(withRouter)(TopBar);
