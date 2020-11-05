import * as DataTypes from "data/types";
import React from "react";
import { withRouter } from "react-router";
import { compose } from "recompose";
import { History } from "history";
import s from "./MyDashboard.module.scss";
import MyDashboardDefaultViewSection from "./MyDashboardDefaultViewSection.react";

interface Props {
  history?: History;
  featuredResults: Array<DataTypes.Content>;
  recommendedContent: Array<DataTypes.Content>;
  userLatestViewlogs: DataTypes.UserLatestViewlogs;
  recentResults: Array<DataTypes.Content>;
  topRatedContent: Array<DataTypes.Content>;
}

const MyDashboardDefaultView: React.FC<Props> = (props: Props) => {
  const [vw, setVw] = React.useState(
    Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
  );

  const maxNumberofResultsPerSections = React.useMemo(() => {
    const availableVw = 0.86 * vw; // change when container padding,margins change
    const margin = 14;
    const width = 300; // change when card width changes;
    const maxNumberOfCardsPerRow = Math.floor(availableVw / (width + margin));

    return 2 * maxNumberOfCardsPerRow;
  }, [document.documentElement.clientWidth, window.innerWidth, vw]);

  React.useEffect(() => {
    const resizeEvt = window.addEventListener("resize", () =>
      setVw(
        Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
      ),
    );
  }, []);

  return (
    <div className={s.defaultView}>
      <MyDashboardDefaultViewSection
        results={
          vw < 600
            ? props.featuredResults.slice(0, 10)
            : props.featuredResults.slice(0, maxNumberofResultsPerSections)
        }
        userLatestViewlogs={props.userLatestViewlogs}
        title={"Featured Collections"}
        isHideViewAllButton
        isUseNewMinimalMissionCard
      />
      <MyDashboardDefaultViewSection
        results={
          vw < 600
            ? props.recommendedContent.slice(0, 10)
            : props.recommendedContent.slice(0, maxNumberofResultsPerSections)
        }
        userLatestViewlogs={props.userLatestViewlogs}
        title={"Recommended"}
        didClickViewAll={() => {
          props.history.push("/mydashboard/recommended");
        }}
      />
      <MyDashboardDefaultViewSection
        results={
          vw < 600
            ? props.recentResults.slice(0, 10)
            : props.recentResults.slice(0, maxNumberofResultsPerSections)
        }
        userLatestViewlogs={props.userLatestViewlogs}
        title={"Recently Added"}
        didClickViewAll={() => {
          props.history.push("/mydashboard/recentlyadded");
        }}
      />
      <MyDashboardDefaultViewSection
        results={
          vw < 600
            ? props.topRatedContent.slice(0, 10)
            : props.topRatedContent.slice(0, maxNumberofResultsPerSections)
        }
        userLatestViewlogs={props.userLatestViewlogs}
        title={"Top Rated Playlists and Videos"}
        didClickViewAll={() => {
          props.history.push("/mydashboard/toprated");
        }}
      />
    </div>
  );
};

export default compose<Props, Props>(withRouter)(MyDashboardDefaultView);
