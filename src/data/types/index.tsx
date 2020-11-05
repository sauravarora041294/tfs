import {
  CONTENT_REQUEST_STATUS,
  USER_QUALITY_TAGS,
  CREATOR_QUALITY_TAGS,
} from "data/types/enums";

import * as Local from "data/types/local";

export interface DataModelObject {
  lastUpdated?: FirebaseDate;
  dateCreated?: FirebaseDate;
  objectID?: string;
}
export interface Invite {
  inviteCode: string;
  firstName: string;
  lastName: string;
}
export interface Content extends DataModelObject {
  creatorUserId: string;
  contentType?: string;
  title: string;
  metadata?: { creator: Creator };
  isPubliclyPreviewable?: boolean;
}

export interface Feedback extends DataModelObject {
  feedbackId: string;
  userId: string;
  dateSubmitted: FirebaseDate;
  questionOrPrompt: string;
  response: string;
}

export interface FormInfo extends DataModelObject {
  formId: string;
  group: string;
  orderInGroup: number;
  displayTitle: string;
  displaySubtitle: string;
  submitButtonText: string;
  questions: Array<string>;
}

export interface MailingListEmail extends DataModelObject {
  email: string;
}

export interface Playlist extends Content {
  description: string;
  thumbnailUrl: string;
  sections: Array<Section>;
  _tags: Array<String>;
  contentType: string;
  contributors?: Array<string>;
  creatorQualifications: CreatorDetails;
  missionIds: Array<string>;
  avgRating: number;
  numRatings: number;
  totalUniqueViews: number;
  totalViews: number;
  isCollaborative: boolean;
}

export interface Question extends DataModelObject {
  questionId: string;
  questionText: string;
  inputType: string;
  placeholder: string;
  answerType: string;
  options: Array<string>;
}

export interface Resource extends Content {
  resourceId: string;
  playlistId: string;
  playlistIds: Array<string>;
  missionIds: Array<string>;
  description: string;
  _tags: Array<string>;
  dateUploaded: FirebaseDate;
  thumbnailUrl: string;
  resourceUrl: string;
  videoLength: number;
  avgRating: number;
  numRatings: number;
  totalViews: number;
  contentType: string;
  qualityTags?: Array<USER_QUALITY_TAGS>;
}

export interface ResourceWithCreatorMetadata extends Resource {
  metadata: {
    creator: Creator;
  };
}

export interface User extends DataModelObject {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  dateJoined?: FirebaseDate;
  subscriptionStatus?: string;
  profilePictureURL?: string;
}

export enum CreatorOnboardingStatus {
  NOT_STARTED = "NOT_STARTED",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETE = "COMPLETE",
}

export interface Creator extends User {
  currentMonthPoints?: number;
  currentMonthRevenue?: number;
  isCurrentMonthPaid?: boolean;
  creatorDetails?: CreatorDetails;
  creatorOnboardingStatus?: CreatorOnboardingStatus;
  creatorStatus?: string;
  rank?: number;
  isSuperAdminCreator?: boolean;
  creatorOnboardingStepIndex?: number;
  inviteCode?: string;
}

export enum EmployeeStatus {
  APPROVED = "APPROVED",
  NOT_APPROVED = "NOT_APPROVED",
}

export interface Employee extends User {
  employeeStatus?: EmployeeStatus;
}

export interface UserInfo extends DataModelObject {
  userId: string;
  formType: string;
  questionToAnswerMap: string;
}

export interface Viewlog extends DataModelObject {
  resourceId: string;
  userId: string;
  completed: boolean;
  viewLength: number;
  viewEndTime: number;
}

export interface SubscriptionAccount {
  uuid: string;
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  cardNumber: string;
  securityCode: string;
  expiryMonth: string;
  current_term_ends_at: string;
  expiryYear: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  plan: SubscriptionPlan;
  planCode: string;
  pending_subscription: {
    plan: SubscriptionPlan;
    quantity: number;
  };
}

export interface SubscriptionPlan {
  name: string;
  plan_code: string;
}

export interface BillingInfo {
  first_name: string;
  last_name: string;
  cardNumber: string;
  securityCode: string;
  month: string;
  year: string;
  expiryMonth: string;
  expiryYear: string;
  address: string;
  address1: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  last_four: string;
}

export interface Rating extends DataModelObject {
  ratingId: string;
  userId: string;
  resourceId: string;
  rating: number;
  feedback: string;
  mostRecent: boolean;
}

export interface Mission extends Content {
  missionId: string;
  purpose: string;
  description: string;
  formatInformation: string;
  creatorQualifications: string;
  thumbnailUrl: string;
  contributors: Array<any>;
  contentType: string;
  numVideos: number;
  numPlaylists: number;
  totalUniqueViews: number;
  infoPoints?: {
    whatsIncluded?: Array<string>;
    meantFor?: string;
    getStarted?: string;
    whenAdded: string;
  };
}

export interface CreatorDetails {
  thumbnailUrl?: string;
  profilePictureURL?: string;
  resumeURL?: string;
  linkedinURL?: string;
  title?: string;
  company?: string;
  bio?: string;
  skills?: Array<any>;
  venmoHandle?: string;
  stripeAccountId?: string;
  points?: number;
  totalViews?: number;
  totalUniqueViews?: number;
  totalPoints?: number;
  numVideos?: number;
  numPlaylists?: number;
  numMissions?: number;
}

export interface Section extends DataModelObject {
  title: string;
  description: string;
  sectionUID: string;
  resources: string[];
  sectionIndex: number;
}

export interface UserLatestViewlogs extends DataModelObject {
  userId: string;
  resourceIdToLatestViewlog: { [id: string]: Viewlog };
}

export interface UserUniqueViewCounts extends DataModelObject {
  totalUniqueViews: number;
  uniqueViewsByDay: { [date: string]: number };
  uniqueViewsByMonth: { [date: string]: number };
  uniqueViewsByYear: { [date: string]: number };
  userId: string;
}

export interface UserViewCounts extends DataModelObject {
  totalViews: number;
  viewsByDay: { [date: string]: number };
  viewsByMonth: { [date: string]: number };
  viewsByYear: { [date: string]: number };
  userId: string;
}

export interface ViewCounts extends DataModelObject {
  resourceId: string;
  totalViews: number;
  viewsByDay: { [date: string]: number };
  viewsByMonth: { [date: string]: number };
  viewsByYear: { [date: string]: number };
}

export interface UniqueViewCounts extends DataModelObject {
  resourceId: string;
  totalUniqueViews: number;
  uniqueViewsByDay: { [date: string]: number };
  uniqueViewsByMonth: { [date: string]: number };
  uniqueViewsByYear: { [date: string]: number };
}

export interface PointCounts extends DataModelObject {
  creatorUserId: string;
  pointsByDay: { [date: string]: number };
  pointsByMonth: { [date: string]: number };
  pointsByYear: { [date: string]: number };
  totalPoints: number;
}

export interface Notification extends DataModelObject {
  receiverUserId: string;
  notificationType: string;
  metadata: any;
  title: string;
  message: string;
  clientShouldBuildTitleAndMessage: boolean;
  seenStatus: string;
  shouldShow: boolean;
  requestId?: string;
}

export interface Request extends DataModelObject {
  requesterUserId: string;
  requestType: string;
  status: string;
  requestReviews: Array<any>;
  possibleReviewers?: Array<string>;
  reviewerRequirement?: string;
  missionId?: string;
  playlistId?: string;
}

export interface ContentRequest extends DataModelObject {
  requesterUserId: string;
  resolverUserId: string;
  missionId: string;
  status: CONTENT_REQUEST_STATUS;
  description: string;
  upvotes: number;
  upvoterUserIds: Array<string>;
  reviewDetails?: string;
  contentIds?: Array<string>;
  metadata?: {
    requester: User;
    resolver: User;
  };
}

export interface ContentPayload {
  results: Array<Content>;
  viewlogs?: UserLatestViewlogs;
  numHits: number;
}

export interface PaginatedContentPayload {
  results: Array<Content>;
  next: any;
}

export interface CreatorWithRankMetadata extends Creator {
  rank: number;
}

export interface CreatorWithMetadata extends Creator {
  metadata: {
    contributedMissions: Array<Mission>;
    createdPlaylists: Array<Playlist>;
    uploadedResources: Array<Resource>;
  };
}

export interface NotificationWithMetadata extends Notification {
  metadata: {
    request: RequestWithMetadata;
  };
}

export interface RequestWithMetadata extends Request {
  metadata: {
    mission?: Mission;
    playlist?: Playlist;
    requester: User;
  };
}

export interface RatingWithMetadata extends Rating {
  metadata: {
    resource?: Resource;
    user?: User;
  };
}

export interface FirebaseDate {
  seconds: number;
  _seconds: number;
  _nanoseconds: number;
}

export interface CreatorsHubSearchPayload {
  searchResults: {
    content: Array<Content>;
    creators: Array<Creator>;
  };
  viewlogs: UserLatestViewlogs;
}

export interface ResourceWithViewStatsMetadata extends Resource {
  viewCounts?: ViewCounts;
  uniqueViewCounts?: UniqueViewCounts;
}

export interface QualityVerification extends DataModelObject {
  userId: string;
  resourceId: string;
  qualityTag: CREATOR_QUALITY_TAGS;
  isCancelled?: boolean;
}

export interface SearchResultState {
  hasMore?: boolean;
  next?: any;
}

export enum SearchResultStateActionTypes {
  END_FETCHING_NEXT_RESULTS = "END_FETCHING_NEXT_RESULTS",
  FETCHED_NEXT_RESULTS_SUCCESSFULLY = "FETCHED_NEXT_RESULTS_SUCCESSFULLY",
}

export enum ActivityType {
  ADD_SECTION_TO_PLAYLIST = "ADD_SECTION_TO_PLAYLIST",
  ADD_VIDEO_TO_PLAYLIST = "ADD_VIDEO_TO_PLAYLIST",
  REMOVE_VIDEO_FROM_PLAYLIST = "REMOVE_VIDEO_FROM_PLAYLIST",
  ADD_PLAYLIST_TO_MISSION = "ADD_PLAYLIST_TO_MISSON",
  REMOVE_PLAYLIST_FROM_MISSION = "REMOVE_PLAYLIST_FROM_MISSION",
  JOIN_MISSION_AS_CONTRIBUTOR = "JOIN_MISSION_AS_CONTRIBUTOR",
  JOIN_PLAYLIST_AS_CONTRIBUTOR = "JOIN_PLAYLIST_AS_CONTRIBUTOR",
  RENAME_PLAYLIST = "RENAME_PLAYLIST",
  RENAME_MISSION = "RENAME_MISSION",
}

export enum DataType {
  RESOURCE = "Resource",
  PLAYLIST = "Playlist",
  MISSION = "Mission",
  CREATOR = "Creator",
  SECTION = "Section",
}

export interface ActivityMetadata {
  dataType: DataType;
  objectID: string;
  object: DataModelObject;
}

export interface Activity extends DataModelObject {
  type: ActivityType;
  metadata: Array<ActivityMetadata>;
}

export interface ActivityNotification extends Activity {
  recipientUserId: string;
  seen: boolean;
}

export interface Transfer {
  userId: string;
  accountId: string;
  amount: number;
  transferSuccess: boolean;
  isCurrentMonthPaid: boolean;
}

export { Local };
