import React from "react";
import s from "./Home.module.scss";
import introductionImage from "assets/images/landingPage_IntroductionImage.svg";

const HomeIntroductionSection: React.FC = () => {
  return (
    <section id="introduction_section" className={s.introductionSection}>
      <div className={s.introductionText}>
        Courses don’t really work, so we came up with something better.
      </div>

      <div className={s.introductionBody}>
        <div className={s.introductionBodyMetaDeta}>INTRODUCING</div>
        <div className={s.introductionBodyTitle}>Aaspire Collections</div>
        <div className={s.introductionBodyBlueLine}></div>

        <div className={s.introductionBodyContent}>
          <div className={s.introductionBodyImageContainer}>
            <img src={introductionImage} alt="" />
          </div>
          <div className={s.introductionBodyContentTextContainer}>
            <div>
              A few videos from 1 instructor just isn’t enough. A constantly
              growing collection of content from the world’s top experts? Now
              that just might do the trick.
            </div>
            <br />
            <div>
              No more frantically Google-ing to find that next online course or
              blog post. Aaspire Collections bring all the educational content
              you need for any given learning goal into one central place.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeIntroductionSection;
