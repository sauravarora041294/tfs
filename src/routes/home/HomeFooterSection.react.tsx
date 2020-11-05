import React from "react";
import s from "./Home.module.scss";
import {
  LinkedinOutlined,
  FacebookOutlined,
  InstagramOutlined,
} from "@ant-design/icons";
import aaspireLogo from "assets/icons/aaspireLogo.svg";

const HomeFooterSection: React.FC = () => {
  return (
    <section id="footer_section" className={s.footerSection}>
      <div className={s.firstRow}>
        <div className={s.logoContainer}>
          <img src={aaspireLogo} alt="" />
        </div>

        <div className={s.aboutUsAndInfoContainer}>
          <div className={s.aboutUsContainer}>
            <div className={s.title}>About Us</div>
            <div>
              <div className={s.links}>
                <a href="https://www.thefutureschool.app/">Support Center</a>
                <a href="https://www.thefutureschool.app/">Customer Support</a>
                <a href="https://www.thefutureschool.app/">About Us</a>
                <a href="https://www.thefutureschool.app/">Copyright</a>
              </div>
            </div>
          </div>

          <div className={s.infoContainer}>
            <div className={s.title}>Info</div>
            <div>
              <div className={s.links}>
                <a href="https://www.thefutureschool.app/">Privacy Policy</a>
                <a href="https://www.thefutureschool.app/">
                  Terms & Conditions
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={s.logoAndCopyrightTextContainer}>
        <div>
          <a href="https://www.thefutureschool.app/" target="_empty">
            <LinkedinOutlined />
          </a>
          <a href="https://www.thefutureschool.app/" target="_empty">
            <FacebookOutlined />
          </a>
          <a href="https://www.thefutureschool.app/" target="_empty">
            <InstagramOutlined />
          </a>
        </div>

        <div className={s.copyRightText}>
          © Aaspire {new Date().getUTCFullYear()}
        </div>
      </div>
    </section>
  );
};

export default HomeFooterSection;
