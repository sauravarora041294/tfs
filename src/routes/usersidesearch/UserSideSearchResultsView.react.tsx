import { Empty } from "antd";
import ContentFeedView from "components/Views/ContentFeedView";
import * as DataTypes from "data/types";
import * as Enums from "data/types/enums";
import React from "react";
import s from "./UserSideSearch.module.scss";
import WhiteCard from "components/WhiteCard";
import ContentTabs from "components/ContentTabs";
import { MarginType } from "data/styleTypes";
import { tabKeyToContentType } from "./UserSideSearchUtil";
interface Props {
  contentSearchResults: {
    all: Array<DataTypes.Content>;
    mission: Array<DataTypes.Content>;
    playlist: Array<DataTypes.Content>;
    resource: Array<DataTypes.Content>;
  };
  userLatestViewlogs: DataTypes.UserLatestViewlogs;
  searchText: string;
  loadMore: (currentPage: number, contentType: Enums.CONTENT_TYPE) => void;
  hasMoreContent: {
    all: boolean;
    mission: boolean;
    playlist: boolean;
    resource: boolean;
  };
  numHits: number;
  activeTabKey: string;
  onTabChange: (activeTabKey: string) => void;
}

const noSearchResultsText = {
  all: "results",
  mission: "collections",
  playlist: "playlists",
  resource: "videos",
};

const UserSideSearchResultsView: React.FC<Props> = (props: Props) => {
  const searchResultsView = React.useMemo(() => {
    const contentType = tabKeyToContentType(props.activeTabKey);
    const results = props.contentSearchResults[contentType];
    return results.length === 0 ? (
      <Empty
        className={s.resultsNoData}
        description={`Did not find any matching ${noSearchResultsText[contentType]}`}
      />
    ) : (
      <ContentFeedView
        title={""}
        results={results}
        loadMore={(currentPage: number) =>
          props.loadMore(currentPage, contentType)
        }
        userLatestViewlogs={props.userLatestViewlogs}
        verticalOrientation={true}
        hasMore={props.hasMoreContent[contentType]}
        listClassName={s.cfvList}
      />
    );
  }, [
    props.activeTabKey,
    props.userLatestViewlogs,
    props.hasMoreContent,
    props.contentSearchResults,
  ]);

  const resultsTabs = [
    {
      key: "1",
      tabName: "All",
      children: searchResultsView,
    },
    {
      key: "2",
      tabName: "Collections",
      children: searchResultsView,
    },
    {
      key: "3",
      tabName: "Playlists",
      children: searchResultsView,
    },
    {
      key: "4",
      tabName: "Videos",
      children: searchResultsView,
    },
  ];

  return (
    <WhiteCard
      title={`Search results for “${props.searchText}”`}
      subTitle={`Found ${props.numHits} results for your search`}
      className={`${s.searchResultsView} searchResultsView`}
      withMargin={MarginType.ALL}
      titleAndSubtitleAlignCenter
      withDefaultBodyPadding
    >
      <ContentTabs
        tabContents={resultsTabs}
        defaultActiveKey={"1"}
        centered
        onTabChange={props.onTabChange}
        activeKey={props.activeTabKey}
      />
    </WhiteCard>
  );
};

export default UserSideSearchResultsView;
