import { Button, Card, Icon, Result, notification } from "antd";
import * as DataTypes from "data/types";
import React from "react";
import { withRouter } from "react-router";
import { compose } from "recompose";
import { Grid } from "semantic-ui-react";
import { History } from "history";
import s from "./CreatorPendingApproval.module.scss";
import {
  creatorPendingApprovalReducer,
  creatorPendingApprovalStateInit,
} from "./CreatorPendingApprovalReducer";
import pendingApprovalScreenImage from "assets/images/pendingApprovalScreenImage.svg";

interface Props {
  currentUser: DataTypes.Creator;
  history?: History;
  error?: Error;
}

const CreatorPendingApprovalView: React.FC<Props> = (props: Props) => {
  React.useReducer(
    creatorPendingApprovalReducer,
    {
      currentUser: props.currentUser,
    },
    creatorPendingApprovalStateInit,
  );

  return (
    <div className={s.creatorPendingApprovalRoot}>
      <div>
        <Card className={s.statusCard}>
          <Result
            icon={<img src={pendingApprovalScreenImage} />}
            title={`Thanks! We've received your information.`}
            subTitle={`We'll review your profile within the next few days. Once your profile is approved, you'll have full access to our CreatorsHub.`}
            extra={
              <Button
                type="primary"
                onClick={e => {
                  e.preventDefault();
                  props.history.push("/creator-pending-approval-edit-profile");
                }}
              >
                {"Edit Profile"}
              </Button>
            }
          />
        </Card>
      </div>
      {props.error &&
        notification.error({
          message: "Oops!",
          description:
            "Some content may not have loaded properly. We're working on fixing it.",
          placement: "bottomRight",
        })}
    </div>
  );
};

export default compose<Props, Props>(withRouter)(CreatorPendingApprovalView);
