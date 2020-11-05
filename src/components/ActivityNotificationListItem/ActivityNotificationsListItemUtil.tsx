import * as DataTypes from "data/types";
import React from "react";
import { Typography } from "antd";

const getMetadataFromActivity = (
  activity: DataTypes.Activity,
  dataType: DataTypes.DataType,
) => {
  return activity.metadata.filter(item => item.dataType === dataType)[0];
};

const getActivityTextAddSectionToPlaylist = (activity: DataTypes.Activity) => {
  const section = getMetadataFromActivity(activity, DataTypes.DataType.SECTION)
    .object as DataTypes.Section;
  const playlist = getMetadataFromActivity(
    activity,
    DataTypes.DataType.PLAYLIST,
  ).object as DataTypes.Playlist;
  return (
    <Typography.Text>
      {`Created a section `}
      <a href={`/editplaylist/${playlist.objectID}`}>
        {`${section.title}`},
      </a>{" "}
      {`in your `}
      <a
        href={`/editplaylist/${playlist.objectID}`}
      >{`${playlist.title}`}</a>{" "}
      {`playlist.`}
    </Typography.Text>
  );
};

const getActivityCreator = (activity: DataTypes.Activity) => {
  return getMetadataFromActivity(activity, DataTypes.DataType.CREATOR)
    .object as DataTypes.Creator;
};

const getActivityText = (activity: DataTypes.Activity) => {
  switch (activity.type) {
    case DataTypes.ActivityType.ADD_SECTION_TO_PLAYLIST:
      return getActivityTextAddSectionToPlaylist(activity);
    default:
      break;
  }
};

export { getActivityText, getActivityCreator };
