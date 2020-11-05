import { Typography } from "antd";
import Avatar from "components/Avatar";
import * as DataTypes from "data/types";
import React from "react";
import s from "./EditCreatorProfileForm.module.scss";

interface Props {
  currentUser: DataTypes.Creator;
}

const CreatorBasicDetailsSection: React.FC<Props> = (props: Props) => {
  return (
    <div className={s.profileHeader}>
      <div className={s.profileAvatarContainer}>
        <Avatar
          user={props.currentUser}
          fitParent={true}
          size={75}
          className={s.profileAvatar}
        />
      </div>
      <div className={s.profileHeaderTextContainer}>
        <Typography.Paragraph className={s.creatorProfileName}>
          {`${props.currentUser.firstName} ${props.currentUser.lastName}`}
        </Typography.Paragraph>
        <Typography.Paragraph className={s.creatorProfileRoleTitle}>
          {props.currentUser.creatorDetails.title}
        </Typography.Paragraph>
        <Typography.Paragraph className={s.creatorProfileCompany}>
          {props.currentUser.creatorDetails.company}
        </Typography.Paragraph>
      </div>
    </div>
  );
};

export default CreatorBasicDetailsSection;
