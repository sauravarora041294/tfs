import React from "react";
import * as DataTypes from "data/types";
import AvatarView from "./AvatarView.react";

interface Props {
  className?: string;
  user: DataTypes.User;
  includeName?: boolean;
  size?: "large" | "small" | "default" | number;
  containerStyle?: React.CSSProperties;
  nameStyle?: React.CSSProperties;
  imageURL?: string;
  fitParent?: boolean;
}

const Avatar: React.FC<Props> = (props: Props) => {
  return <AvatarView {...props} />
};

export default Avatar;
