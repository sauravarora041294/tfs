import React from "react";
import RESTAPIClient from "RESTAPIClient";
import * as DataTypes from "data/types";
import { ERRORS } from "./constants";
import { firebaseApp } from "FirebaseClient";

interface SubscriptionDataState {
  isLoading: boolean;
  error?: Error;
}

interface formData {
  planCode: string;
  cardNumber: string;
  securityCode: string;
  expiryMonth: string;
  expiryYear: string;
  country: string;
  firstNamePayment: string;
  lastNamePayment: string;
  address: string;
  city: string;
  state: string;
  zip: string;
}

const errorMessagesMap = {
  "is not a valid credit card number":
    "Your card number is not a valid credit card number.",
  "is expired or has an invalid expiration date":
    "Your card is expired or has an invalid expiration date.",
  "must be three digits": "Your CVV must be three digits.",
  "must be four digits": "Your CVV must be four digits.",
};

const useFetchSubscriptionData = (authUser: firebaseApp.User) => {
  const [data, updateData] = React.useState<SubscriptionDataState>({
    isLoading: true,
    error: null,
  });

  const fetchData = async (): Promise<void> => {
    if (authUser) {
      try {
        updateData({
          ...data,
          isLoading: false,
        });
      } catch (error) {
        updateData({
          ...data,
          isLoading: false,
          error: error,
        });
      }
    } else {
      updateData({
        ...data,
        isLoading: false,
      });
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  return data;
};

const onSubscriptionRequest = async (
  formData: formData,
  currentUser: DataTypes.User,
) => {
  try {
    const response = await RESTAPIClient.Subscription.createAccount({
      userId: currentUser.objectID,
      planCode: formData.planCode,
      cardNumber: formData.cardNumber,
      securityCode: formData.securityCode,
      expiryMonth: formData.expiryMonth,
      expiryYear: formData.expiryYear,
      firstNamePayment: formData.firstNamePayment,
      lastNamePayment: formData.lastNamePayment,
      country: formData.country,
      address: formData.address,
      city: formData.city,
      state: formData.state,
      zip: formData.zip,
      email: currentUser.email,
    });
    return {
      response: response,
      errors: null,
    };
  } catch (error) {
    return {
      response: null,
      errors: resolveError(error.response.data.error),
    };
  }
};

const getMonthsArray = (): Array<number> =>
  Array(12)
    .fill(1)
    .map((n, i) => (n + i).toString());

const getYearsArray = (): Array<string> => {
  const currentYear = new Date().getFullYear();
  return Array(2050 - currentYear)
    .fill(1)
    .map((n, i) => (n + i + currentYear - 1).toString());
};

const resolveError = (error: string): Error => {
  return new Error(errorMessagesMap[error] || error);
};

export {
  useFetchSubscriptionData,
  onSubscriptionRequest,
  getMonthsArray,
  getYearsArray,
};
