import React from "react";
import { compose } from "recompose";
import { withRouter } from "react-router";
import { History, Location } from "history";
import { Input } from "antd";
import s from "./UserAppPrimaryLayout.module.scss";

interface Props {
  history?: History;
  location?: Location;
  defaultSearchedText?: string;
  onSearchInputChange?: (searchString: string) => void;
  searchRootLocation?: string;
  placeholderText?: string;
  size?: "small" | "default" | "large";
}

const UserAppSearchbar: React.FC<Props> = (props: Props) => {
  const onSearch = async (searchText: string) => {
    const searchRoot = props.searchRootLocation || "";
    if (searchText.length === 0) {
      props.history.push(searchRoot);
    } else {
      props.history.push(`${searchRoot}/search/${searchText}`);
    }
  };

  return (
    <Input.Search
      className={s.searchBarInput}
      placeholder={
        props.placeholderText ||
        "Search for videos, playlists, or collections..."
      }
      enterButton
      size={props.size || "large"}
      onSearch={onSearch}
      {...(props.onSearchInputChange
        ? {
          onChange: event => props.onSearchInputChange(event.target.value),
          value: props.defaultSearchedText,
        }
        : {})}
    />
  );
};

export default compose<Props, Props>(withRouter)(UserAppSearchbar);
