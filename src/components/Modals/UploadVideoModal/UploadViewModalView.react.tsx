import React from "react";
import {
  Modal,
} from "antd";
import * as DataTypes from "data/types";
import { UploadFile } from "antd/lib/upload/interface";
import s from "./UploadVideoModal.module.scss";
import { uploadSelectedVideoFile } from "./UploadVideoModalUtil"
import { uploadVideoReducer, uploadVideoStateInit, UploadVideoModalStateActionTypes } from "./UploadVideoModalReducer.react"
import UploadVideoModalHeader from "./UploadVideoModalHeader.react"
import UploadVideoModalSelectVideoView from "./UploadVideoModalSelectVideoView.react"
import UploadVideoModalVideoDetailsView from "./UploadVideoModalVideoDetailsView.react"
import UploadVideoModalVideoGroupingsView from "./UploadVideoModalVideoGroupingsView.react"

interface Props {
  isVisible: boolean;
  onCancel: (shouldReload: boolean) => void;
  currentCreator: DataTypes.Creator;
  creatorMissions: Array<DataTypes.Mission>;
  creatorPlaylists: Array<DataTypes.Playlist>;
  onFinish: () => void;
}

const UploadVideoModalView: React.FC<Props> = (props: Props) => {
  const [uploadVideoState, dispatch] = React.useReducer(
    uploadVideoReducer,
    {
      currentStep: 0,
      videoDownloadURL: null,
      defaultThumbnailFile: null,
      customThumbnailFile: null,
      customThumbnailURL: null,
      isLoadingCustomThumbnailFile: false,
      isDefaultThumbnailSelected: true,
      isSubmittingVideoDetailsForm: false,
      videoDuration: 0
    },
    uploadVideoStateInit,
  );

  const setVideoFile = React.useCallback((videoFile: UploadFile<any>) => {
    dispatch({
      type: UploadVideoModalStateActionTypes.SET_VIDEO_FILE,
      videoFile
    });
  }, [dispatch])

  const setCurrentStep = React.useCallback((currentStep: number) => {
    dispatch({
      type: UploadVideoModalStateActionTypes.SET_CURRENT_STEP,
      currentStep
    });
  }, [dispatch])

  const setVideoUploadProgress = React.useCallback((videoUploadProgress: number) => {
    dispatch({
      type: UploadVideoModalStateActionTypes.SET_VIDEO_UPLOAD_PROGRESS,
      videoUploadProgress
    })
  }, [dispatch])

  const setVideoDownloadURL = React.useCallback((videoDownloadURL: string) => {
    dispatch({
      type: UploadVideoModalStateActionTypes.SET_VIDEO_DOWNLOAD_URL,
      videoDownloadURL
    })
  }, [dispatch])

  const setDefaultThumbnailFile = React.useCallback((defaultThumbnailFile: File) => {
    dispatch({
      type: UploadVideoModalStateActionTypes.SET_DEFAULT_THUMBNAIL_FILE,
      defaultThumbnailURL: defaultThumbnailFile.name,
      defaultThumbnailFile
    })
  }, [dispatch])

  const setIsLoadingCustomThumbnailFile = React.useCallback((isLoadingCustomThumbnailFile: boolean) => {
    dispatch({
      type: UploadVideoModalStateActionTypes.SET_IS_LOADING_CUSTOM_THUMBNAIL_FILE,
      isLoadingCustomThumbnailFile
    })
  }, [dispatch])

  const setCustomThumbnailFile = React.useCallback((customThumbnailFile: File, customThumbnailURL: string) => {
    dispatch({
      type: UploadVideoModalStateActionTypes.SET_CUSTOM_THUMBNAIL_DATA,
      customThumbnailFile,
      customThumbnailURL
    })
  }, [dispatch])

  const setIsDefaultThumbnailSelected = React.useCallback((isDefaultThumbnailSelected: boolean) => {
    dispatch({
      type: UploadVideoModalStateActionTypes.SET_IS_DEFAULT_THUMBNAIL_SELECTED,
      isDefaultThumbnailSelected,
    })
  }, [dispatch])

  const setIsSubmittingVideoDetailsForm = React.useCallback((isSubmittingVideoDetailsForm: boolean) => {
    dispatch({
      type: UploadVideoModalStateActionTypes.SET_IS_SUBMITTING_VIDEO_DETAILS_FORM,
      isSubmittingVideoDetailsForm,
    })
  }, [dispatch])

  const setVideoDuration = React.useCallback((videoDuration) => {
    dispatch({
      type: UploadVideoModalStateActionTypes.SET_VIDEO_DURATION,
      videoDuration
    })
  }, [dispatch])

  const setIsSubmittingVideoGroupingsForm = React.useCallback((isSubmittingVideoGroupingsForm: boolean) => {
    dispatch({
      type: UploadVideoModalStateActionTypes.SET_IS_SUBMITTING_VIDEO_GROUPINGS_FORM,
      isSubmittingVideoGroupingsForm
    })
  }, [dispatch])

  const handleVideoDetailsFormSubmit = React.useCallback((uploadedResource: DataTypes.Resource) => {
    dispatch({
      type: UploadVideoModalStateActionTypes.SET_UPLOADED_RESOURCE,
      uploadedResource
    })
    setCurrentStep(2)
  }, [dispatch, setCurrentStep])

  const handleVideoGroupingsFormSubmit = React.useCallback(() => {
    props.onFinish();
  }, [props.onFinish])

  const onFileSelect = React.useCallback(async (videoFile: UploadFile<any>) => {
    setVideoFile(videoFile);
    setCurrentStep(1);
    const uploadVideoResponse = await uploadSelectedVideoFile({
      videoFile: videoFile,
      uploadDirectory: "videos",
      creatorUserId: props.currentCreator.objectID,
      onUploadProgressChange: setVideoUploadProgress
    });
    setVideoDownloadURL(uploadVideoResponse.downloadURL);
  }, [setVideoFile, setCurrentStep, setVideoUploadProgress, setVideoDownloadURL, props.currentCreator])

  const modalContent = React.useMemo(() => {
    switch (uploadVideoState.currentStep) {
      case 0:
        return (
          <UploadVideoModalSelectVideoView onFileSelect={onFileSelect} />
        )
      case 1:
        return (
          <UploadVideoModalVideoDetailsView
            currentCreator={props.currentCreator}
            videoDownloadURL={uploadVideoState.videoDownloadURL}
            videoUploadProgress={uploadVideoState.videoUploadProgress}
            videoFile={uploadVideoState.videoFile}
            defaultThumbnailFile={uploadVideoState.defaultThumbnailFile}
            setDefaultThumbnailFile={setDefaultThumbnailFile}
            defaultThumbnailURL={uploadVideoState.defaultThumbnailURL}
            customThumbnailFile={uploadVideoState.customThumbnailFile}
            customThumbnailURL={uploadVideoState.customThumbnailURL}
            setCustomThumbnailFile={setCustomThumbnailFile}
            isLoadingCustomThumbnailFile={uploadVideoState.isLoadingCustomThumbnailFile}
            setIsLoadingCustomThumbnailFile={setIsLoadingCustomThumbnailFile}
            isDefaultThumbnailSelected={uploadVideoState.isDefaultThumbnailSelected}
            setIsDefaultThumbnailSelected={setIsDefaultThumbnailSelected}
            isSubmittingVideoDetailsForm={uploadVideoState.isSubmittingVideoDetailsForm}
            setIsSubmittingVideoDetailsForm={setIsSubmittingVideoDetailsForm}
            setVideoDuration={setVideoDuration}
            videoDuration={uploadVideoState.videoDuration}
            handleVideoDetailsFormSubmit={handleVideoDetailsFormSubmit}
          />
        )
      case 2:
        return (
          <UploadVideoModalVideoGroupingsView
            creatorMissions={props.creatorMissions}
            creatorPlaylists={props.creatorPlaylists}
            resource={uploadVideoState.uploadedResource}
            fileName={uploadVideoState.videoFile.name}
            videoDuration={uploadVideoState.videoDuration}
            currentCreator={props.currentCreator}
            setIsSubmittingVideoGroupingsForm={setIsSubmittingVideoGroupingsForm}
            isSubmittingVideoGroupingsForm={uploadVideoState.isSubmittingVideoGroupingsForm}
            handleVideoGroupingsFormSubmit={handleVideoGroupingsFormSubmit}
          />
        )
      default:
        break;
    }
  }, [
    props.currentCreator,
    props.creatorMissions,
    props.creatorPlaylists,
    uploadVideoState.currentStep,
    uploadVideoState.videoFile,
    uploadVideoState.videoDownloadURL,
    uploadVideoState.videoUploadProgress,
    uploadVideoState.defaultThumbnailFile,
    uploadVideoState.defaultThumbnailURL,
    uploadVideoState.customThumbnailFile,
    uploadVideoState.customThumbnailURL,
    uploadVideoState.isLoadingCustomThumbnailFile,
    uploadVideoState.isDefaultThumbnailSelected,
    uploadVideoState.isSubmittingVideoDetailsForm,
    uploadVideoState.videoDuration,
    uploadVideoState.uploadedResource,
    uploadVideoState.isSubmittingVideoGroupingsForm,
    setIsSubmittingVideoDetailsForm,
    setIsLoadingCustomThumbnailFile,
    setDefaultThumbnailFile,
    setCustomThumbnailFile,
    setIsDefaultThumbnailSelected,
    setIsSubmittingVideoDetailsForm,
    setVideoDuration,
    handleVideoDetailsFormSubmit
  ])

  return (
    <Modal
      visible={props.isVisible}
      okText={"Finish"}
      width={"950px"}
      centered
      footer={null}
      maskClosable={false}
      destroyOnClose={true}
      onCancel={() => props.onCancel(false)}
      className={s.uploadModal}
    >
      <UploadVideoModalHeader currentStep={uploadVideoState.currentStep} />
      {modalContent}
    </Modal>
  );
};

export default UploadVideoModalView;
