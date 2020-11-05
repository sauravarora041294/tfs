import { Button, Card, Typography } from "antd";
import React from "react";
import s from "./SignupOverlay.module.scss";
import { Link } from "react-router-dom";
import TypographyTitle, {
  TypographyTitleType,
} from "components/AaspireBasicComponents/Typography/TypographyTitle";
interface Props {
  show: boolean;
  block?: boolean;
}

const SignupOverlay = (props: Props) =>
  props.show ? (
    <React.Fragment>
      {!props.block && <div className={s.signupOverlayFade} />}
      <div
        className={
          props.block ? s.signupOverlayContainerBlock : s.signupOverlayContainer
        }
      >
        <Card>
          <TypographyTitle type={TypographyTitleType.CARD_SUB_TITLE}>
            Sign in or get started for full access.
          </TypographyTitle>
          <Typography.Paragraph>
            Become a member of The Future School now to unlock all of the
            content in this collection and access high-quality videos and
            playlists.
          </Typography.Paragraph>
          <Link to={`/signup?redirect=${window.location.pathname}`}>
            <Button type="primary" size="large">
              Get started
            </Button>
          </Link>
        </Card>
      </div>
    </React.Fragment>
  ) : null;

export default SignupOverlay;
