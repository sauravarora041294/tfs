import checkedCheckbox from "assets/images/checkedCheckbox.png";
import uncheckedCheckbox from "assets/images/uncheckedCheckbox.png";
import * as DataTypes from "data/types";
import React from "react";
import { Icon } from "antd";
import s from "./ResourceDetail.module.scss";

interface Props {
  active: boolean;
  resource: DataTypes.Resource;
  latestViewlog: DataTypes.Viewlog;
  id: string;
  selectResource: (resource: string) => void;
  openSignupModal: () => void;
  isPublic: boolean;
}

const ResourceDetailPlaylistCardResourceTile: React.FC<Props> = (
  props: Props,
) => {
  React.useEffect(() => {
    let elmnt = document.getElementById("resourceTileCard");
    if (elmnt) {
      elmnt.scrollIntoView();
    }
  }, []);

  const videoLength = React.useMemo(
    () =>
      props.resource.videoLength &&
      new Date(props.resource.videoLength * 1000)
        .toUTCString()
        .match(/(\d\d:\d\d:\d\d)/)[0]
        .substring(3),
    [props.resource],
  );

  const resourceTitle = React.useMemo(() => props.resource.title, [
    props.resource,
  ]);

  const resourceTileIconImagePath = React.useMemo(
    () =>
      props.latestViewlog && props.latestViewlog.completed
        ? checkedCheckbox
        : uncheckedCheckbox,
    [props.latestViewlog],
  );

  const locked = props.isPublic && !props.resource.isPubliclyPreviewable;

  const onResourceClick = React.useCallback(
    () =>
      locked
        ? props.openSignupModal()
        : props.selectResource(props.resource.objectID),
    [props.resource],
  );

  const resourceTileIcon = locked ? (
    <div className={s.resourceTileIconContainer}>
      <div className={s.resourceTileIconImage}>
        <Icon type="lock" />
      </div>
    </div>
  ) : (
    <div className={s.resourceTileIconContainer}>
      <img
        alt="resource"
        src={resourceTileIconImagePath}
        className={s.resourceTileIconImage}
      />
    </div>
  );

  return (
    <div
      id={props.active ? "resourceTileCard" : ""}
      className={`${s.resourceTileCard} ${props.active &&
        s.resourceTileCardSelected}`}
    >
      <div>{resourceTileIcon}</div>
      <div className={s.resourceTileTitleText} onClick={onResourceClick}>
        <div>{resourceTitle}</div>
        <div className={s.resourceTileExtraInfo}>{videoLength}</div>
      </div>
    </div>
  );
};

export default ResourceDetailPlaylistCardResourceTile;
