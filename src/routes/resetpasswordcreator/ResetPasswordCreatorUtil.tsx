import * as DataTypes from "data/types";
import React from "react";
import RESTAPIClient from "RESTAPIClient";
import { verifyPasswordResetCode } from "FirebaseClient";

const queryString = require("query-string");

interface ResetPasswordCreatorState {
  isLoading: boolean;
  userEmail?: string;
  showSendResetLinkFormView?: boolean;
  showResetPasswordFormView?: boolean;
  firebasePasswordResetActionCode?: string;
  error?: Error;
}

interface ResetPasswordCreatorQueryParams {
  mode?: string;
  oobCode?: string;
}

const useFetchResetPasswordCreatorData = (
  authUser,
  location,
  matchParams,
): ResetPasswordCreatorState => {
  const [data, updateData] = React.useState<ResetPasswordCreatorState>({
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
      const queryParams = queryString.parse(
        location.search,
      ) as ResetPasswordCreatorQueryParams;
      if (queryParams.mode && queryParams.oobCode) {
        try {
          const userEmail = await verifyPasswordResetCode(queryParams.oobCode);
          updateData({
            ...data,
            isLoading: false,
            showSendResetLinkFormView: false,
            showResetPasswordFormView: true,
            firebasePasswordResetActionCode: queryParams.oobCode,
            userEmail: userEmail,
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
          showSendResetLinkFormView: true,
          showResetPasswordFormView: false,
        });
      }
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  return data;
};

export { useFetchResetPasswordCreatorData };
