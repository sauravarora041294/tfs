import React from "react";
import TypographyTitleView from "./TypographyTitleView.react";
import { TypographyTitleType } from ".";
import { MarginType } from "data/styleTypes";

interface Props {
  type: TypographyTitleType;
  children: React.ReactNode;
  centered?: boolean;
  color?: "blue" | "purple" | "white";
  className?: string;
  withMargin?: MarginType;
}

const TypographyTitle: React.FC<Props> = (props: Props) => {
  return <TypographyTitleView {...props} />;
};

export default TypographyTitle;
