import * as DataTypes from "data/types";
import React from "react";
import RESTAPIClient from "RESTAPIClient";

interface CreatorsHubInfoData {
  isLoading: boolean;
  error?: Error;
}

const useFetchCreatorsHubInfoData = (authUser, pathname, matchParams) => {
  const [data, updateData] = React.useState<CreatorsHubInfoData>({
    isLoading: true,
    error: null,
  });

  const fetchData = async (): Promise<void> => {
    updateData({
      ...data,
      isLoading: false,
    });
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  return data;
};

const submitContactForm = async (
  creatorUserId: string,
  message: string,
  inquiryType: string,
) => {
  try {
    const submitContactFormResponse = await RESTAPIClient.CreatorInquiry.create(
      creatorUserId,
      message,
      inquiryType,
    );

    return {
      submitContactFormResponse: submitContactFormResponse,
      error: null,
    };
  } catch (error) {
    return {
      submitContactFormResponse: null,
      error: error,
    };
  }
};

export { useFetchCreatorsHubInfoData, submitContactForm };
