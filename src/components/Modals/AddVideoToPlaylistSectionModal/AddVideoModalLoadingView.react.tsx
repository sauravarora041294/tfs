import React from "react";
import { Dimmer, Loader } from "semantic-ui-react";

const AddVideoModalLoadingView: React.FC = () => {
  return (
    <Dimmer active inverted>
      <Loader inverted>{"Loading..."}</Loader>
    </Dimmer>
  );
};

export default AddVideoModalLoadingView;
