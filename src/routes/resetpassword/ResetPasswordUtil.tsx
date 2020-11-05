import * as DataTypes from "data/types";
import React from "react";
import RESTAPIClient from "RESTAPIClient";
import { verifyPasswordResetCode } from "FirebaseClient";

const queryString = require("query-string");

interface ResetPasswordState {
  isLoading: boolean;
  userEmail?: string;
  showSendResetLinkFormView?: boolean;
  showResetPasswordFormView?: boolean;
  firebasePasswordResetActionCode?: string;
  redirect?: string;
  error?: Error;
}

interface ResetPasswordQueryParams {
  mode?: string;
  oobCode?: string;
  continueUrl?: string;
}

const useFetchResetPasswordData = (
  authUser,
  location,
  matchParams,
): ResetPasswordState => {
  const [data, updateData] = React.useState<ResetPasswordState>({
    isLoading: true,
    error: null,
  });

  const fetchData = async (): Promise<void> => {
    const queryParams = queryString.parse(
      location.search,
    ) as ResetPasswordQueryParams;
    if (queryParams.continueUrl) {
      const creatorsResetPasswordLink = `${queryParams.continueUrl}?mode=${queryParams.mode}&oobCode=${queryParams.oobCode}`;
      updateData({
        ...data,
        isLoading: false,
        redirect: creatorsResetPasswordLink,
      });
    }
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

export { useFetchResetPasswordData };
