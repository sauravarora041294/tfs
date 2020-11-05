import React from "react";
import {
  Badge,
  Spin,
  Upload,
  Icon,
  Button
} from "antd";
import { PictureOutlined } from '@ant-design/icons';
import s from "./UploadVideoModal.module.scss";
import { UploadFile, UploadChangeParam } from "antd/lib/upload/interface";

interface Props {
  defaultThumbnailFile: File;
  customThumbnailFile: File;
  customThumbnailURL: string;
  defaultThumbnailURL: string;
  isLoadingCustomThumbnailFile: boolean;
  isDefaultThumbnailSelected: boolean;
  setCustomThumbnailFile: (image: File, url: string) => void;
  setIsLoadingCustomThumbnailFile: (isLoading: boolean) => void;
  setIsDefaultThumbnailSelected: (isDefaultThumbnailSelected: boolean) => void;
}

const UploadVideoModalVideoThumbnailForm: React.FC<Props> = (props: Props) => {
  const uploadRequest = ({ onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  const getBase64 = (file: File, callback: (dataURL: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(file as Blob);
  }

  const handleCustomThumbnailFileChange = React.useCallback((info: UploadChangeParam<UploadFile<any>>) => {
    if (info.file.status === "uploading") {
      props.setIsLoadingCustomThumbnailFile(true)
    } else if (info.file.status === "done") {
      props.setIsLoadingCustomThumbnailFile(false)
      getBase64(info.file.originFileObj as File, url => props.setCustomThumbnailFile(info.file.originFileObj as File, url))
    }
  }, [props.setCustomThumbnailFile, props.setIsLoadingCustomThumbnailFile])

  const videoThumbnailLoading = React.useCallback((loadingText: string) => {
    return (
      <div className={s.videoDetailsFormDefaultThumbnailLoadingContainer}>
        <Spin
          tip={loadingText}
          indicator={
            <Icon type="loading" style={{ fontSize: 24 }} spin />
          }
        />
      </div>
    )
  }, []);

  const uploadCustomThumbnailButton = React.useMemo(() => {
    if (!props.isLoadingCustomThumbnailFile && !props.customThumbnailURL) {
      return (
        <Upload
          listType="picture-card"
          showUploadList={false}
          customRequest={uploadRequest}
          onChange={(info: UploadChangeParam<UploadFile<any>>) => handleCustomThumbnailFileChange(info)}
        >
          <div className={s.videoDetailsFormThumbnailUpload}>
            <PictureOutlined
              className={s.videoDetailsFormThumbnailUploadIcon}
            />
            <div className="ant-upload-text">Upload Custom Thumbnail</div>
          </div>
        </Upload>
      )
    } else if (props.isLoadingCustomThumbnailFile && !props.customThumbnailURL) {
      return videoThumbnailLoading("Loading thumbnail")
    } else if (!props.isLoadingCustomThumbnailFile && props.customThumbnailURL) {
      return (
        <div className={s.videoDetailsFormCustomThumbnailUpload}>
          <div
            onClick={() => props.setIsDefaultThumbnailSelected(false)}
            className={s.videoDetailsFormCustomThumbnailContainer}
          >
            <Badge
              count={
                (props.isDefaultThumbnailSelected === false)
                  ? <Icon
                    type="check-circle"
                    theme="filled"
                    style={{ color: "#1890ff", fontSize: "22px" }}
                  />
                  : null
              }
            >
              <img
                className={s.videoDetailsFormThumbnailImg}
                src={props.customThumbnailURL}
              />
            </Badge>
          </div>
          <Upload
            customRequest={uploadRequest}
            onChange={(info: UploadChangeParam<UploadFile<any>>) => handleCustomThumbnailFileChange(info)}
          >
            <Button
              type="link"
              className={s.videoDetailsFormChangeCustomThumbnailButton}
            >
              Click to Change
            </Button>
          </Upload>
        </div>
      )
    }
  }, [
    props.isLoadingCustomThumbnailFile,
    props.customThumbnailURL,
    props.isDefaultThumbnailSelected,
    uploadRequest,
    handleCustomThumbnailFileChange
  ]);

  const defaultThumbnail = React.useMemo(() => {
    return props.defaultThumbnailFile
      ? (
        <div
          onClick={() => props.setIsDefaultThumbnailSelected(true)}
          className={s.videoDetailsFormThumbnailContainer}
        >
          <Badge
            count={
              props.isDefaultThumbnailSelected
                ? (
                  <Icon
                    type="check-circle"
                    theme="filled"
                    style={{ color: "#1890ff", fontSize: "22px" }}
                  />
                ) : null
            }
          >
            <img
              className={s.videoDetailsFormThumbnailImg}
              src={props.defaultThumbnailFile.name}
            />
          </Badge>
        </div>

      ) : videoThumbnailLoading("Grabbing default thumbnail")

  }, [props.defaultThumbnailFile, props.isDefaultThumbnailSelected])

  return (
    <div className={s.videoDetailsFormThumbnailForm}>
      <div className={s.videoDetailsFormCustomThumbnailContainer}>
        {uploadCustomThumbnailButton}
      </div>
      {defaultThumbnail}
    </div >
  )
};

export default UploadVideoModalVideoThumbnailForm;
