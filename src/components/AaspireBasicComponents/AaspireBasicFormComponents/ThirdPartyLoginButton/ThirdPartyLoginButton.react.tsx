import React from "react";
import ThirdPartyLoginButtonView from "./ThirdPartyLoginButtonView.react";

interface Props {
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

const ThirdPartyLoginButton: React.FC<Props> = (props: Props) => {
  return (<ThirdPartyLoginButtonView {...props} />);
};

export default ThirdPartyLoginButton;