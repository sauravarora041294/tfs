import { Avatar as AntdAvatar } from "antd";
import * as DataTypes from "data/types";
import React from "react";
import s from "./Avatar.module.scss";

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

const AvatarView: React.FC<Props> = (props: Props) => {
  const imageURL =
    props.user && props.user.profilePictureURL
      ? props.user.profilePictureURL
      : props.imageURL;

  if (imageURL) {
    return (
      <div style={props.containerStyle} className={s.container}>
        <div>
          <AntdAvatar
            src={imageURL}
            className={s.avatar}
            size={props.size ? props.size : "large"}
          />
        </div>
        {props.includeName && (
          <div style={props.nameStyle}>
            {props.user && `${props.user.firstName} ${props.user.lastName}`}
          </div>
        )}
      </div>
    );
  } else {
    const firstLetter = props.user && props.user.firstName.substring(0, 1);
    return (
      <div style={props.containerStyle} className={s.container}>
        <div>
          <AntdAvatar
            icon={!props.user && "user"}
            className={s.avatar}
            size={props.size ? props.size : "large"}
          >
            {firstLetter}
          </AntdAvatar>
        </div>
        {props.includeName && (
          <div style={props.nameStyle}>
            {props.user && `${props.user.firstName} ${props.user.lastName}`}
          </div>
        )}
      </div>
    );
  }
};

export default AvatarView;
