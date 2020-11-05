import * as DataTypes from "data/types";
import React from "react";
import { Button, Row, Col, Typography } from "antd";
import s from "../MyAccount.module.scss";
import MyAccountUpdateProfileInfo from "./MyAccountUpdateProfileInfo.react";
import { MyAccountStateActionTypes } from "../MyAccountReducer";

interface Props {
  showUpdateProfileModal: Boolean;
  onCloseModal: VoidFunction;
  onOpenModal: (actionType: string) => void;
  currentUser: DataTypes.User;
}

const MyAccountProfileInfo: React.FC<Props> = (props: Props) => {
  const myAccountUpdateProfileInfo = React.useMemo(
    () => (
      <MyAccountUpdateProfileInfo
        showUpdateProfileModal={props.showUpdateProfileModal}
        onClose={props.onCloseModal}
        currentUser={props.currentUser}
      />
    ),
    [props.showUpdateProfileModal],
  );
  return (
    <React.Fragment>
      <Row style={{ width: "100%" }}>
        <Col sm={6} xs={24} style={{ marginTop: 15 }}>
          <Typography className={s.sectionTitle}> Profile Info</Typography>
        </Col>
        <Col sm={{ span: 15, offset: 3 }} xs={{ span: 24, offset: 0 }}>
          <Row style={{ width: "100%", marginTop: 15 }}>
            <Col sm={6} xs={10}>
              <Typography.Text type="secondary"> FIRST NAME </Typography.Text>
            </Col>
            <Col sm={{ span: 6, offset: 1 }} xs={{ span: 10, offset: 2 }}>
              <Typography.Text type="secondary"> LAST NAME </Typography.Text>
            </Col>
          </Row>
          <Row style={{ width: "100%" }}>
            <Col sm={6} xs={10}>
              <Typography.Text strong>
                {" "}
                {props.currentUser.firstName}
              </Typography.Text>
            </Col>
            <Col sm={{ span: 6, offset: 1 }} xs={{ span: 10, offset: 2 }}>
              <Typography.Text strong>
                {" "}
                {props.currentUser.lastName}
              </Typography.Text>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row style={{ width: "100%", marginTop: "20px" }}>
        <Col sm={{ span: 14, offset: 9 }} xs={{ span: 20 }}>
          <Typography.Text type="secondary"> EMAIL </Typography.Text>
        </Col>
        <Col sm={{ span: 1, offset: 0 }} xs={{ span: 3, offset: 1 }}>
          <Button
            icon={"edit"}
            onClick={() =>
              props.onOpenModal(MyAccountStateActionTypes.OPEN_UPDATE_PROFILE)
            }
          />
        </Col>
      </Row>

      <Row style={{ width: "100%" }}>
        <Col sm={{ span: 8, offset: 9 }} xs={{ span: 9, offset: 0 }}>
          <Typography.Text strong> {props.currentUser.email} </Typography.Text>
        </Col>
      </Row>
      {myAccountUpdateProfileInfo}
    </React.Fragment>
  );
};

export default MyAccountProfileInfo;
