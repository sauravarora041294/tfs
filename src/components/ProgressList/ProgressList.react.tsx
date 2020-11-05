import { Button, Row, Col, Typography, Icon } from "antd";
import React from "react";
import * as DataTypes from "data/types";
import s from "./ProgressList.module.scss";

interface SectionSubheading {
  index: number;
  value: string;
}

interface Section {
  heading: string;
  subheadings: Array<SectionSubheading>;
}

interface Props {
  activeSubheadingIndex: number;
  sections: Array<Section>;
}

const ProgressList = (props: Props) => {
  const getSubheadingListItem = React.useCallback(
    (
      subheading: SectionSubheading,
      subheadingIndex: number,
      globalIndex: number,
    ) => {
      const subheadingText = `${String.fromCharCode(97 + subheadingIndex)}. ${
        subheading.value
      }`;
      if (subheading.index === globalIndex) {
        return (
          <div className={s.progressSectionSubheadingContainerActive}>
            <Typography.Text className={s.progressSectionSubheadingActive}>
              {subheadingText}
            </Typography.Text>
          </div>
        );
      } else if (subheading.index < globalIndex) {
        return (
          <div className={s.progressSectionSubheadingContainer}>
            <Icon
              className={s.progressSectionSubheadingIconCompleted}
              type="check-circle"
              theme="filled"
            />
            <Typography.Text className={s.progressSectionSubheadingCompleted}>
              {subheadingText}
            </Typography.Text>
          </div>
        );
      } else {
        return (
          <div className={s.progressSectionSubheadingContainer}>
            <Typography.Text
              className={s.progressSectionSubheading}
            >{`${String.fromCharCode(97 + subheadingIndex)}. ${
              subheading.value
            }`}</Typography.Text>
          </div>
        );
      }
    },
    [],
  );

  return (
    <div className={s.progressContainer}>
      {props.sections.map((section, sectionIndex) => {
        return (
          <div className={s.progressSectionContainer}>
            <div className={s.progressSectionHeadingContainer}>
              <Typography.Text className={s.progressSectionHeadingNum}>
                {sectionIndex + 1}
              </Typography.Text>
              <Typography.Text className={s.progressSectionHeading}>
                {section.heading}
              </Typography.Text>
            </div>
            <div className={s.progressSectionSubheadingsContainer}>
              {section.subheadings.map((subheading, subheadingIndex) => {
                return getSubheadingListItem(
                  subheading,
                  subheadingIndex,
                  props.activeSubheadingIndex,
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProgressList;
