import React from "react";
import * as DataTypes from "data/types";
import s from "./QualityTagButtons.module.scss";
import {
  QualityTagStateActionTypes,
  qualityTagButtonsReducer,
  qualityTagStateInit,
} from "./QualityTagButtonsReducer";
import {
  saveQualityTagReview,
  modifyQualityTagReview,
} from "./QualityTagButtonsUtil";
import { CREATOR_QUALITY_TAGS } from "data/types/enums";
import { Button, Icon } from "antd";
import emoji100 from "assets/icons/100emoji.png";
import checkMark from "assets/icons/checkMarkIcon.svg";

interface Props {
  className?: string;
  qualityVerifications: Array<DataTypes.QualityVerification>;
  contributorUserId: string;
  resourceId: string;
  show: boolean;
  refreshQualityVerifications: () => any;
}

const emoji100Icon = () => (
  <img style={{ height: "12px", width: "12px" }} src={emoji100} />
);

const checkMarkIcon = () => (
  <img style={{ height: "12px", width: "12px" }} src={checkMark} />
);

const QualityTag = (props: Props) => {
  const [qualityTagState, dispatch] = React.useReducer(
    qualityTagButtonsReducer,
    {
      ...props,
    },
    qualityTagStateInit,
  );

  React.useEffect(() => {
    dispatch({
      type: QualityTagStateActionTypes.REFRESH_QUALITY_VERIFICATIONS,
      qualityVerifications: props.qualityVerifications,
    });
  }, [props.qualityVerifications]);
  const highQualityTeachingVerifications = React.useMemo(
    () =>
      qualityTagState.qualityVerifications &&
      qualityTagState.qualityVerifications.filter(
        q => q.qualityTag === CREATOR_QUALITY_TAGS.HIGH_QUALITY_TEACHING,
      ),
    [qualityTagState.qualityVerifications],
  );

  const contentSeemsCorrectVerifications = React.useMemo(
    () =>
      qualityTagState.qualityVerifications &&
      qualityTagState.qualityVerifications.filter(
        q => q.qualityTag === CREATOR_QUALITY_TAGS.CONTENT_SEEMS_CORRECT,
      ),
    [qualityTagState.qualityVerifications],
  );

  const userHighQualityTeachingVerifications = React.useMemo(
    () =>
      highQualityTeachingVerifications &&
      highQualityTeachingVerifications.filter(
        q => q.userId === qualityTagState.contributorUserId,
      ),
    [highQualityTeachingVerifications],
  );
  const highQualityTeachingVerificationGiven = React.useMemo(
    () =>
      userHighQualityTeachingVerifications &&
      userHighQualityTeachingVerifications.filter(q => !q.isCancelled),
    [userHighQualityTeachingVerifications],
  );

  const userContentSeemsCorrectVerifications = React.useMemo(
    () =>
      contentSeemsCorrectVerifications &&
      contentSeemsCorrectVerifications.filter(
        q => q.userId === qualityTagState.contributorUserId,
      ),
    [contentSeemsCorrectVerifications],
  );

  const modifyQualityTag = async (objectID: string, isCancelled: boolean) => {
    const saveDataResponse = await modifyQualityTagReview(
      objectID,
      isCancelled,
    );
    if (saveDataResponse.error) {
      dispatch({
        type: QualityTagStateActionTypes.FINISHED_SUBMISSION_WITH_ERROR,
        submissionError: saveDataResponse.error,
      });
    } else {
      dispatch({
        type: QualityTagStateActionTypes.CANCEL_LOADING,
      });
      props.refreshQualityVerifications();
    }
    return;
  };
  const contentSeemsCorrectVerificationGiven = React.useMemo(
    () =>
      userContentSeemsCorrectVerifications &&
      userContentSeemsCorrectVerifications.filter(q => !q.isCancelled),
    [userContentSeemsCorrectVerifications],
  );

  const handleClick = async qualityTag => {

    //Modifying

    //There should be just 1 per user x resource combo
    const userHQTVerification =
      userHighQualityTeachingVerifications &&
      userHighQualityTeachingVerifications[0];

    const userCSCVerification =
      userContentSeemsCorrectVerifications &&
      userContentSeemsCorrectVerifications[0];

    //current click is on HQT and HQT verification exists
    const isCancellingHQT =
      qualityTag === CREATOR_QUALITY_TAGS.HIGH_QUALITY_TEACHING &&
      highQualityTeachingVerificationGiven &&
      highQualityTeachingVerificationGiven.length > 0;

    //current click is on CSC and CSC verification exists
    const isCancellingCSC =
      qualityTag === CREATOR_QUALITY_TAGS.CONTENT_SEEMS_CORRECT &&
      contentSeemsCorrectVerificationGiven &&
      contentSeemsCorrectVerificationGiven.length > 0;

    //If a previous verification exists
    if (userHQTVerification || userCSCVerification) {
      if (isCancellingHQT) {
        dispatch({
          type:
            QualityTagStateActionTypes.BEGIN_HIGH_QUALITY_TEACHING_TAG_SUBMISSION,
        });
        await modifyQualityTag(userHQTVerification.objectID, true);
        return;
      }
      if (isCancellingCSC) {
        dispatch({
          type:
            QualityTagStateActionTypes.BEGIN_CONTENT_SEEMS_CORRECT_TAG_SUBMISSION,
        });
        await modifyQualityTag(userCSCVerification.objectID, true);
        return;
      }
      //If hasn't returned yet => previous verification exists but not active
      if (
        qualityTag === CREATOR_QUALITY_TAGS.HIGH_QUALITY_TEACHING &&
        userHQTVerification
      ) {
        dispatch({
          type:
            QualityTagStateActionTypes.BEGIN_HIGH_QUALITY_TEACHING_TAG_SUBMISSION,
        });
        await modifyQualityTag(userHQTVerification.objectID, false);
        return;
      }

      if (
        qualityTag === CREATOR_QUALITY_TAGS.CONTENT_SEEMS_CORRECT &&
        userCSCVerification
      ) {
        dispatch({
          type:
            QualityTagStateActionTypes.BEGIN_CONTENT_SEEMS_CORRECT_TAG_SUBMISSION,
        });
        await modifyQualityTag(userCSCVerification.objectID, false);
        return;
      }
    }

    //Creating
    const isValidHighQualityTeachingVerification =
      qualityTag === CREATOR_QUALITY_TAGS.HIGH_QUALITY_TEACHING &&
      !(
        highQualityTeachingVerificationGiven &&
        highQualityTeachingVerificationGiven.length > 0
      );
    const isValidContentSeemsCorrectVerification =
      qualityTag === CREATOR_QUALITY_TAGS.CONTENT_SEEMS_CORRECT &&
      !(
        contentSeemsCorrectVerificationGiven &&
        contentSeemsCorrectVerificationGiven.length > 0
      );

    if (isValidHighQualityTeachingVerification) {
      dispatch({
        type:
          QualityTagStateActionTypes.BEGIN_HIGH_QUALITY_TEACHING_TAG_SUBMISSION,
      });
    } else if (isValidContentSeemsCorrectVerification) {
      dispatch({
        type:
          QualityTagStateActionTypes.BEGIN_CONTENT_SEEMS_CORRECT_TAG_SUBMISSION,
      });
    }

    if (
      isValidHighQualityTeachingVerification ||
      isValidContentSeemsCorrectVerification
    ) {
      const saveDataResponse = await saveQualityTagReview(
        qualityTagState.contributorUserId,
        qualityTagState.resourceId,
        qualityTag,
      );
      console.log(saveDataResponse);
      if (saveDataResponse.error) {
        dispatch({
          type: QualityTagStateActionTypes.FINISHED_SUBMISSION_WITH_ERROR,
          submissionError: saveDataResponse.error,
        });
      } else {
        dispatch({
          type: QualityTagStateActionTypes.FINISHED_SUBMISSION_SUCCESSFULLY,
          qualityVerification: saveDataResponse.qualityVerificationResponse,
        });
      }
    }
  };

  return (
    props.show && (
      <div className={s.qualityTagButtonContainer}>
        <div className={s.qualitTagButtonTextContainer}>
          <div className={s.qualityTagButtonContainerHeader}>
            What do you think of this video? (Creators only)
          </div>
          <div>
            You’re the expert! Help us verify the quality of this video so we
            can build the best possible learning experience.
          </div>
        </div>

        <div className={s.qualitTagButtonButtonContainer}>
          <Button
            className={`${s.qualityTagButton} ${
              contentSeemsCorrectVerificationGiven &&
                contentSeemsCorrectVerificationGiven.length
                ? s.highlightedQualityTagButton
                : ""
              }`}
            onClick={() =>
              handleClick(CREATOR_QUALITY_TAGS.CONTENT_SEEMS_CORRECT)
            }
            disabled={qualityTagState.isLoadingContentSeemsCorrectButton}
          >
            <Icon component={checkMarkIcon} /> Content is Correct
          </Button>

          <Button
            className={`${s.qualityTagButton} ${
              highQualityTeachingVerificationGiven &&
                highQualityTeachingVerificationGiven.length
                ? s.highlightedQualityTagButton
                : ""
              }`}
            style={{ marginTop: "10px" }}
            onClick={() =>
              handleClick(CREATOR_QUALITY_TAGS.HIGH_QUALITY_TEACHING)
            }
            disabled={qualityTagState.isLoadingHighQualityTeachingButton}
          >
            <Icon component={emoji100Icon} /> Teaching is Great
          </Button>
        </div>
      </div>
    )
  );
};

export default QualityTag;
