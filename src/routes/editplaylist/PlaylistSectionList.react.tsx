import { Button, Form, List, PageHeader, Typography } from "antd";
import * as DataTypes from "data/types";
import React, { MutableRefObject } from "react";
import s from "./EditPlaylist.module.scss";
import EditPlaylistSectionCondensedForm from "./EditPlaylistSectionCondensedForm.react";
import VideoListItem from "./VideoListItem.react";
import WhiteCard from "components/WhiteCard";
import { castFormToRefForwardingComponent } from "utilities/index";

interface Props {
  currentUser: DataTypes.Creator;
  playlist: DataTypes.Playlist;
  section: DataTypes.Section;
  resources: Array<DataTypes.Resource>;
  didClickEditSection: (section: Object) => void;
  didClickSaveAfterEdittingSection: (
    section: Object,
    formRef: MutableRefObject<any>,
  ) => Promise<void>;
  didClickCancelEdittingSection: (section: Object) => void;
  openAddVideoToSectionModal: (resource: Object) => void;
  openRemoveVideoModal: (resource: DataTypes.Resource, section: Object) => void;
  openEditVideoModal: (resource: DataTypes.Resource) => void;
  didClickViewResource: (resource: DataTypes.Resource) => void;
  shiftResourceUp: (string, number) => void;
  shiftResourceDown: (string, number) => void;
  didClickDeleteSection: (section: Object) => void;
  isEditing: boolean;
  isSaving: boolean;
  isApprovedContributor: boolean;
  index: number;
}

const PlaylistSectionList: React.FC<Props> = (props: Props) => {
  const sectionFormRef = React.useRef();
  const SectionForm = Form.create({ name: "playlistsectioncondendsed" })(
    React.forwardRef(castFormToRefForwardingComponent(EditPlaylistSectionCondensedForm)),
  );

  const finishEditingButton = (
    <Button
      key={"save"}
      icon={"save"}
      onClick={() =>
        props.didClickSaveAfterEdittingSection(props.section, sectionFormRef)
      }
      type={"primary"}
      className={s.finishEditingButton}
      loading={props.isSaving}
    >
      Save
    </Button>
  );

  const editSectionButton = (
    <Button
      key={"edit"}
      icon={"edit"}
      onClick={() => props.didClickEditSection(props.section)}
      disabled={!props.isApprovedContributor}
    ></Button>
  );

  const cancelEditingButton = (
    <Button
      key={"cancel"}
      icon={"cancel"}
      onClick={() => props.didClickCancelEdittingSection(props.section)}
      className={s.cancelEditingButton}
    >
      Cancel
    </Button>
  );

  const deleteSectionButton = (
    <Button
      key={"delete"}
      onClick={() => props.didClickDeleteSection(props.section)}
      className={s.deleteSectionButton}
      type={"link"}
    >
      Delete
    </Button>
  );

  const notEditingSectionHeaderExtra =
    props.currentUser.objectID === props.playlist.creatorUserId
      ? [editSectionButton]
      : [];

  const notEditingSectionHeader = (
    <PageHeader
      backIcon={false}
      onBack={() => { }}
      title={`Section ${props.index + 1}: ${props.section.title}`}
      subTitle=""
      extra={notEditingSectionHeaderExtra}
      className={s.sectionHeader}
    >
      <Typography.Paragraph className={s.sectionDescription}>
        {props.section.description}
      </Typography.Paragraph>
    </PageHeader>
  );

  const editingSectionHeader = (
    <PageHeader
      backIcon={false}
      onBack={() => { }}
      title={`Editing Section ${props.index + 1}`}
      subTitle=""
      extra={[deleteSectionButton, cancelEditingButton, finishEditingButton]}
      className={s.sectionHeader}
    >
      <SectionForm
        {...{ ref: sectionFormRef, initialFormData: props.section }}
      />
    </PageHeader>
  );

  const sectionFooter = React.useMemo(() => {
    return (
      props.isApprovedContributor && (
        <Button
          key={"addvideo"}
          icon={"file-add"}
          onClick={() => props.openAddVideoToSectionModal(props.section)}
          type={"dashed"}
          block
          className={s.addVideoButton}
        >
          Add Video
        </Button>
      )
    );
  }, [props.openAddVideoToSectionModal, props.isApprovedContributor]);

  return (
    <WhiteCard
      smallSizeTitleAndSubtitle
      title={props.isEditing ? editingSectionHeader : notEditingSectionHeader}
      subTitle=""
      className={s.playlistSectionListContainer}
      key={props.index}
      customBodyPaddingValues={{
        top: "1rem",
        bottom: "1rem",
        left: "2rem",
        right: "2rem",
      }}
    >
      <List
        loading={false}
        itemLayout="horizontal"
        loadMore={<div />}
        dataSource={props.resources}
        // header={
        //   props.isEditing ? editingSectionHeader : notEditingSectionHeader
        // }
        locale={{
          emptyText: "No Videos",
        }}
        footer={sectionFooter}
        renderItem={(resource, index) => (
          <VideoListItem
            playlistCreatorUserId={props.playlist.creatorUserId}
            key={index}
            length={props.resources.length}
            index={index}
            resource={resource}
            openRemoveVideoModal={props.openRemoveVideoModal}
            openEditVideoModal={props.openEditVideoModal}
            section={props.section}
            shiftResourceUp={props.shiftResourceUp}
            shiftResourceDown={props.shiftResourceDown}
            showShiftButtons={true}
            currentUser={props.currentUser}
            didClickViewResource={props.didClickViewResource}
          />
        )}
      />
    </WhiteCard>
  );
};

export default PlaylistSectionList;
