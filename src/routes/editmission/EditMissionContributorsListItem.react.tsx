import * as DataTypes from "data/types";
import React from "react";
import { Button, List, Typography } from "antd";
import Avatar from "components/Avatar";
import s from "./EditMission.module.scss";
import CreatorProfilePopover from "components/CreatorProfilePopover";

interface Props {
  contributor: DataTypes.Creator;
  isMissionAdmin: boolean;
  userIsContributor: boolean;
  showEditMissionContributorsCard: boolean;
  showRemoveContributorModal: (contributor: DataTypes.User) => void;
}

const EditMissionContributorsListItem: React.FC<Props> = (props: Props) => {
  return (
    <List.Item
      className={s.listItem}
      extra={
        !props.userIsContributor && props.showEditMissionContributorsCard ? (
          <Button
            type="danger"
            onClick={() => props.showRemoveContributorModal(props.contributor)}
          >
            Remove
          </Button>
        ) : null
      }
    >
      <Avatar user={props.contributor} />
      <Typography.Paragraph className={s.resourceTitle}>
        <CreatorProfilePopover creator={props.contributor}>
          {props.isMissionAdmin
            ? `${props.contributor.firstName} ${props.contributor.lastName} (Admin)`
            : `${props.contributor.firstName} ${props.contributor.lastName}`}
        </CreatorProfilePopover>
      </Typography.Paragraph>
    </List.Item>
  );
};

export default EditMissionContributorsListItem;
