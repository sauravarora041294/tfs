import React from "react";
import * as DataTypes from "data/types";
import CreatorAvatarView from "./CreatorAvatarView.react";

interface Props {
  creator?: DataTypes.Creator;
  large?: Boolean;
  vertical?: Boolean;
  hideDetails?: Boolean;
  textClassName?: string;
  showCreatorDescription?: boolean;
}
const CreatorAvatar: React.FC<Props> = (props: Props) => {
  return <CreatorAvatarView {...props} />;
};
export default CreatorAvatar;
