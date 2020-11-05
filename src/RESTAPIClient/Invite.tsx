import axios from "axios";
import * as DataTypes from "data/types";
import * as constants from "RESTAPIClient/constants";

class Invite {
  static authenticateInviteCode = async (
    inviteCode: string,
  ): Promise<DataTypes.Invite[]> => {
    const url = constants.API_URL + `public/invite?inviteCode=${inviteCode}`;
    const response = await axios.get(url, { timeout: constants.TIMEOUT });

    return response.data.result;
  };
  // static invalidateInviteCode = async (inviteCode: string) => {
  //   const url = constants.API_URL + `public/invite`;
  //   const response = await axios.delete(url, {
  //     params: { inviteCode },
  //     timeout: constants.TIMEOUT,
  //   });
  //   return response.data.result;
  // };
}

export { Invite };
