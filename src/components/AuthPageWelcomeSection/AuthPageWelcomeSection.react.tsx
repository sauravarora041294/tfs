import { Icon } from "antd";
import React from "react";
import { withRouter } from "react-router";
import { compose } from "recompose";
import { History } from "history";
import s from "./AuthPageWelcomeSection.module.scss";
import AuthPageWelcomeSectionView from "./AuthPageWelcomeSectionView.react"

interface Props {
  history?: History;
  error?: Error;
  pitchText?: String;
}

const AuthPageWelcomeSection: React.FC<Props> = (props: Props) => {
  return <AuthPageWelcomeSectionView {...props} />
};

export default AuthPageWelcomeSection;
