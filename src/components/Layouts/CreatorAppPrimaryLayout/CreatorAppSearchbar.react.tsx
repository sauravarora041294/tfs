import React from "react";
import { compose } from "recompose";
import { withRouter } from "react-router";
import { History, Location } from "history";
import { Input } from "antd";
import s from "./CreatorAppPrimaryLayout.module.scss";

interface Props {
  history?: History;
  location?: Location;
  defaultSearchedText?: string;
  onSearchInputChange?: (searchString: string) => void;
}

const CreatorAppSearchbar: React.FC<Props> = (props: Props) => {
  const onSearch = async (searchText: string) => {
    if (searchText.length === 0) {
      props.history.push(`/`);
    } else {
      props.history.push(`/search/${searchText}`);
    }
  };

  return (
    <Input.Search
      className={s.searchBarInput}
      placeholder="Search..."
      enterButton
      size="large"
      onSearch={onSearch}
      onChange={event => props.onSearchInputChange(event.target.value)}
      value={props.defaultSearchedText}
    />
  );
};

export default compose<Props, Props>(withRouter)(CreatorAppSearchbar);
