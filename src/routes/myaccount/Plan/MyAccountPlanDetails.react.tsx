import * as DataTypes from "data/types";
import React from "react";
import { Modal, Button, Row, Col, Typography, Alert } from "antd";
import s from "../MyAccount.module.scss";
import { MyAccountStateActionTypes } from "../MyAccountReducer";
import MyAccountUpdatePlan from "./MyAccountUpdatePlan.react";
import moment from "moment";

interface Props {
  currentSubscription: DataTypes.SubscriptionAccount;
  showUpdatePlanModal: boolean;
  showCancelMembershipModal: boolean;
  onCancelSubscription: (e) => Promise<void>;
  onCloseModal: () => void;
  onOpenModal: (actionType: string) => void;
}

const MyAccountPlanDetails: React.FC<Props> = (props: Props) => {
  const planDescription = React.useMemo(
    () =>
      props.currentSubscription ? props.currentSubscription.plan.name : "",
    [props.currentSubscription],
  );
  const planPrice = React.useMemo(
    () =>
      props.currentSubscription
        ? props.currentSubscription.plan.plan_code === "tfs_monthly"
          ? "$18 per month"
          : "$180 annually"
        : "",
    [props.currentSubscription],
  );

  const myAccountUpdatePlan = React.useMemo(
    () => (
      <MyAccountUpdatePlan
        planCode={props.currentSubscription.plan.plan_code}
        showUpdatePlanModal={props.showUpdatePlanModal}
        onClose={props.onCloseModal}
        currentSubscription={props.currentSubscription}
      />
    ),
    [props.showUpdatePlanModal],
  );

  const alertPendingSubscriptionChange = React.useMemo(() => {
    return props.currentSubscription.pending_subscription ? (
      <Alert
        className={s.pendingSubscriptionChangeAlert}
        message="Pending Subscription Change"
        description={`You have updated your subscription to our "${
          props.currentSubscription.pending_subscription.plan.name
          }" plan. This change will take effect at the end of your current plan's billing cycle on ${moment(
            props.currentSubscription.current_term_ends_at,
          ).format("MM/DD/YYYY")}.`}
        type="info"
        showIcon
      />
    ) : null;
  }, [props.currentSubscription]);

  const alertPendingSubscriptionCancellation = React.useMemo(() => {
    return props.currentSubscription.state === "canceled" ? (
      <Alert
        className={s.pendingSubscriptionChangeAlert}
        message="Subscription Cancelled"
        description={`You have cancelled your subscription to our "${
          props.currentSubscription.plan.name
          }" plan. This change will take effect at the end of your billing cycle on ${moment(
            props.currentSubscription.current_term_ends_at,
          ).format("MM/DD/YYYY")}.`}
        type="warning"
        showIcon
      />
    ) : null;
  }, [props.currentSubscription]);

  return (
    <React.Fragment>
      <Row style={{ width: "100%" }}>
        <Col sm={6} xs={24} style={{ marginTop: 10 }}>
          <Typography className={s.sectionTitle}> Plan Details</Typography>
        </Col>
        <Col
          sm={{ span: 14, offset: 3 }}
          xs={{ span: 20, offset: 0 }}
          style={{ marginTop: 10 }}
        >
          <Typography.Text type="secondary" strong>
            {" "}
            {planDescription.toUpperCase()}{" "}
          </Typography.Text>
        </Col>
        <Col
          sm={{ span: 1, offset: 0 }}
          xs={{ span: 3, offset: 1 }}
          style={{ marginTop: 10 }}
        >
          <Button
            icon={"edit"}
            onClick={() =>
              props.onOpenModal(MyAccountStateActionTypes.OPEN_UPDATE_PLAN)
            }
          />
        </Col>
      </Row>

      <Row style={{ width: "100%", marginTop: "10px" }}>
        <Col sm={{ span: 6, offset: 9 }} xs={24}>
          <Typography.Text strong className={s.planPriceText}>
            {" "}
            {planPrice}
          </Typography.Text>
        </Col>
      </Row>
      <Row style={{ width: "100%", marginTop: "20px" }}>
        <Col sm={{ offset: 9 }} xs={{ offset: 0 }}>
          {props.currentSubscription.state !== "canceled" ? (
            <Button
              className={s.cancelMemberShipButton}
              onClick={() =>
                props.onOpenModal(
                  MyAccountStateActionTypes.OPEN_CANCEL_MEMBERSHIP,
                )
              }
            >
              Cancel Membership
            </Button>
          ) : (
              <Button
                style={{ whiteSpace: "normal", padding: "15px", height: "auto" }}
                disabled={true}
              >
                Membership cancelled or expired
            </Button>
            )}
        </Col>
      </Row>
      {alertPendingSubscriptionChange}
      {alertPendingSubscriptionCancellation}
      {myAccountUpdatePlan}
      <Modal
        footer={null}
        title="Cancel Membership"
        className={s.myAccountCancelMembershipModal}
        onCancel={props.onCloseModal}
        visible={props.showCancelMembershipModal}
        width={520}
        style={{ maxWidth: "95vw " }}
      >
        {`Are you sure you want to cancel your membership?`}
        <br />
        <br />
        {`Upon cancellation, you will no longer have access to your account after your current subscription term ends on ${moment(
          props.currentSubscription.current_term_ends_at,
        ).format("MM/DD/YYYY")}.`}
        <Button
          type="primary"
          block
          className={s.updateProfileInfoFormSubmitButton}
          onClick={props.onCancelSubscription}
        >
          Confirm
        </Button>
      </Modal>
    </React.Fragment>
  );
};

export default MyAccountPlanDetails;
