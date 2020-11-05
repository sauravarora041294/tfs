import * as DataTypes from "data/types";
import React from "react";
import {
  contentRequestsReducer,
  contentRequestsStateInit,
  ContentRequestCardStateActionTypes,
} from "./ContentRequestsCardReducer";
import { saveFormData, saveUpvoteData } from "./ContentRequestsCardUtil";
import ContentRequestsCardFeed from "./ContentRequestsCardFeed.react";
import { Collapse, Divider, Modal, Form, Card, Icon, notification } from "antd";
import s from "./ContentRequestsCard.module.scss";
import diversity from "assets/images/diversity_ 1.svg";
import plusicon from "assets/images/plusIcon.svg";
import plusIconCollpase from "assets/icons/plusIconBlue.svg";
import { Image } from "semantic-ui-react";
import TextAreaInputField from "components/AaspireBasicComponents/AaspireBasicFormComponents/TextAreaInputField";
import AaspireButton, {
  AaspireButtonType,
} from "components/AaspireBasicComponents/AaspireButton";
import TypographyTitle, {
  TypographyTitleType,
} from "components/AaspireBasicComponents/Typography/TypographyTitle";
import { castFormToRefForwardingComponent } from "utilities/index";

interface Props {
  currentUser: DataTypes.User;
  missionId: string;
  contentRequests: Array<DataTypes.ContentRequest>;
}

const getWindowDimensions = (): { width: number; height: number } => {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
};
const plusIconSVG = () => {
  return (
    <Image
      style={{ display: "inline-block", height: "15px", width: "15px" }}
      src={plusicon}
    />
  );
};

const SMALL_SCREEN_WIDTH_THRESHOLD = 576;

const ContentRequestsCardView: React.FC<Props> = (props: Props) => {
  const dimension = getWindowDimensions();
  const [contentRequestsState, dispatch] = React.useReducer(
    contentRequestsReducer,
    { ...props, windowDimensions: dimension },
    contentRequestsStateInit,
  );

  React.useEffect(() => {
    const handleResize = () => {
      dispatch({
        type: ContentRequestCardStateActionTypes.CHANGE_DIMENSIONS,
        windowDimensions: getWindowDimensions(),
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const contentRequestFormRef: React.MutableRefObject<any> = React.useRef()!;

  const handleSubmit = async e => {
    e.preventDefault();
    contentRequestFormRef.current.validateFieldsAndScroll(
      async (err, values) => {
        if (!err) {
          dispatch({
            type: ContentRequestCardStateActionTypes.BEGIN_FORM_SUBMISSION,
          });
          const saveDataResponse = await saveFormData(
            props.currentUser.userId,
            props.missionId,
            values.description,
          );
          if (saveDataResponse.error) {
            dispatch({
              type:
                ContentRequestCardStateActionTypes.FINISHED_FORM_SUBMISSION_WITH_ERROR,
              submissionError: saveDataResponse.error,
            });
          } else {
            dispatch({
              type:
                ContentRequestCardStateActionTypes.FINISHED_FORM_SUBMISSION_SUCCESSFULLY,
              contentRequests: [
                ...contentRequestsState.contentRequests,
                saveDataResponse.contentRequestResponse,
              ],
            });
            dispatch({
              type: ContentRequestCardStateActionTypes.TOGGLE_MODAL_VISIBILITY,
            });
            notification.info({
              message: `Success!`,
              description: "Your content request was submitted successfully!",
              placement: "bottomRight",
              icon: (
                <Icon
                  type="check-circle"
                  theme="filled"
                  style={{ color: "green" }}
                />
              ),
            });
          }
        }
      },
    );
  };

  const handleCancel = () => {
    dispatch({
      type: ContentRequestCardStateActionTypes.TOGGLE_MODAL_VISIBILITY,
    });
  };
  const handleUpvote = async (contentRequest: DataTypes.ContentRequest) => {
    const currentUserId = contentRequestsState.currentUser.userId;
    const upvoterUserIds = contentRequest.upvoterUserIds || [];
    const currentContentRequests = contentRequestsState.contentRequests;
    if (!upvoterUserIds.includes(currentUserId)) {
      const upvotedContentRequest = {
        ...contentRequest,
        upvotes: contentRequest.upvotes + 1,
        upvoterUserIds: [...upvoterUserIds, props.currentUser.userId],
      };
      const contentRequestsWithPendingUpvote = [
        ...currentContentRequests.filter(
          c => c.objectID !== contentRequest.objectID,
        ),
        upvotedContentRequest,
      ];

      dispatch({
        type: ContentRequestCardStateActionTypes.BEGIN_UPVOTE,
        contentRequests: contentRequestsWithPendingUpvote,
      });
    } else {
      const contentRequestWithCancelledUpvote = {
        ...contentRequest,
        upvotes: contentRequest.upvotes - 1,
        upvoterUserIds: [...upvoterUserIds.filter(id => id !== currentUserId)],
      };

      const contentRequestsWithPendingCancelledUpvote = [
        ...currentContentRequests.filter(
          c => c.objectID !== contentRequest.objectID,
        ),
        contentRequestWithCancelledUpvote,
      ];

      dispatch({
        type: ContentRequestCardStateActionTypes.BEGIN_UPVOTE,
        contentRequests: contentRequestsWithPendingCancelledUpvote,
      });
    }
    const saveUpvoteResponse = await saveUpvoteData({
      contentRequestId: contentRequest.objectID,
      upvoterUserId: currentUserId,
    });
    if (saveUpvoteResponse.error) {
      dispatch({
        type: ContentRequestCardStateActionTypes.FINISHED_UPVOTE_WITH_ERROR,
        upvoteError: saveUpvoteResponse.error,
      });
    }
  };

  const ContentRequestForm = (props, ref) => {
    const formRef = React.useRef();
    React.useImperativeHandle(ref, () => ({}));
    return (
      <Form ref={formRef}>
        <Form.Item colon={false}>
          {props.form.getFieldDecorator("description", {
            rules: [
              {
                required: true,
                message: "Please enter a description of your content request",
              },
            ],
          })(
            <TextAreaInputField
              rows={4}
              placeholder="Make your request here"
            />,
          )}
        </Form.Item>
        <AaspireButton
          key="submit"
          type="primary"
          loading={contentRequestsState.isSubmittingForm}
          onClick={handleSubmit}
          subType={AaspireButtonType.FULL_WIDTH}
        >
          Submit Request
        </AaspireButton>
      </Form>
    );
  };

  const ContentRequestFormEnhanced = Form.create({ name: "contentrequest" })(
    React.forwardRef(castFormToRefForwardingComponent(ContentRequestForm)),
  );

  const contentRequestCardHeader = React.useMemo(
    () => (
      <TypographyTitle
        type={TypographyTitleType.CARD_SUB_SUB_TITLE}
        color={"white"}
      >
        <div className={s.headerText}>Content Requests</div>
      </TypographyTitle>
    ),
    [contentRequestsState.cardOpen],
  );

  const contentRequestCardContent = React.useMemo(
    () => (
      <div>
        <div
          className={s.newRequestContainer}
          onClick={e =>
            dispatch({
              type: ContentRequestCardStateActionTypes.TOGGLE_MODAL_VISIBILITY,
            })
          }
        >
          <div className={s.header}>
            <div>{plusIconSVG()} &nbsp; New Request</div>
            <div className={s.contentRequestCardImage}>
              <img src={diversity} alt="" />
            </div>
          </div>
          <div className={s.contentRequestDescription}>
            Tell us which content you’d like us to add! Click the new request
            button to submit a content request.
          </div>
        </div>
        <div className={s.newRequestSubHeader}>
          <div className={s.text}>In this Collection</div>
          <div className={s.toggleButtons}>
            <span
              className={`${s.toggleTopVoted} ${
                contentRequestsState.activeTab == "topVoted"
                  ? s.activeToggleButton
                  : ""
                }`}
              onClick={e =>
                dispatch({
                  type: ContentRequestCardStateActionTypes.TOGGLE_ACTIVE_TAB,
                  activeTab: "topVoted",
                })
              }
            >
              Top Voted
            </span>
            <span
              className={`${s.toggleRecent} ${
                contentRequestsState.activeTab == "recent"
                  ? s.activeToggleButton
                  : ""
                }`}
              onClick={e =>
                dispatch({
                  type: ContentRequestCardStateActionTypes.TOGGLE_ACTIVE_TAB,
                  activeTab: "recent",
                })
              }
            >
              Recent
            </span>
          </div>
        </div>
      </div>
    ),
    [contentRequestsState.activeTab],
  );

  const largeScreenContentRequestCard = React.useMemo(
    () => (
      <Collapse
        className={s.collapsibleCardContainer}
        defaultActiveKey={["1"]}
        expandIcon={({ isActive }) =>
          isActive ? (
            <Icon type="minus" style={{ color: "white", fontSize: "20px" }} />
          ) : (
              <Icon type="plus" style={{ color: "white", fontSize: "20px" }} />
            )
        }
        expandIconPosition="right"
        onChange={e =>
          dispatch({
            type: ContentRequestCardStateActionTypes.TOGGLE_OPEN_CARD,
            cardOpen: !contentRequestsState.cardOpen,
          })
        }
      >
        <Collapse.Panel
          className={
            contentRequestsState.cardOpen
              ? s.contentRequestCardPanel
              : s.contentRequestCardPanelClosed
          }
          header={contentRequestCardHeader}
          key="1"
          style={{ padding: "0 !important" }}
        >
          <div className={s.largeScreenContentContainer}>
            {contentRequestCardContent}

            <div className={s.largeScreenFeedContainer}>
              <ContentRequestsCardFeed
                windowWidth={400}
                currentUser={contentRequestsState.currentUser}
                contentRequestFormRef={contentRequestFormRef}
                contentRequests={contentRequestsState.contentRequests.filter(
                  contentRequest => contentRequest.status !== "RESOLVED",
                )}
                handleSubmit={handleSubmit}
                handleUpvote={handleUpvote}
                isLoading={contentRequestsState.isSubmittingForm}
                activeTab={contentRequestsState.activeTab}
              />
            </div>
          </div>
        </Collapse.Panel>
      </Collapse>
    ),
    [contentRequestsState, contentRequestCardContent, contentRequestCardHeader],
  );

  const smallScreenContentRequestCard = React.useMemo(
    () => (
      <Card className={s.smallScreenCard}>
        {" "}
        <TypographyTitle type={TypographyTitleType.CARD_SUB_TITLE}>
          Content Requests
        </TypographyTitle>
        {contentRequestCardContent}
        <ContentRequestsCardFeed
          windowWidth={contentRequestsState.windowDimensions.width}
          currentUser={contentRequestsState.currentUser}
          contentRequestFormRef={contentRequestFormRef}
          contentRequests={contentRequestsState.contentRequests.filter(
            contentRequest => contentRequest.status !== "RESOLVED",
          )}
          handleSubmit={handleSubmit}
          handleUpvote={handleUpvote}
          isLoading={contentRequestsState.isSubmittingForm}
          activeTab={contentRequestsState.activeTab}
        />
      </Card>
    ),
    [contentRequestsState, contentRequestCardHeader, contentRequestCardContent],
  );

  const contentRequestCardMainContent = React.useMemo(
    () =>
      contentRequestsState.windowDimensions.width <=
        SMALL_SCREEN_WIDTH_THRESHOLD
        ? smallScreenContentRequestCard
        : largeScreenContentRequestCard,
    [
      contentRequestsState.windowDimensions,
      smallScreenContentRequestCard,
      largeScreenContentRequestCard,
    ],
  );

  return (
    <React.Fragment>
      {contentRequestCardMainContent}
      <Modal
        title="Request Content for this Collection"
        visible={contentRequestsState.isVisibleModal}
        onCancel={handleCancel}
        footer={null}
      >
        <ContentRequestFormEnhanced ref={contentRequestFormRef} {...props} />
      </Modal>
    </React.Fragment>
  );
};

export default ContentRequestsCardView;
