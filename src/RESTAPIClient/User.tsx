import { AuthedRequest as axios } from "./axiosutil";
import * as DataTypes from "data/types";
import * as constants from "./constants";
interface UserExists {
  exists: boolean;
}
class User {
  static get = async (id: string): Promise<DataTypes.User> => {
    const url = constants.API_URL + `users?userId=${id}`;
    const response = await axios.get(url, { timeout: constants.TIMEOUT });
    return response.data.result;
  };

  static existsByEmail = async (email: string): Promise<UserExists> => {
    const url = constants.API_URL + `users?email=${email}`;
    const response = await axios.get(url, { timeout: constants.TIMEOUT });
    return response.data.result;
  };

  static getByIds = async (
    userIds: Array<string>,
  ): Promise<Array<DataTypes.User>> => {
    const url = constants.API_URL + `users`;
    const params = { userIds: userIds };
    const response = await axios.get(url, {
      params,
      timeout: constants.TIMEOUT,
    });
    return response.data.result;
  };

  static create = async ({
    email,
    firstName,
    lastName,
    userId,
  }): Promise<DataTypes.User> => {
    const url = constants.API_URL + "users";
    const data = {
      email,
      firstName,
      lastName,
      userId,
    };
    const response = await axios.post(url, data, {
      timeout: constants.TIMEOUT,
    });
    return response.data.result;
  };

  static update = async (
    id: string,
    data: DataTypes.User,
  ): Promise<DataTypes.User> => {
    const url = constants.API_URL + `users?userId=${id}`;
    const response = await axios.patch(
      url,
      {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
      },
      { timeout: constants.TIMEOUT },
    );
    return response.data.result;
  };
}

export { User };
