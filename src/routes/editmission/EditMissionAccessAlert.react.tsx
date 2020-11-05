import { Alert } from "antd";
import React from "react";
import s from "./EditMission.module.scss";

interface Props {
  isApprovedContributor: boolean;
  hasRequestedContributorPermission: boolean;
}

const EditMissionAccessAlert: React.FC<Props> = (props: Props) => {
  if (props.isApprovedContributor) {
    return null;
  } else if (
    !props.isApprovedContributor &&
    props.hasRequestedContributorPermission
  ) {
    return (
      <Alert
        message={`Your Request is Pending Approval`}
        description={`You have requested to become a contributor to this collection. Your request is currently being reviewed. Please check back again later`}
        type="warning"
        className={s.accessAlert}
      />
    );
  } else if (!props.isApprovedContributor) {
    return (
      <Alert
        message={`You are Not a Contributor for this Mission`}
        description={`You have not requested permission to become a contributor to this mission, so you cannot edit it.`}
        type="info"
        className={s.accessAlert}
      />
    );
  }
};

export default EditMissionAccessAlert;
