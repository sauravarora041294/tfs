import { Card } from "antd";
import * as DataTypes from "data/types";
import React from "react";
import s from "./MyContent.module.scss";
import MyContentContentTable from "./MyContentContentTable.react";
import ContentTabs from "components/ContentTabs";
import WhiteCard from "components/WhiteCard";

enum Tabs {
  TAB1 = "tab1",
  TAB2 = "tab2",
  TAB3 = "tab3",
  TAB4 = "tab4",
}

interface Props {
  myMissions: Array<DataTypes.Mission>;
  myResources: Array<DataTypes.Resource>;
  myPlaylists: Array<DataTypes.Playlist>;
  didClickEditContent: (contentType: string, objectID: string) => void;
  didClickDeleteContent: (content: DataTypes.Content) => void;
  didClickViewContent: (contentType: string, objectID: string) => void;
  currentUser: DataTypes.Creator;
}

const MyContentCard: React.FC<Props> = (props: Props) => {
  const [activeTabKey, setActiveTabKey] = React.useState<string>("tab1");

  const missions = React.useMemo(() => {
    return props.myMissions.map(m => ({
      ...m,
      contentType: "mission",
      redirectURL: `/editcollection/${m.objectID}`,
      key: m.objectID,
    }));
  }, [props.myMissions]);

  const playlists = React.useMemo(() => {
    return props.myPlaylists.map(p => ({
      ...p,
      contentType: "playlist",
      redirectURL: `/editplaylist/${p.objectID}`,
      key: p.objectID,
    }));
  }, [props.myPlaylists]);

  const resources = React.useMemo(() => {
    return props.myResources.map(r => ({
      ...r,
      contentType: "resource",
      redirectURL: `/editvideo/${r.objectID}`,
      key: r.objectID,
    }));
  }, [props.myResources]);

  const allContent = React.useMemo(() => {
    return (missions as Array<
      DataTypes.Mission | DataTypes.Playlist | DataTypes.Resource
    >)
      .concat(playlists)
      .concat(resources);
  }, [missions, playlists, resources]);

  const contentResults = React.useMemo(() => {
    switch (activeTabKey) {
      case Tabs.TAB1:
        return allContent;
      case Tabs.TAB2:
        return missions;
      case Tabs.TAB3:
        return playlists;
      case Tabs.TAB4:
        return resources;
      default:
        return [];
    }
  }, [
    activeTabKey,
    props.myPlaylists,
    props.myResources,
    missions,
    allContent,
  ]);
  const tableContent = React.useMemo(
    () => (
      <MyContentContentTable
        results={contentResults}
        didClickEditContent={props.didClickEditContent}
        didClickDeleteContent={props.didClickDeleteContent}
        didClickViewContent={props.didClickViewContent}
        currentUser={props.currentUser}
      />
    ),
    [
      contentResults,
      props.didClickDeleteContent,
      props.didClickViewContent,
      props.currentUser,
      props.didClickEditContent,
    ],
  );

  const tabContents = [
    {
      key: Tabs.TAB1,
      tabName: "All",
      children: tableContent,
    },
    {
      key: Tabs.TAB2,
      tabName: "Collections",
      children: tableContent,
    },
    {
      key: Tabs.TAB3,
      tabName: "Playlists",
      children: tableContent,
    },
    {
      key: Tabs.TAB4,
      tabName: "Videos",
      children: tableContent,
    },
  ];
  return (
    <div className={s.rightHandSectionCard}>
      <ContentTabs
        onTabChange={key => setActiveTabKey(key)}
        activeKey={activeTabKey}
        defaultActiveKey="1"
        tabContents={tabContents}
      ></ContentTabs>
    </div>
  );
};

export default MyContentCard;
