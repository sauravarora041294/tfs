import React from "react";
import { Typography } from "antd";
import s from "./TypographyMetaData.module.scss";
import { TypographyMetaDataType } from ".";
import classNames from "classnames";
import { getStyleWithMargin } from "utilities/styleUtils";
import { MarginType, FontSize, FontColor } from "data/styleTypes";

interface Props {
  type: TypographyMetaDataType;
  children: React.ReactNode;
  color?: FontColor;
  className?: string;
  withMargin?: MarginType;
  fontSize?: FontSize;
}

const TypographyMetaDataView: React.FC<Props> = (props: Props) => {
  const { type, color, withMargin, className, fontSize, ...restProps } = props;

  const styleObject = getStyleWithMargin({
    withMargin,
    size: {
      top: "2rem",
      bottom: "2rem",
      left: "2rem",
      right: "2rem",
    },
  });

  return (
    <span className={s.TypographyMetaData} style={styleObject}>
      <Typography.Text
        {...restProps}
        className={classNames(
          { [s[type]]: s[type] },
          { [s[fontSize]]: s[fontSize] },
          { [s[color]]: s[color] },
          { [className]: className },
        )}
      >
        {props.children}
      </Typography.Text>
    </span>
  );
};

export default TypographyMetaDataView;
