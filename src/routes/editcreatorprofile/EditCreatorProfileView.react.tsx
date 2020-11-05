import EditCreatorProfileForm from "components/EditCreatorProfileForm";
import * as DataTypes from "data/types";
import React from "react";
import { withRouter } from "react-router";
import { compose } from "recompose";
import { Grid } from "semantic-ui-react";
import s from "./EditCreatorProfile.module.scss";
import {
  editCreatorProfileReducer,
  editCreatorProfileStateInit,
} from "./EditCreatorProfileReducer";

interface Props {
  currentUser: DataTypes.Creator;
  error?: Error;
}

const EditCreatorProfileView: React.FC<Props> = (props: Props) => {
  const [editCreatorProfileState] = React.useReducer(
    editCreatorProfileReducer,
    {
      currentUser: props.currentUser,
    },
    editCreatorProfileStateInit,
  );
  return (
    <div className={s.editCreatorProfileRoot}>
      <Grid>
        <Grid.Column width={16}>
          <EditCreatorProfileForm
            currentUser={editCreatorProfileState.currentUser}
          />
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default compose<Props, Props>(withRouter)(EditCreatorProfileView);
