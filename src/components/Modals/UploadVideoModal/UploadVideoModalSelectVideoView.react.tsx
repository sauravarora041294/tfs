import React from "react";
import {
  Button,
  Upload,
  Icon,
  Typography,
} from "antd";
import s from "./UploadVideoModal.module.scss";
import { UploadFile } from "antd/lib/upload/interface";

interface Props {
  onFileSelect: (file: UploadFile<any>) => void;
}

const UploadVideoModalSelectVideoView: React.FC<Props> = (props: Props) => {
  return (
    <div className={s.selectVideoView}>
      <Upload.Dragger
        {...{
          name: "video",
          accept: "video/*",
          customRequest: () => { },
          onSuccess: () => { },
          onChange: ({ file }) => {
            props.onFileSelect(file)
          },
        }}
      >
        <div className={s.selectVideoIconContainer}>
          <Icon
            type="cloud-upload"
            className={s.selectVideoIcon}
          />
        </div>
        <div className={s.selectVideoInstructionsContainer}>
          <Typography.Text>
            Drag and drop a video you want to upload
          </Typography.Text>
          <br />
          <Typography.Text style={{ fontSize: "14px" }} type="secondary">
            You will be able to edit video details in the next step
          </Typography.Text>
        </div>
        <Button type="primary">
          <Typography.Text
            style={{ color: "#ffffff", letterSpacing: "1px" }}
          >
            Select File
        </Typography.Text>
        </Button>
      </Upload.Dragger>
    </div>
  )
};

export default UploadVideoModalSelectVideoView;
