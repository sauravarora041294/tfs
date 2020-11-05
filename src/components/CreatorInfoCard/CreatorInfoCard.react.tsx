import React from "react";
import * as DataTypes from "data/types";
import CreatorInfoCardView from "./CreatorInfoCardView.react";

interface Props {
  creator: DataTypes.Creator;
}

const CreatorInfoCard: React.FC<Props> = (props: Props) => {
  return (
    <CreatorInfoCardView {...props} />
  );
};

export default CreatorInfoCard;
