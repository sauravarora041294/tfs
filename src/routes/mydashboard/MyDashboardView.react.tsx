import * as DataTypes from "data/types";
import React from "react";
import s from "./MyDashboard.module.scss";
import MyDashboardDefaultView from "./MyDashboardDefaultView.react";
import MyDashboardPopulatedView from "./MyDashboardPopulatedView.react";
import { myDashboardReducer, myDashboardStateInit } from "./MyDashboardReducer";
import { MyDashboardHeader } from "./MyDashboardHeader";
import WhiteCard from "components/WhiteCard";
interface Props {
  currentUser: DataTypes.User;
  featuredResults: Array<DataTypes.Content>;
  userLatestViewlogs: DataTypes.UserLatestViewlogs;
  recentResults: Array<DataTypes.Content>;
  windowLocation: {
    pathname: string;
  };
  error?: Error;
  topRatedContent: Array<DataTypes.Content>;
  recommendedContent: Array<DataTypes.Content>;
}

const MyDashboardView: React.FC<Props> = (props: Props) => {
  const [myDashboardState] = React.useReducer(
    myDashboardReducer,
    {
      currentUser: props.currentUser,
      userLatestViewlogs: props.userLatestViewlogs,
      featuredResults: props.featuredResults,
      recentResults: props.recentResults,
      windowLocation: props.windowLocation,
      topRatedContent: props.topRatedContent,
      recommendedContent: props.recommendedContent,
    },
    myDashboardStateInit,
  );

  const viewContent = React.useMemo(() => {
    if (myDashboardState.windowLocation.pathname === "/mydashboard/featured") {
      return (
        <MyDashboardPopulatedView
          results={myDashboardState.featuredResults}
          userLatestViewlogs={myDashboardState.userLatestViewlogs}
          title={"Featured"}
          forceFlexWrap={true}
        />
      );
    } else if (
      myDashboardState.windowLocation.pathname === "/mydashboard/recentlyadded"
    ) {
      return (
        <MyDashboardPopulatedView
          results={myDashboardState.recentResults}
          userLatestViewlogs={myDashboardState.userLatestViewlogs}
          title={"Recently Added"}
          forceFlexWrap={true}
        />
      );
    } else if (
      myDashboardState.windowLocation.pathname === "/mydashboard/recommended"
    ) {
      return (
        <MyDashboardPopulatedView
          results={myDashboardState.recommendedContent}
          userLatestViewlogs={myDashboardState.userLatestViewlogs}
          title={"Recommended"}
          forceFlexWrap={true}
        />
      );
    } else if (myDashboardState.windowLocation.pathname === "/mydashboard/toprated"){
      return (
        <MyDashboardPopulatedView
        results={myDashboardState.topRatedContent}
        userLatestViewlogs={myDashboardState.userLatestViewlogs}
        title={"Top Rated"}
        forceFlexWrap={true}
      />
      );
    }else if (
      !myDashboardState.searchText ||
      myDashboardState.searchText === ""
    ) {
      return (
        <>
          <MyDashboardHeader currentUser={props.currentUser} />
          <WhiteCard
            className={s.myDashboardContentContainer}
            title="Let’s Get Started"
            subTitle="Browse our featured collections, personalized recommendations
                just for you, and our expert curated playlists"
            titleAndSubtitleAlignCenter
          >
            <MyDashboardDefaultView
              featuredResults={myDashboardState.featuredResults}
              recommendedContent={myDashboardState.recommendedContent}
              userLatestViewlogs={myDashboardState.userLatestViewlogs}
              recentResults={myDashboardState.recentResults}
              topRatedContent={myDashboardState.topRatedContent}
            />
          </WhiteCard>
        </>
      );
    }
  }, [
    myDashboardState.featuredResults,
    myDashboardState.userLatestViewlogs,
    myDashboardState.recommendedContent,
    myDashboardState.recentResults,
    myDashboardState.windowLocation.pathname,
    myDashboardState.searchText,
  ]);
  return <div className={s.myDashboardRoot}>{viewContent}</div>;
};

export default MyDashboardView;
