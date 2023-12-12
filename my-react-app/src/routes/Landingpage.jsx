import React from 'react';
import Header from './landingHeader';
import IntroSection from './landingIntroSection';
import FeatureSection from './landingFeatureSection';
import FeatureSection2 from './landingFeatureSection2';
import AboutSection from './landingAboutSection';
import MyOptionalVideo from './landingOptionalVideo';

function Landingpage() {
  return (
    <div className="landing-page">
      <Header />
      <IntroSection />
      <FeatureSection />
      <FeatureSection2 />
      <AboutSection />
      <MyOptionalVideo />
    </div>
  );
}

export default Landingpage;
