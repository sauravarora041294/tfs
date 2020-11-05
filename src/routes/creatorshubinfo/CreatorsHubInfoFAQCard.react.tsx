import React from "react";
import { Card, Collapse, List, Typography } from "antd";
import CollapsePanel from "components/CollapsePanel";
import s from "./CreatorsHubInfo.module.scss";
import TypographyTitle, {
  TypographyTitleType,
} from "components/AaspireBasicComponents/Typography/TypographyTitle";
import CheckMarkIcon from "assets/icons/checkmark.png";

const pointCalculationCriterion = [
  "Content Quality",
  "How many people your content helps",
  "How you leverage user feedback",
  "How often you contribute content",
];
const contentRights = [
  "You own the rights to your content.",
  "By uploading to our platform, you grant us a 2-year license to your content.",
  "You can sell your content on other sites and you can upload content you’ve already posted on other sites.",
];
const CreatorsHubInfoFAQCard: React.FC = () => {
  return (
    <Card title={"FAQ"}>
      <Collapse defaultActiveKey={["1"]}>
        <CollapsePanel
          header={
            <TypographyTitle
              type={TypographyTitleType.SECONDARY_TITLE}
              className={`collapsePanelHeader ${s.collapsePanelHeader}`}
            >
              How are points calculated?
            </TypographyTitle>
          }
          key="1"
        >
          {"Points are calculated based on these high-level criteria: \n"}

          <div className={s.pointWrapper}>
            {pointCalculationCriterion.map(point => {
              return (
                <div className={s.singlePoint}>
                  {" "}
                  <div>
                    <img src={CheckMarkIcon} />
                  </div>
                  &nbsp;{point}
                </div>
              );
            })}
          </div>
          {
            "\nOur algorithm uses several signals under the hood to calculate your score for each of these criteria. Then, that score is summed up into your total number of points earned for any given month. "
          }
        </CollapsePanel>
        <CollapsePanel
          header={
            <TypographyTitle
              type={TypographyTitleType.SECONDARY_TITLE}
              className={`collapsePanelHeader ${s.collapsePanelHeader}`}
            >
              How are payouts calculated?
            </TypographyTitle>
          }
          key="2"
        >
          {
            "A simple formula. We first calculate our Creator Earnings Pool (CEP) by taking a percentage of our total user subscription revenue for any given month. We then calculate each creator’s earnings for that month by taking CEP * (points earned by creator in that month / total points earned by all creators in that month)."
          }
        </CollapsePanel>
        <CollapsePanel
          header={
            <TypographyTitle
              type={TypographyTitleType.SECONDARY_TITLE}
              className={`collapsePanelHeader ${s.collapsePanelHeader}`}
            >
              When are payouts sent?
            </TypographyTitle>
          }
          key="3"
        >
          {
            "We send payouts on the first business day of every month for all your earnings from the previous month."
          }
        </CollapsePanel>
        <CollapsePanel
          header={
            <TypographyTitle
              type={TypographyTitleType.SECONDARY_TITLE}
              className={`collapsePanelHeader ${s.collapsePanelHeader}`}
            >
              How do content rights work?
            </TypographyTitle>
          }
          key="4"
        >
          <div className={s.pointWrapper}>
            {contentRights.map(point => {
              return (
                <div className={s.singlePoint}>
                  {" "}
                  <div>
                    <img src={CheckMarkIcon} />
                  </div>
                  &nbsp;{point}
                </div>
              );
            })}
          </div>
        </CollapsePanel>
        <CollapsePanel
          header={
            <TypographyTitle
              type={TypographyTitleType.SECONDARY_TITLE}
              className={`collapsePanelHeader ${s.collapsePanelHeader}`}
            >
              Are there restrictions on taking down my content once I’ve posted
              it?
            </TypographyTitle>
          }
          key="5"
        >
          {
            "You can take down your content for any reason within the first 30 days of uploading it. After 30 days are up, you need to request approval to take it down. The reason we have this rule is pretty straightforward - if your content has become an integral part of our content ecosystem, it could negatively impact the learning experience for our users if it was suddenly gone."
          }
        </CollapsePanel>
        <CollapsePanel
          header={
            <TypographyTitle
              type={TypographyTitleType.SECONDARY_TITLE}
              className={`collapsePanelHeader ${s.collapsePanelHeader}`}
            >
              Can I post courses that I already sell on other sites?
            </TypographyTitle>
          }
          key="6"
        >
          {
            "Yes. However, we encourage you to make sure all of the content you post on Aaspire is the highest quality possible."
          }
        </CollapsePanel>
      </Collapse>
    </Card>
  );
};

export default CreatorsHubInfoFAQCard;
