import { Button, Rate, Alert } from "antd";
import React from "react";
import s from "./FeedbackCard.module.scss";
import {
  FeedbackCardStateActionTypes,
  feedbackCardReducer,
  feedbackCardStateInit,
} from "./FeedbackCardReducer.react";
import TextAreaInputField from "components/AaspireBasicComponents/AaspireBasicFormComponents/TextAreaInputField";

interface Props {
  rating: number;
  onSubmit: (rating: number, feedback: string) => void;
}

const FeedbackCard: React.FC<Props> = (props: Props) => {
  const [feedbackCardState, dispatch] = React.useReducer(
    feedbackCardReducer,
    {
      rating: props.rating,
      feedback: null,
      error: null,
      disableSubmitButton: false
    },
    feedbackCardStateInit,
  );

  const setError = (error: string) => {
    return dispatch({
      type: FeedbackCardStateActionTypes.SET_ERROR,
      error: error,
    });
  };

  const setRating = (rating: number) => {
    return dispatch({
      type: FeedbackCardStateActionTypes.SET_RATING,
      rating: rating,
    });
  };

  const setFeedback = (feedback: string) => {
    return dispatch({
      type: FeedbackCardStateActionTypes.SET_FEEDBACK,
      feedback: feedback,
    });
  };

  const errorAlert = React.useMemo(() => {
    return feedbackCardState.error ? (
      <Alert
        className={s.feedbackCardError}
        showIcon
        message="Error"
        description={feedbackCardState.error}
        type="error"
      />
    ) : null;
  }, [feedbackCardState.error]);

  const handleSubmit = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault();
    return feedbackCardState.rating === 0
      ? setError("Selecting a rating is required.")
      : props.onSubmit(feedbackCardState.rating, feedbackCardState.feedback);
  };

  return (
    <div className={s.resourceDetailFeedbackCard}>
      <Rate
        className={s.feedbackCardRatingStars}
        onChange={(rating: number) => setRating(rating)}
        value={feedbackCardState.rating}
        allowClear={false}
      />
      <TextAreaInputField
        rows={4}
        onChange={e => setFeedback(e.target.value)}
        value={feedbackCardState.feedback}
        autosize={{ minRows: 4, maxRows: 6 }}
        placeholder="(Optional) Any feedback you want to provide?"
      />
      <Button
        className={s.feedbackCardSubmitButton}
        type="primary"
        htmlType="submit"
        onClick={handleSubmit}
        disabled={feedbackCardState.disableSubmitButton}
      >
        Submit
      </Button>
      {errorAlert}
    </div>
  );
};

export default FeedbackCard;
