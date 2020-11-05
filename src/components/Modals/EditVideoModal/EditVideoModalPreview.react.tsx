import React from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import VideoPlayer from "components/VideoPlayer";
import { Placeholder } from "semantic-ui-react";
import s from "./EditVideoModal.module.scss";

interface Props {
  videoURL: string;
  setVideoDuration: (duration: number) => void;
}

const EditVideoModalPreview: React.FC<Props> = (props: Props) => {
  const player = React.useRef(null);
  const placeholder = (
    <Placeholder className={s.placeholderImageContainer}>
      <Placeholder.Image />
    </Placeholder>
  );
  const videoPlayer = (
    <VideoPlayer
      ref={player}
      className={s.videoPreviewPlayer}
      url={props.videoURL}
      onStart={() =>
        props.setVideoDuration(player.current.getState().player.duration)
      }
      autoPlay
    />
  );

  const viewContent = React.useMemo(
    () => (props.videoURL ? videoPlayer : placeholder),
    [props.videoURL, placeholder, videoPlayer],
  );

  return <div className={s.videoPreview}>{viewContent}</div>;
};

export default EditVideoModalPreview;
