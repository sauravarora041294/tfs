import { Typography } from "antd";
import React from "react";
import s from "./CreatorProfilePopover.module.scss";

interface Props {
  contentType: string;
  count?: number;
}

const getContentTypeString = (contentType: string, count: number) => {
  return count && count === 1 ? `${contentType}` : `${contentType}s`;
};

const ContentCountMetadataLabel: React.FC<Props> = (props: Props) => {
  const contentTypeString = getContentTypeString(
    props.contentType,
    props.count,
  );
  return (
    <div className={s.creatorProfileStats}>
      <span className={s.creatorProfileStatsTextNumber}>
        {props.count || 0}
      </span>{" "}
      {contentTypeString}
    </div>
  );
};

export default ContentCountMetadataLabel;
