import React from "react";
import { Rate, Row } from "antd";
import s from "./ResourceDetail.module.scss";

interface Props {
  avgRating: number;
  onRatingSelected: (rating: number) => void;
}

const ResourceDetailRating: React.FC<Props> = (props: Props) => {
  return (
    <Row className={s.videoHeadingRowRatingContainer}>
      <div className={s.rateThisText}>RATE THIS VIDEO</div>
      <Rate
        className={s.videoHeadingRowRating}
        onChange={(value: number) => props.onRatingSelected(value)}
        value={props.avgRating || 0}
        allowClear={false}
      />
    </Row>
  );
};

export default ResourceDetailRating;
