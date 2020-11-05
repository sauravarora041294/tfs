import { Icon } from "antd";
import React from "react";
import { withRouter } from "react-router";
import { compose } from "recompose";
import { History } from "history";
import s from "./AuthPageWelcomeSection.module.scss";
import loginIcon from "assets/images/loginPage-StandingPerson.svg";

interface Props {
  history?: History;
  error?: Error;
  pitchText?: String;
}

const AuthPageWelcomeSectionView: React.FC<Props> = (props: Props) => {
  return (
    <div className={s.slantedSectionWrapper}>
      <div className={s.headerSection}>
        <div className={s.headerSectionLight}>Welcome to</div>

        <div className={s.headerSectionBold}>The Future School</div>
      </div>
      <div className={s.pitchText}>
        {props.pitchText
          ? props.pitchText
          : `We’re here to build the best learning experience in the world.
                    We bring together the world’s top professionals to teach you the
                    topics that matter most.`}
      </div>
      <div className={s.salientPoints}>
        <div className={s.salientPoint}>
          <div>
            <Icon type="check" />
          </div>
          <span>1 Channel per topic </span>
        </div>
        <div className={s.salientPoint}>
          <div>
            <Icon type="check" />
          </div>
          <span>10+ expert instructors per channel</span>
        </div>
        <div className={s.salientPoint}>
          <div>
            <Icon type="check" />
          </div>
          <span>100+ videos per channel</span>
        </div>
      </div>
      <img className={s.heroImage} src={loginIcon} />
    </div>
  );
};

export default compose<Props, Props>(withRouter)(AuthPageWelcomeSectionView);
