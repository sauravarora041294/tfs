import React from "react";
import {
  Steps,
  Typography,
} from "antd";
import s from "./UploadVideoModal.module.scss";

interface Props {
  currentStep: number;
}

const UploadVideoModalHeader: React.FC<Props> = (props: Props) => {
  const modalHeaderText = React.useMemo(
    () => {
      switch (props.currentStep) {
        case 0:
          return (
            <div className={s.modalHeaderTextContainer}>
              <Typography.Title level={4}>Upload your Video</Typography.Title>
              <Typography.Text type="secondary" style={{ fontWeight: 400 }}>
                Drag and drop or click the upload button to upload your video.
              </Typography.Text>
            </div>
          )
        case 1:
          return (
            <div className={s.modalHeaderTextContainer}>
              <Typography.Title level={4}>Video Details</Typography.Title>
              <Typography.Text type="secondary" style={{ fontWeight: 400 }}>
                Provide some information about the video you're uploading. And
                make sure to choose a high quality thumbnail!
                </Typography.Text>
            </div>
          )
        case 2:
          return (
            <div className={s.modalHeaderTextContainer}>
              <Typography.Title level={4}>Add to Playlists &amp; Collections</Typography.Title>
              <Typography.Text type="secondary" style={{ fontWeight: 400 }}>
                Quick add your video to playlists and collections. By default the
                video will be added to the last section of the playlist, but you
                can change this later.
              </Typography.Text>
            </div>
          )
        default:
          break;
      }
    }, [props.currentStep]);

  return (
    <div>
      {modalHeaderText}
      <Steps className={s.modalHeaderStepsContainer} current={props.currentStep} >
        <Steps.Step />
        <Steps.Step />
        <Steps.Step />
      </Steps>
    </div>
  )
};

export default UploadVideoModalHeader;
