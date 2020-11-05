import * as DataTypes from "data/types";
import React from "react";
import { Button, Typography, Row, Col } from "antd";
import { MyAccountStateActionTypes } from "../MyAccountReducer";
import s from "../MyAccount.module.scss";
import MyAccountUpdatePaymentInfo from "./MyAccountUpdatePaymentInfo.react";

interface Props {
  currentBillingInfo: DataTypes.BillingInfo;
  onOpenModal: (actionType: string) => void;
  onCloseModal: () => void;
  showUpdatePaymentModal: boolean;
  currentUser?: DataTypes.User;
}

const MyAccountPayment: React.FC<Props> = (props: Props) => {
  const displayCardNumber =
    "**** **** **** " +
    (props.currentBillingInfo ? props.currentBillingInfo.last_four : "");

  const myAccountUpdatePaymentInfo = React.useMemo(
    () => (
      <MyAccountUpdatePaymentInfo
        showUpdatePaymentModal={props.showUpdatePaymentModal}
        onClose={props.onCloseModal}
        currentUser={props.currentUser}
        currentBillingInfo={props.currentBillingInfo}
      />
    ),
    [props.showUpdatePaymentModal],
  );

  return (
    <React.Fragment>
      <Row style={{ width: "100%" }}>
        <Col sm={6} xs={{ span: 24 }} style={{ marginTop: 10 }}>
          <Typography className={s.sectionTitle}> Payment</Typography>
        </Col>

        <Col
          sm={{ span: 14, offset: 3 }}
          xs={{ span: 20 }}
          style={{ marginTop: 10 }}
        >
          <Typography.Text type="secondary"> PAYMENT CARD</Typography.Text>
        </Col>

        <Col
          sm={{ span: 1, offset: 0 }}
          xs={{ span: 3, offset: 1 }}
          style={{ marginTop: 10 }}
        >
          <Button
            icon={"edit"}
            onClick={() =>
              props.onOpenModal(MyAccountStateActionTypes.OPEN_UPDATE_PAYMENT)
            }
          />
        </Col>
      </Row>
      <Row style={{ width: "100%" }}>
        <Col sm={{ offset: 9, span: 15 }} xs={{ span: 24 }}>
          <Typography.Text strong> {displayCardNumber} </Typography.Text>
        </Col>
      </Row>
      {myAccountUpdatePaymentInfo}
    </React.Fragment>
  );
};

export default MyAccountPayment;
