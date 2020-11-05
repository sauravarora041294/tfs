import React from "react";
import TypographyDescriptionView from "./TypographyDescriptionView.react";
import { TypographyDescriptionType } from ".";
import { MarginType } from "data/styleTypes";

interface Props {
  type: TypographyDescriptionType;
  children: React.ReactNode;
  centered?: boolean;
  color?: "blue";
  className?: string;
  withMargin?: MarginType;
}

const TypographyDescription: React.FC<Props> = (props: Props) => {
  return <TypographyDescriptionView {...props} />;
};

export default TypographyDescription;
