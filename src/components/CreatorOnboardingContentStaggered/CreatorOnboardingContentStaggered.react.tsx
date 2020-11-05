import * as DataTypes from "data/types";
import { Image } from "semantic-ui-react";
import { Typography } from "antd";
import React from "react";
import s from "./CreatorOnboardingContentStaggered.module.scss";

interface Props {
  title: string;
  subtitle: string;
  contentTop: {
    title: string;
    body: string;
    imageSrc: string;
  };
  contentBottom: {
    title: string;
    body: string;
    imageSrc: string;
  };
  width?: number;
  height?: number;
}

const CreatorOnboardingContentStaggeredView: React.FC<Props> = (
  props: Props,
) => {
  return (
    <div className={s.viewContainer}>
      <div className={s.viewTitleContainer}>
        <Typography.Text className={s.viewTitle}>{props.title}</Typography.Text>
      </div>
      <div className={s.viewSubTitleContainer}>
        <Typography.Text className={s.viewSubTitle}>
          {props.subtitle}
        </Typography.Text>
      </div>
      <div className={s.viewContentTopContainer}>
        <div className={s.viewContentTopImageContainer}>
          <Image src={props.contentTop.imageSrc} fluid />
        </div>
        <div className={s.viewContentTextContainer}>
          <Typography.Text className={s.viewContentTitle}>
            {props.contentTop.title}
          </Typography.Text>
          <Typography.Text className={s.viewContentText}>
            {props.contentTop.body}
          </Typography.Text>
        </div>
      </div>
      <div className={s.viewContentBottomContainer}>
        <div className={s.viewContentTextContainer}>
          <Typography.Text className={s.viewContentTitle}>
            {props.contentBottom.title}
          </Typography.Text>
          <Typography.Text className={s.viewContentText}>
            {props.contentBottom.body}
          </Typography.Text>
        </div>
        <div className={s.viewContentBottomImageContainer}>
          <Image src={props.contentBottom.imageSrc} fluid />
        </div>
      </div>
    </div>
  );
};

export default CreatorOnboardingContentStaggeredView;
