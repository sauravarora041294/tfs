import {
  Upload,
  Button,
  Row,
  Col,
  Icon,
  message,
  Progress,
  Typography,
} from "antd";
import { ProgressMessages } from "./AddContentToMissionModalUtil";
import React from "react";
import {
  useUploadFile,
  saveUploadedVideo,
  addUploadedVideoToMission,
  UploadState,
} from "./AddContentToMissionModalUtil";
import s from "./AddContentToMissionModal.module.scss";

const UploadProgressUI: React.FC<any> = props => {
  const uploadVideoResponse = useUploadFile(
    props.videoFile,
    "videos",
    props.userId,
  );
  const generateImageFromVideo = (video: HTMLVideoElement) => {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    canvas.getContext("2d").drawImage(video, 0, 0, 300, 150);

    const dataURL = canvas.toDataURL("image/png");
    (document.getElementById("image") as HTMLImageElement).setAttribute(
      "src",
      dataURL,
    );
    canvas.toBlob(blob => {
      props.saveVideoToSection(
        [new File([blob], "default.png")],
        dataURL,
        uploadVideoResponse,
      );
    });
  };

  React.useEffect(() => {
    const video = document.getElementById("video") as HTMLVideoElement;
    if (video && uploadVideoResponse.downloadURL) {
      video.setAttribute(
        "src",
        URL.createObjectURL(props.videoFile.originFileObj),
      );
      if (video) {
        video.addEventListener("playing", () => {
          setTimeout(() => generateImageFromVideo(video), 100);
        });
      }
    }
  }, [uploadVideoResponse.downloadURL]);

  const progressUI = React.useMemo(() => {
    if (uploadVideoResponse.downloadURL) {
      return (
        <div className={s.progressContainer}>
          <Progress type="circle" percent={100} />
        </div>
      );
    } else if (uploadVideoResponse.progress !== 0) {
      return (
        <div className={s.progressContainer}>
          <Progress type="circle" percent={uploadVideoResponse.progress} />
        </div>
      );
    }
  }, [uploadVideoResponse.progress, uploadVideoResponse.downloadURL]);
  return (
    <div>
      {progressUI}
      <div style={{ marginTop: "25px" }}>
        <Typography.Text style={{ fontSize: "18px" }} strong>
          {props.submittingVideoText}
        </Typography.Text>
      </div>
      <video
        id="video"
        style={{ height: "0px", width: "0px" }}
        controls
        autoPlay
        muted
      />
      <canvas id="canvas" style={{ height: "0px", width: "0px" }} />
      <img id="image" style={{ height: "0px", width: "0px" }} />
    </div>
  );
};
const AddVideoToPlaylistSectionUpload: React.FC<any> = props => {
  const handleChange = info => {
    props.handleUpload(info.file);
  };

  const saveVideoToSection = async (
    file: File,
    imageURL: string,
    uploadVideoResponse: UploadState,
  ) => {
    const formValues = {
      title: props.videoFile.name,
      description: "Default description - Please edit",
      thumbnail: [
        {
          ...file[0],
          originFileObj: file[0],
          name: file[0].name,
          type: "image/png",
        },
      ],
    };
    props.setSubmittedText(ProgressMessages.SAVING_VIDEO_AS_RESOURCE);

    const response = await saveUploadedVideo(
      formValues,
      props.userId,
      uploadVideoResponse,
      100,
    );
    if (response.error === null) {
      props.setSubmittedText(ProgressMessages.ADDING_TO_MISSION);

      const result = await addUploadedVideoToMission(
        { content: [response.saveResourceResponse.objectID] },
        props.missionId,
        props.userId,
      );

      if (!result.error) {
        props.setSubmittedText(ProgressMessages.EMPTY);
        message.success(ProgressMessages.SUCCESSFULLY_ADDED);
      } else {
        props.setSubmittedText("");
        message.error(ProgressMessages.UPLOADED_NOT_ADDED);
      }
    } else {
      message.error(ProgressMessages.ERROR);
      props.setSubmittedText(ProgressMessages.EMPTY);
    }
  };
  return (
    <React.Fragment>
      <Upload.Dragger
        name="file"
        accept="video/*"
        customRequest={() => {}}
        onChange={handleChange}
        showUploadList={false}
      >
        {props.textToDisplay ? (
          <UploadProgressUI
            userId={props.userId}
            videoFile={props.videoFile}
            saveVideoToSection={saveVideoToSection}
            submittingVideoText={props.textToDisplay}
          />
        ) : (
          <React.Fragment>
            <p className="ant-upload-drag-icon">
              <Icon type="inbox" />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
          </React.Fragment>
        )}
      </Upload.Dragger>
    </React.Fragment>
  );
};
export default AddVideoToPlaylistSectionUpload;
