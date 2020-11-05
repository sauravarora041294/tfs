import React from "react";
import { Typography } from "antd";
import s from "./MyDashboard.module.scss";
import myDashboardHeaderImage from "assets/images/myDashboardHeaderImage.svg";
import * as DataTypes from "data/types";
import TypographyTitle, {
  TypographyTitleType,
} from "components/AaspireBasicComponents/Typography/TypographyTitle";
import TypographyDescription, {
  TypographyDescriptionType,
} from "components/AaspireBasicComponents/Typography/TypographyDescription";

interface Props {
  currentUser: DataTypes.User;
}

export const MyDashboardHeader: React.FC<Props> = (props: Props) => {
  return (
    <div className={s.myDashboardHeader}>
      <div className={s.myDashboardHeaderContent}>
        <TypographyTitle type={TypographyTitleType.CARD_TITLE} color="blue">
          Welcome back, {props.currentUser && props.currentUser.firstName}
        </TypographyTitle>
        <TypographyDescription
          type={TypographyDescriptionType.PAGE_HEADER_DESCRIPTION}
        >
          You know what your goals are. Now it’s time to achieve them. The
          world’s best educational content is waiting for you.{" "}
        </TypographyDescription>
      </div>
      <img src={myDashboardHeaderImage} />
    </div>
  );
};
