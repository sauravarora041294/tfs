import React, { MutableRefObject } from "react";
import {
  Button,
  Form,
  Divider,
  Icon,
  Typography,
  notification,
} from "antd";
import { addResourceToPlaylistsAndMissions } from "./UploadVideoModalUtil"
import s from "./UploadVideoModal.module.scss";
import * as DataTypes from "data/types";
import UploadVideoModalVideoGroupingsForm from "./UploadVideoModalVideoGroupingsForm.react"
import { castFormToRefForwardingComponent } from "utilities/index";

interface Props {
  creatorMissions: Array<DataTypes.Mission>;
  creatorPlaylists: Array<DataTypes.Playlist>;
  resource: DataTypes.Resource;
  fileName: string;
  videoDuration: number;
  currentCreator: DataTypes.Creator;
  isSubmittingVideoGroupingsForm: boolean;
  setIsSubmittingVideoGroupingsForm: (isSubmittingVideoGroupingsForm: boolean) => void;
  handleVideoGroupingsFormSubmit: () => void;
}

const UploadVideoModalVideoGroupingsView: React.FC<Props> = (props: Props) => {
  const videoGroupingsFormRef: MutableRefObject<any> = React.useRef();
  const VideoGroupingsFormEnhanced = Form.create({
    name: "videoGroupingsForm",
  })(React.forwardRef(castFormToRefForwardingComponent(UploadVideoModalVideoGroupingsForm)));

  const handleAddVideoToPlaylistsAndMissions = React.useCallback(() => {
    videoGroupingsFormRef.current.validateFieldsAndScroll(
      async (err, values) => {
        if (!err) {
          props.setIsSubmittingVideoGroupingsForm(true)
          const saveDataResponse = await addResourceToPlaylistsAndMissions(
            props.resource.objectID,
            values.selectedMissions,
            values.selectedPlaylists,
            props.currentCreator.objectID,
          );
          if (!saveDataResponse.errors || saveDataResponse.errors.length === 0) {
            notification.open({
              message: "Success!",
              description:
                "Your video was successfully uploaded.Find it under the videos tab.",
              icon: (
                <Icon
                  type="check-circle"
                  theme="filled"
                  style={{ color: "#46e946" }}
                />
              ),
              duration: 10,
              placement: "bottomRight",
              onClick: () => { },
            });
          } else {
            notification.open({
              message: "Warning!",
              description:
                "Your video was successfully uploaded. But it might not have been added to some playlists or missions.",
              icon: <Icon type="warning" style={{ color: "#46e946" }} />,
              duration: 10,
              placement: "bottomRight",
              onClick: () => { },
            });
          }
          props.handleVideoGroupingsFormSubmit()
        }
      },
    );
  }, []);

  const videoGroupingsFooter = React.useMemo(() => {
    return (
      <div className={s.modalFooter}>
        <Button
          className={s.modalFooterBtnCancel}
          type="default"
        >
          Cancel
        </Button>
        <Button
          loading={props.isSubmittingVideoGroupingsForm}
          type="primary"
          onClick={handleAddVideoToPlaylistsAndMissions}
        >
          Submit
        </Button>
      </div>
    )
  }, [

  ]);

  return (
    <div>
      <div style={{ padding: "20px 20px" }}>
        <Typography.Text type="secondary">
          You have uploaded :{" "}
          <Typography.Text strong>
            {`${props.fileName}`}{" "}
          </Typography.Text>
        </Typography.Text>
        <br />
        <Typography.Text type="secondary">
          Video Title :{" "}
          <Typography.Text strong>
            {`${props.resource.title}`}{" "}
          </Typography.Text>
        </Typography.Text>
        <br />
        <Typography.Text type="secondary">
          Video Description :{" "}
          <Typography.Text strong>
            {`${props.resource.description}`}{" "}
          </Typography.Text>
        </Typography.Text>
        <br />
        <Typography.Text type="secondary">
          Video Duration :{" "}
          <Typography.Text strong>
            {`${new Date(props.videoDuration * 1000)
              .toUTCString()
              .match(/(\d\d:\d\d:\d\d)/)[0]
              .substring(3)}`}{" "}
          </Typography.Text>
        </Typography.Text>
        <Divider />
        <div style={{ marginTop: "20px" }}>
          <VideoGroupingsFormEnhanced
            {...{
              ref: videoGroupingsFormRef,
              creatorMissions: props.creatorMissions,
              creatorPlaylists: props.creatorPlaylists
            }}
          />
        </div>
      </div>
      {videoGroupingsFooter}
    </div>
  );
};

export default UploadVideoModalVideoGroupingsView;