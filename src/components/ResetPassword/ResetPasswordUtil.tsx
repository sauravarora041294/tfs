import * as DataTypes from "data/types";
import RESTAPIClient from "RESTAPIClient";

interface UserExistsResult {
  result: { exists: boolean };
  error: any;
}

const userExists = async (
  email: string,
  isCreatorSide: boolean,
): Promise<UserExistsResult> => {
  try {
    const result = isCreatorSide
      ? await RESTAPIClient.Creator.existsByEmail(email)
      : await RESTAPIClient.User.existsByEmail(email);
    return {
      result,
      error: null,
    };
  } catch (error) {
    return {
      result: null,
      error,
    };
  }
};

export { userExists };
