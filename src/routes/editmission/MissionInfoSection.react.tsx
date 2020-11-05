import { Button, Card, Typography } from "antd";
import logo from "assets/images/fbrocketlogo.png";
import * as DataTypes from "data/types";
import React from "react";
import { Grid, Image } from "semantic-ui-react";
import s from "./EditMission.module.scss";
import WhiteCard from "components/WhiteCard";
import TypographyTitle, {
  TypographyTitleType,
} from "components/AaspireBasicComponents/Typography/TypographyTitle";
import TypographyDescription, {
  TypographyDescriptionType,
} from "components/AaspireBasicComponents/Typography/TypographyDescription";

interface Props {
  mission: DataTypes.Mission;
  isApprovedContributor: boolean;
  hasMissionOwnerPermissions?: boolean;
}

const MissionInfoSection: React.FC<Props> = (props: Props) => {
  const thumbnailSrc = props.mission.thumbnailUrl
    ? props.mission.thumbnailUrl
    : logo;

  return (
    <WhiteCard title="" subTitle="" className={s.missionInfoCard}>
      <Grid className={s.missionInfoHeaderGrid}>
        <div className={s.thumbnailWrapper}>
          <Image src={thumbnailSrc} className={s.missionThumbnail} bordered />
        </div>
        <div>
          <TypographyTitle type={TypographyTitleType.CARD_SUB_TITLE}>
            {props.mission.title}
          </TypographyTitle>
          <TypographyDescription
            type={TypographyDescriptionType.SECONDARY_DESCRIPTION}
          >
            {`${props.mission.numPlaylists} Playlists & ${props.mission.numVideos} Videos`}
          </TypographyDescription>
        </div>
      </Grid>
      <div className={s.missionInfoContainer}>
        <Typography.Text className={s.missionFieldLabel}>
          {"Purpose"}
        </Typography.Text>
        <Typography.Paragraph className={s.missionDescriptionText}>
          {props.mission.purpose}
        </Typography.Paragraph>
        <Typography.Text className={s.missionFieldLabel}>
          {"Description"}
        </Typography.Text>
        <Typography.Paragraph className={s.missionDescriptionText}>
          {props.mission.description}
        </Typography.Paragraph>
        <Typography.Text className={s.missionFieldLabel}>
          {"Content Format"}
        </Typography.Text>
        <Typography.Paragraph className={s.missionDescriptionText}>
          {props.mission.formatInformation}
        </Typography.Paragraph>
        <Typography.Text className={s.missionFieldLabel}>
          {"Creator Qualifications"}
        </Typography.Text>
        <Typography.Paragraph className={s.missionDescriptionText}>
          {props.mission.creatorQualifications}
        </Typography.Paragraph>
      </div>
    </WhiteCard>
  );
};

export default MissionInfoSection;
