import React from "react";
import { Typography } from "antd";
import s from "./TypographyDescription.module.scss";
import { TypographyDescriptionType } from ".";
import classNames from "classnames";
import { MarginType } from "data/styleTypes";
import { getStyleWithMargin } from "utilities/styleUtils";

interface Props {
  type: TypographyDescriptionType;
  children: React.ReactNode;
  centered?: boolean;
  withMargin?: MarginType;
  color?: "blue";
  className?: string;
}

const TypographyDescriptionView: React.FC<Props> = (props: Props) => {
  const { type, centered, color, withMargin, className, ...restProps } = props;

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
    <span className={s.TypographyDescription} style={styleObject}>
      <Typography.Text
        {...restProps}
        className={classNames(
          { [type]: props.className ? false : true },
          { centered: centered },
          { [color]: color },
          { [className]: className },
        )}
      >
        {props.children}
      </Typography.Text>
    </span>
  );
};

export default TypographyDescriptionView;
