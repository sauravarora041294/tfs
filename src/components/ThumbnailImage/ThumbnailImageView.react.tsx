import React from "react";
import s from "./ThumbnailImage.module.scss";
import { Image, Placeholder } from "semantic-ui-react";
import logo from "assets/images/fbrocketlogo.png";
import { fadeInImage } from "./ThumbnailImageUtil";
import classnames from "classnames";

interface Props {
  src: React.ReactNode | string;
  width?: string;
  height?: string;
  className?: string;
  minimal?: boolean;
}

/**
 * This component using what people call "Padding trick" - creating a wrapper html tag with zero height and a percentage of padding-bottom
 * to preserve space. (padding-bottom will be percentage of your component width).
 */

const ThumbnailImageView: React.FC<Props> = (props: Props) => {
  const containerRef = React.useRef(null);
  const placeholderRef = React.useRef(null);

  return (
    <div
      className={classnames(
        { [s.ThumbnailImage]: true },
        { [props.className]: props.className },
      )}
      style={{
        height: props.height ? props.height : "100%",
        width: props.width ? props.width : "100%",
      }}
    >
      <div ref={placeholderRef} className={s.placeholderContainer}>
        <Placeholder style={{ height: "100%" }}>
          <Placeholder.Image rectangular style={{ height: "100%" }} />
        </Placeholder>
      </div>

      <div
        ref={containerRef}
        className={props.minimal ? s.minimalImageContainer : s.imageContainer}
      >
        <Image
          src={props.src || logo}
          onError={i => (i.target.src = logo)}
          onLoad={e => fadeInImage(placeholderRef, containerRef)}
        />
      </div>
    </div>
  );
};

export default ThumbnailImageView;
