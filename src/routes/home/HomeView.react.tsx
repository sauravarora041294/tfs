import React, { Fragment } from "react";
import Sticky from "react-stickynode";
import { ThemeProvider } from "styled-components";
import { saasTheme } from "common/src/theme/saas";
import { ResetCSS } from "common/src/assets/css/style";
import {
  GlobalStyle,
  ContentWrapper,
} from "components/UserSideLanding/containers/Saas/saas.style";
import Navbar from "components/UserSideLanding/containers/Saas/Navbar";
import s from "./Home.module.scss";
import { DrawerProvider } from "common/src/contexts/DrawerContext";
import HomeHeaderSection from "./HomeHeaderSection.react";
import HomeIntroductionSection from "./HomeIntroductionSection.react";
import HomeFeaturesSection from "./HomeFeaturesSection.react";
import HomeFindCollectionsSection from "./HomeFindCollectionsSection.react";
import HomeAchieveSection from "./HomeAchieveSection.react";
import HomeGuaranteeSection from "./HomeGuaranteeSection.react";
import HomeFAQSection from "./HomeFAQSection.react";
import HomeFooterSection from "./HomeFooterSection.react";
import {
  useFetchLandingPageCountData,
  useFetchLandingPageTopCollectionsData,
} from "./HomeUtil";

const HomeView: React.FC = () => {
  const landingPageCountData = useFetchLandingPageCountData();
  const landingPageTopCollectionsData = useFetchLandingPageTopCollectionsData();

  return (
    <ThemeProvider theme={saasTheme}>
      <Fragment>
        <ResetCSS />
        <GlobalStyle />
        <ContentWrapper>
          <Sticky top={0} innerZ={9999} activeClass="sticky-nav-active">
            <DrawerProvider>
              <Navbar />
            </DrawerProvider>
          </Sticky>
          <HomeHeaderSection landingPageCountData={landingPageCountData} />
          <HomeIntroductionSection />
          <HomeFeaturesSection />
          <HomeFindCollectionsSection
            collectionsData={landingPageTopCollectionsData}
          />
          <HomeAchieveSection />
          <div className={s.landingPageFooter}>
            <HomeGuaranteeSection />
            <HomeFAQSection />
            <HomeFooterSection />
          </div>
        </ContentWrapper>
      </Fragment>
    </ThemeProvider>
  );
};

export default HomeView;
