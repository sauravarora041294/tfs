import React from "react";
import s from "./Home.module.scss";
import { Collapse } from "antd";
const { Panel } = Collapse;

const HomeFAQSection: React.FC = () => {
  return (
    <section id="faq_section" className={s.faqSection}>
      <div className={s.metadata}>FREQUENTLY ASKED QUESTIONS</div>
      <div className={s.faqSectionTitle}>
        You probably have some questions — we have the answers
      </div>

      {/* FAQ's */}
      <div className={s.faqCollapseContainer}>
        <Collapse bordered={false} defaultActiveKey={["1"]}>
          <Panel header="How much does it cost?" key="1">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Panel>
          <Panel header="What is the time commitment?" key="2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Panel>
          <Panel header="New updates" key="3">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Panel>
          <Panel
            header="How do I get in contact with Customer Service?"
            key="4"
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Panel>
          <Panel
            header="How is Aaspire different from other e-learning platforms?"
            key="5"
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Panel>
        </Collapse>
        ,
      </div>

      <div className={s.horizontalLine}></div>
    </section>
  );
};

export default HomeFAQSection;
