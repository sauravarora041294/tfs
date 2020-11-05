import * as DataTypes from "data/types";
import React from "react";
import { Card, Row, Col, Divider, Result, Typography, Icon } from "antd";
import s from "./MyAccount.module.scss";
import { onCancelSubscription } from "./MyAccountUtil";
import MyAccountPayment from "./Payment/MyAccountPayment.react";
import MyAccountPlanDetails from "./Plan/MyAccountPlanDetails.react";
import MyAccountProfileInfo from "./Profile/MyAccountProfileInfo.react";
import {
  myAccountInit,
  myAccountReducer,
  MyAccountStateActionTypes,
} from "./MyAccountReducer";

interface Props {
  currentUser: DataTypes.User;
  currentSubscription: DataTypes.SubscriptionAccount;
  currentBillingInfo: DataTypes.BillingInfo;
  error?: Error;
}
const MyAccountView: React.FC<Props> = (props: Props) => {
  const [myAccountState, dispatch] = React.useReducer(
    myAccountReducer,
    {},
    myAccountInit,
  );

  const onOpenModalHandler = (actionType: MyAccountStateActionTypes) => {
    dispatch({ type: actionType });
  };

  const onCloseModalHandler = () => {
    dispatch({
      type: MyAccountStateActionTypes.CLOSE_MODAL,
      data: myAccountState,
    });
  };
  const cancelMembershipHandler = async e => {
    e.preventDefault();
    const result = await onCancelSubscription(props.currentSubscription.uuid);
    if (!result.errors) {
      window.location.reload();
    }
  };
  const myAccountProfileInfo = React.useMemo(
    () => (
      <MyAccountProfileInfo
        currentUser={props.currentUser}
        showUpdateProfileModal={myAccountState.showUpdateProfileModal}
        onCloseModal={onCloseModalHandler}
        onOpenModal={onOpenModalHandler}
      />
    ),
    [myAccountState.showUpdateProfileModal],
  );

  const myAccountPayment = React.useMemo(
    () => (
      <MyAccountPayment
        currentBillingInfo={props.currentBillingInfo}
        showUpdatePaymentModal={myAccountState.showUpdatePaymentModal}
        currentUser={props.currentUser}
        onCloseModal={onCloseModalHandler}
        onOpenModal={onOpenModalHandler}
      />
    ),
    [myAccountState.showUpdatePaymentModal],
  );
  const myAccountPlanDetails = React.useMemo(
    () => (
      <MyAccountPlanDetails
        currentSubscription={props.currentSubscription}
        showUpdatePlanModal={myAccountState.showUpdatePlanModal}
        showCancelMembershipModal={myAccountState.showCancelMembershipModal}
        onCancelSubscription={cancelMembershipHandler}
        onCloseModal={onCloseModalHandler}
        onOpenModal={onOpenModalHandler}
      />
    ),
    [
      myAccountState.showUpdatePlanModal,
      myAccountState.showCancelMembershipModal,
    ],
  );

  const myAccountView = React.useMemo(() => {
    return props.error ? (
      <Card className={s.myAccountCard}>
        <Result
          status="error"
          title="Something went wrong."
          subTitle={
            "There is an issue with your subscription. We are working to resolve this issue as soon as possible."
          }
        ></Result>
      </Card>
    ) : (
      <Card className={s.myAccountCard}>
        <div className={s.myAccountCardGrid}>
          <Row className={s.myAccountCardGridRow}>
            <Col span={24}>
              <div className={s.myAccountCardTitle}>My Account</div>
            </Col>
          </Row>
          <Divider style={{ margin: "0" }} />
          <Row className={s.myAccountCardGridRow}>
            <Col span={24}>{myAccountProfileInfo}</Col>
          </Row>
          <Divider style={{ margin: "0" }} />
          <Row className={s.myAccountCardGridRow}>
            <Col span={24}>{myAccountPayment}</Col>
          </Row>
          <Divider style={{ margin: "0" }} />
          <Row className={s.myAccountCardGridRow}>
            <Col span={24}>{myAccountPlanDetails}</Col>
          </Row>
        </div>
      </Card>
    );
  }, [
    props.currentUser,
    props.error,
    myAccountState,
    myAccountProfileInfo,
    myAccountPayment,
    myAccountPlanDetails,
  ]);

  return (
    <React.Fragment>
      <div className={s.myAccountRoot}>
        <div className={s.myAccountCardContainer}>{myAccountView}</div>
      </div>
    </React.Fragment>
  );
};

export default MyAccountView;
