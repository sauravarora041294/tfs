import ContentFeedView from "components/Views/ContentFeedView";
import * as DataTypes from "data/types";
import React from "react";
import { Grid } from "semantic-ui-react";
import { Typography, Button } from "antd";
import s from "./MyDashboard.module.scss";
import TypographyTitle, {
  TypographyTitleType,
} from "components/AaspireBasicComponents/Typography/TypographyTitle";

interface Props {
  results: Array<DataTypes.Content>;
  title: string;
  userLatestViewlogs: DataTypes.UserLatestViewlogs;
  didClickViewAll?: () => void;
  isHideViewAllButton?: boolean;
  isUseNewMinimalMissionCard?: boolean;
}

const MyDashboardDefaultViewSection: React.FC<Props> = (props: Props) => {
  return (
    <div className={s.defaultViewSectionContainer}>
      <Grid columns="equal" className={s.defaultViewSectionTitle}>
        <Grid.Column verticalAlign="middle">
          <TypographyTitle type={TypographyTitleType.CARD_SUB_TITLE}>
            {props.title}
          </TypographyTitle>
        </Grid.Column>
        {!props.isHideViewAllButton && (
          <Grid.Column
            className={s.viewAllButtonContainer}
            verticalAlign="middle"
          >
            <Button onClick={e => props.didClickViewAll()}>View All</Button>
          </Grid.Column>
        )}
      </Grid>
      <div className={s.defaultViewSectionContent}>
        <ContentFeedView
          title={""}
          results={props.results}
          userLatestViewlogs={props.userLatestViewlogs}
          maxNumberOfRowsToShow={1}
          horizontalOnMobile={true}
          isUseNewMinimalMissionCard={props.isUseNewMinimalMissionCard}
        />
      </div>
    </div>
  );
};

export default MyDashboardDefaultViewSection;
