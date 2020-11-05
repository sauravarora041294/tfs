import ContentFeedView from "components/Views/ContentFeedView";
import * as DataTypes from "data/types";
import React from "react";
import { Container, Header } from "semantic-ui-react";
import s from "./MyDashboard.module.scss";
import WhiteCard from "components/WhiteCard";

interface Props {
  title: string;
  results: Array<DataTypes.Content>;
  userLatestViewlogs: DataTypes.UserLatestViewlogs;
  forceFlexWrap?: boolean;
}

const MyDashboardPopulatedView: React.FC<Props> = (props: Props) => {
  console.log(`title: ${props.title}, results: ${props.results}`);
  return (
    <WhiteCard
      title=""
      subTitle=""
      customBodyPaddingValues={{
        top: "1rem",
        bottom: "1rem",
        left: "0.5rem",
        right: "0.5rem",
      }}
    >
      <div className={s.defaultView}>
        <Header as="h2" className={s.defaultViewSectionHeader}>
          {props.title}
        </Header>
        <ContentFeedView
          title={""}
          results={props.results}
          userLatestViewlogs={props.userLatestViewlogs}
        />
      </div>
    </WhiteCard>
  );
};

export default MyDashboardPopulatedView;
