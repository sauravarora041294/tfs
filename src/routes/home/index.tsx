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
import BannerSection from "components/UserSideLanding/containers/Saas/BannerSection";
import FeatureSection from "components/UserSideLanding/containers/Saas/FeatureSection";
import VisitorSection from "components/UserSideLanding/containers/Saas/VisitorSection";
import ServiceSection from "components/UserSideLanding/containers/Saas/ServiceSection";
import Footer from "components/UserSideLanding/containers/Saas/Footer";
import PricingSection from "components/UserSideLanding/containers/Saas/PricingSection";
import TrialSection from "components/UserSideLanding/containers/Saas/TrialSection";
import TimelineSection from "components/UserSideLanding/containers/Saas/TimelineSection";
import TestimonialSection from "components/UserSideLanding/containers/Saas/TestimonialSection";
import PartnerSection from "components/UserSideLanding/containers/Saas/PartnerSection";
import { DrawerProvider } from "common/src/contexts/DrawerContext";
import FaqSection from "components/UserSideLanding/containers/Saas/FaqSection";

export default () => {
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
          <BannerSection />
          <FeatureSection />
          <VisitorSection />
          <ServiceSection />
          <PricingSection />
          <TestimonialSection />
          <PartnerSection />
          <TimelineSection />
          <FaqSection />
          <TrialSection />
          <Footer />
        </ContentWrapper>
      </Fragment>
    </ThemeProvider>
  );
};
