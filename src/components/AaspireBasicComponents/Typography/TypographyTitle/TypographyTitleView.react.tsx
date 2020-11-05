import React from "react";
import { Typography } from "antd";
import s from "./TypographyTitle.module.scss";
import { TypographyTitleType } from ".";
import classNames from "classnames";
import { MarginType } from "data/styleTypes";
import { getStyleWithMargin } from "utilities/styleUtils";

interface Props {
  type: TypographyTitleType;
  children: React.ReactNode;
  centered?: boolean;
  color?: "blue" | "purple" | "white";
  className?: string;
  withMargin?: MarginType;
}

const TypographyTitleView: React.FC<Props> = (props: Props) => {
  const { type, centered, color, className, withMargin, ...restProps } = props;

  const styleObject = getStyleWithMargin({
    withMargin,
    size: {
      top: "1rem",
      bottom: "1rem",
      left: "1rem",
      right: "1rem",
    },
  });

  return (
    <span className={`${s.TypographyTitle}`} style={styleObject}>
      <Typography.Title
        {...restProps}
        style={{ margin: 0 }}
        className={classNames(
          { [type]: true },
          { centered: centered },
          { [color]: color },
          { [className]: className },
        )}
      >
        {props.children}
      </Typography.Title>
    </span>
  );
};

export default TypographyTitleView;
