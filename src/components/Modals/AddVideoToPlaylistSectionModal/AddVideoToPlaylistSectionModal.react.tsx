import { AppContext } from "App";
import * as DataTypes from "data/types";
import React from "react";
import AddVideoModalLoadingView from "./AddVideoModalLoadingView.react";
import { useFetchAddVideoModalData } from "./AddVideoToPlaylistSectionModalUtil";
import AddVideoToPlaylistSectionModalView from "./AddVideoToPlaylistSectionModalView.react";

interface Props {
  show: boolean;
  closeModal: (closeModalParams: DataTypes.Local.CloseModalParams) => void;
  playlist: DataTypes.Playlist;
  sectionIndex: number;
  sectionData: DataTypes.Section;
}

const AddVideoToPlaylistSectionModal: React.FC<Props> = (props: Props) => {
  const [appState] = React.useContext(AppContext);
  const addVideoData = useFetchAddVideoModalData(appState.authUser);

  if (addVideoData.isLoading) {
    return <AddVideoModalLoadingView />;
  } else {
    return (
      <AddVideoToPlaylistSectionModalView
        {...{
          ...addVideoData,
          ...props,
          error: addVideoData.error,
          creator: addVideoData.creator,
        }}
      />
    );
  }
};

export default AddVideoToPlaylistSectionModal;
