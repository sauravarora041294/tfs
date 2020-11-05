import { Button, Typography } from "antd";
import React from "react";
import { Grid } from "semantic-ui-react";
import s from "./EditCreatorProfileForm.module.scss";

interface Props {
  children: JSX.Element | JSX.Element[];
  sectionTitle: string;
  didClickEdit: () => void;
  hideEditButton: boolean;
}

const ProfileContentCardSection: React.FC<Props> = (props: Props) => {
  const editButton = props.hideEditButton ? null : (
    <Button
      className={s.editProfileSectionButton}
      icon={"edit"}
      onClick={props.didClickEdit}
    />
  );

  return (
    <Grid.Row
      className={
        props.hideEditButton
          ? s.creatorProfileCardEditingSection
          : s.creatorProfileCardSection
      }
    >
      <div className={s.creatorProfileSectionHeader}>
        <Typography.Paragraph className={s.creatorProfileCardSectionTitle}>
          {props.sectionTitle}
        </Typography.Paragraph>
        {editButton}
      </div>
      <Typography.Text className={s.creatorProfileCardSectionContent}>
        {props.children}
      </Typography.Text>
    </Grid.Row>
  );
};

export default ProfileContentCardSection;
