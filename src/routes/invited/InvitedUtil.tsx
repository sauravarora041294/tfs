import * as DataTypes from "data/types";
import RESTAPIClient from "RESTAPIClient";

interface InvitedData {
  invitee: string;
  error?: Error | string;
}

const getInviteeStatus = async (inviteCode: string): Promise<InvitedData> => {
  try {
    const response = await RESTAPIClient.Invite.authenticateInviteCode(
      inviteCode,
    );
    if (!response || !response.length)
      throw new Error("Invite code does not exist.");
    if (response.length > 1) throw new Error("Invalid code used");
    else {
      const invitee = response[0].firstName + " " + response[0].lastName;

      return {
        error: null,
        invitee,
      };
    }
  } catch (error) {
    console.log(`RouteFetchDataError: ${error}`);
    return {
      invitee: null,
      error:
        typeof error.message === "string"
          ? error.message
          : "Something went wrong!",
    };
  }
};

export { getInviteeStatus };
