import React from "react";
import SubmitButtonView from "./SubmitButtonView.react";

interface Props {
  type: "primary";
  className?: string;
  loading?: boolean;
  children: React.ReactNode;
}

const SubmitButton: React.FC<Props> = (props: Props) => {
  return <SubmitButtonView {...props} />;
};

export default SubmitButton;
