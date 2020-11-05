import { Typography } from "antd";
import React from "react";
import s from "./EditCreatorProfileForm.module.scss";
import ProfileContentCardSection from "./ProfileContentCardSection.react";

interface Props {
  venmoHandle: string;
  didClickEdit: () => void;
}

const CreatorPayoutSection: React.FC<Props> = (props: Props) => {
  return (
    <ProfileContentCardSection
      hideEditButton={false}
      sectionTitle={"PAYOUT INFO"}
      didClickEdit={props.didClickEdit}
    >
      <Typography.Text className={s.creatorProfileVenmoInformation}>
        {`My Venmo Handle: ${props.venmoHandle}`}
      </Typography.Text>
    </ProfileContentCardSection>
  );
};

export default CreatorPayoutSection;
