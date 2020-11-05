import { AppContext } from "App";
import * as DataTypes from "data/types";
import React from "react";
import CreatorOnboardingModalLoadingView from "./CreatorOnboardingModalLoadingView";
import { useFetchCreatorOnboardingData } from "./CreatorOnboardingModalUtil";
import CreatorOnboardingModalView from "./CreatorOnboardingModalView.react";

interface Props {
  show: boolean;
  closeModal: (shouldReload: boolean) => void;
}

const CreatorOnboardingModal: React.FC<Props> = (props: Props) => {
  const [appState] = React.useContext(AppContext);
  const creatorOnboardingData = useFetchCreatorOnboardingData(
    appState.authUser,
  );

  if (creatorOnboardingData.isLoading) {
    return <CreatorOnboardingModalLoadingView />;
  } else {
    return (
      <CreatorOnboardingModalView
        {...{
          ...creatorOnboardingData,
          ...props,
          error: creatorOnboardingData.error,
        }}
      />
    );
  }
};

export default CreatorOnboardingModal;
