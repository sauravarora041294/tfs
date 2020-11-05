import { Alert, Button, Card, Result, Icon } from "antd";
import React from "react";
import s from "./EditPlaylist.module.scss";
import * as DataTypes from "data/types";
import { Grid } from "semantic-ui-react";
import { withRouter } from "react-router";
import { compose } from "recompose";
import { History, Location } from "history";

interface Props {
  isApprovedContributor: boolean;
  hasRequestedContributorPermission: boolean;
  playlist: DataTypes.Playlist;
  history?: History;
  location?: Location;
}

const EditPlaylistAccessAlert: React.FC<Props> = (props: Props) => {
  if (props.isApprovedContributor) {
    return null;
  } else if (
    !props.isApprovedContributor &&
    props.hasRequestedContributorPermission &&
    props.playlist.isCollaborative
  ) {
    return (
      <Alert
        message={`Your Request is Pending Approval`}
        description={`You have requested to become a contributor to this playlist. Your request is currently being reviewed. Please check back again later`}
        type="warning"
        className={s.accessAlert}
      />
    );
  } else if (!props.isApprovedContributor && props.playlist.isCollaborative) {
    return (
      <Alert
        message={`You are Not a Contributor for this Playlist`}
        description={`You have not requested permission to become a contributor to this playlist, so you cannot edit it.`}
        type="info"
        className={s.accessAlert}
      />
    );
  } else if (!props.isApprovedContributor && !props.playlist.isCollaborative) {
    const subdomain = process.env.NODE_ENV === "production" ? "www." : "";
    return (
      <Grid style={{ margin: "0 auto", width: "100%" }}>
        <Grid.Column width={16} style={{ padding: 0 }}>
          <Card className={s.statusCard}>
            <Result
              icon={<Icon type="warning" theme="twoTone" />}
              title={`Sorry, this playlist is not collaborative.`}
              subTitle={`It seems like the owner of this playlist has not made it collaborative.  
                            You can still view this playlist on the user side`}
              extra={
                <Button
                  type="primary"
                  onClick={e => {
                    e.preventDefault();
                    window.open(
                      `${window.location.origin.replace(
                        "creators.",
                        subdomain,
                      )}/playlist/${props.playlist.objectID}`,
                      "_blank",
                    );
                  }}
                >
                  {"View Playlist"}
                </Button>
              }
            />
          </Card>
        </Grid.Column>
      </Grid>
    );
  }
};

export default compose<Props, Props>(withRouter)(EditPlaylistAccessAlert);
