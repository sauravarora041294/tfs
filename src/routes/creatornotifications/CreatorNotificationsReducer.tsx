import * as DataTypes from "data/types";
import { CreatorsHubDashboardStateActionTypes } from "routes/creatorshub/CreatorsHubReducer";

interface CreatorNotificationsState {
  currentUser: DataTypes.User;
  notifications: Array<DataTypes.Notification>;
  shouldRefreshNotifications: boolean;
  notificationsProcessing?: Array<any>;
}

enum CreatorNotificationsStateActionTypes {
  UPDATE_NOTIFICATIONS = "UPDATE_NOTIFICATIONS",
  SHOULD_REFRESH_NOTIFICATIONS = "SHOULD_REFRESH_NOTIFICATIONS",
  START_NOTIFICATION_RESPONSE = "START_NOTIFICATION_RESPONSE",
  END_NOTIFICATION_RESPONSE = "END_NOTIFICATION_RESPONSE",
}

interface CreatorNotificationsStateAction {
  type: CreatorNotificationsStateActionTypes;
  notifications?: Array<DataTypes.Notification>;
  notificationProcessing?: any;
}

const creatorNotificationsStateInit = (
  initialState: CreatorNotificationsState,
): CreatorNotificationsState => {
  return {
    ...initialState,
    notificationsProcessing: [],
  };
};

const creatorNotificationsReducer = (
  state: CreatorNotificationsState,
  action: CreatorNotificationsStateAction,
): CreatorNotificationsState => {
  switch (action.type) {
    case CreatorNotificationsStateActionTypes.START_NOTIFICATION_RESPONSE:
      return {
        ...state,
        notificationsProcessing: state.notificationsProcessing
          ? [...state.notificationsProcessing, action.notificationProcessing]
          : [action.notificationProcessing],
      };

    case CreatorNotificationsStateActionTypes.END_NOTIFICATION_RESPONSE:
      return {
        ...state,
        notificationsProcessing: state.notificationsProcessing
          ? state.notificationsProcessing.filter(
              n => n !== action.notificationProcessing,
            )
          : [],
      };

    case CreatorNotificationsStateActionTypes.UPDATE_NOTIFICATIONS:
      return {
        ...state,
        notifications: action.notifications,
        shouldRefreshNotifications: false,
      };
    case CreatorNotificationsStateActionTypes.SHOULD_REFRESH_NOTIFICATIONS:
      return { ...state, shouldRefreshNotifications: true };
    default:
      return state;
  }
};

export {
  creatorNotificationsStateInit,
  creatorNotificationsReducer,
  CreatorNotificationsStateActionTypes,
};
