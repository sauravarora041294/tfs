import { Card, Icon, Progress, Tag, Typography, Badge, Rate } from "antd";
import * as DataTypes from "data/types";
import React from "react";
import { History } from "history";
import s from "./ContentFeedView.module.scss";
import { truncateTitle, truncateWithEllipses } from "utilities";
import CreatorAvatar from "components/CreatorAvatar";
import { withRouter } from "react-router";
import { compose } from "recompose";
import TypographyTitle, {
  TypographyTitleType,
} from "components/AaspireBasicComponents/Typography/TypographyTitle";

interface Props {
  history?: History;
  content: DataTypes.Playlist | DataTypes.Resource;
  creator?: DataTypes.Creator;
  hideCreatorAvatar?: boolean;
}

const MinimalCardHeaderContainer: React.FC<Props> = (props: Props) => {
  const truncatedTitle = React.useMemo(() => {
    return props && props.content
      ? truncateWithEllipses(props.content.title, 60)
      : "";
  }, [props.content]);

  return (
    <div className={s.minimalCardHeaderContainer}>
      <div className={s.cardHeaderContainer}>
        <div className={s.cardCreatorContainer}>
          {props.hideCreatorAvatar ? (
            <span />
          ) : (
              <CreatorAvatar creator={props.creator} />
            )}
        </div>
      </div>
      <TypographyTitle
        type={TypographyTitleType.SECONDARY_TITLE}
        className={s.minimalCardTitle}
      >
        {truncatedTitle}
      </TypographyTitle>
    </div>
  );
};

export default compose<Props, Props>(withRouter)(MinimalCardHeaderContainer);
