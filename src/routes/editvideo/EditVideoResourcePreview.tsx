import React from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import VideoPlayer from "components/VideoPlayer";
import { Placeholder } from "semantic-ui-react";

interface Props {
  videoURL: string;
  setVideoDuration: (duration: number) => void;
}

const EditVideoResourcePreview: React.FC<Props> = (props: Props) => {
  const player = React.useRef(null);
  const placeholder = (
    <Placeholder>
      <Placeholder.Image />
    </Placeholder>
  );
  const videoPlayer = (
    <VideoPlayer ref={player} url={props.videoURL} autoPlay={false} />
  );

  const viewContent = React.useMemo(
    () => (props.videoURL ? videoPlayer : placeholder),
    [props.videoURL, placeholder, videoPlayer],
  );

  return <div>{viewContent}</div>;
};

export default EditVideoResourcePreview;
