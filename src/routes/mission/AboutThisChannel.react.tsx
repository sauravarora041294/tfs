import React from "react";
import s from "./Mission.module.scss";
import CheckMarkIcon from "assets/icons/checkmark.png";
import { Collapse } from "antd";
import * as DataTypes from "data/types";
import CollapsePanel from "components/CollapsePanel";
import aboutChannelIcon1 from "assets/icons/aboutChannelIcon1.svg";
import aboutChannelIcon2 from "assets/icons/aboutChannelIcon2.svg";
import aboutChannelIcon3 from "assets/icons/aboutChannelIcon3.svg";
import aboutChannelIcon4 from "assets/icons/aboutChannelIcon4.svg";
import collapseArrowDown from "assets/icons/collapseArrowDown.svg";
import collapseArrowRight from "assets/icons/collapseArrowRight.svg";
import TypographyTitle, {
  TypographyTitleType,
} from "components/AaspireBasicComponents/Typography/TypographyTitle";
import WhiteCard from "components/WhiteCard";

interface Props {
  isShowMobileView?: boolean;
  mission: DataTypes.Mission;
}
const talkingPoints = [
  "Step-by-step problem walkthroughs",
  "Beginner, Intermediate, Advanced Skill Levels",
  "Expert advice on how to prepare",
  "Best for College Students",
  "Expert advice on how to prepare",
  "Beginner, Intermediate, Advanced Skill Levels",
  "Beginner, Intermediate, Advanced Skill Levels",
  "Beginner, Intermediate, Advanced Skill Levels",
];
const AboutThisChannel: React.FC<any> = (props: Props) => {
  const { infoPoints } = props.mission;

  const mainContent = (
    <WhiteCard
      title={props.isShowMobileView ? "" : "About This Collection"}
      subTitle={
        "If you want to ace your next coding interview and land your dream job, you’ve come to the right place."
      }
      className={props.isShowMobileView ? s.smallScreenAboutCard : ""}
      smallSizeTitleAndSubtitle
      customBodyPaddingValues={{
        left: "2rem",
        right: "2rem",
        bottom: "2rem",
        top: "2rem",
      }}
      bodyClassName={s.smallScreenCardBody}
      headerClassName={s.smallScreenCardHeader}
    >
      <Collapse
        accordion
        expandIconPosition="right"
        expandIcon={({ isActive }) => {
          return isActive ? (
            <img src={collapseArrowDown} />
          ) : (
            <img src={collapseArrowRight} />
          );
        }}
      >
        <CollapsePanel
          header={
            <TypographyTitle
              type={TypographyTitleType.SECONDARY_TITLE}
              className="collapsePanelHeader"
            >
              <img src={aboutChannelIcon1} />
              <span>What’s included?</span>
            </TypographyTitle>
          }
          key="1"
        >
          <div className={s.missionSubBannerPoints}>
            {infoPoints &&
              infoPoints.whatsIncluded &&
              infoPoints.whatsIncluded.map((point, idx) => {
                return (
                  <div key={idx} className={s.missionSubBannerPoint}>
                    <img src={CheckMarkIcon} /> {point}
                  </div>
                );
              })}
          </div>
        </CollapsePanel>
        <CollapsePanel
          header={
            <TypographyTitle
              type={TypographyTitleType.SECONDARY_TITLE}
              className="collapsePanelHeader"
            >
              <img src={aboutChannelIcon2} />
              <span>Who’s it for?</span>
            </TypographyTitle>
          }
          key="2"
        >
          {infoPoints && infoPoints.meantFor}
        </CollapsePanel>
        <CollapsePanel
          header={
            <TypographyTitle
              type={TypographyTitleType.SECONDARY_TITLE}
              className="collapsePanelHeader"
            >
              <img src={aboutChannelIcon3} />
              <span>How do I get started?</span>
            </TypographyTitle>
          }
          key="3"
        >
          {infoPoints && infoPoints.getStarted}
        </CollapsePanel>
        <CollapsePanel
          header={
            <TypographyTitle
              type={TypographyTitleType.SECONDARY_TITLE}
              className="collapsePanelHeader"
            >
              <img src={aboutChannelIcon4} />
              <span>When does new content get added?</span>
            </TypographyTitle>
          }
          key="4"
        >
          {infoPoints && infoPoints.whenAdded}
        </CollapsePanel>
      </Collapse>
    </WhiteCard>
  );

  return mainContent;
};

export default AboutThisChannel;
