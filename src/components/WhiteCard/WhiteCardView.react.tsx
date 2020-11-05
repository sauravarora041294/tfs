import React, { ReactNode } from "react";
import s from "./WhiteCard.module.scss";
import TypographyTitle, {
  TypographyTitleType,
} from "components/AaspireBasicComponents/Typography/TypographyTitle";
import TypographyDescription, {
  TypographyDescriptionType,
} from "components/AaspireBasicComponents/Typography/TypographyDescription";
import classNames from "classnames";
import { MarginType } from "data/styleTypes";
import { getStyleWithMargin } from "utilities/styleUtils";

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

const WhiteCardView: React.FC<Props> = (props: Props) => {
  const {
    withMargin,
    withDefaultBodyPadding,
    smallSizeTitleAndSubtitle,
    customBodyPaddingValues,
  } = props;
  const style = getStyleWithMargin({
    withMargin,
    size: {
      top: "30px",
      bottom: "30px",
      left: "4vh",
      right: "4vh",
    },
  });

  return (
    <div className={`${s.WhiteCard} ${props.className}`} style={style}>
      {(props.title || props.subTitle) && (
        <div
          className={classNames(
            { [s.headerContainer]: true },
            { [s.centered]: props.titleAndSubtitleAlignCenter },
            props.headerClassName,
          )}
        >
          {/* By default Title would be aligned center */}
          {props.title && (
            <TypographyTitle
              withMargin={MarginType.BOTTOM}
              type={
                smallSizeTitleAndSubtitle
                  ? TypographyTitleType.CARD_SUB_TITLE
                  : TypographyTitleType.CARD_TITLE
              }
              centered={props.titleAndSubtitleAlignCenter}
            >
              {props.title}
            </TypographyTitle>
          )}

          {/* By default Description would be aligned center */}
          {props.subTitle && (
            <TypographyDescription
              type={
                smallSizeTitleAndSubtitle
                  ? TypographyDescriptionType.SECONDARY_DESCRIPTION
                  : TypographyDescriptionType.PRIMARY_DESCRIPTION
              }
              className={s.whiteCardSubTitle}
              centered={props.titleAndSubtitleAlignCenter}
            >
              {props.subTitle}
            </TypographyDescription>
          )}
        </div>
      )}

      <div
        className={classNames(
          { [s.whiteCardBody]: true },
          { [`${s.bodyPadding} bodyPadding`]: withDefaultBodyPadding },
          props.bodyClassName,
        )}
        style={
          customBodyPaddingValues && {
            padding: `${customBodyPaddingValues.top} ${customBodyPaddingValues.right} ${customBodyPaddingValues.bottom} ${customBodyPaddingValues.left} `,
          }
        }
      >
        {props.children}
      </div>
    </div>
  );
};

export default WhiteCardView;
