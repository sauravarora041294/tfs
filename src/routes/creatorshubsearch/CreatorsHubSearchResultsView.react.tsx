import * as DataTypes from "data/types";
import { PageHeader, Tabs, Typography, Empty, Button } from "antd";
import React from "react";
import ContentFeedView from "components/Views/ContentFeedView";
import {
  creatorsHubSearchReducer,
  creatorsHubSearchStateInit,
  CreatorsHubSearchStateActionTypes,
} from "./CreatorsHubSearchReducer";
import s from "./CreatorsHubSearch.module.scss";
import ContentTabs, { ContentTabsSizeType } from "components/ContentTabs";
import WhiteCard from "components/WhiteCard";
import { MarginType } from "data/styleTypes";

interface Props {
  contentSearchResults: Array<DataTypes.Content>;
  creatorSearchResults: Array<DataTypes.Creator>;
  viewlogsByResourceId: DataTypes.UserLatestViewlogs;
  searchText: string;
  loadMore: (currentPage: number) => void;
  hasMoreCreators: boolean;
  hasMoreContent: boolean;
}

const CreatorsHubSearchResultsView: React.FC<Props> = (props: Props) => {
  const [creatorsHubSearchResultsState, dispatch] = React.useReducer(
    creatorsHubSearchReducer,
    {
      activeTabKey: "1",
    },
    creatorsHubSearchStateInit,
  );

  const viewAllCreatorsLink = React.useMemo(() => {
    return creatorsHubSearchResultsState.activeTabKey === "1" ? (
      <div className={s.viewAllCreatorsLinkContainer}>
        <Button
          type="link"
          className={s.viewAllCreatorsLink}
          onClick={() =>
            dispatch({
              type: CreatorsHubSearchStateActionTypes.UPDATE_ACTIVE_TAB_KEY,
              activeTabKey: "5",
            })
          }
        >
          <Typography.Text className={s.viewAllCreatorsLinkText}>
            View all Creators
          </Typography.Text>
        </Button>
      </div>
    ) : null;
  }, [dispatch, creatorsHubSearchResultsState.activeTabKey]);

  const searchResultsView = (
    contentType: string,
    displayTitle: boolean,
    limitResults?: boolean,
  ) => {
    const results =
      contentType === "creator"
        ? props.creatorSearchResults
        : contentType === "all"
          ? props.contentSearchResults
          : props.contentSearchResults.filter(r => r.contentType === contentType);

    return results.length === 0 ? (
      <Empty
        className={s.noDataDefaultView}
        image={Empty.PRESENTED_IMAGE_DEFAULT}
      />
    ) : (
        <React.Fragment>
          {displayTitle ? (
            <Typography.Title
              level={4}
              style={{
                textAlign: "left",
                width: "75%",
                margin: "3rem 4vw 1rem 4vh",
                fontWeight: 500,
              }}
            >
              {contentType === "creator" ? "Creator Search Results" : "Content Search Results"}
            </Typography.Title>
          ) : null}
          <ContentFeedView
            title={""}
            creators={
              contentType === "creator"
                ? (results as Array<DataTypes.Creator>)
                : undefined
            }
            results={
              contentType !== "creator"
                ? (results as Array<DataTypes.Content>)
                : undefined
            }
            userLatestViewlogs={null}
            verticalOrientation={true}
            loadMore={props.loadMore}
            hasMore={
              limitResults
                ? false
                : contentType === "creator"
                  ? props.hasMoreCreators
                  : props.hasMoreContent
            }
            directToCreatorsHubRoutes={true}
            listClassName={s.creatorsHubSearchResultsList}
          />
          {contentType === "creator" && limitResults ? viewAllCreatorsLink : null}
        </React.Fragment>
      );
  };

  const allSearchResultsTabContent = React.useMemo(() => {
    if (props.creatorSearchResults.length > 0) {
      return <React.Fragment>
        {searchResultsView("creator", true, true)}
        {searchResultsView("all", true, false)}
      </React.Fragment>
    } else {
      return <React.Fragment>
        {searchResultsView("all", false, false)}
      </React.Fragment>
    }
  }, [
    props.creatorSearchResults,
    props.hasMoreContent,
    props.hasMoreCreators,
    props.contentSearchResults,
  ]);

  const resultsTabs = [
    {
      key: "1",
      tabName: "All",
      children: allSearchResultsTabContent,
    },
    {
      key: "2",
      tabName: "Collections",
      children: searchResultsView("mission", false),
    },
    {
      key: "3",
      tabName: "Playlists",
      children: searchResultsView("playlist", false),
    },
    {
      key: "4",
      tabName: "Videos",
      children: searchResultsView("resource", false),
    },
    {
      key: "5",
      tabName: "Creators from Your Collections",
      children: searchResultsView("creator", false),
    },
  ];

  return (
    <WhiteCard
      title={`Search results for “${props.searchText}”`}
      className={`${s.creatorsHubSearchResultsContainer}`}
      withMargin={MarginType.ALL}
      titleAndSubtitleAlignCenter
      withDefaultBodyPadding
    >
      <div className={s.contentTabsContaienr} style={{ width: "100%" }}>
        {" "}
        <ContentTabs
          tabContents={resultsTabs}
          defaultActiveKey={"1"}
          size={ContentTabsSizeType.LARGE}
          activeKey={creatorsHubSearchResultsState.activeTabKey}
          onTabChange={(activeKey: string) => {
            dispatch({
              type: CreatorsHubSearchStateActionTypes.UPDATE_ACTIVE_TAB_KEY,
              activeTabKey: activeKey,
            });
          }}
          centered
        />
      </div>
    </WhiteCard>
  );
};

export default CreatorsHubSearchResultsView;
