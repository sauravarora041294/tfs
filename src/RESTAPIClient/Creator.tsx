import { AuthedRequest as axios } from "./axiosutil";
import * as DataTypes from "data/types";
import * as constants from "./constants";
interface CreatorExists {
  exists: boolean;
}

class Creator {
  static get = async (id: string): Promise<DataTypes.Creator> => {
    const url = constants.API_URL + `users?userId=${id}`;
    const response = await axios.get(url, { timeout: constants.TIMEOUT });
    return response.data.result;
  };

  static existsByEmail = async (email: string): Promise<CreatorExists> => {
    const url = constants.API_URL + `creators?email=${email}`;

    const response = await axios.get(url, { timeout: constants.TIMEOUT });
    return response.data.resul;
  };

  static getWithMetadata = async (
    creatorUserId: string,
  ): Promise<DataTypes.CreatorWithMetadata> => {
    const url = constants.API_URL + `creators`;
    const params = {
      creatorUserId,
      includeMetadata: true,
    };
    const response = await axios.get(url, {
      params,
      timeout: constants.TIMEOUT,
    });

    return response.data.result;
  };

  static create = async (
    creator: DataTypes.Creator,
  ): Promise<DataTypes.Creator> => {
    const url = constants.API_URL + "creators";
    const infoObject = {
      email: creator.email,
      firstName: creator.firstName,
      lastName: creator.lastName,
      userId: creator.userId,
    };
    const data = creator.inviteCode
      ? { ...infoObject, inviteCode: creator.inviteCode }
      : infoObject;

    const response = await axios.post(url, data, {
      timeout: constants.TIMEOUT,
    });

    return response.data.result;
  };

  static update = async (
    userId: string,
    updates: {
      title?: string;
      company?: string;
      linkedinURL?: string;
      skills?: Array<object>;
      resumeURL?: string;
      bio?: string;
      profilePictureURL?: string;
      venmoHandle?: string;
      firstName?: string;
      lastName?: string;
    },
  ): Promise<DataTypes.Creator> => {
    const url = constants.API_URL + `creators/${userId}`;
    const response = await axios.patch(url, updates, {
      timeout: constants.TIMEOUT,
    });

    return response.data.result;
  };

  static upgradeUserToCreator = async (userId: string) => {
    const url = constants.API_URL + `creators/${userId}/upgradeUserToCreator`;
    const response = await axios.patch(url, {});

    return response.data.result;
  };

  static creatorStartedOnboarding = async (
    creatorUserId: string,
    onboardingStepIndex: number,
  ): Promise<DataTypes.Creator> => {
    const url = constants.API_URL + `creators/${creatorUserId}`;
    const response = await axios.patch(
      url,
      {
        startedCreatorOnboarding: true,
        updateCreatorOnboardingStatus: true,
        onboardingStepIndex: onboardingStepIndex,
      },
      {
        timeout: constants.TIMEOUT,
      },
    );

    return response.data.result;
  };

  static creatorCompletedOnboarding = async (
    creatorUserId: string,
  ): Promise<DataTypes.Creator> => {
    const url = constants.API_URL + `creators/${creatorUserId}`;
    const response = await axios.patch(
      url,
      { completedCreatorOnboarding: true, updateCreatorOnboardingStatus: true },
      {
        timeout: constants.TIMEOUT,
      },
    );

    return response.data.result;
  };

  static getPointStatsForUser = async (
    userId: string,
  ): Promise<DataTypes.PointCounts> => {
    const url = constants.API_URL + `creators/${userId}/pointStats`;
    const response = await axios.get(url, { timeout: constants.TIMEOUT });

    return response.data.result as DataTypes.PointCounts;
  };

  static getViewStatsForUser = async (
    userId: string,
  ): Promise<DataTypes.UserViewCounts> => {
    const url = constants.API_URL + `creators/${userId}/userViewStats`;
    const response = await axios.get(url, { timeout: constants.TIMEOUT });

    return response.data.result as DataTypes.UserViewCounts;
  };

  static getUniqueViewStatsForUser = async (
    userId: string,
  ): Promise<DataTypes.UserUniqueViewCounts> => {
    const url = constants.API_URL + `creators/${userId}/userUniqueViewStats`;
    const response = await axios.get(url, { timeout: constants.TIMEOUT });

    return response.data.result as DataTypes.UserUniqueViewCounts;
  };

  static getAll = async (): Promise<Array<DataTypes.Creator>> => {
    const response = await axios.get(`${constants.API_URL}creators`);

    return response.data.result;
  };

  static getAllSortedByCurrentMonthPoints = async (): Promise<
    Array<DataTypes.Creator>
  > => {
    const url = constants.API_URL + `creators`;
    const params = {
      orderByCurrentMonthPoints: true,
    };
    const response = await axios.get(url, {
      params,
    });

    return response.data.result;
  };

  static getAllWithStripeAccounts = async (): Promise<
    Array<DataTypes.CreatorWithRankMetadata>
  > => {
    const url = constants.API_URL + `creators`;
    const params = {
      orderByCurrentMonthPoints: true,
      stripeAccountIdPresent: true,
    };
    const response = await axios.get(url, {
      params,
    });

    return response.data.result;
  };

  static getCreatorsRevenuePool = async (): Promise<number> => {
    const url = constants.API_URL + `creators/revenue_pool`;
    const response = await axios.get(url);
    return response.data.result;
  };

  static getActivityForUser = async (
    userId: string,
  ): Promise<Array<DataTypes.Activity>> => {
    const url = constants.API_URL + `creators/${userId}/activity`;
    const response = await axios.get(url);

    return response.data.result as Array<DataTypes.Activity>;
  };

  static transferRevenueAmountToCreatorStripeAccount = async (
    userId: string,
    stripeAccountId: string,
    amount: number,
  ): Promise<DataTypes.Transfer> => {
    const url =
      constants.API_URL + `stripe/${stripeAccountId}/transfer_creator_revenue`;
    const params = {
      userId,
      amount,
    };
    const response = await axios.post(url, params, {
      timeout: constants.TIMEOUT,
    });
    return response.data.result;
  };
}

export { Creator };
