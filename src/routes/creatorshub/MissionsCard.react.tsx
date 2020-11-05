import { Input, Typography} from "antd";
import * as DataTypes from "data/types";
import * as Enums from "data/types/enums";
import React from "react";
import { withRouter } from "react-router";
import { compose } from "recompose";
import { History } from "history";
import s from "./CreatorsHub.module.scss";
import JoinContentCard from "components/JoinContentCard";
import ContentTabs, { ContentTabsSizeType } from "components/ContentTabs";
import WhiteCard from "components/WhiteCard";
import InfiniteScroll from "components/InfiniteScroll";

interface Props {
  history?: History;
  allMissions: Array<DataTypes.Mission>;
  allPlaylists: Array<DataTypes.Playlist>;
  openJoinMissionModal: (mission: Object) => void;
  currentUserId: String;
  pendingMissionContributorRequests: Array<any>;
  joinRequestInit?: (contentId: String, contentType: String) => void;
  hasMoreContentToJoin: {
    mission: boolean;
    playlist: boolean;
  };
  loadMoreContentToJoin: (contentType: Enums.CONTENT_TYPE) => void;
  onActiveTabKeyChange: (activeTabKey: string) => void;
  activeTabKey: string;
  setSearchText: (searchText: string) => void;
  searchText: string;
}

const MissionsCard: React.FC<Props> = (props: Props) => {
  const playlistsToJoinList = React.useMemo(() => {
    return props.allPlaylists.map(playlist => {
      const isPending = (playlist as any).isPending as boolean;
      return (
        <JoinContentCard
          history={props.history}
          playlist={playlist}
          isPendingPlaylistRequest={isPending}
          joinRequestInit={props.joinRequestInit}
        />
      );
    });
  }, [props.allPlaylists, props.history, props.joinRequestInit]);

  const missionsToJoinList = React.useMemo(() => {
    return props.allMissions.map(mission => {
      return (
        <JoinContentCard
          history={props.history}
          mission={mission}
          pendingMissionContributorRequests={
            props.pendingMissionContributorRequests
          }
          joinRequestInit={props.joinRequestInit}
        />
      );
    });
  }, [
    props.allMissions,
    props.history,
    props.pendingMissionContributorRequests,
    props.joinRequestInit,
  ]);

  const missionsToJoinView = React.useMemo(() => {
    return props.allMissions.length === 0 ? (
      <Typography.Text>
        {
          props.searchText 
            ? "No results" 
            : "There are no more collections left for you to join."
        }      
      </Typography.Text>
    ) : (
      missionsToJoinList
    );
  }, [
    props.allMissions,
    props.history,
    props.pendingMissionContributorRequests,
    props.joinRequestInit,
    missionsToJoinList,
    props.searchText
  ]);

  const playlistsToJoinView = React.useMemo(() => {
    return props.allPlaylists.length === 0 ? (
      <Typography.Text>
        {
          props.searchText 
            ? "No results" 
            : "There are no more playlists left for you to join."
        }
      </Typography.Text>
    ) : (
      playlistsToJoinList
    );
  }, [
    props.allPlaylists, 
    props.history, 
    props.joinRequestInit,
    playlistsToJoinList,     
    props.searchText
  ]);

  const modalTabs = [
    {
      key: "1",
      tabName: "Collection",
      children: (
        <InfiniteScroll
          hasMore={props.hasMoreContentToJoin.mission}
          loadMore={() => props.loadMoreContentToJoin(Enums.CONTENT_TYPE.MISSION)}
          isScrollable={true}
          horizontalOnMobile={false}
          height={950}
          className={s.contentToJoinList}
        >
          {missionsToJoinView}
        </InfiniteScroll>
      ),
    },
    {
      key: "2",
      tabName: "Playlists",
      children: (
        <InfiniteScroll
          hasMore={props.hasMoreContentToJoin.playlist}
          loadMore={() => props.loadMoreContentToJoin(Enums.CONTENT_TYPE.PLAYLIST)}
          isScrollable={true}
          horizontalOnMobile={false}
          height={950}
          className={s.contentToJoinList}
        >
          {playlistsToJoinView}
        </InfiniteScroll>
      ),
    },
  ];

  return (
    <WhiteCard
      title="Discover new Collections or Playlists"
      subTitle="Looking for more collaborative playlists and collections to contribute
    to? Check these out."
      smallSizeTitleAndSubtitle
      withDefaultBodyPadding
    >
      <Input.Search onSearch={props.setSearchText} placeholder="Filter.." />
      <br />
      <div className={s.toJoinTabWrapper}>
        <ContentTabs
          size={ContentTabsSizeType.LARGE}
          tabContents={modalTabs}
          defaultActiveKey={"1"}
          activeKey={props.activeTabKey}
          onTabChange={props.onActiveTabKeyChange}
        />
      </div>
    </WhiteCard>
  );
};

export default compose<Props, Props>(withRouter)(MissionsCard);
