import React from "react";
import s from "./Home.module.scss";

const HomeGuaranteeSection: React.FC = () => {
  return (
    <section id="find_collections_section" className={s.guaranteeSection}>
      <div className={s.metaData}>our guarantee to you</div>
      <div className={s.guaranteeSectionText}>
        If we don’t deliver a phenomenal learning experience, ask us for a
        refund — <strong>seriously</strong>.
      </div>
    </section>
  );
};

export default HomeGuaranteeSection;
