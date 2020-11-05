import { Modal, Alert } from "antd";
import React from "react";
import FeedbackForm from "components/FeedbackCard";
import s from "./AddRatingModal.module.scss";
import {
  addRatingModalReducer,
  addRatingModalStateInit,
} from "./AddRatingModalReducer";

interface Props {
  show: boolean;
  closeModal?: (shouldReload: boolean) => void;
  onRatingCreated: (rating: number, feedback: string) => void;
  rating: number;
  showSubmissionError?: boolean;
}

const AddRatingModal: React.FC<Props> = (props: Props) => {
  React.useReducer(addRatingModalReducer, {}, addRatingModalStateInit);

  const onSubmit = (rating: number, feedback: string) => {
    return props.onRatingCreated(rating, feedback);
  };

  const submissionError = React.useMemo(() => {
    return props.showSubmissionError &&
      <Alert
        className={s.ratingSubmissionError}
        message="Error Submitting Rating"
        description="There was an error submitting your rating. Please try again later."
        type="error"
        closable
      />
  }, [props.showSubmissionError])

  return (
    <Modal
      visible={props.show}
      title={`Leave a Rating`}
      footer={null}
      width={"400px"}
      className={s.addRatingModalBody}
      onCancel={() => props.closeModal(false)}
    >
      <FeedbackForm rating={props.rating} onSubmit={onSubmit} />
      {submissionError}
    </Modal>
  );
};

export default AddRatingModal;
