import React from "react";
import * as DataTypes from "data/types";
import { USER_QUALITY_TAGS, ERROR_TYPES } from "data/types/enums";
import Auth from "./auth";
import { Location } from "history";
export * from "./common-utils";

export const truncateTitle = (originalTitle: string) => {
  if (originalTitle.length > 40) return originalTitle.substr(0, 37) + "...";
  return originalTitle;
};

export const generateRedirectTargetAfterAuth = (defaultTarget: string) => {
  console.log("generateRedirectTargetAfterAuth()...")
  const urlParams = new URLSearchParams(window.location.search);
  console.log("urlParams: ", urlParams)
  const redirectTarget = urlParams.get("redirect") || defaultTarget;
  console.log("redirect target: ", redirectTarget)
  return redirectTarget;
};
export const getResourceUrlLocation = (
  resource: DataTypes.Resource,
): string => {
  return `/resource/${resource.objectID}`;
};

export const getPlaylistUrlLocation = (
  playlist,
  playlistViewlogs: Array<DataTypes.Viewlog>,
) => {
  if (!playlist.sections || playlist.sections.length === 0) {
    return `/playlist/${playlist.objectID}`;
  }
  const playlistResourceIds = playlist.sections
    .map(section => section.resources)
    .reduce((a, b) => a.concat(b), []);

  const filteredViewlogs = playlistViewlogs.filter(
    viewlog => viewlog !== undefined && viewlog !== null,
  );

  const playlistOrderedViewlogs = playlistResourceIds.map(resource =>
    filteredViewlogs.find(viewlog => viewlog.resourceId === resource.objectID),
  );

  const firstIncompleteViewlog = playlistOrderedViewlogs.find(
    viewlog => !viewlog || !viewlog.completed,
  );

  const resourceId = firstIncompleteViewlog
    ? firstIncompleteViewlog.resourceId
    : playlistResourceIds[0];

  return `/playlist/${playlist.objectID}/resource/${resourceId}`;
};

export const getMissionUrlLocation = (mission: DataTypes.Mission): string => {
  return `/collection/${mission.objectID}`;
};

export const getEditMissionUrlLocation = (
  mission: DataTypes.Mission,
): string => {
  return `/editcollection/${mission.objectID}`;
};

export const getEditPlaylistUrlLocation = (
  playlist: DataTypes.Playlist,
): string => {
  return `/editplaylist/${playlist.objectID}`;
};

export const getEditResourceUrlLocation = (
  resource: DataTypes.Resource,
): string => {
  return `/editvideo/${resource.objectID}`;
};

export const getFormattedNumVideos = (playlist: DataTypes.Playlist): string => {
  if (!playlist.sections || playlist.sections.length === 0) {
    return `0 videos`;
  }
  const numVideos = playlist.sections
    .map(section => section.resources)
    .reduce((a, b) => a.concat(b), []).length;
  return `${numVideos} videos`;
};

export const getFormattedNumVideosInMission = (
  mission: DataTypes.Mission,
): string => {
  return `${mission.numVideos || 0} videos`;
};

export const getFormattedNumPlaylistsInMission = (
  mission: DataTypes.Mission,
): string => {
  return `${mission.numPlaylists || 0} playlists`;
};

export const getFormattedCreatorTitleInformation = (
  creator: DataTypes.Creator,
) => {
  return creator.creatorDetails
    ? `${creator.creatorDetails.title} @ ${creator.creatorDetails.company}`
    : "";
};

export const getFormattedNumVideosFromCreator = (
  creator: DataTypes.Creator,
): string => {
  return creator.creatorDetails && creator.creatorDetails.numVideos
    ? `${creator.creatorDetails.numVideos} videos`
    : "0 videos";
};

export const getFormattedNumPlaylistsFromCreator = (
  creator: DataTypes.Creator,
): string => {
  return creator.creatorDetails && creator.creatorDetails.numPlaylists
    ? `${creator.creatorDetails.numPlaylists} playlists`
    : "0 playlists";
};

export const getTimeSinceString = (seconds: number): string => {
  var elapsedSeconds = Math.floor(Date.now() / 1000) - seconds;
  var intervalType;

  var interval = Math.floor(elapsedSeconds / 31536000);
  if (interval >= 1) {
    intervalType = "year";
  } else {
    interval = Math.floor(elapsedSeconds / 2592000);
    if (interval >= 1) {
      intervalType = "month";
    } else {
      interval = Math.floor(elapsedSeconds / 86400);
      if (interval >= 1) {
        intervalType = "day";
      } else {
        interval = Math.floor(elapsedSeconds / 3600);
        if (interval >= 1) {
          intervalType = "hour";
        } else {
          interval = Math.floor(elapsedSeconds / 60);
          if (interval >= 1) {
            intervalType = "minute";
          } else {
            interval = elapsedSeconds;
            intervalType = "second";
          }
        }
      }
    }
  }

  if (interval > 1 || interval === 0) {
    intervalType += "s";
  }

  const timeSinceStringRepr = interval + " " + intervalType + " Ago";
  return timeSinceStringRepr.toUpperCase();
};

export const getFormattedVideoLength = (
  resource: DataTypes.Resource,
): string => {
  return new Date(resource.videoLength * 1000)
    .toUTCString()
    .match(/(\d\d:\d\d:\d\d)/)[0]
    .substring(3);
};

export const getFormattedDate = (seconds: number) => {
  const date = new Date(null);
  date.setSeconds(seconds);
  return date.toLocaleDateString("en-US");
};

export const getFormattedQualityTag = (qualityTag: string): string =>
  ({
    [USER_QUALITY_TAGS.USERS_LOVE_IT]: "Users Love It",
    [USER_QUALITY_TAGS.EXPERT_VERIFIED]: "Expert Verified",
    [USER_QUALITY_TAGS.NOTEWORTHY]: "Noteworthy",
  }[qualityTag]);

export const compareNumericValues = (
  a: number | undefined,
  b: number | undefined,
) => {
  return (a || 0) - (b || 0);
};

export const compareAlphanumericValues = (
  a: string | undefined,
  b: string | undefined,
) => {
  const valA = a ? a.toUpperCase() : "";
  const valB = b ? b.toUpperCase() : "";

  return valA < valB ? -1 : valA > valB;
};

export const getErrorMessageType = (error: Error) => {
  const errorMessage = error.message || "";

  if (errorMessage.includes("404")) {
    return ERROR_TYPES.NOT_FOUND_ERROR;
  } else if (errorMessage.includes("500")) {
    return ERROR_TYPES.INTERNAL_SERVER_ERROR;
  } else if (errorMessage.includes("400")) {
    return ERROR_TYPES.BAD_REQUEST_ERROR;
  } else if (errorMessage.includes("Network")) {
    return ERROR_TYPES.NETWORK_ERROR;
  } else if (errorMessage.includes("timeout")) {
    return ERROR_TYPES.TIMEOUT_ERROR;
  }

  return ERROR_TYPES.OTHER_ERROR;
};

export const strMapToObj = (mapObj: Map<string, any>) => {
  return Array.from(mapObj.keys()).reduce((result, key) => {
    result[key] = mapObj.get(key);
    return result;
  }, {});
};

export const objToStrMap = (object: Object) => {
  return Object.keys(object).reduce((result, key) => {
    result.set(key, object[key]);
    return result;
  }, new Map());
};

export const getSeachValueFromRoute = (location: Location) => {
  return isSearchRoute(location) ? location.pathname.split("/")[2] : "";
};

export const isSearchRoute = (location: Location) => {
  return location.pathname.split("/")[1] === "search";
};

export const castFormToRefForwardingComponent = (formComponent: React.FC<any>) => {
  return formComponent as React.RefForwardingComponent<any, any>;
}

export default {
  Auth,
  compareNumericValues,
  compareAlphanumericValues
};
