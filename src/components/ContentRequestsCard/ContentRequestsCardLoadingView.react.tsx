import React from "react";
import { Loader } from "semantic-ui-react";

const ContentRequestsCardLoadingView: React.FC = () => {
  return <Loader active>{"Loading"}</Loader>;
};

export default ContentRequestsCardLoadingView;
