import { Button, Card, List, Typography } from "antd";
import * as DataTypes from "data/types";
import React from "react";
import s from "./EditMission.module.scss";
import EditMissionContributorsListItem from "./EditMissionContributorsListItem.react";
import WhiteCard from "components/WhiteCard";

interface Props {
  contributors: Array<DataTypes.User>;
  mission: DataTypes.Mission;
  isApprovedContributor: boolean;
  userIsCreator: boolean;
  currentUser: DataTypes.User;
  didClickBeginEditingContributors: () => void;
  didClickCancelEditingContributors: () => void;
  isEditingMissionContributors: boolean;
  showRemoveContributorModal: (contributor: DataTypes.User) => void;
}

const EditMissionContributorsList: React.FC<Props> = (props: Props) => {
  const sectionHeader = "Collection Contributors";

  const cancelEditingButton = (
    <Button
      onClick={() => props.didClickCancelEditingContributors()}
      className={s.cancelEditingButton}
    >
      Done
    </Button>
  );

  const manageContributorsButton = (
    <Button
      disabled={!(props.contributors.length > 1)}
      icon={"edit"}
      onClick={() => props.didClickBeginEditingContributors()}
    >
      Manage
    </Button>
  );

  const extra = props.isEditingMissionContributors
    ? cancelEditingButton
    : manageContributorsButton;

  const extraItem = props.userIsCreator && props.contributors.length && extra;
  return (
    <WhiteCard
      className={s.missionContributorsListCard}
      title={
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          {sectionHeader}
          {extraItem}
        </div>
      }
      customBodyPaddingValues={{
        top: "0rem",
        bottom: "0rem",
        left: "1rem",
        right: "1rem",
      }}
      subTitle=""
      smallSizeTitleAndSubtitle
    >
      <List
        loading={false}
        itemLayout="horizontal"
        dataSource={props.contributors}
        locale={{
          emptyText: "No one has added a video to this collection yet.",
        }}
        renderItem={contributor => (
          <EditMissionContributorsListItem
            showRemoveContributorModal={props.showRemoveContributorModal}
            showEditMissionContributorsCard={props.isEditingMissionContributors}
            userIsContributor={
              props.currentUser.userId === contributor.objectID
            }
            contributor={contributor}
            isMissionAdmin={
              props.mission.creatorUserId === contributor.objectID
            }
          />
        )}
      />
    </WhiteCard>
  );
};

export default EditMissionContributorsList;
