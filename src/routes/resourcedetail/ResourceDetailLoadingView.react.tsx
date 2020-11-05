import React, { useState } from "react";
import { Grid, Responsive, PlaceholderLine } from "semantic-ui-react";
import s from "./ResourceDetail.module.scss";
import ResourceDetailVideoPlayer from "./ResourceDetailVideoPlayer.react";
import { Row, Col, Typography } from "antd";
import { Placeholder } from "semantic-ui-react";
import { useMediaQuery } from "react-responsive";
import useResizeAware from "react-resize-aware";
import WhiteCard from "components/WhiteCard";
import { MarginType } from "data/styleTypes";
import TypographyTitle, {
  TypographyTitleType,
} from "components/AaspireBasicComponents/Typography/TypographyTitle";
import TypographyDescription, {
  TypographyDescriptionType,
} from "components/AaspireBasicComponents/Typography/TypographyDescription";

const ResourceDetailLoadingView: React.FC = () => {
  const linePlaceholder = (
    <Placeholder>
      <Placeholder.Line />
    </Placeholder>
  );
  const descriptionPlaceholder = (
    <Placeholder fluid>
      <Placeholder.Paragraph>
        <Placeholder.Line />
        <Placeholder.Line />
        <Placeholder.Line />
      </Placeholder.Paragraph>
    </Placeholder>
  );
  const creatorPlaceholder = (
    <Placeholder fluid>
      <Placeholder.Header image>
        <Placeholder.Line length="very short" />
        <Placeholder.Line length="very short" />
      </Placeholder.Header>
    </Placeholder>
  );

  const rightSidePlaylistCardHeaderPlaceholder = (
    <Placeholder.Header>
      <Placeholder.Line />
      <Placeholder.Line />
    </Placeholder.Header>
  );
  const rightSideCardPlaceholder = (
    <Placeholder className={s.resourceDetailRightSideCardPlaceholder} fluid>
      <Placeholder.Header image>
        <Placeholder.Line />
        <Placeholder.Line />
      </Placeholder.Header>

      <Placeholder.Header image>
        <Placeholder.Line />
        <Placeholder.Line />
      </Placeholder.Header>
    </Placeholder>
  );
  const sectionVideoPlaceholder = (
    <div className={s.sectionVideoCardPlaceholder}>
      <div style={{ marginRight: "30px" }}>
        <Placeholder
          style={{
            height: "110px",
            width: "120px",
          }}
        >
          <Placeholder.Image />
        </Placeholder>
      </div>

      <div style={{ width: "100%" }}>
        <Placeholder>
          <PlaceholderLine length="medium" />
          <PlaceholderLine length="medium" />
        </Placeholder>
      </div>
    </div>
  );

  // Resize listener to make video Container & resourceDetailRightSideCardColumn size equal
  const [resizeListener, sizes] = useResizeAware();

  // To remove resize listener on screen < 1200px
  const handleMediaQueryChange = (matches: boolean) => {
    setIsRemoveResizeListerner(matches);
  };
  const showMobileView = useMediaQuery(
    { maxWidth: 1199 },
    undefined,
    handleMediaQueryChange,
  );
  const [isRemoveResizeListerner, setIsRemoveResizeListerner] = useState<
    boolean
  >(showMobileView);

  return (
    <div>
      <div className={s.resourceDetailRoot}>
        <div className={`${s.resourceDetailGrid} resourceDetailGrid`}>
          <WhiteCard className={`${s.videoContainer} position-relative`}>
            {!isRemoveResizeListerner && resizeListener}

            <ResourceDetailVideoPlayer
              resourceDetailState={null}
              videoDidEnd={() => {}}
              updatePlayedPercentage={() => {}}
              onNext={() => {}}
            />
            <Row className={s.videoHeadingRow}>
              <Typography.Title className={s.videoHeadingRowTitle}>
                {linePlaceholder}
              </Typography.Title>

              <div className={s.videoHeadingFooter}>
                {linePlaceholder}
                <Typography.Paragraph className={s.videoMetadata}>
                  {linePlaceholder}
                </Typography.Paragraph>
              </div>

              <Row className={s.creatorAvatarPlaceholderRow}>
                {creatorPlaceholder}
              </Row>
              <Row
                className={s.currentlyPlayingDetail}
                style={{ marginTop: 30 }}
              >
                {descriptionPlaceholder}
              </Row>
            </Row>
          </WhiteCard>

          <WhiteCard className={s.resourceDetailRightSideCardColumn}>
            <div className={s.resourcesDetailPlaylistCardHeaderContent}>
              <TypographyTitle type={TypographyTitleType.CARD_SUB_TITLE}>
                <Placeholder>
                  <PlaceholderLine length="short" />
                </Placeholder>
              </TypographyTitle>
              <TypographyTitle type={TypographyTitleType.CARD_SUB_TITLE}>
                {linePlaceholder}
              </TypographyTitle>
              <div
                className={s.rightSideCardDescriptionPlaceholder}
                style={{ paddingRight: "100px" }}
              >
                {descriptionPlaceholder}
              </div>
              <TypographyTitle type={TypographyTitleType.CARD_SUB_TITLE}>
                <Placeholder>
                  <PlaceholderLine length="short" />
                </Placeholder>
              </TypographyTitle>
              <TypographyTitle type={TypographyTitleType.CARD_SUB_TITLE}>
                {linePlaceholder}
              </TypographyTitle>

              <div>
                {sectionVideoPlaceholder}
                {sectionVideoPlaceholder}
              </div>
            </div>
          </WhiteCard>
        </div>
      </div>
    </div>
  );
};

export default ResourceDetailLoadingView;
