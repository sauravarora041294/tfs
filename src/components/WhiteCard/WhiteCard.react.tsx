import React, { ReactNode } from "react";
import WhiteCardView from "./WhiteCardView.react";
import { MarginType } from "data/styleTypes";

interface Props {
  title?: string | Element | ReactNode;
  subTitle?: string;
  children: React.ReactNode;
  className?: string;
  withMargin?: MarginType;
  titleAndSubtitleAlignCenter?: boolean;
  withDefaultBodyPadding?: boolean;
  smallSizeTitleAndSubtitle?: boolean;
  customBodyPaddingValues?: {
    left: string;
    right: string;
    bottom: string;
    top: string;
  };
  headerClassName?: string;
  bodyClassName?: string;
}

const WhiteCard: React.FC<Props> = (props: Props) => {
  return <WhiteCardView {...props} />;
};

export default WhiteCard;
