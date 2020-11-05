import { Button, Rate } from "antd";
import React, { useState } from "react";
import { Card } from "semantic-ui-react";
import s from "./ResourceDetail.module.scss";
import TextAreaInputField from "components/AaspireBasicComponents/AaspireBasicFormComponents/TextAreaInputField";

interface Props {
  saveRating: (newUserRating: Number, newUserFeedback: string) => void;
}

const ResourceDetailFeedbackCard: React.FC<Props> = (props: Props) => {
  const [rating, setRating] = useState<number>(0);
  const [feedback, setFeedback] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSubmit = React.useCallback(() => {
    if (rating === 0) {
      setError("Selecting a rating is required.");
      return;
    }
    props.saveRating(rating, feedback);
    setRating(0);
    setFeedback("");
    setError("");
  }, [rating, feedback]);

  return (
    <Card className={s.resourceDetailFeedbackCard}>
      <Rate
        style={{ fontSize: 30, textAlign: "center", marginBottom: "10px" }}
        onChange={setRating}
        value={rating}
        allowHalf={true}
      />
      <TextAreaInputField
        rows={4}
        onChange={e => setFeedback(e.target.value)}
        value={feedback}
        placeholder="(Optional) Any feedback you want to provide?"
      />
      <Button
        style={{ marginTop: "10px" }}
        type="primary"
        onClick={handleSubmit}
      >
        Submit
      </Button>
      <div style={{ color: "red", textAlign: "center" }}>{error}</div>
    </Card>
  );
};

export default ResourceDetailFeedbackCard;
