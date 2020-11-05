import React from "react";
import ShowMoreText from "react-show-more-text";
import TypographyDescription, {
  TypographyDescriptionType,
} from "components/AaspireBasicComponents/Typography/TypographyDescription";

interface Props {
  maxLines: number;
  width?: number;
  text: string;
}
const ClippedTextView: React.FC<Props> = (props: Props) => {
  return (
    <ShowMoreText
      lines={props.maxLines}
      more="show more"
      less="show less"
      expanded={false}
      keepNewLines={true}
      width={props.width}
    >
      {props.text}
    </ShowMoreText>
  );
};

export default ClippedTextView;
