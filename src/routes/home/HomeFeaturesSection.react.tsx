import React from "react";
import s from "./Home.module.scss";
import landingPageFeatureImage1 from "assets/images/landingPage_feature1.svg";
import landingPageFeatureImage2 from "assets/images/landingPage_feature2.svg";
import landingPageFeatureImage3 from "assets/images/landingPage_feature3.svg";

const HomeFeaturesSection: React.FC = () => {
  return (
    <section id="features_section" className={s.featuresSection}>
      <div className={s.featuresHeader}>
        Why Aaspire Collections are so <strong>Powerful</strong>
      </div>

      <div className={s.featuresBody}>
        <div className={s.feature}>
          <div className={s.featureImageContainer}>
            <img src={landingPageFeatureImage1} alt="" />
          </div>
          <div className={s.featureTitle}>Curated by Top Experts</div>
          <div className={s.featureDescription}>
            Instead of 1 instructor, be taught by a group of the world’s top
            experts.
          </div>
        </div>
        <div className={s.feature}>
          <div className={s.featureImageContainer}>
            <img src={landingPageFeatureImage2} alt="" />
          </div>
          <div className={s.featureTitle}>Curated by Top Experts</div>
          <div className={s.featureDescription}>
            Instead of 1 instructor, be taught by a group of the world’s top
            experts.
          </div>
        </div>
        <div className={s.feature}>
          <div className={s.featureImageContainer}>
            <img src={landingPageFeatureImage3} alt="" />
          </div>
          <div className={s.featureTitle}>Curated by Top Experts</div>
          <div className={s.featureDescription}>
            Instead of 1 instructor, be taught by a group of the world’s top
            experts.
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeFeaturesSection;
