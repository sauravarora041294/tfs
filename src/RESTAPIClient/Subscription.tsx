import { AuthedRequest as axios } from "./axiosutil";
import * as DataTypes from "data/types";
import * as constants from "./constants";

interface Response {
  success: boolean;
  errors: {
    error: string;
  };
}

class Subscription {
  static getAccountDetails = async (
    userId: string,
  ): Promise<DataTypes.SubscriptionAccount> => {
    const url = constants.API_URL + `recurlyapi/accounts/${userId}`;
    const response = await axios.get(url, { timeout: constants.TIMEOUT });

    return response.data.result;
  };

  static createAccount = async (params: {
    userId: string;
    planCode: string;
    cardNumber: string;
    securityCode: string;
    expiryMonth: string;
    expiryYear: string;
    firstNamePayment: string;
    lastNamePayment: string;
    country: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    email: string;
  }): Promise<DataTypes.SubscriptionAccount> => {
    const url = constants.API_URL + "recurlyapi/accounts";
    const response = await axios.post(url, params, {
      timeout: constants.TIMEOUT,
    });
    return response.data.result;
  };

  static getBillingInfo = async (
    userId: string,
  ): Promise<DataTypes.BillingInfo> => {
    const url =
      constants.API_URL + `recurlyapi/accounts/${userId}/billinginfo/`;
    const response = await axios.get(url, { timeout: constants.TIMEOUT });
    return response.data.result;
  };

  static updateBillingInfo = async (
    userId: string,
    data: Object,
  ): Promise<DataTypes.BillingInfo> => {
    const url = constants.API_URL + `recurlyapi/accounts/${userId}/billinginfo`;
    const response = await axios.patch(url, data, {
      timeout: constants.TIMEOUT,
    });
    return response.data.result;
  };

  static getByUser = async (
    userId: String,
  ): Promise<DataTypes.SubscriptionAccount> => {
    const url =
      constants.API_URL + `recurlyapi/accounts/${userId}/subscriptions/`;
    const response = await axios.get(url, { timeout: constants.TIMEOUT });
    return response.data.result;
  };

  static updatePlan = async (
    subscriptionId: string,
    planCode: string,
  ): Promise<DataTypes.SubscriptionAccount> => {
    const url =
      constants.API_URL + `recurlyapi/subscriptions/${subscriptionId}`;
    const response = await axios.patch(
      url,
      {
        planCode: planCode,
      },
      { timeout: constants.TIMEOUT },
    );

    return response.data.result;
  };

  static cancel = async (
    subscriptionId: string,
  ): Promise<DataTypes.SubscriptionAccount> => {
    const url =
      constants.API_URL + `recurlyapi/subscriptions/${subscriptionId}/cancel`;
    const response = await axios.put(url, {}, { timeout: constants.TIMEOUT });

    return response.data.result;
  };
}

export { Subscription };
