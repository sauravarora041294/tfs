import { List } from "antd";
import { Playlist } from "data/types";
import React from "react";
import SectionItem from "./SectionItem.react";
import { compareSections } from "./ReorderSectionsModalUtil";

interface Props {
  playlist: Playlist;
  shiftSectionUp: (section: number) => void;
  shiftSectionDown: (section: number) => void;
}

const SectionsList: React.FC<Props> = props => {
  return (
    <List
      loading={false}
      itemLayout="horizontal"
      loadMore={() => {}}
      dataSource={props.playlist.sections.sort(compareSections)}
      bordered
      renderItem={section => (
        <SectionItem
          length={props.playlist.sections.length}
          section={section}
          shiftSectionUp={props.shiftSectionUp}
          shiftSectionDown={props.shiftSectionDown}
        />
      )}
    />
  );
};

export default SectionsList;
