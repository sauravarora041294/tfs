import axios from "axios";
import * as constants from "./constants";
import { Content } from "./Content";
import { Creator } from "./Creator";
import { Mission } from "./Mission";
import { Notification } from "./Notification";
import { Playlist } from "./Playlist";
import { Rating } from "./Rating";
import { Request } from "./Request";
import { ContentRequest } from "./ContentRequest";
import { Resource } from "./Resource";
import { Subscription } from "./Subscription";
import { User } from "./User";
import { Viewlog } from "./Viewlogs";
import { QualityVerification } from "./QualityVerification";
import { CreatorInquiry } from "./CreatorInquiry";
import { Public } from "./Public";
import { Activity } from "./Activity";
import { Employee } from "./Employee";
import { Invite } from "./Invite";

const submitFeedback = async (
  userId: string,
  questionOrPrompt: string,
  response: string,
): Promise<Object> => {
  const url = constants.API_URL + "feedbacks";
  const serverResponse = await axios.post(
    url,
    {
      userId,
      questionOrPrompt,
      response,
    },
    { timeout: constants.TIMEOUT },
  );

  return serverResponse.data.result;
};

const addToMailingList = async (email: string): Promise<Object> => {
  const url = constants.API_URL + "mailingListEmails";
  return new Promise((resolve, reject) => {
    return axios
      .post(
        url,
        {
          email: email,
        },
        { timeout: constants.TIMEOUT },
      )
      .then(response => {
        resolve(response.data.result);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export default {
  addToMailingList,
  submitFeedback,
  Mission,
  Playlist,
  Request,
  ContentRequest,
  Resource,
  User,
  Viewlog,
  Notification,
  Rating,
  Subscription,
  Creator,
  Content,
  QualityVerification,
  CreatorInquiry,
  Public,
  Activity,
  Employee,
  Invite,
};
