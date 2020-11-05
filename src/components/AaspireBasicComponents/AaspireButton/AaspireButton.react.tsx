import React from "react";
import AaspireButtonView from "./AaspireButtonView.react";
import { AaspireButtonType } from ".";

interface Props {
  children: React.ReactNode;
  type?: "link" | "default" | "ghost" | "primary" | "dashed" | "danger";
  subType?: AaspireButtonType;
  htmlType?: "button" | "submit";
  className?: string;
  ghost?: true;
  loading?: boolean;
  style?: React.CSSProperties;
  onClick?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  size?: "default" | "small" | "large";
}

const AaspireButton: React.FC<Props> = (props: Props) => {
  return <AaspireButtonView {...props} />;
};

export default AaspireButton;
