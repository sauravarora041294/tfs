import React, { MutableRefObject } from "react";
import {
  Button,
  Form,
  Progress,
  message
} from "antd";
import s from "./UploadVideoModal.module.scss";
import VideoPlayer from "components/VideoPlayer";
import { Placeholder } from "semantic-ui-react";
import { submitVideoDetailsFormData } from "./UploadVideoModalUtil";
import UploadVideoModalVideoDetailsForm from "./UploadVideoModalVideoDetailsForm.react"
import UploadVideoModalVideoDetailsThumbnailForm from "./UploadVideoModalVideoDetailsThumbnailForm.react";
import { UploadFile } from "antd/lib/upload/interface";
import * as DataTypes from "data/types";
import { castFormToRefForwardingComponent } from "utilities/index";

interface Props {
  currentCreator: DataTypes.Creator;
  videoDownloadURL: string;
  videoUploadProgress: number;
  videoFile: UploadFile<any>;
  defaultThumbnailFile: File;
  customThumbnailFile: File;
  customThumbnailURL: string;
  isLoadingCustomThumbnailFile: boolean;
  isDefaultThumbnailSelected: boolean;
  defaultThumbnailURL: string;
  isSubmittingVideoDetailsForm: boolean;
  videoDuration: number;
  setIsSubmittingVideoDetailsForm: (isSubmittingVideoDetailsForm: boolean) => void;
  setDefaultThumbnailFile: (image: File) => void;
  setCustomThumbnailFile: (image: File, url: string) => void;
  setIsLoadingCustomThumbnailFile: (isLoading: boolean) => void;
  setIsDefaultThumbnailSelected: (isDefaultThumbnailSelected: boolean) => void;
  setVideoDuration: (videoDuration: number) => void;
  handleVideoDetailsFormSubmit: (resource: DataTypes.Resource) => void;
}

const UploadVideoModalVideoDetailsView: React.FC<Props> = (props: Props) => {
  // When the video is uploaded and a download url is available, populate an html video
  // element using the download url as its source. Then, when the video starts to play,
  // use an html canvas element to capture a frame to use as a default thumbnail.
  React.useEffect(() => {
    const video = document.getElementById("video") as HTMLVideoElement;
    if (video && props.videoDownloadURL && !props.defaultThumbnailURL) {
      const videoURL = URL.createObjectURL(props.videoFile.originFileObj);
      video.setAttribute("src", videoURL);
      video.addEventListener("loadedmetadata", () => {
        video.currentTime = video.duration / 6.7;
        video.play();
        video.addEventListener("playing", () => {
          setTimeout(() => generateImageFromVideo(video), 100);
        });
      });
    }
  }, [props.videoDownloadURL, props.defaultThumbnailURL]);

  const generateImageFromVideo = (video: HTMLVideoElement) => {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    canvas.setAttribute("width", "1600");
    canvas.setAttribute("height", "900");
    canvas.getContext("2d").drawImage(video, 0, 0, 1600, 900);
    const dataURL = canvas.toDataURL("image/png");
    (document.getElementById("image") as HTMLImageElement).setAttribute(
      "src",
      dataURL,
    );
    canvas.toBlob(blob => {
      props.setDefaultThumbnailFile(new File([blob], dataURL))
    });
  };

  const videoPlayerRef = React.useRef(null);
  const videoPlayer = React.useMemo(() => {
    return props.videoDownloadURL && props.videoUploadProgress === 100
      ? (
        <VideoPlayer
          ref={videoPlayerRef}
          className={s.videoDetailsVideoPreviewPlayer}
          url={props.videoDownloadURL}
          autoPlay
          onReady={() =>
            props.setVideoDuration(videoPlayerRef.current.getState().player.duration)
          }
          muted
        />
      ) : (
        <Placeholder className={s.videoDetailsVideoPlaceholder}>
          <Placeholder.Image />
        </Placeholder>
      )
  }, [props.videoDownloadURL, props.videoUploadProgress]);

  const videoUploadProgressBar = React.useMemo(() => {
    return (
      <Progress
        className={s.videoDetailsVideoUploadProgressBar}
        percent={props.videoUploadProgress}
      />
    )
  }, [props.videoUploadProgress])

  const uploadedVideoPreview = React.useMemo(() => {
    return (
      <div className={s.videoDetailsFormPreviewContainer}>
        {videoPlayer}
        {videoUploadProgressBar}
      </div>
    )
  }, [videoPlayer, videoUploadProgressBar])

  const selectThumbnailForm = React.useMemo(() => {
    return (
      <UploadVideoModalVideoDetailsThumbnailForm
        defaultThumbnailFile={props.defaultThumbnailFile}
        customThumbnailFile={props.customThumbnailFile}
        setCustomThumbnailFile={props.setCustomThumbnailFile}
        isLoadingCustomThumbnailFile={props.isLoadingCustomThumbnailFile}
        setIsLoadingCustomThumbnailFile={props.setIsLoadingCustomThumbnailFile}
        customThumbnailURL={props.customThumbnailURL}
        setIsDefaultThumbnailSelected={props.setIsDefaultThumbnailSelected}
        isDefaultThumbnailSelected={props.isDefaultThumbnailSelected}
        defaultThumbnailURL={props.defaultThumbnailURL}
      />
    )
  }, [
    props.defaultThumbnailFile,
    props.customThumbnailFile,
    props.setCustomThumbnailFile,
    props.isLoadingCustomThumbnailFile,
    props.setIsLoadingCustomThumbnailFile,
    props.customThumbnailURL,
    props.setIsDefaultThumbnailSelected,
    props.isDefaultThumbnailSelected,
    props.defaultThumbnailURL
  ])

  const videoDetailsFormRef: MutableRefObject<any> = React.useRef();
  const VideoDetailsFormEnhanced = Form.create({
    name: "videoDetailsForm",
  })(React.forwardRef(castFormToRefForwardingComponent(UploadVideoModalVideoDetailsForm)));

  const handleSubmitVideoDetails = React.useCallback(async () => {
    videoDetailsFormRef.current.validateFieldsAndScroll(
      async (err, values) => {
        if (!err) {
          try {
            props.setIsSubmittingVideoDetailsForm(true);
            const resource = await submitVideoDetailsFormData({
              userId: props.currentCreator.objectID,
              videoTitle: values.videoTitle,
              videoDescription: values.videoDescription,
              videoDownloadURL: props.videoDownloadURL,
              videoThumbnailFile: props.isDefaultThumbnailSelected ? props.defaultThumbnailFile : props.customThumbnailFile,
              videoDuration: props.videoDuration,
              isDefaultThumbnailSelected: props.isDefaultThumbnailSelected
            });
            props.handleVideoDetailsFormSubmit(resource)
            message.success(
              <span>
                Successfully uploaded your video.You may find it under the 'Videos'
                tab
              </span>
            )
          } catch (e) {
            message.error(
              <span>
                There may have been an error while uploading your video. Please
                refresh and retry
              </span>,
            );
          }
        }
      },
    );
  }, [
    props.setIsSubmittingVideoDetailsForm,
    props.videoDownloadURL,
    props.isDefaultThumbnailSelected,
    props.defaultThumbnailFile,
    props.customThumbnailFile,
    props.videoDuration,
    props.currentCreator
  ]);

  const videoDetailsForm = React.useMemo(() => {
    return (
      <VideoDetailsFormEnhanced
        {...{
          ref: videoDetailsFormRef
        }}
      />
    )
  }, [])

  const videoDetailsFooter = React.useMemo(() => {
    return (
      <div className={s.modalFooter}>
        <Button
          className={s.modalFooterBtnCancel}
          type="default"
        >
          Cancel
        </Button>
        <Button
          type="primary"
          loading={props.isSubmittingVideoDetailsForm}
          disabled={!(props.videoDownloadURL && props.defaultThumbnailFile)}
          onClick={async () => await handleSubmitVideoDetails()}
        >
          Submit and Continue
        </Button>
      </div>
    )
  }, [
    handleSubmitVideoDetails,
    props.isSubmittingVideoDetailsForm,
    props.videoDownloadURL,
    props.defaultThumbnailFile
  ]);

  return (
    <div className={s.videoDetailsFormViewContainer}>
      <div className={s.videoDetailsFormViewBody}>
        {uploadedVideoPreview}
        <div className={s.videoDetailsFormContainer}>
          {videoDetailsForm}
          {selectThumbnailForm}
        </div>
      </div>
      {videoDetailsFooter}
      <video id="video" className="zeroWidthHeight" controls autoPlay muted />
      <canvas id="canvas" className="zeroWidthHeight" />
      <img id="image" style={{ objectFit: "cover" }} className="zeroWidthHeight" />
    </div>
  )
};

export default UploadVideoModalVideoDetailsView;
