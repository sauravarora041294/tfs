import * as DataTypes from "data/types";
import React from "react";
import RESTAPIClient from "RESTAPIClient";

interface CreatorOnboardingData {
  isLoading: boolean;
  creator: DataTypes.Creator;
  error?: Error;
}

const useFetchCreatorOnboardingData = (authUser): CreatorOnboardingData => {
  const [data, updateData] = React.useState<CreatorOnboardingData>({
    isLoading: true,
    creator: null,
    error: null,
  });

  const fetchData = async (): Promise<void> => {
    try {
      const creator = await RESTAPIClient.Creator.get(authUser.uid);
      updateData({
        ...data,
        creator,
        isLoading: false,
      });
    } catch (error) {
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

interface SaveCreatorOnboardingStatusResponse {
  savedCreator?: DataTypes.Creator;
  error?: Error;
}

const saveFinishedCreatorOnboarding = async (
  creatorUserId: string,
): Promise<SaveCreatorOnboardingStatusResponse> => {
  try {
    const savedCreator = await RESTAPIClient.Creator.creatorCompletedOnboarding(
      creatorUserId,
    );
    return {
      savedCreator,
      error: null,
    };
  } catch (error) {
    return {
      savedCreator: null,
      error,
    };
  }
};

const saveCreatorOnboardingStatus = async (
  creatorUserId: string,
  onboardingStepIndex: number,
): Promise<SaveCreatorOnboardingStatusResponse> => {
  try {
    const savedCreator = await RESTAPIClient.Creator.creatorStartedOnboarding(
      creatorUserId,
      onboardingStepIndex,
    );
    return {
      savedCreator,
      error: null,
    };
  } catch (error) {
    return {
      savedCreator: null,
      error,
    };
  }
};

export {
  useFetchCreatorOnboardingData,
  saveCreatorOnboardingStatus,
  saveFinishedCreatorOnboarding,
};
