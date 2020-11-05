import React from "react";
import { Button as AntButton } from "antd";
import s from "./AaspireButton.module.scss";
import { AaspireButtonType } from ".";
import classNames from "classnames";

interface Props {
  children: React.ReactNode;
  type?: "link" | "default" | "ghost" | "primary" | "dashed" | "danger";
  subType?: AaspireButtonType;
  htmlType?: "button" | "submit";
  loading?: boolean;
  className?: string;
  style?: React.CSSProperties;
  ghost?: true;
  onClick?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  size?: "default" | "small" | "large";
}

const AaspireButtonView: React.FC<Props> = (props: Props) => {
  const { subType, ...restProps } = props;
  return (
    <AntButton
      {...restProps}
      className={classNames(
        { [s[subType]]: true },
        { [s.AaspireButton]: true },
        { [props.className]: true },
      )}
      ghost={props.ghost}
      type={props.type}
    >
      {props.children}
    </AntButton>
  );
};

export default AaspireButtonView;
