import { Button } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { REQUEST_TYPES } from "../CreatorNotificationsUtil";
import CreatorProfilePopover from "components/CreatorProfilePopover";
import CreatorNotificationBaseListItem from "./CreatorNotificationBaseListItem.react";

const MissionContributorRequestListItem = ({
  notification,
  didClickApproveRequest,
  didClickDenyRequest,
  notificationsProcessing,
}) => {
  const messageContent = (
    <div>
      <CreatorProfilePopover
        creator={notification.metadata.request.metadata.requester}
      >
        {`${notification.metadata.request.metadata.requester.firstName} ${notification.metadata.request.metadata.requester.lastName}`}
      </CreatorProfilePopover>
      {" requested to become a contributor to your collection: "}
      <Link
        to={`/editcollection/${notification.metadata.request.missionId}`}
      >{`${notification.metadata.request.metadata.mission.title}`}</Link>
    </div>
  );
  const approveButton = (
    <Button
      type={"primary"}
      onClick={() => didClickApproveRequest(notification.metadata.request)}
      disabled={
        notificationsProcessing &&
        notificationsProcessing.indexOf(
          notification.metadata.request.objectID,
        ) >= 0
      }
    >
      {"Approve"}
    </Button>
  );
  const denyButton = (
    <Button
      onClick={() => didClickDenyRequest(notification.metadata.request)}
      disabled={
        notificationsProcessing &&
        notificationsProcessing.indexOf(
          notification.metadata.request.objectID,
        ) >= 0
      }
    >
      {"Deny"}
    </Button>
  );
  return (
    <CreatorNotificationBaseListItem
      notification={notification}
      actions={[approveButton, denyButton]}
      messageContent={messageContent}
      avatarUser={notification.metadata.request.metadata.requester}
      avatarImageURL=""
    />
  );
};

const PlaylistContributorRequestListItem = ({
  notification,
  didClickApproveRequest,
  didClickDenyRequest,
  notificationsProcessing,
}) => {
  const messageContent = (
    <div>
      <CreatorProfilePopover
        creator={notification.metadata.request.metadata.requester}
      >
        {`${notification.metadata.request.metadata.requester.firstName} ${notification.metadata.request.metadata.requester.lastName}`}
      </CreatorProfilePopover>
      {" requested to become a contributor to your playlist: "}
      <Link
        to={`/editplaylist/${notification.metadata.request.playlistId}`}
      >{`${notification.metadata.request.metadata.playlist.title}`}</Link>
    </div>
  );
  const approveButton = (
    <Button
      type={"primary"}
      onClick={() => didClickApproveRequest(notification.metadata.request)}
      disabled={
        notificationsProcessing &&
        notificationsProcessing.indexOf(
          notification.metadata.request.objectID,
        ) >= 0
      }
    >
      {"Approve"}
    </Button>
  );
  const denyButton = (
    <Button
      onClick={() => didClickDenyRequest(notification.metadata.request)}
      disabled={
        notificationsProcessing &&
        notificationsProcessing.indexOf(
          notification.metadata.request.objectID,
        ) >= 0
      }
    >
      {"Deny"}
    </Button>
  );
  return (
    <CreatorNotificationBaseListItem
      notification={notification}
      actions={[approveButton, denyButton]}
      messageContent={messageContent}
      avatarUser={notification.metadata.request.metadata.requester}
      avatarImageURL=""
    />
  );
};

const RequestNotificationListItem = ({
  notification,
  didClickApproveRequest,
  didClickDenyRequest,
  notificationsProcessing,
}) => {
  switch (notification.metadata.request.requestType) {
    case REQUEST_TYPES.MISSION_CONTRIBUTOR:
      return (
        <MissionContributorRequestListItem
          notification={notification}
          didClickApproveRequest={didClickApproveRequest}
          didClickDenyRequest={didClickDenyRequest}
          notificationsProcessing={notificationsProcessing}
        />
      );
    case REQUEST_TYPES.PLAYLIST_CONTRIBUTOR:
      return (
        <PlaylistContributorRequestListItem
          notification={notification}
          didClickApproveRequest={didClickApproveRequest}
          didClickDenyRequest={didClickDenyRequest}
          notificationsProcessing={notificationsProcessing}
        />
      );
    default:
      return <div></div>;
  }
};

export default RequestNotificationListItem;
