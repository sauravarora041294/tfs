import { List, Empty } from "antd";
import * as DataTypes from "data/types";
import React from "react";
import LeaderboardListItem from "./LeaderboardListItem.react";
import PaginationItemRender from "components/PaginationItemRender";

interface Props {
  creators: Array<DataTypes.Creator>;
}

const LeaderboardList: React.FC<Props> = props => {
  return (
    <List
      locale={{
        emptyText: (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="The leaderboard appears empty"
          />
        ),
      }}
      itemLayout="vertical"
      size="large"
      pagination={{
        onChange: page => {},
        size: "small",
        pageSize: 7,
        itemRender: PaginationItemRender,
      }}
      dataSource={props.creators}
      renderItem={(item: DataTypes.User) => (
        <LeaderboardListItem creator={item} />
      )}
    />
  );
};

export default LeaderboardList;
