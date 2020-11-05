import React from "react";
import { Row, Col, Typography } from "antd";
import s from "./ErrorPage.module.scss";
import errorIcon from "assets/graphic404.svg";
import { ERROR_TYPES } from "data/types/enums";
const { Title } = Typography;

interface Props {
  error: string;
}

const getMessageByError = (error: string) => {
  switch (error) {
    case ERROR_TYPES.NOT_FOUND_ERROR:
      return "The server is taking too long to respond. Please try again later.";
    case ERROR_TYPES.TIMEOUT_ERROR:
      return "The server is taking too long to respond. Please try again later.";
    case ERROR_TYPES.NETWORK_ERROR:
      return "We can't seem to reach our server. Please try again later.";
    default:
      return "Something went wrong! Please try again later.";
  }
};

const ErrorPage = (props: Props) => {
  return (
    <div className={s.errorPageContainer}>
      <Row type="flex" align="middle" justify="center">
        <Col span={12}>
          <img
            alt={"Error Icon"}
            src={errorIcon}
            style={{ width: "100%", height: "100%" }}
          />
        </Col>
      </Row>
      <div
        style={{
          textAlign: "center",
          width: "300px",
          padding: "10",
          margin: "15px auto",
        }}
      >
        <Title level={4}>{getMessageByError(props.error)}</Title>
      </div>
    </div>
  );
};

export default ErrorPage;
