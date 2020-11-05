import React from "react";
import VideoPlayer from "components/VideoPlayer";
import { Card, Loader } from "semantic-ui-react";
import s from "./ResourceDetail.module.scss";
import { getViewProgressByResourceId } from "./ResourceDetailUtil";
import { ResourceDetailState } from "./ResourceDetailReducer";

interface Props {
  resourceDetailState: ResourceDetailState;
  updatePlayedPercentage: (percentage: number) => void;
  videoDidEnd: () => void;
  onNext: () => void;
}

interface State {
  isReady: boolean;
}

const initialState = {
  isReady: false,
};

const ResourceDetailVideoPlayer: React.FC<Props> = (props: Props) => {
  // Keep player ref after state declarations.
  const { resourceDetailState } = props;
  const [videoPlayerState, updateVideoPlayerState] = React.useState<State>(
    initialState,
  );

  const player: React.MutableRefObject<any> = React.useRef();
  const currentResourceId =
    resourceDetailState && resourceDetailState.currentResource.objectID;
  const currentResourceUrl =
    resourceDetailState && resourceDetailState.currentResource.resourceUrl;
  const userLatestViewlogs =
    resourceDetailState && resourceDetailState.userLatestViewlogs;

  const onReady = React.useCallback(() => {
    if (!videoPlayerState.isReady) {
      const previouslyPlayedTime = getViewProgressByResourceId(
        currentResourceId,
        userLatestViewlogs,
      );
      const { duration } = player.current.getState().player;
      player.current.seek(previouslyPlayedTime * duration);
      player.current.play();
      updateVideoPlayerState({
        ...videoPlayerState,
        isReady: true,
      });
    }
  }, [
    videoPlayerState,
    updateVideoPlayerState,
    currentResourceId,
    userLatestViewlogs,
  ]);

  // Saving played duration in terms of percentage watched between 0 and 1
  const onProgress = React.useCallback(() => {
    const { currentTime, duration } = player.current.getState().player;
    const currentPlayedPercentage = currentTime / duration;
    props.updatePlayedPercentage(currentPlayedPercentage);
  }, []);

  const onEnded = React.useCallback(() => {
    props.videoDidEnd();
    updateVideoPlayerState({
      ...videoPlayerState,
      isReady: false,
    });
  }, [videoPlayerState]);

  const VideoPlayerLoader = !resourceDetailState && (
    <Loader
      className={s.resourceDetailLoadingViewLoader}
      size="massive"
      active
    />
  );

  return (
    <Card className={s.videoPlayerCard}>
      {VideoPlayerLoader}
      <VideoPlayer
        ref={player}
        url={currentResourceUrl}
        onReady={onReady}
        onProgress={onProgress}
        onEnded={onEnded}
        onNext={props.onNext}
        showPlaybackRateMenu
      />
    </Card>
  );
};

export default ResourceDetailVideoPlayer;
