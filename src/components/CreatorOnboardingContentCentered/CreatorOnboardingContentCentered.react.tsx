import * as DataTypes from "data/types";
import { Image } from "semantic-ui-react";
import { Typography } from "antd";
import React from "react";
import s from "./CreatorOnboardingContentCentered.module.scss";

interface Props {
  title: string;
  content: string;
  imageSrc: string;
  width?: number;
  height?: number;
}

const CreatorOnboardingContentCenteredView: React.FC<Props> = (
  props: Props,
) => {
  return (
    <div className={s.viewContainer}>
      <div className={s.viewTitleContainer}>
        <Typography.Text className={s.viewTitle}>{props.title}</Typography.Text>
      </div>
      <div className={s.viewImageContainer}>
        <Image src={props.imageSrc} fluid />
      </div>
      <div className={s.viewContentContainer}>
        <Typography.Text className={s.viewContentText}>
          {props.content}
        </Typography.Text>
      </div>
    </div>
  );
};

export default CreatorOnboardingContentCenteredView;
