import { AuthedRequest as axios } from "./axiosutil";
import * as DataTypes from "data/types";
import * as constants from "./constants";

class QualityVerification {
  static create = async (
    userId: string,
    resourceId: string,
    qualityTag: string,
  ): Promise<DataTypes.QualityVerification> => {
    const url = constants.API_URL + "qualityverifications/";
    const response = await axios.post(
      url,
      {
        userId,
        resourceId,
        qualityTag,
      },
      { timeout: constants.TIMEOUT },
    );

    return response.data.result;
  };
  static modify = async (
    objectID: string,
    isCancelled: boolean,
  ): Promise<DataTypes.QualityVerification> => {
    const url = constants.API_URL + "qualityverifications/";
    const response = await axios.patch(
      url,
      {
        objectID,
        isCancelled,
      },
      { timeout: constants.TIMEOUT },
    );
    return response.data.result;
  };
  static getByResourceAndUserId = async (params: {
    userId: string;
    resourceId: string;
  }): Promise<Array<DataTypes.QualityVerification>> => {
    const url = constants.API_URL + "qualityverifications";
    const response = await axios.get(url, {
      params,
      timeout: constants.TIMEOUT,
    });

    return response.data.result;
  };
}

export { QualityVerification };
