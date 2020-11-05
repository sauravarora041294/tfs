import React from "react";
import { Button } from "antd";
import s from "./ThirdPartyLoginButton.module.scss";

interface Props {
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

const ThirdPartyLoginButtonView: React.FC<Props> = (props: Props) => {
  return (
    <Button {...props} className={s.ThirdPartyLoginButton}>
      {props.children}
    </Button>
  );
};

export default ThirdPartyLoginButtonView;