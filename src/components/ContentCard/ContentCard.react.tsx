import React from "react";
import ContentCardView from "./ContentCardView.react";

interface Props {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  width?: number;
  height?: number;
}

const ContentCard: React.FC<Props> = (props: Props) => {
  return <ContentCardView {...props} />
};

export default ContentCard;