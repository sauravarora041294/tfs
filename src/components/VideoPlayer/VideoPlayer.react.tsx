import React from "react";
import { Button, Icon } from "antd";
import {
  Player,
  BigPlayButton,
  ControlBar,
  PlayToggle,
  CurrentTimeDisplay,
  TimeDivider,
  PlaybackRateMenuButton,
  VolumeMenuButton,
} from "video-react";
import "video-react/dist/video-react.css";
import "./VideoPlayer.scss";
import s from "./VideoPlayer.module.scss";

interface Props {
  url: string;
  className?: string;
  onReady?: (e: Event) => void;
  onStart?: (e: Event) => void;
  onProgress?: (e: Event) => void;
  onEnded?: (e: Event) => void;
  onNext?: (e: React.MouseEvent) => void;
  onContextMenu?: (e: Event) => void;
  startTime?: number;
  muted?: boolean;
  autoPlay?: boolean;
  showPlaybackRateMenu?: boolean;
}

const VideoPlayer = React.forwardRef(
  (props: Props, ref: React.MutableRefObject<any>) => {
    const nextVideoButton = props.onNext && (
      <Button className={s.nextVideoButton} onClick={props.onNext}>
        <Icon className={s.nextVideoButtonIcon} type="step-forward" />
      </Button>
    );

    const playbackRateMenuButton = props.showPlaybackRateMenu && (
      <PlaybackRateMenuButton rates={[2, 1, 0.5, 0.1]} order={7.1} />
    );

    return (
      <div
        onContextMenu={e => {
          e.preventDefault();
          return false;
        }}
      >
        <Player
          ref={ref}
          className={`${props.className} ${s.videoPlayer}`}
          onCanPlay={props.onReady}
          onPlay={props.onStart}
          onTimeUpdate={props.onProgress}
          onEnded={props.onEnded}
          onContextMenu={props.onContextMenu}
          muted={props.muted}
          autoPlay={props.autoPlay}
          controls="nodownload"
        >
          <source src={props.url} />
          <BigPlayButton position="center" />
          <ControlBar autoHide>
            <PlayToggle />
            {nextVideoButton}
            <CurrentTimeDisplay order={4.1} />
            <TimeDivider order={4.2} />
            {playbackRateMenuButton}
            <VolumeMenuButton />
          </ControlBar>
        </Player>
      </div>
    );
  },
);

export default VideoPlayer;
