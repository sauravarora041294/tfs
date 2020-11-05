import React, { Fragment } from "react";
import Sticky from "react-stickynode";
import { ThemeProvider } from "styled-components";
import { saasTheme } from "common/src/theme/saas";
import { ResetCSS } from "common/src/assets/css/style";
import {
  GlobalStyle,
  ContentWrapper,
} from "components/CreatorSideLanding/containers/Saas/saas.style";
import Navbar from "components/CreatorSideLanding/containers/Saas/Navbar";
import BannerSection from "components/CreatorSideLanding/containers/Saas/BannerSection";
import FeatureSection from "components/CreatorSideLanding/containers/Saas/FeatureSection";
import VisitorSection from "components/CreatorSideLanding/containers/Saas/VisitorSection";
import ServiceSection from "components/CreatorSideLanding/containers/Saas/ServiceSection";
import Footer from "components/CreatorSideLanding/containers/Saas/Footer";
import PricingSection from "components/CreatorSideLanding/containers/Saas/PricingSection";
import TrialSection from "components/CreatorSideLanding/containers/Saas/TrialSection";
import TimelineSection from "components/CreatorSideLanding/containers/Saas/TimelineSection";
import TestimonialSection from "components/CreatorSideLanding/containers/Saas/TestimonialSection";
import PartnerSection from "components/CreatorSideLanding/containers/Saas/PartnerSection";
import { DrawerProvider } from "common/src/contexts/DrawerContext";
import FaqSection from "components/CreatorSideLanding/containers/Saas/FaqSection";

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
