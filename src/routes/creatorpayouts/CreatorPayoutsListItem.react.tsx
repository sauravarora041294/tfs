import { List, Statistic, Typography, Button, Input, Form } from "antd";
import { Creator } from "data/types";
import React from "react";
import s from "./CreatorPayouts.module.scss";
import CreatorAvatar from "components/CreatorAvatar";

interface Props {
  creator: Creator;
  index?: number;
  handleCreatorPayout: (
    userId: string,
    stripeAccountId: string,
    amount: number,
  ) => void;
  handleCreatorAmountChange: (userId: string, amount: number) => void;
  transferringMoneyTo: { userId: string; amount: number };
  transferError: {
    userId: string;
    message: string;
  };
}

const CreatorPayoutsListItem: React.FC<Props> = (props: Props) => {
  return (
    <List.Item
      className={s.creatorpayoutsListItem}
      key={props.creator.email}
      style={{
        display: "flex",
      }}
    >
      <Typography.Text className={s.creatorRank}>
        {props.creator.rank}
      </Typography.Text>
      <div className={s.profileAvatarContainer}>
        <CreatorAvatar
          large
          showCreatorDescription
          creator={props.creator}
        ></CreatorAvatar>
      </div>
      <div className={s.pointsContainer}>
        <Form layout="inline">
          <Form.Item
            label="Edit Amount"
            labelAlign="left"
            validateStatus={
              props.transferError
                ? props.transferError.userId === props.creator.userId
                  ? "error"
                  : null
                : null
            }
            help={
              props.transferError
                ? props.transferError.userId === props.creator.userId
                  ? props.transferError.message
                  : ""
                : ""
            }
          >
            <Input
              type="number"
              disabled={props.creator.isCurrentMonthPaid}
              prefix="$"
              onChange={e =>
                props.handleCreatorAmountChange(
                  props.creator.userId,
                  parseFloat(e.target.value),
                )
              }
              defaultValue={
                props.creator.currentMonthRevenue
                  ? props.creator.currentMonthRevenue.toFixed(2)
                  : 0.0
              }
              style={{ width: "150px" }}
            ></Input>
          </Form.Item>
          <Form.Item>
            <Button
              disabled={props.creator.isCurrentMonthPaid}
              size="large"
              loading={
                props.transferringMoneyTo
                  ? props.transferringMoneyTo.userId === props.creator.userId
                  : false
              }
              onClick={() =>
                props.handleCreatorPayout(
                  props.creator.userId,
                  props.creator.creatorDetails.stripeAccountId,
                  props.creator.currentMonthRevenue * 100, // convert to cents
                )
              }
              style={{
                fontSize: "1em",
                width: "111px",
              }}
            >
              {props.creator.isCurrentMonthPaid ? "Paid" : "Transfer"}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </List.Item>
  );
};

export default CreatorPayoutsListItem;
