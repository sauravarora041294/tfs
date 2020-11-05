import { Card, Icon, Result } from "antd";
import React from "react";
import { Grid } from "semantic-ui-react";
import s from "./ResourceDetail.module.scss";

const NoContentInPlaylistView: React.FC = () => {
  return (
    <div className={s.creatorPendingApprovalRoot}>
      <Grid>
        <Grid.Column width={16}>
          <Card className={s.noContentInPlaylistCard}>
            <Result
              icon={<Icon type="frown" theme="twoTone" />}
              title={`There's no content in this playlist yet.`}
              subTitle={`Check again later! If there are specific pieces of content you would like to be added to this playlist, please reach out to us! We'll do our best to help.`}
            />
          </Card>
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default NoContentInPlaylistView;
