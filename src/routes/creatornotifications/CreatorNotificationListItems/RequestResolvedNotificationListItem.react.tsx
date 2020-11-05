import React from "react";
import { Link } from "react-router-dom";
import { REQUEST_STATUS, REQUEST_TYPES } from "../CreatorNotificationsUtil";
import CreatorNotificationBaseListItem from "./CreatorNotificationBaseListItem.react";

const CreatorNotificationMissionContributorRequestResolvedListItem = ({
  notification,
}) => {
  const messageContent = (
    <div>
      {"Your request to join "}
      <Link
        to={`/editcollection/${notification.metadata.request.metadata.mission.objectID}`}
      >{`${notification.metadata.request.metadata.mission.title}`}</Link>
      {` was ${
        notification.metadata.request.status === REQUEST_STATUS.APPROVED
          ? "approved"
          : "denied"
        }.`}
    </div>
  );
  return (
    <CreatorNotificationBaseListItem
      notification={notification}
      actions={[]}
      messageContent={messageContent}
      avatarUser={null}
      avatarImageURL={
        notification.metadata.request.metadata.mission.thumbnailUrl
      }
    />
  );
};

const CreatorNotificationPlaylistContributorRequestResolvedListItem = ({
  notification,
}) => {
  const messageContent = (
    <div>
      {"Your request to join "}
      <Link
        to={`/editplaylist/${notification.metadata.request.metadata.playlist.objectID}`}
      >{`${notification.metadata.request.metadata.playlist.title}`}</Link>
      {` was ${
        notification.metadata.request.status === REQUEST_STATUS.APPROVED
          ? "approved"
          : "denied"
        }.`}
    </div>
  );
  return (
    <CreatorNotificationBaseListItem
      notification={notification}
      actions={[]}
      messageContent={messageContent}
      avatarUser={null}
      avatarImageURL={
        notification.metadata.request.metadata.playlist.thumbnailUrl
      }
    />
  );
};

const RequestResolvedNotificationListItem = ({ notification }) => {
  switch (notification.metadata.request.requestType) {
    case REQUEST_TYPES.MISSION_CONTRIBUTOR:
      return (
        <CreatorNotificationMissionContributorRequestResolvedListItem
          notification={notification}
        />
      );
    case REQUEST_TYPES.PLAYLIST_CONTRIBUTOR:
      return (
        <CreatorNotificationPlaylistContributorRequestResolvedListItem
          notification={notification}
        />
      );
    default:
      return <div></div>;
  }
};

export default RequestResolvedNotificationListItem;
