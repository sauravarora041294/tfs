import React from "react";
import ThumbnailImageView from "./ThumbnailImageView.react";

interface Props {
  src: React.ReactNode | string;
  width?: string;
  height?: string;
  className?: string;
  minimal?: boolean;
}

const ThumbnailImage: React.FC<Props> = (props: Props) => {
  return <ThumbnailImageView {...props} />;
};

export default ThumbnailImage;
