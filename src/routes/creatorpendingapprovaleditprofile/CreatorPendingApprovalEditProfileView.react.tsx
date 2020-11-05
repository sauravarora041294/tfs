import EditCreatorProfileForm from "components/EditCreatorProfileForm";
import * as DataTypes from "data/types";
import React from "react";
import { Grid } from "semantic-ui-react";
import s from "./CreatorPendingApprovalEditProfile.module.scss";
import {
  creatorPendingApprovalEditProfileReducer,
  creatorPendingApprovalEditProfileStateInit,
} from "./CreatorPendingApprovalEditProfileReducer";

interface Props {
  currentUser: DataTypes.Creator;
  error?: Error;
}

const CreatorPendingApprovalEditProfileView: React.FC<Props> = (
  props: Props,
) => {
  const [creatorPendingApprovalEditProfileState, dispatch] = React.useReducer(
    creatorPendingApprovalEditProfileReducer,
    {
      currentUser: props.currentUser,
    },
    creatorPendingApprovalEditProfileStateInit,
  );

  return (
    <div className={s.creatorPendingApprovalEditProfileRoot}>
      <Grid>
        <Grid.Column width={16} className={s.editCreatorProfileFormContainer}>
          <EditCreatorProfileForm
            currentUser={creatorPendingApprovalEditProfileState.currentUser}
          />
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default CreatorPendingApprovalEditProfileView;
