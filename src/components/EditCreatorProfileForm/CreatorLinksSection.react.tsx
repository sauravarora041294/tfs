import { Divider, Typography } from "antd";
import React from "react";
import s from "./EditCreatorProfileForm.module.scss";
import ProfileContentCardSection from "./ProfileContentCardSection.react";

interface Props {
  linkedinURL: string;
  resumeURL: string;
  didClickEdit: () => void;
}

const CreatorLinksSection: React.FC<Props> = (props: Props) => {
  return (
    <ProfileContentCardSection
      hideEditButton={false}
      sectionTitle={"MY LINKS"}
      didClickEdit={props.didClickEdit}
    >
      <Typography.Text className={s.creatorProfileLink}>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={`https://www.linkedin.com/in/${props.linkedinURL}`}
        >
          {"LinkedIn"}
        </a>
      </Typography.Text>
      <Divider type="vertical" className={s.linksDivider} />
      <Typography.Text className={s.creatorProfileLink}>
        <a target="_blank" rel="noopener noreferrer" href={props.resumeURL}>
          {"Resume"}
        </a>
      </Typography.Text>
    </ProfileContentCardSection>
  );
};

export default CreatorLinksSection;
