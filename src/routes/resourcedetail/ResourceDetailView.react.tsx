import * as DataTypes from "data/types";
import React, { useState } from "react";
import { withRouter } from "react-router";
import { compose } from "recompose";
import RESTAPIClient from "RESTAPIClient";
import { Responsive } from "semantic-ui-react";
import { History } from "history";
import s from "./ResourceDetail.module.scss";
import ResourceDetailPlaylistCard from "./ResourceDetailPlaylistCard.react";
import ResourceDetailRating from "./ResourceDetailRating.react";
import {
  ResourceDetailStateActionTypes,
  resourceDetailReducer,
  resourceDetailStateInit,
} from "./ResourceDetailReducer";
import ResourceDetailRelatedCard from "./ResourceDetailRelatedCard.react";
import {
  getNextResourceId,
  getOrderedResourceIdsForPlaylist,
  getViewProgressByResourceId,
  fetchQUalityVerifications,
} from "./ResourceDetailUtil";
import { getFormattedQualityTag } from "utilities";
import ResourceDetailVideoPlayer from "./ResourceDetailVideoPlayer.react";
import { Divider, Row, Tag, Col, Typography, Icon, Card } from "antd";
import QualityTagButtons from "components/QualityTagButtons";
import CreatorAvatar from "components/CreatorAvatar";
import AddRatingModal from "components/Modals/AddRatingModal";
import SignupModal from "components/Modals/SignupModal";
import SignupOverlay from "components/SignupOverlay";
import moment from "moment";
import DataSyncJobQueue, {
  DataSyncJobTypes,
  SaveViewlogJobInfo,
} from "utilities/datasyncjobqueue";
import { getTimeSinceString } from "utilities";
import { FirestoreRealtime } from "FirebaseClient";
import useResizeAware from "react-resize-aware";
import { useMediaQuery } from "react-responsive";
import ContentFeedView from "components/Views/ContentFeedView";
import TypographyTitle, {
  TypographyTitleType,
} from "components/AaspireBasicComponents/Typography/TypographyTitle";
import TypographyDescription, {
  TypographyDescriptionType,
} from "components/AaspireBasicComponents/Typography/TypographyDescription";
import WhiteCard from "components/WhiteCard";
import { MarginType } from "data/styleTypes";
import noTagIcon from "assets/icons/noTags.svg";

const noTagIconComponent = () => {
  return <img src={noTagIcon} />;
};
interface Props {
  isPublic: boolean;
  currentUser: DataTypes.User;
  currentResource: DataTypes.Resource;
  playlist: DataTypes.Playlist;
  playlistResources: Array<DataTypes.Resource>;
  userLatestViewlogs: DataTypes.UserLatestViewlogs;
  relatedResources: Array<DataTypes.Resource>;
  qualityVerifications: Array<DataTypes.QualityVerification>;
  contributors: Array<DataTypes.User>;
  history?: History;
  error?: Error;
  userRating?: number;
}

const ResourceDetailView: React.FC<Props> = (props: Props) => {
  //Init state with values from props. Only use state after this point.
  const [resourceDetailState, dispatch] = React.useReducer(
    resourceDetailReducer,
    { ...props },
    resourceDetailStateInit,
  );
  React.useEffect(() => {
    // This is the only way to scroll to top on load
    const htmlTag = document.documentElement;
    const bodyTag = document.body;
    htmlTag ? (htmlTag.scrollTop = 0) : (bodyTag.scrollTop = 0);

    return () => {
      DataSyncJobQueue.processJobsByType(DataSyncJobTypes.SAVE_VIEWLOG);
    };
  }, []);

  const resourceListenerCallback = (object: any) => {
    object &&
      dispatch({
        type: ResourceDetailStateActionTypes.UPDATE_RESOURCE,
        resource: object as DataTypes.Resource,
      });
  };

  React.useEffect(() => {
    const detachResourceObserver =
      props.currentResource.objectID &&
      FirestoreRealtime.listenToDocument({
        collection: FirestoreRealtime.collections.RESOURCES,
        documentId: props.currentResource.objectID,
        callback: resourceListenerCallback,
      });
    return () => detachResourceObserver && detachResourceObserver();
  }, [props.currentResource.objectID]);

  const creator = props.currentResource.metadata
    ? props.currentResource.metadata.creator
    : null;
  const currentUserId =
    (resourceDetailState.currentUser &&
      resourceDetailState.currentUser.objectID) ||
    null;

  //Using ref because we need synchronous updates to this
  const playedPercentage = React.useRef(
    getViewProgressByResourceId(
      resourceDetailState.currentResource.objectID,
      resourceDetailState.userLatestViewlogs,
    ),
  );

  const openAddRatingModal = React.useCallback(
    (rating: number) => {
      dispatch({
        type: ResourceDetailStateActionTypes.SHOW_ADD_RATING_MODAL,
        addRatingModalInitialRating: rating,
      });
    },
    [dispatch],
  );

  const closeAddRatingModal = React.useCallback((shouldReload: boolean) => {
    dispatch({
      type: ResourceDetailStateActionTypes.HIDE_ADD_RATING_MODAL,
    });
  }, [dispatch]);

  const setCurrentUserRating = React.useCallback(
    (rating: number) => {
      dispatch({
        type: ResourceDetailStateActionTypes.SET_CURRENT_USER_RATING,
        userRating: rating,
      });
    },
    [dispatch],
  );

  const openSignupModal = React.useCallback(() => {
    dispatch({
      type: ResourceDetailStateActionTypes.SHOW_SIGNUP_MODAL,
    });
  }, [dispatch]);

  const closeSignupModal = React.useCallback(() => {
    dispatch({
      type: ResourceDetailStateActionTypes.HIDE_SIGNUP_MODAL,
    });
  }, [dispatch]);

  const saveRating = React.useCallback(
    async (newUserRating: number, newUserFeedback: string) => {
      await RESTAPIClient.Rating.create(
        currentUserId,
        resourceDetailState.currentResource.objectID,
        newUserRating,
        newUserFeedback,
        resourceDetailState.currentResource.creatorUserId,
      );
    },
    [
      resourceDetailState.currentResource.creatorUserId,
      currentUserId,
      resourceDetailState.currentResource.objectID,
    ],
  );

  const onRatingSelected = React.useCallback(
    async (rating: number) => {
      if (props.isPublic) {
        openSignupModal();
      } else {
        openAddRatingModal(rating);
      }
    },
    [openAddRatingModal, saveRating, setCurrentUserRating],
  );

  const onRatingCreated = React.useCallback(
    async (rating: number, feedback: string) => {
      try {
        await saveRating(rating, feedback);
        setCurrentUserRating(rating);
        closeAddRatingModal(true);
      } catch (e) {
        dispatch({
          type: ResourceDetailStateActionTypes.SHOW_RATING_SUBMISSION_ERROR
        })
      }
    },
    [closeAddRatingModal, saveRating],
  );

  const saveViewlog = React.useCallback(async () => {
    const resourceId = resourceDetailState.currentResource.objectID;
    const watchedDuration = playedPercentage.current;
    if (!props.isPublic) {
      await RESTAPIClient.Viewlog.create(
        currentUserId,
        resourceId,
        true,
        watchedDuration,
      );
    }
  }, [
    resourceDetailState.currentUser,
    resourceDetailState.currentResource.objectID,
  ]);

  const updatePlayedPercentage = React.useCallback(played => {
    playedPercentage.current = played;
    if (!resourceDetailState.isPublic) {
      const saveViewLogJobInfo: SaveViewlogJobInfo = {
        viewEndTime: playedPercentage.current,
        completed: playedPercentage.current >= 0.99,
        resourceId: resourceDetailState.currentResource.objectID,
        userId: resourceDetailState.currentUser.objectID,
      };
      DataSyncJobQueue.replace(
        DataSyncJobTypes.SAVE_VIEWLOG,
        saveViewLogJobInfo,
        (opInfo: SaveViewlogJobInfo) =>
          opInfo.userId === resourceDetailState.currentUser.objectID &&
          opInfo.resourceId === resourceDetailState.currentResource.objectID,
      );
    }
  }, []);

  const selectResource = React.useCallback(
    async (resourceId: string) => {
      if (resourceDetailState.playlistResources) {
        const newResource = resourceDetailState.playlistResources.find(
          resource => resource.objectID === resourceId,
        );
        if (newResource) {
          props.history.push(
            `/playlist/${resourceDetailState.playlist.objectID}/resource/${newResource.objectID}`,
          );
        }
      } else if (resourceDetailState.relatedResources) {
        const newResource = resourceDetailState.relatedResources.find(
          resource => resource.objectID === resourceId,
        );
        if (newResource) {
          props.history.push(`/resource/${newResource.objectID}`);
        }
      }
    },
    [
      resourceDetailState.playlist,
      resourceDetailState.playlistResources,
      resourceDetailState.relatedResources,
      props.history,
      saveViewlog,
    ],
  );

  const handleNextVideo =
    props.playlistResources && props.playlistResources.length
      ? async () => {
        const currentResourceId =
          resourceDetailState.currentResource.objectID;
        const currentPlaylistId = resourceDetailState.playlist.objectID;
        const orderedPlaylistResourceIds = getOrderedResourceIdsForPlaylist(
          resourceDetailState.playlist,
          resourceDetailState.playlistResources,
        );
        const currentResourceIndex = orderedPlaylistResourceIds.indexOf(
          currentResourceId,
        );
        const nextResourceIds = orderedPlaylistResourceIds.slice(
          currentResourceIndex + 1,
        );
        if (nextResourceIds.length) {
          props.history.push(
            `/playlist/${currentPlaylistId}/resource/${nextResourceIds[0]}`,
          );
        }
      }
      : null;

  const videoDidEnd = React.useCallback(async () => {
    await DataSyncJobQueue.processJobsByType(DataSyncJobTypes.SAVE_VIEWLOG);
    if (resourceDetailState.isPublic) return;
    if (props.playlistResources) {
      const orderedPlaylistResourceIds = getOrderedResourceIdsForPlaylist(
        resourceDetailState.playlist,
        resourceDetailState.playlistResources,
      );
      const nextResourceId = getNextResourceId(
        resourceDetailState.currentResource.objectID,
        orderedPlaylistResourceIds,
        resourceDetailState.userLatestViewlogs,
      );
      if (nextResourceId) {
        selectResource(nextResourceId);
      }
    } else if (props.relatedResources && props.relatedResources.length) {
      const orderedRelatedResourceIds = resourceDetailState.relatedResources.map(
        resource => resource.objectID,
      );
      const nextResourceId = getNextResourceId(
        resourceDetailState.currentResource.objectID,
        orderedRelatedResourceIds,
        resourceDetailState.userLatestViewlogs,
      );
      if (nextResourceId) {
        selectResource(nextResourceId);
      }
    }
  }, [
    resourceDetailState.currentResource.objectID,
    resourceDetailState.playlist,
    selectResource,
    props.playlistResources,
    props.relatedResources,
    currentUserId,
    resourceDetailState.playlistResources,
    resourceDetailState.relatedResources,
    resourceDetailState.userLatestViewlogs,
  ]);

  const relatedVideosCard = resourceDetailState.relatedResources ? (
    <ResourceDetailRelatedCard
      currentUser={props.currentUser}
      relatedResources={resourceDetailState.relatedResources}
      currentResource={resourceDetailState.currentResource}
      selectResource={selectResource}
      openSignupModal={openSignupModal}
      userLatestViewlogs={resourceDetailState.userLatestViewlogs}
      isPublic={resourceDetailState.isPublic}
    />
  ) : null;

  const setTruncatedTextWidth = React.useCallback((width: number) => {
    return dispatch({
      type: ResourceDetailStateActionTypes.SET_TRUNCATED_TEXT_WIDTH,
      truncatedTextWidth: width
    })
  }, [dispatch])

  const playlistCard = resourceDetailState.playlistResources ? (
    <ResourceDetailPlaylistCard
      currentUser={props.currentUser}
      currentResource={resourceDetailState.currentResource}
      playlistResources={resourceDetailState.playlistResources}
      playlist={resourceDetailState.playlist}
      userLatestViewlogs={resourceDetailState.userLatestViewlogs}
      selectResource={selectResource}
      openSignupModal={openSignupModal}
      isPublic={resourceDetailState.isPublic}
      setPlaylistCardSectionTextWidth={setTruncatedTextWidth}
      playlistCardSectionTextWidth={resourceDetailState.truncatedTextWidth}
    />
  ) : null;

  const rightSideCard = props.playlistResources
    ? playlistCard
    : relatedVideosCard;

  const addRatingModal = React.useMemo(() => {
    return resourceDetailState.showAddRatingModal &&
      <AddRatingModal
        show={true}
        rating={resourceDetailState.addRatingModalInitialRating}
        onRatingCreated={onRatingCreated}
        closeModal={closeAddRatingModal}
        showSubmissionError={resourceDetailState.showRatingSubmissionError}
      />
  }, [
    resourceDetailState.showAddRatingModal,
    resourceDetailState.addRatingModalInitialRating,
    closeAddRatingModal,
    onRatingCreated,
    resourceDetailState.showRatingSubmissionError
  ]);

  const signupModal = React.useMemo(
    () => (
      <SignupModal
        show={resourceDetailState.showSignupModal}
        onCancel={closeSignupModal}
      />
    ),
    [resourceDetailState.showSignupModal],
  );

  const { _seconds, seconds } = resourceDetailState.currentResource
    .dateCreated as any;

  const timeSinceCreatedString = getTimeSinceString(_seconds || seconds);
  const timeElapsedWords = React.useMemo(() => {
    return timeSinceCreatedString.split(" ");
  }, [timeSinceCreatedString]);

  const videoDateCreatedStringRepr = moment
    .unix(_seconds || seconds)
    .format("MMM Do, YYYY");

  const isApprovedContributor =
    resourceDetailState.contributors &&
    resourceDetailState.contributors.filter(
      c => c.userId === resourceDetailState.currentUser.userId,
    ).length;

  const isResourceCreator =
    !resourceDetailState.isPublic &&
    resourceDetailState.currentResource.creatorUserId ===
    resourceDetailState.currentUser.objectID;

  const refreshQualityVerifications = async () => {
    const response = await fetchQUalityVerifications(
      props.currentUser.objectID,
      props.currentResource.objectID,
    );
    if (!response.error) {
      dispatch({
        type: ResourceDetailStateActionTypes.REFRESH_QUALITY_VERIFICATIONS,
        qualityVerifications: response.resourceQualityVerificationsByUser,
      });
    }
  };

  React.useEffect(() => {
  }, [resourceDetailState.qualityVerifications]);

  const qualityTagButtons =
    isApprovedContributor && !isResourceCreator ? (
      <QualityTagButtons
        refreshQualityVerifications={refreshQualityVerifications}
        qualityVerifications={resourceDetailState.qualityVerifications}
        contributorUserId={currentUserId}
        resourceId={resourceDetailState.currentResource.objectID}
        show
      />
    ) : null;

  const qualityTags = resourceDetailState.currentResource &&
    resourceDetailState.currentResource.qualityTags &&
    resourceDetailState.currentResource.qualityTags.length > 0 && (
      <Row className={s.resourceDetailQualityTags}>
        {resourceDetailState.currentResource.qualityTags.map(q => (
          <Tag color="blue" className={s.resourceDetailQualityTag}>
            {getFormattedQualityTag(q)}
          </Tag>
        ))}
      </Row>
    );

  // Resize listener to make video Container & resourceDetailRightSideCardColumn size equal
  const [resizeListener, sizes] = useResizeAware();

  // To remove resize listener on screen < 1200px
  const handleMediaQueryChange = (matches: boolean) => {
    setIsRemoveResizeListerner(matches);
  };
  const showMobileView = useMediaQuery(
    { maxWidth: 1199 },
    undefined,
    handleMediaQueryChange,
  );
  const [isRemoveResizeListerner, setIsRemoveResizeListerner] = useState<
    boolean
  >(showMobileView);
  return (
    <div>
      {addRatingModal}
      {signupModal}
      <div className={s.resourceDetailRoot}>
        <div className={`${s.resourceDetailGrid} resourceDetailGrid`}>
          <WhiteCard className={`${s.videoContainer} position-relative`}>
            {!isRemoveResizeListerner && resizeListener}
            <ResourceDetailVideoPlayer
              resourceDetailState={resourceDetailState}
              videoDidEnd={videoDidEnd}
              updatePlayedPercentage={updatePlayedPercentage}
              onNext={handleNextVideo}
            />
            <Row className={s.videoHeadingRow}>
              <TypographyTitle
                className={s.videoHeadingRowTitleText}
                type={TypographyTitleType.CARD_SUB_TITLE}
              >
                {resourceDetailState.currentResource.title}
              </TypographyTitle>

              <div className={s.videoHeadingFooter}>
                {qualityTags ? (
                  <div className={s.videoHeadingQualityTags}>{qualityTags}</div>
                ) : (
                    <Tag color="#EFF3FB" className={s.noTagsTag}>
                      <div className={s.noTagsContainer}>
                        <Icon component={noTagIconComponent}></Icon>
                        <span className={s.noTagsText}>No tags yet</span>
                      </div>
                    </Tag>
                  )}
                <div className={s.ViewsDurationRatingContainer}>
                  {/* Views */}
                  <div>
                    <span className={s.cardViewsCount}>{`${resourceDetailState
                      .currentResource.totalViews || 0}`}</span>
                    <span className={s.cardViewsText}>
                      View
                      {resourceDetailState.currentResource.totalViews !== 1
                        ? "s"
                        : ""}
                    </span>
                  </div>

                  <div className="verticalLine">|</div>

                  {/* Duration */}
                  {timeSinceCreatedString && (
                    <>
                      <div className={s.cardViewsAndDurationContainer}>
                        <span className={s.cardViewsCount}>
                          {`${timeElapsedWords[0]}${
                            timeElapsedWords[1].toLowerCase().substr(0, 2) ===
                              "mo"
                              ? timeElapsedWords[1].toLowerCase().substr(0, 2)
                              : timeElapsedWords[1].toLowerCase().charAt(0)
                            }
                                    `}
                        </span>
                        <span className={s.cardViewsText}>Ago</span>
                      </div>
                      <div className="verticalLine">|</div>
                    </>
                  )}

                  {/* Rating */}
                  {resourceDetailState.currentResource.avgRating ? (
                    <div className={s.cardRating}>
                      <span className="ant-rate-text">
                        {resourceDetailState.currentResource.avgRating.toFixed(
                          1,
                        )}
                      </span>
                      <Icon type="star" theme="filled" />
                    </div>
                  ) : (
                      <div className={s.noRatingsText}>No Ratings</div>
                    )}
                </div>
              </div>

              <div className="showAt575px">
                <ResourceDetailRating
                  avgRating={resourceDetailState.userRating || 0}
                  onRatingSelected={onRatingSelected}
                />
              </div>
            </Row>

            <div className="horizontalLine"></div>
            {qualityTagButtons}
            <div className={s.videoDetailsFooter}>
              <Row className={s.creatorAvatarRow}>
                <CreatorAvatar
                  textClassName={s.creatorAvatar}
                  large={true}
                  creator={creator}
                  showCreatorDescription
                />
                <div className="hideAt575px">
                  <ResourceDetailRating
                    avgRating={resourceDetailState.userRating}
                    onRatingSelected={onRatingSelected}
                  />
                </div>
              </Row>
              <Row>
                <TypographyDescription
                  type={TypographyDescriptionType.PRIMARY_DESCRIPTION}
                  withMargin={MarginType.TOP_AND_BOTTOM}
                >
                  {resourceDetailState.currentResource &&
                    resourceDetailState.currentResource.description
                      .split("\n")
                      .map(text => {
                        return <div>{text}</div>;
                      })}
                </TypographyDescription>
              </Row>
            </div>
          </WhiteCard>
          <div className={s.resourceDetailRightSideCardColumn}>
            <div
              style={{
                height: isRemoveResizeListerner ? "100%" : sizes.height,
                width: "100%",
              }}
            >
              {rightSideCard}
            </div>
          </div>
        </div>
        {props.playlistResources ? (
          <WhiteCard
            className={`${s.resourceDetailGrid} resourceDetailGrid`}
            withMargin={MarginType.TOP_AND_BOTTOM}
          >
            <div className="width-100">
              <TypographyTitle type={TypographyTitleType.CARD_SUB_TITLE}>
                Related Resources & Playlists
              </TypographyTitle>
              <TypographyDescription
                type={TypographyDescriptionType.PRIMARY_DESCRIPTION}
              >
                Here are some related videos & playlists that you might find
                useful.
              </TypographyDescription>
              {resourceDetailState.relatedResources ? (
                <ContentFeedView
                  results={resourceDetailState.relatedResources}
                  userLatestViewlogs={resourceDetailState.userLatestViewlogs}
                  title={""}
                  horizontalOnMobile
                />
              ) : (
                  ""
                )}
            </div>
          </WhiteCard>
        ) : (
            ""
          )}
        <SignupOverlay show={resourceDetailState.isPublic} block />
      </div>
    </div>
  );
};

export default compose<Props, Props>(withRouter)(ResourceDetailView);
