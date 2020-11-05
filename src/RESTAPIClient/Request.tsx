import { AuthedRequest as axios } from "./axiosutil";
import * as constants from "./constants";
import * as DataTypes from "data/types";

class Request {
  static getPendingForReviewer = async ({
    reviewerUserId,
  }: {
    reviewerUserId: string;
  }): Promise<Array<DataTypes.Request>> => {
    const url = constants.API_URL + `requests`;
    const params = { reviewerUserId: reviewerUserId, status: "PENDING_REVIEW" };
    const response = await axios.get(url, {
      params,
      timeout: constants.TIMEOUT,
    });

    return response.data.result;
  };

  static getPendingMissionContributorRequestsForUser = async ({
    requesterUserId,
  }): Promise<Array<DataTypes.Request>> => {
    const url = constants.API_URL + `requests`;
    const params = {
      requestType: "MISSION_CONTRIBUTOR",
      requesterUserId,
      status: "PENDING_REVIEW",
    };
    const response = await axios.get(url, {
      params,
      timeout: constants.TIMEOUT,
    });

    return response.data.result as Array<DataTypes.Request>;
  };

  static getPendingMissionContributorRequestsForUserAndMission = async ({
    requesterUserId,
    missionId,
  }): Promise<Array<DataTypes.Request>> => {
    const url = constants.API_URL + `requests`;
    const params = {
      requestType: "MISSION_CONTRIBUTOR",
      requesterUserId,
      status: "PENDING_REVIEW",
      missionId,
    };
    const response = await axios.get(url, {
      params,
      timeout: constants.TIMEOUT,
    });

    return response.data.result;
  };

  static getPendingPlaylistsContributorRequestsForUserAndPlaylist = async ({
    requesterUserId,
    playlistId,
  }): Promise<Array<DataTypes.Request>> => {
    const url = constants.API_URL + `requests`;
    const params = {
      requestType: "PLAYLIST_CONTRIBUTOR",
      requesterUserId,
      status: "PENDING_REVIEW",
      playlistId,
    };
    const response = await axios.get(url, {
      params,
      timeout: constants.TIMEOUT,
    });

    return response.data.result;
  };

  static createForMissionContributor = async ({
    requesterUserId,
    missionId,
  }): Promise<DataTypes.Request> => {
    const url = constants.API_URL + "requests";
    const response = await axios.post(
      url,
      {
        requesterUserId,
        requestType: "MISSION_CONTRIBUTOR",
        missionId,
      },
      { timeout: constants.TIMEOUT },
    );

    return response.data.result;
  };

  static createForPlaylistContributor = async ({
    requesterUserId,
    playlistId,
  }): Promise<DataTypes.Request> => {
    const url = constants.API_URL + "requests";
    const response = await axios.post(
      url,
      {
        requesterUserId,
        playlistId,
        requestType: "PLAYLIST_CONTRIBUTOR",
      },
      { timeout: constants.TIMEOUT },
    );

    return response.data.result;
  };

  static approve = async ({
    reviewerUserId,
    requestId,
  }: {
    reviewerUserId: string;
    requestId: string;
  }): Promise<DataTypes.Request> => {
    const url = constants.API_URL + `requests/${requestId}`;
    const response = await axios.patch(
      url,
      {
        reviewerUserId,
        approve: true,
      },
      { timeout: constants.TIMEOUT },
    );

    return response.data.result;
  };

  static deny = async ({
    reviewerUserId,
    requestId,
  }: {
    reviewerUserId: string;
    requestId: string;
  }): Promise<DataTypes.Request> => {
    const url = constants.API_URL + `requests/${requestId}`;
    const response = await axios.patch(
      url,
      {
        reviewerUserId,
        deny: true,
      },
      { timeout: constants.TIMEOUT },
    );

    return response.data.result;
  };
}

export { Request };
