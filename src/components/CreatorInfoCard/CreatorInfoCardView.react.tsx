import * as DataTypes from "data/types";
import React from "react";
import s from "./CreatorInfoCard.module.scss";
import CreatorProfilePopover from "components/CreatorProfilePopover";
import TypographyTitle, {
  TypographyTitleType,
} from "components/AaspireBasicComponents/Typography/TypographyTitle";
import TypographyDescription, {
  TypographyDescriptionType,
} from "components/AaspireBasicComponents/Typography/TypographyDescription";

interface Props {
  creator: DataTypes.Creator;
}

const CreatorInfoCardView: React.FC<Props> = (props: Props) => {
  return (
    <CreatorProfilePopover creator={props.creator}>
      <div className={s.creatorDetails}>
        <img src={props.creator.profilePictureURL} />
        <TypographyTitle
          type={TypographyTitleType.SECONDARY_TITLE}
          className={s.creatorDetailsHeader}
        >
          {`${props.creator.firstName} ${props.creator.lastName}`}
        </TypographyTitle>
        <TypographyDescription
          type={TypographyDescriptionType.TERNARY_DESCRIPTION}
          centered
        >
          {props.creator.creatorDetails.title} {" @ "}
          {props.creator.creatorDetails.company}
        </TypographyDescription>
      </div>
    </CreatorProfilePopover>
  );
};

export default CreatorInfoCardView;
