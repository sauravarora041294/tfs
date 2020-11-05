import { Button, List, Typography, Menu, Dropdown, Icon } from "antd";
import logo from "assets/images/fbrocketlogo.png";
import * as DataTypes from "data/types";
import React from "react";
import { Button as SemanticButton, Image } from "semantic-ui-react";
import s from "./EditPlaylist.module.scss";
import { compose } from "recompose";
import { withRouter } from "react-router";
import { History, Location } from "history";

interface Props {
  currentUser: DataTypes.Creator;
  playlistCreatorUserId: string;
  resource: DataTypes.Resource;
  section: DataTypes.Section;
  openRemoveVideoModal: (resource: Object, section: Object) => void;
  openEditVideoModal: (resource: DataTypes.Resource) => void;
  didClickViewResource: (resource: DataTypes.Resource) => void;
  shiftResourceUp: (resourceId: string, sectionIndex: number) => void;
  shiftResourceDown: (resourceId: string, sectionIndex: number) => void;
  showShiftButtons: boolean;
  length: number;
  index: number;
  history?: History;
  location?: Location;
}

const VideoListItem: React.FC<Props> = (props: Props) => {
  const handleMoreButtonMenuClick = e => {
    switch (e.key) {
      case "view":
        props.didClickViewResource(props.resource);
        return;
      case "edit":
        props.history.push(`/editvideo/${props.resource.objectID}`);
        return;
      case "delete":
        props.openRemoveVideoModal(props.resource, props.section);
        return;
      default:
        return;
    }
  };

  const viewMenuItem = (
    <Menu.Item key="view">
      <Icon type="eye" /> View
    </Menu.Item>
  );

  const editMenuItem = (
    <Menu.Item key="edit">
      <Icon type="edit" /> Edit
    </Menu.Item>
  );

  const deleteMenuItem = (
    <Menu.Item key="delete">
      <Icon type="delete" /> Remove
    </Menu.Item>
  );

  const moreButtonMenu = React.useMemo(() => {
    const canEdit =
      props.resource.creatorUserId === props.currentUser.objectID ||
      props.playlistCreatorUserId === props.currentUser.objectID;

    const moreButtonMenuItems = canEdit
      ? [viewMenuItem, editMenuItem, deleteMenuItem]
      : [viewMenuItem];

    return (
      <Menu onClick={handleMoreButtonMenuClick}>{moreButtonMenuItems}</Menu>
    );
  }, [props.currentUser, props.playlistCreatorUserId, props.resource]);

  const shiftButtons = props.showShiftButtons ? (
    <SemanticButton.Group vertical className={s.shiftButtonGroup}>
      <SemanticButton
        key={"up"}
        icon="angle up"
        basic
        disabled={props.index === 0}
        onClick={() =>
          props.shiftResourceUp(
            props.resource.objectID,
            props.section.sectionIndex,
          )
        }
      />
      <SemanticButton
        key={"down"}
        icon="angle down"
        basic
        disabled={props.index === props.length - 1}
        onClick={() =>
          props.shiftResourceDown(
            props.resource.objectID,
            props.section.sectionIndex,
          )
        }
      />
    </SemanticButton.Group>
  ) : null;

  const moreButton = (
    <Dropdown overlay={moreButtonMenu}>
      <Button>
        <Icon type="more" />
      </Button>
    </Dropdown>
  );

  const actionButtons = [moreButton];

  return (
    <List.Item actions={actionButtons} className={s.listItem} key={props.index}>
      {shiftButtons}
      <Image
        src={props.resource.thumbnailUrl}
        size={"small"}
        onError={i => (i.target.src = logo)}
        className={s.thumbnailImage}
      />
      <Typography.Paragraph className={s.resourceTitle}>
        {props.resource.title}
      </Typography.Paragraph>
    </List.Item>
  );
};

export default compose<Props, Props>(withRouter)(VideoListItem);
