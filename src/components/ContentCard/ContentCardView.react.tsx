import React from "react";
import s from "./ContentCard.module.scss";
import TypographyTitle, {
  TypographyTitleType,
} from "components/AaspireBasicComponents/Typography/TypographyTitle";
import TypographyDescription, {
  TypographyDescriptionType,
} from "components/AaspireBasicComponents/Typography/TypographyDescription";

interface Props {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  width?: number;
  height?: number;
}

const ContentCardView: React.FC<Props> = (props: Props) => {
  return (
    <div
      className={s.contentCard}
      style={{ width: props.width, height: props.height }}
    >
      <TypographyTitle type={TypographyTitleType.CARD_TITLE}>
        {props.title}
      </TypographyTitle>
      <TypographyDescription
        type={TypographyDescriptionType.PRIMARY_DESCRIPTION}
      >
        {props.subtitle}
      </TypographyDescription>
      {props.children}
    </div>
  );
};

export default ContentCardView;
