import { Resource } from "data/types";
import debounce from "lodash/debounce";
import React from "react";
import { Form, Icon, Input } from "semantic-ui-react";
import s from "./Layout.module.scss";

interface Props {
  queryFunc: (query: string) => Array<Resource> | Promise<void>;
}

const Searchbox = (props: Props) => {
  const debouncedSearch = debounce(e => {
    props.queryFunc(e.target.value);
  }, 650);

  const onChange = e => {
    e.persist();
    debouncedSearch(e);
  };

  return (
    <Form>
      <Input
        icon
        className={s.searchBarInput}
        placeholder="Search..."
        type="search"
        name="value"
        onChange={onChange}
        transparent
      >
        <input />
        <Icon
          className={s.searchIcon}
          name="search"
          color={"blue"}
          inverted
          circular
        />
      </Input>
    </Form>
  );
};

export default Searchbox;
