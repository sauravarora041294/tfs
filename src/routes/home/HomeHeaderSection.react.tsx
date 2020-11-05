import React from "react";
import s from "./Home.module.scss";
import AaspireButton, {
  AaspireButtonType,
} from "components/AaspireBasicComponents/AaspireButton";
import girlImage from "assets/images/GirlImage.svg";
import rocketImage from "assets/images/rocketImage.svg";
import { LandingPageCountData } from "./HomeUtil";
import LoadingView from "components/Views/LoadingView";
import { Link } from "react-router-dom";

interface Props {
  landingPageCountData?: LandingPageCountData;
}

const HomeHeaderSection: React.FC<Props> = ({ landingPageCountData }) => {
  return (
    <section id="header_section" className={s.headerSection}>
      {/* Header text */}
      <div className={s.headerText}>
        <div className={s.headerTextTitle}>
          Become who you <strong>Aspire</strong> to be
        </div>
        <div className={s.headerTextDescription}>
          Expert-curated collections of content to help you achieve your
          learning goals.
        </div>

        <div className={s.headerTextButtons}>
          <Link to="/signup">
            <AaspireButton type="primary" size="large">
              START LEARNING
            </AaspireButton>
          </Link>
          <AaspireButton
            type="default"
            size="large"
            subType={AaspireButtonType.OUTLINED}
            onClick={() => {
              let scrollDiv = document.getElementById("introduction_section")
                .offsetTop;
              window.scrollTo({ top: scrollDiv - 20, behavior: "smooth" });
            }}
          >
            EXPLORE MORE
          </AaspireButton>
        </div>

        <div className={s.girlImageContainer}>
          <img src={girlImage} alt="girl image" />
        </div>

        <div className={s.rocketImageContainer}>
          <img src={rocketImage} alt="rocket image" />
        </div>
      </div>

      {/* Header statistics */}
      <div className={s.headerStatistics}>
        {landingPageCountData.isLoading ? (
          <LoadingView />
        ) : (
          <>
            <div>
              <div className={s.headerStatisticsTitle}>
                {landingPageCountData.count.missionCount}+ Collections
              </div>
              <div className={s.headerStatisticsSubtitle}>
                Curated by Experts
              </div>
            </div>
            <div>
              <div className={s.headerStatisticsTitle}>
                {landingPageCountData.count.resourcesCount}+ Videos
              </div>
              <div className={s.headerStatisticsSubtitle}>
                Verified for Quality
              </div>
            </div>
            <div>
              <div className={s.headerStatisticsTitle}>
                {landingPageCountData.count.creatorsCount}+ Experts
              </div>
              <div className={s.headerStatisticsSubtitle}>
                Creating World-Class Content
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default HomeHeaderSection;
