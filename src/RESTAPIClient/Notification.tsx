import { AuthedRequest as axios } from "./axiosutil";
import * as DataTypes from "data/types";
import * as constants from "./constants";

class Notification {
  static getToShowForUser = async ({
    userId,
  }: {
    userId: string;
  }): Promise<Array<DataTypes.Notification>> => {
    const url = constants.API_URL + `notifications`;
    const params = { userId, toShow: true };
    const response = await axios.get(url, {
      params,
      timeout: constants.TIMEOUT,
    });

    return response.data.result;
  };

  static getAttentionRequiring = async ({
    userId,
  }: {
    userId: string;
  }): Promise<Array<DataTypes.Notification>> => {
    const url = constants.API_URL + `notifications`;
    const params = { userId, attentionRequiring: true };
    const response = await axios.get(url, {
      params,
      timeout: constants.TIMEOUT,
    });

    return response.data.result;
  };

  static markAsSeen = async ({
    notificationIds,
  }: {
    notificationIds: Array<string>;
  }): Promise<DataTypes.Notification> => {
    const url = constants.API_URL + `notifications`;
    const params = { notificationIds, seenStatus: "SEEN" };
    const response = await axios.patch(url, params, {
      timeout: constants.TIMEOUT,
    });

    return response.data.result;
  };
}

export { Notification };
