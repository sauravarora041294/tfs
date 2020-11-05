import { Typography } from "antd";
import React from "react";
import s from "./EditCreatorProfileForm.module.scss";
import ProfileContentCardSection from "./ProfileContentCardSection.react";

const CreatorSkillsList = ({ skills }) =>
  skills.map((skill, index) => (
    <div key={index}>
      <Typography.Paragraph className={s.creatorProfileSkillTitle}>
        {`${index + 1}. ${skill.title}`}
      </Typography.Paragraph>
      <Typography.Paragraph className={s.creatorProfileSkillJustification}>
        {skill.justification}
      </Typography.Paragraph>
    </div>
  ));

interface Props {
  skills: Array<Object>;
  didClickEdit: () => void;
}

const CreatorSkillsSection = (props: Props) => {
  return (
    <ProfileContentCardSection
      hideEditButton={false}
      sectionTitle={"MY SKILLS"}
      didClickEdit={props.didClickEdit}
    >
      <CreatorSkillsList skills={props.skills} />
    </ProfileContentCardSection>
  );
};

export default CreatorSkillsSection;
