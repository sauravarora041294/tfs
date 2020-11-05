import React from "react";
import UploadVideoModalView from "./UploadViewModalView.react"
import * as DataTypes from "data/types";

interface Props {
  isVisible: boolean;
  onCancel: (shouldReload: boolean) => void;
  currentCreator: DataTypes.Creator;
  creatorMissions: Array<DataTypes.Mission>;
  creatorPlaylists: Array<DataTypes.Playlist>;
  onFinish: () => void;
}

const UploadVideoModal: React.FC<Props> = (props: Props) => {
  return <UploadVideoModalView
    {...props}
  />
};

export default UploadVideoModal;
