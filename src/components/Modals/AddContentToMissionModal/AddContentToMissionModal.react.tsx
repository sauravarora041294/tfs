import { AppContext } from "App";
import * as DataTypes from "data/types";
import React from "react";
import AddContentToMissionModalLoadingView from "./AddContentToMissionModalLoadingView.react";
import { useFetchAddContentModalData } from "./AddContentToMissionModalUtil";
import AddContentToMissionModalView from "./AddContentToMissionModalView.react";

interface Props {
  show: boolean;
  closeModal: (closeModalParams: DataTypes.Local.CloseModalParams) => void;
  mission: DataTypes.Mission;
  uploadedPlaylists?: Array<DataTypes.Playlist>;
  uploadedResources?: Array<DataTypes.Resource>;
}

const AddContentToMissionModal: React.FC<Props> = (props: Props) => {
  const [appState] = React.useContext(AppContext);
  const addContentData = useFetchAddContentModalData(appState.authUser);

  if (addContentData.isLoading) {
    return <AddContentToMissionModalLoadingView />;
  } else {
    return (
      <AddContentToMissionModalView
        {...{
          ...addContentData,
          ...props,
          error: addContentData.error,
          creator: addContentData.creator,
        }}
      />
    );
  }
};

export default AddContentToMissionModal;
