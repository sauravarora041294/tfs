import React, { useState } from "react";
import { Card, Form } from "semantic-ui-react";
import s from "./Layout.module.scss";

interface Props {
  submitFeedback?: () => void;
  setFeedbackResponse?: (response: string) => void;
}

const FeedbackBox = (props: Props) => {
  const [showFeedbackBox, updateFeedbackBox] = useState<boolean>(false);

  const handleSubmit = e => {
    e.preventDefault();
    props.submitFeedback();
  };

  const onTextChange = (e, { value }) => {
    props.setFeedbackResponse(value);
  };

  return (
    <div className={s.feedbackCard}>
      {showFeedbackBox ? (
        <Card className="feedbackCardBorder">
          <Card.Content className={s.feedbackContent}>
            <Form className={s.loginForm} onSubmit={handleSubmit}>
              <div className={s.helpHeader}>
                <h1 className={s.feedbackTitle}>{"Help Us Help You"}</h1>
                <span
                  onClick={() => updateFeedbackBox(false)}
                  className={s.feedbackCloseBtn}
                >
                  X
                </span>
              </div>
              <p className={s.feedbackSubtitle}>{"TELL US WHAT'S MISSING!"}</p>
              <Form.TextArea
                className={s.feedbackFormField}
                placeholder="Example: it would be great if you could make a video on..."
                onChange={onTextChange}
              />
              <Form.Field className={s.loginFormField}>
                <input
                  className={s.submitButton}
                  type="submit"
                  value="Submit"
                />
              </Form.Field>
            </Form>
          </Card.Content>
        </Card>
      ) : (
        <div
          onClick={() => updateFeedbackBox(!showFeedbackBox)}
          className={s.closeFeedbackBox}
        >
          <span>Help Us Help You</span>
        </div>
      )}
    </div>
  );
};

export default FeedbackBox;
