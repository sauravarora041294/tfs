import React from "react";
import TypographyMetaDataView from "./TypographyMetaDataView.react";
import { TypographyMetaDataType } from ".";
import { MarginType, FontSize, FontColor } from "data/styleTypes";

interface Props {
  type: TypographyMetaDataType;
  children: React.ReactNode;
  color?: FontColor;
  className?: string;
  withMargin?: MarginType;
  fontSize?: FontSize;
}

const TypographyMetaData: React.FC<Props> = (props: Props) => {
  return <TypographyMetaDataView {...props} />;
};

export default TypographyMetaData;
