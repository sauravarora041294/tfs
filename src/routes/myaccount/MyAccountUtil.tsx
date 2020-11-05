import * as DataTypes from "data/types";
import React from "react";
import RESTAPIClient from "RESTAPIClient";
import * as constants from "RESTAPIClient/constants";
import { MyAccountErrors, MyAccountErrorResponses } from "./constants";
import { doUpdateAuthEmail } from "FirebaseClient";

const updatePaymentErrorMessagesMap = {
  "is not a valid credit card number":
    "Your card number is not a valid credit card number.",
  "is expired or has an invalid expiration date":
    "Your card is expired or has an invalid expiration date.",
  "must be three digits": "Your CVV must be three digits.",
  "must be four digits": "Your CVV must be four digits.",
  "Server Error!":
    "Something went wrong.Please retry with a correct email format",
};

export interface BillingInfo {
  cardNumber: string;
  securityCode: string;
  expiryMonth: string;
  expiryYear: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  firstNamePayment: string;
  lastNamePayment: string;
}

const mapUpdatePaymentErrorMessages = (error: string): string => {
  return updatePaymentErrorMessagesMap[error] || error;
};

const onUpdatePayment = async (
  currentUser: DataTypes.User,
  updatedPaymentInfo: BillingInfo,
) => {
  try {
    const billingInfo = await RESTAPIClient.Subscription.updateBillingInfo(
      currentUser.userId,
      updatedPaymentInfo,
    );
    return {
      response: billingInfo,
      errors: null,
    };
  } catch (error) {
    console.log(`RouteSubmitDataError: ${error}`);
    return {
      response: null,
      errors: mapUpdatePaymentErrorMessages(error.response.data.error),
    };
  }
};

const onUpdateSubscriptionPlan = async (
  subscriptionId: string,
  planCode: string,
) => {
  try {
    const subscriptionPlan = await RESTAPIClient.Subscription.updatePlan(
      subscriptionId,
      planCode,
    );
    return {
      response: subscriptionPlan,
      errors: null,
    };
  } catch (error) {
    console.log(`RouteSubmitDataError: ${error}`);
    return {
      response: null,
      errors: mapUpdatePaymentErrorMessages(error.response.data.error),
    };
  }
};

const onCancelSubscription = async (subscriptionId: string) => {
  try {
    const subscriptionPlan = await RESTAPIClient.Subscription.cancel(
      subscriptionId,
    );
    return {
      response: subscriptionPlan,
      errors: null,
    };
  } catch (error) {
    console.log(`RouteSubmitDataError: ${error}`);
    return {
      response: null,
      errors: mapUpdatePaymentErrorMessages(error.response.data.error),
    };
  }
};

// Any response that is received without ending up in 'catch'
// means the request was a success.
const onUpdateProfileInfo = async (
  currentUser: DataTypes.User,
  email: string,
  password: string,
) => {
  try {
    await doUpdateAuthEmail(email, password);
    const result = (await RESTAPIClient.User.update(currentUser.userId, {
      ...currentUser,
      email,
    })) as any;
    if (result) {
      return {
        response: result,
        errors: null,
      };
    }
  } catch (error) {
    console.log(`RouteSubmitDataError: ${error}`);
    switch (error.message) {
      case MyAccountErrors.EMAIL_ERROR:
        return {
          response: null,
          errors: [MyAccountErrorResponses.EMAIL_ERROR],
        };
      case MyAccountErrors.PASSWORD_ERROR:
        return {
          response: null,
          errors: [MyAccountErrorResponses.PASSWORD_ERROR],
        };
      default:
        return {
          response: null,
          errors: [error.message],
        };
    }
  }
};

interface MyAccountData {
  isLoading: boolean;
  currentBillingInfo: DataTypes.BillingInfo;
  currentSubscription: DataTypes.SubscriptionAccount;
  error?: Error;
}

const useFetchMyAccountData = (
  authUser: firebase.User,
  pathname: string,
  matchParams: Object,
): MyAccountData => {
  const [data, updateData] = React.useState<MyAccountData>({
    isLoading: true,
    currentBillingInfo: null,
    currentSubscription: null,
    error: null,
  });

  const fetchData = async () => {
    try {
      const currentBillingInfo = await RESTAPIClient.Subscription.getBillingInfo(
        authUser.uid,
      );
      const currentSubscription = await RESTAPIClient.Subscription.getByUser(
        authUser.uid,
      );
      updateData({
        ...data,
        isLoading: false,
        currentBillingInfo: currentBillingInfo,
        currentSubscription: currentSubscription,
      });
    } catch (error) {
      console.log(`RouteFetchDataError: ${error}`);
      updateData({
        ...data,
        isLoading: false,
        error: error,
      });
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  return data;
};

export {
  useFetchMyAccountData,
  onUpdateSubscriptionPlan,
  onCancelSubscription,
  onUpdateProfileInfo,
  onUpdatePayment,
};
