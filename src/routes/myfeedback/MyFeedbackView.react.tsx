import { PageHeader, Typography } from "antd";
import * as DataTypes from "data/types";
import React from "react";
import { Grid } from "semantic-ui-react";
import s from "./MyFeedback.module.scss";
import MyFeedbackCard from "./MyFeedbackCard.react";
import {
  myFeedbackReducer,
  myFeedbackStateInit,
  ResourceFilterItem,
} from "./MyFeedbackReducer";
import WhiteCard from "components/WhiteCard";

interface Props {
  currentUser: DataTypes.Creator;
  ratings: Array<DataTypes.RatingWithMetadata>;
  error?: Error;
  resourceFilters?: Array<ResourceFilterItem>;
}

const MyFeedbackView: React.FC<Props> = (props: Props) => {
  const [myFeedbackState] = React.useReducer(
    myFeedbackReducer,
    {
      currentUser: props.currentUser,
      ratings: props.ratings,
    },
    myFeedbackStateInit,
  );

  return (
    <WhiteCard
      title="Feedback for Me"
      subTitle="See feedback users have given about your videos."
      className={s.myFeedbackRoot}
      withDefaultBodyPadding
    >
      <Grid>
        <Grid.Column width={16}>
          <MyFeedbackCard
            resourceFilters={props.resourceFilters}
            ratings={myFeedbackState.ratings}
          />
        </Grid.Column>
      </Grid>
    </WhiteCard>
  );
};

export default MyFeedbackView;
