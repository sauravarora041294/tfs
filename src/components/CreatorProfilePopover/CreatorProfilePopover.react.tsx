import * as DataTypes from "data/types";
import React from "react";

import { Loader } from "semantic-ui-react";

import { useFetchCreatorProfilePopoverData } from "./CreatorProfilePopoverUtil";

import CreatorProfilePopoverView from "./CreatorProfilePopoverView.react";

interface Props {
  creator: DataTypes.Creator;
  children: React.ReactNode;
}

const CreatorProfilePopover: React.FC<Props> = (props: Props) => {
  const {
    isLoading,
    creatorWithMetadata,
    error,
  } = useFetchCreatorProfilePopoverData(props.creator.objectID);

  if (!props.creator) {
    return <div />;
  } else if (isLoading) {
    return <div />;
  } else {
    return (
      <CreatorProfilePopoverView
        {...props}
        creatorWithMetadata={creatorWithMetadata}
        error={error}
      />
    );
  }
};

export default CreatorProfilePopover;
