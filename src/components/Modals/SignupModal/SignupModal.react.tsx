import React from "react";
import { Button, Modal, Typography, Row, Col } from "antd";
import { Link } from "react-router-dom";
import s from "./SignupModal.module.scss";

interface Props {
  show: boolean;
  onCancel: () => void;
  redirectTo?: string;
}

const SignupModal = (props: Props) => (
  <Modal visible={props.show} centered onCancel={props.onCancel} footer={null}>
    <Typography.Title level={3}>Continue learning.</Typography.Title>
    <Typography.Paragraph>
      Become a member of The Future School now to unlock all of the content and
      access high-quality collections, videos and playlists.
    </Typography.Paragraph>
    <Row type="flex" align="bottom" className={s.signupModalAuthContainer}>
      <Col span={6}>
        <Link
          to={`/signup?redirect=${props.redirectTo ||
            window.location.pathname}`}
        >
          <Button type="primary" size="large">
            Get started
          </Button>
        </Link>
      </Col>
      <Col offset={1} span={17}>
        <Typography.Paragraph className={s.signupModalLogin}>
          Already have an account?{" "}
          <Link
            to={`/login?redirect=${props.redirectTo ||
              window.location.pathname}`}
          >
            Login
          </Link>
        </Typography.Paragraph>
      </Col>
    </Row>
  </Modal>
);

export default SignupModal;
