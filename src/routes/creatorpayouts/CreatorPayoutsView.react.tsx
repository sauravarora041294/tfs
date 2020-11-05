import * as DataTypes from "data/types";
import React from "react";
import WhiteCard from "components/WhiteCard";
import {
  creatorPayoutsReducer,
  creatorPayoutsStateInit,
  CreatorPayoutsStateActionTypes,
} from "./CreatorPayoutsReducer";
import s from "./CreatorPayouts.module.scss";
import CreatorPayoutsList from "./CreatorPayoutsList.react";
import RESTAPIClient from "RESTAPIClient";

interface Props {
  creators: Array<DataTypes.Creator>;
  error?: Error;
}

const CreatorPayoutsView: React.FC<Props> = props => {
  const [creatorPayoutsState, dispatch] = React.useReducer(
    creatorPayoutsReducer,
    {
      creators: props.creators,
      transferringMoneyTo: null,
      transferError: null,
    },
    creatorPayoutsStateInit,
  );

  const handleCreatorAmountChange = (userId, amount) => {
    dispatch({
      type: CreatorPayoutsStateActionTypes.UPDATE_CREATOR_PAYOUT_AMOUNT,
      data: { userId, amount },
    });
  };

  const handleCreatorPayout = async (userId, stripeAccountId, amount) => {
    dispatch({
      type: CreatorPayoutsStateActionTypes.BEGIN_TRANSFER,
      data: { userId, amount },
    });
    const result = await RESTAPIClient.Creator.transferRevenueAmountToCreatorStripeAccount(
      userId,
      stripeAccountId,
      amount,
    );
    if (result.transferSuccess) {
      dispatch({
        type: CreatorPayoutsStateActionTypes.SUCCESSFULL_TRANSFER,
        data: { userId: result.userId },
      });
    } else {
      dispatch({
        type: CreatorPayoutsStateActionTypes.UNSUCCESSFULL_TRANSFER,
        error: { userId: result.userId, message: "Unsuccessful Transfer" },
      });
    }
  };

  return (
    <WhiteCard
      className={s.creatorpayoutsRoot}
      title="Creators Payments"
      subTitle="Here are the Future School Creators sorted by points earned & suggested revenue per employee this month calculated based on our formula."
    >
      <div className={s.creatorpayoutsCard}>
        <CreatorPayoutsList
          creators={creatorPayoutsState.creators}
          transferringMoneyTo={creatorPayoutsState.transferringMoneyTo}
          handleCreatorPayout={handleCreatorPayout}
          handleCreatorAmountChange={handleCreatorAmountChange}
          transferError={creatorPayoutsState.transferError}
        />
      </div>
    </WhiteCard>
  );
};

export default CreatorPayoutsView;
