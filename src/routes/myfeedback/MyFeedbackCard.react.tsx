import { Card } from "antd";
import * as DataTypes from "data/types";
import React from "react";
import s from "./MyFeedback.module.scss";
import MyFeedbackTable from "./MyFeedbackTable.react";
import { ResourceFilterItem } from "./MyFeedbackReducer";

interface Props {
  ratings: Array<DataTypes.RatingWithMetadata>;
  resourceFilters: Array<ResourceFilterItem>;
}

const MyFeedbackCard: React.FC<Props> = (props: Props) => {
  const ratingsWithAppendedData = props.ratings.map(rating => ({
    ...rating,
    redirectURL: `/editvideo/${rating.metadata.resource.objectID}`,
  }));

  return (
    <div className={s.rightHandSectionCard}>
      <MyFeedbackTable
        resourceFilters={props.resourceFilters}
        ratings={ratingsWithAppendedData}
      />
    </div>
  );
};

export default MyFeedbackCard;
