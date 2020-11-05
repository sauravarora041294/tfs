import React from "react";
import * as DataTypes from "data/types";
import RESTAPIClient from "RESTAPIClient";

interface ContentRequestsData {
  isLoading: boolean;
  contentRequests: Array<DataTypes.ContentRequest>;
  error?: Error;
}

const useFetchContentRequestsData = (missionId): ContentRequestsData => {
  const [data, updateData] = React.useState<ContentRequestsData>({
    isLoading: true,
    contentRequests: [],
    error: null,
  });

  const fetchData = async (): Promise<void> => {
    try {
      const missionContentRequests = await RESTAPIClient.ContentRequest.getByMissionId(
        missionId,
      );

      updateData({
        ...data,
        contentRequests: missionContentRequests,
        isLoading: false,
      });
    } catch (error) {
      console.log(`ComponentFetchDataError: ${error}`);
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

const saveFormData = async (
  userId: string,
  missionId: string,
  description: string,
) => {
  try {
    const contentRequestResponse = await RESTAPIClient.ContentRequest.create(
      userId,
      missionId,
      description,
    );
    return {
      contentRequestResponse: contentRequestResponse,
      error: null,
    };
  } catch (error) {
    console.log(`ComponentSubmitDataError: ${error}`);
    return {
      contentRequestResponse: null,
      error: error,
    };
  }
};

const saveUpvoteData = async ({
  contentRequestId,
  upvoterUserId,
}: {
  contentRequestId: string;
  upvoterUserId: string;
}) => {
  try {
    const contentRequestResponse = await RESTAPIClient.ContentRequest.upvote({
      contentRequestId,
      upvoterUserId,
    });
    return {
      contentRequestResponse,
      error: null,
    };
  } catch (error) {
    console.log(`ComponentSubmitDataError: ${error}`);
    return {
      contentRequestResponse: null,
      error: error,
    };
  }
};

export { useFetchContentRequestsData, saveFormData, saveUpvoteData };
