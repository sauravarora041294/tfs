import React from "react";
import { Loader } from "semantic-ui-react";

const LoadingView: React.FC = () => {
  const [loadingText, dispatch] = React.useState("Loading");
  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      dispatch(
        "This is taking longer than usual, Please check your internet connection",
      );
    }, 45000);
    return () => {
      clearTimeout(timeoutId);
    };
  });
  return <Loader active>{loadingText}</Loader>;
};

export default LoadingView;
