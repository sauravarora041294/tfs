import React from "react";
import { Dimmer, Loader } from "semantic-ui-react";

const CreatorOnboardingModalLoadingView: React.FC = () => {
  return (
    <Dimmer active inverted>
      <Loader inverted>{"Loading..."}</Loader>
    </Dimmer>
  );
};

export default CreatorOnboardingModalLoadingView;
