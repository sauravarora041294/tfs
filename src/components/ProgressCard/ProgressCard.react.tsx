import { Button, Row, Col, Typography, Progress } from "antd";
import React from "react";
import * as DataTypes from "data/types";
import s from "./ProgressCard.module.scss";

interface Props {
  title: string;
  subtitle: string;
  progress: number;
}

const ProgressCard = (props: Props) => {
  return (
    <div className={s.cardContainer}>
      <div className={s.progressTitleContainer}>
        <Typography.Text className={s.progressTitle}>
          {props.title}
        </Typography.Text>
      </div>
      <div className={s.progressSubTitleContainer}>
        <Typography.Text className={s.progressSubTitle}>
          {props.subtitle}
        </Typography.Text>
      </div>
      <div className={s.progressBarContainer}>
        <Progress percent={props.progress} showInfo={false} />
      </div>
    </div>
  );
};

export default ProgressCard;
