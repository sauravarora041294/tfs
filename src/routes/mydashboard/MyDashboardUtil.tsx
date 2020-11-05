import * as DataTypes from "data/types";
import * as Enums from "data/types/enums";
import React from "react";
import RESTAPIClient from "RESTAPIClient";

interface Result extends DataTypes.Resource {
  resultType?: string;
}

interface MyDashboardData {
  isLoading: boolean;
  featuredResults: Array<DataTypes.Content>;
  recentResults: Array<DataTypes.Content>;
  topRatedContent: Array<DataTypes.Content>;
  recommendedContent: Array<DataTypes.Content>;
  userLatestViewlogs: DataTypes.UserLatestViewlogs;
  error?: Error;
}

const getResourceUrlLocation = (resource: DataTypes.Resource): string => {
  return `/playlist/${resource.playlistId}/resource/${resource.objectID}`;
};

const getResourceProgress = (
  resource: DataTypes.Resource,
  viewlog: DataTypes.Viewlog,
): number => {
  return viewlog ? 100 * viewlog.viewEndTime : 0;
};

const getMyDashboardRouteData = async (currentUserId: string) => {
  try {
    const featuredContent = await RESTAPIClient.Content.getFeatured({
      userId: currentUserId,
    });
    const recentContent = await RESTAPIClient.Content.getRecentlyAdded({
      userId: currentUserId,
    });
    const topRatedContent = await RESTAPIClient.Content.getTopRated({
      pageSize: 20,
      order: Enums.ORDER_BY.DESCENDING,
    });
    const recommendedContent = await RESTAPIClient.Content.getRecommendedForUser(
      { userId: currentUserId },
    );
    return {
      featuredResults: featuredContent.results,
      userLatestViewlogs: featuredContent.viewlogs,
      recentResults: recentContent.results,
      topRatedContent: topRatedContent.results,
      recommendedContent: recommendedContent.results,
    };
  } catch (error) {
    return {
      featuredResults: [],
      userLatestViewlogs: null,
      recentResults: [],
      topRatedContent: [],
      recommendedContent: [],
      error: error,
    };
  }
};

const getMyDashboardFeaturedRouteData = async (currentUserId: string) => {
  try {
    const { results, viewlogs } = await RESTAPIClient.Content.getFeatured({
      userId: currentUserId,
    });
    return {
      featuredResults: results,
      userLatestViewlogs: viewlogs,
    };
  } catch (error) {
    return {
      featuredResults: [],
      userLatestViewlogs: null,
      error: error,
    };
  }
};

const getMyDashboardRecommendedRouteData = async (currentUserId: string) => {
  try {
    const {
      results,
      viewlogs,
    } = await RESTAPIClient.Content.getRecommendedForUser({
      userId: currentUserId,
    });
    return {
      recommendedContent: results,
      userLatestViewlogs: viewlogs,
    };
  } catch (error) {
    return {
      recommendedContent: [],
      userLatestViewlogs: null,
      error: error,
    };
  }
};

const getMyDashboardRecentlyAddedRouteData = async (currentUserId: string) => {
  try {
    const { results, viewlogs } = await RESTAPIClient.Content.getRecentlyAdded({
      userId: currentUserId,
    });
    return {
      userLatestViewlogs: viewlogs,
      recentResults: results,
    };
  } catch (error) {
    return {
      userLatestViewlogs: null,
      recentResults: [],
      error: error,
    };
  }
};

const getMyDashboardTopRatedRouteData = async (currentUserId: string) => {
  try {
    const { results, viewlogs } = await RESTAPIClient.Content.getTopRated({
      pageSize: 30,
      order: Enums.ORDER_BY.DESCENDING
    });
    return {
      userLatestViewlogs: viewlogs,
      topRatedContent: results,
    };
  } catch (e) {
    return {
      userLatestViewlogs: null,
      topRatedContent: [],
      error: e,
    }
  }
}

const getPathSpecificData = async (
  pathname: string,
  currentUserId: string,
  matchParams,
) => {
  switch (pathname) {
    case "/mydashboard":
      return getMyDashboardRouteData(currentUserId);
    case "/mydashboard/featured":
      return getMyDashboardFeaturedRouteData(currentUserId);
    case "/mydashboard/recentlyadded":
      return getMyDashboardRecentlyAddedRouteData(currentUserId);
    case "/mydashboard/recommended":
      return getMyDashboardRecommendedRouteData(currentUserId);
    case "/mydashboard/toprated":
      return getMyDashboardTopRatedRouteData(currentUserId);
    default:
      return getMyDashboardRouteData(currentUserId);
  }
};

const useFetchMyDashboardData = (
  authUser: firebase.User,
  pathname: string,
  matchParams,
): MyDashboardData => {
  const [data, updateData] = React.useState<MyDashboardData>({
    isLoading: true,
    featuredResults: null,
    recentResults: null,
    userLatestViewlogs: null,
    error: null,
    topRatedContent: null,
    recommendedContent: null,
  });
  const fetchData = async (): Promise<void> => {
    try {
      const pathSpecificData = await getPathSpecificData(
        pathname,
        authUser.uid,
        matchParams,
      );
      updateData({
        ...data,
        ...pathSpecificData,
        isLoading: false,
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

const getPlaylistSpecificViewlogs = (playlist, viewlogsByResourceId) => {
  if (!playlist.sections || playlist.sections.length === 0) {
    return [];
  }
  const playlistResourceIds = playlist.sections
    .map(section => section.resources)
    .reduce((a, b) => a.concat(b), [], []);

  return playlistResourceIds.map(
    resourceId => viewlogsByResourceId[resourceId],
  );
};

export {
  getResourceUrlLocation,
  getResourceProgress,
  useFetchMyDashboardData,
  getPlaylistSpecificViewlogs,
};
