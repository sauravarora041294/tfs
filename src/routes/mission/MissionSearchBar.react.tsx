import React, { useState, useRef } from "react";
import { compose } from "recompose";
import { withRouter } from "react-router";
import { History } from "history";
import s from "./Mission.module.scss";
import { Input, Button, Tooltip } from "antd";
import searchIcon from "assets/searchIcon.svg";
import { useMediaQuery } from "react-responsive";
import UserAppSearchBar from "components/Layouts/UserAppPrimaryLayout/UserAppSearchbar.react";

interface Props {
  history?: History;
  missionId: string;
  defaultSearchedText: string;
  isSearchFieldVisible?: boolean;
}

const MissionSearchBar: React.FC<Props> = (props: Props) => {
  const inputRef = useRef(null);

  const onSearch = async (searchText: string) => {
    if (searchText.length === 0) {
      props.history.push(`/collection/${props.missionId}`);
    } else {
      props.history.push(`/collection/${props.missionId}/search/${searchText}`);
    }
  };

  const [isShowSearchInputBox, setIsShowSearchInputBox] = useState(
    props.isSearchFieldVisible === undefined
      ? true
      : props.isSearchFieldVisible,
  );

  // To Always show search bar on small screens
  const handleMediaQueryChange = (matches: boolean) => {
    setIsShowMobileView(matches);
  };
  const showMobileView = useMediaQuery(
    { maxWidth: 767 },
    undefined,
    handleMediaQueryChange,
  );
  const [isShowMobileView, setIsShowMobileView] = useState<boolean>(
    showMobileView,
  );

  const mobileSearchBar = (
    <UserAppSearchBar
      searchRootLocation={`/collection/${props.missionId}`}
      placeholderText="Search..."
    />
  );

  return (
    <div className={s.searchRoot}>
      <Tooltip title="Search this channel">
        <Button
          shape="circle"
          style={{ marginLeft: "0" }}
          className={s.searchButton}
          onClick={() => {
            setIsShowSearchInputBox(!isShowSearchInputBox);
            setTimeout(() => {
              inputRef.current.focus();
            }, 100);
          }}
        >
          <img style={{ width: "14px" }} src={searchIcon} />
        </Button>
      </Tooltip>
      {isShowMobileView ? (
        mobileSearchBar
      ) : (
        <Input.Search
          className={`${s.searchBarInput}`}
          autoFocus={false}
          placeholder="Search"
          onSearch={onSearch}
          defaultValue={props.defaultSearchedText}
          // style={
          //   isShowMobileView || isShowSearchInputBox
          //     ? { visibility: "visible" }
          //     : { visibility: "hidden" }
          // }
          ref={r => {
            inputRef.current = r;
          }}
        />
      )}
    </div>
  );
};

export default compose<Props, Props>(withRouter)(MissionSearchBar);
