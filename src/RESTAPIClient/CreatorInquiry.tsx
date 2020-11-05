import { AuthedRequest as axios } from "./axiosutil";
import * as DataTypes from "data/types";
import * as constants from "./constants";

class CreatorInquiry {
  static create = async (
    creatorUserId: string,
    message: string,
    inquiryType: string,
  ): Promise<DataTypes.ContentRequest> => {
    const url = constants.API_URL + "creatorinquirys/";
    const response = await axios.post(
      url,
      {
        creatorUserId,
        message,
        inquiryType,
      },
      { timeout: constants.TIMEOUT },
    );

    return response.data.result;
  };
}

export { CreatorInquiry };
