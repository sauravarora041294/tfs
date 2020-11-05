import { PageHeader, Tabs, Typography, Empty, Col } from "antd";
import ContentFeedView from "components/Views/ContentFeedView";
import ContentTabs from "components/ContentTabs";
import * as DataTypes from "data/types";
import React from "react";
import s from "./Mission.module.scss";
import { tabKeyToContentType } from "./MissionUtil";
import MissionSearchBarReact from "./MissionSearchBar.react";

interface Props {
  userLatestViewlogs: DataTypes.UserLatestViewlogs;
  searchText: string;
  isPublic: boolean;
  results: {
    all: Array<DataTypes.Content>;
    playlist: Array<DataTypes.Content>;
    resource: Array<DataTypes.Content>;
  };
  loadMore: (contentType: string) => void;
  hasMore: boolean;
  mission: DataTypes.Mission;
  activeTabKey: string;
  onTabChange: (activeTabKey: string) => void;
}

const MissionSearchResultsView: React.FC<Props> = (props: Props) => {
  const [scrolledOnce, setScrolledFlag] = React.useState(false);
  const searchResultsContainerRef = React.useRef(null);
  const getOffsetTop = element => {
    let offsetTop = 0;
    while (element) {
      offsetTop += element.offsetTop;
      element = element.offsetParent;
    }
    return offsetTop;
  };

  const scrollToSearchResults = ref => {
    setTimeout(() => {
      window.scrollTo({
        top: getOffsetTop(ref.current),
        behavior: "smooth",
      });
    }, 100);
  };

  React.useEffect(() => {
    if (searchResultsContainerRef && !scrolledOnce) {
      scrollToSearchResults(searchResultsContainerRef);
      setScrolledFlag(true);
    }
  }, [searchResultsContainerRef.current]);

  const searchResultsView = React.useMemo(() => {
    const contentType = tabKeyToContentType(props.activeTabKey)
    const results = props.results[contentType]

    return results.length === 0 ? (
      <Empty
        className={s.resultsNoData}
        description={"No results matched your search"}
      />
    ) : (
        <ContentFeedView
          title={""}
          results={results}
          loadMore={() => props.loadMore(contentType)}
          userLatestViewlogs={props.userLatestViewlogs}
          verticalOrientation={true}
          hasMore={props.hasMore}
          isPublic={props.isPublic}
          listClassName={s.searchResultsCFVList}
        />
      );
  }, [props.activeTabKey, props.results, props.loadMore, props.userLatestViewlogs, props.hasMore, props.isPublic]);

  const firstTabContent = <Col span={24}>{searchResultsView}</Col>;
  const secondTabContent = <Col span={24}>{searchResultsView}</Col>;
  const thirdTabContent = <Col span={24}>{searchResultsView}</Col>;

  const tabContents = [
    {
      tabName: "All",
      key: "1",
      children: firstTabContent,
    },
    {
      tabName: "Playlists",
      key: "2",
      children: secondTabContent,
    },
    {
      tabName: "Videos",
      key: "3",
      children: thirdTabContent,
    },
  ];

  return (
    <div className={s.searchResultsView} ref={searchResultsContainerRef}>
      <ContentTabs
        defaultActiveKey="1"
        style={{ background: "white" }}
        extraContent={
          <MissionSearchBarReact
            missionId={props.mission.objectID}
            defaultSearchedText={props.searchText}
            isSearchFieldVisible={true}
          />
        }
        tabContents={tabContents}
        centered
        activeKey={props.activeTabKey}
        onTabChange={props.onTabChange}
      />
    </div>
  );
};

export default MissionSearchResultsView;
