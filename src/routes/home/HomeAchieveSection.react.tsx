import React from "react";
import s from "./Home.module.scss";
import AaspireButton, {
  AaspireButtonType,
} from "components/AaspireBasicComponents/AaspireButton";
import landingPage_achieveSectionImage from "assets/images/landingPage_achieveSectionImage.png";
import { Link } from "react-router-dom";

const HomeAchieveSection: React.FC = () => {
  return (
    <section id="find_collections_section" className={s.achieveSection}>
      <div className={s.achieveSectionContent}>
        <div className={s.header}>
          What are <strong>You</strong> Going to Achieve?
        </div>
        <div className={s.btnContainer}>
          <Link to="/signup">
            <AaspireButton type="primary">GET UNLIMITED ACCESS</AaspireButton>
          </Link>
        </div>
      </div>
      <div className={s.imgContainer}>
        <img src={landingPage_achieveSectionImage} alt="" />
      </div>
    </section>
  );
};

export default HomeAchieveSection;
