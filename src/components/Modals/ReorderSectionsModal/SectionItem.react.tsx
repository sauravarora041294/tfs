import { List, Typography } from "antd";
import * as DataTypes from "data/types";
import React from "react";
import { Button as SemanticButton } from "semantic-ui-react";
import s from "./ReorderSectionsModal.module.scss";

interface Props {
  section: DataTypes.Section;
  shiftSectionUp: (section: number) => void;
  shiftSectionDown: (section: number) => void;
  length: number;
}

const SectionItem: React.FC<Props> = (props: Props) => {
  return (
    <List.Item className={s.listItem}>
      <SemanticButton.Group vertical className={s.shiftButtonGroup}>
        <SemanticButton
          icon="angle up"
          basic
          disabled={props.section.sectionIndex === 1}
          onClick={() => props.shiftSectionUp(props.section.sectionIndex)}
          className={s.shiftButton}
        />
        <SemanticButton
          icon="angle down"
          basic
          disabled={props.section.sectionIndex === props.length}
          onClick={() => props.shiftSectionDown(props.section.sectionIndex)}
          className={s.shiftButton}
        />
      </SemanticButton.Group>
      <Typography.Paragraph className={s.itemTitle}>
        {props.section.title}
      </Typography.Paragraph>
    </List.Item>
  );
};

export default SectionItem;
