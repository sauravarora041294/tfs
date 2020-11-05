import { List, Empty } from "antd";
import * as DataTypes from "data/types";
import React from "react";
import CreatorPayoutsListItem from "./CreatorPayoutsListItem.react";
import PaginationItemRender from "components/PaginationItemRender";

interface Props {
  creators: Array<DataTypes.Creator>;
  transferringMoneyTo: { userId: string; amount: number };
  handleCreatorPayout: (
    userId: string,
    stripeAccountId: string,
    amount: number,
  ) => void;
  transferError: {
    userId: string;
    message: string;
  };
  handleCreatorAmountChange: (userId: string, amount: number) => void;
}

const CreatorPayoutsList: React.FC<Props> = props => {
  return (
    <List
      locale={{
        emptyText: (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="The Creator Payouts List appears empty"
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
      renderItem={(item: DataTypes.CreatorWithRankMetadata) => (
        <CreatorPayoutsListItem
          creator={item}
          transferringMoneyTo={props.transferringMoneyTo}
          handleCreatorPayout={props.handleCreatorPayout}
          handleCreatorAmountChange={props.handleCreatorAmountChange}
          transferError={props.transferError}
        />
      )}
    />
  );
};

export default CreatorPayoutsList;
