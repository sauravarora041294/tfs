import React from "react";
import ClippedTextView from "./ClippedTextView.react";

interface Props {
  maxLines: number;
  text: string;
  width?: number;
}

const ClippedText: React.FC<Props> = (props: Props) => {
  return <ClippedTextView {...props} />
};

export default ClippedText;
