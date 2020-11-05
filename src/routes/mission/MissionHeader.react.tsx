import { Icon, Typography, Row, Col } from "antd";
import * as DataTypes from "data/types";
import React from "react";
import { Grid, Image } from "semantic-ui-react";
import s from "./Mission.module.scss";
import MissionSearchBar from "./MissionSearchBar.react";
import CollectionIcon from "assets/icons/collectionCardIcon.svg";
import TypographyTitle, {
  TypographyTitleType,
} from "components/AaspireBasicComponents/Typography/TypographyTitle";
import TypographyDescription, {
  TypographyDescriptionType,
} from "components/AaspireBasicComponents/Typography/TypographyDescription";
import TypographyMetaData, {
  TypographyMetaDataType,
} from "components/AaspireBasicComponents/Typography/TypographyMetaData";
import { MarginType, FontColor } from "data/styleTypes";

interface Props {
  mission: DataTypes.Mission;
  defaultSearchedText: string;
}

const MissionHeader: React.FC<Props> = (props: Props) => {
  return (
    <Row className={s.missionHeaderContainer}>
      <Col sm={24} lg={12} className={s.missionInfoContainer}>
        <div className={s.missionInfoSubContainer}>
          <TypographyTitle type={TypographyTitleType.PAGE_HEADER_TITLE}>
            <span className="blueColor">
              {props.mission.title
                .split(" ")
                .slice(0, 1)
                .join(" ")}
            </span>
            {" " +
              props.mission.title
                .split(" ")
                .slice(1)
                .join(" ")}
          </TypographyTitle>
          <TypographyDescription
            withMargin={MarginType.TOP}
            className={s.missionHeaderDescription}
            type={TypographyDescriptionType.PAGE_HEADER_DESCRIPTION}
          >
            {props.mission.purpose}
          </TypographyDescription>

          <div className={s.missionHeaderMetadata}>
            {props.mission.numVideos !== 0 ? (
              <React.Fragment>
                <span className={s.missionHeaderMetadataNumVideosContainer}>
                  <TypographyMetaData
                    type={TypographyMetaDataType.METADATA_VALUE}
                    withMargin={MarginType.TOP_AND_BOTTOM}
                    className={s.missionHeaderMetadataNumVideosText}
                  >
                    {`${props.mission.numVideos} VIDEO${
                      props.mission.numVideos > 1 ? `S` : ""
                    }`}
                  </TypographyMetaData>
                </span>{" "}
                <span>|</span>
              </React.Fragment>
            ) : (
              ""
            )}

            {props.mission.numPlaylists !== 0 ? (
              <span>
                <TypographyMetaData
                  type={TypographyMetaDataType.METADATA_VALUE}
                  withMargin={MarginType.TOP_AND_BOTTOM}
                >
                  {`${props.mission.numPlaylists} PLAYLIST${
                    props.mission.numPlaylists > 1 ? `S` : ""
                  }`}
                </TypographyMetaData>
              </span>
            ) : (
              ""
            )}
          </div>

          <div className={s.missionHeaderLabel}>
            <img src={CollectionIcon} />
            <TypographyMetaData
              className={s.missionHeaderCollectionLabel}
              type={TypographyMetaDataType.METADATA_LABEL}
              color={FontColor.BLUE}
            >
              PREMIUM COLLECTION
            </TypographyMetaData>
          </div>
        </div>
      </Col>
      <Col span={12} className={s.missionImageContainer}>
        <img style={{ objectFit: "cover" }} src={props.mission.thumbnailUrl} />
      </Col>
    </Row>
  );
};

export default MissionHeader;
