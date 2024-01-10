import React from 'react';
import Header from './l_Header';
import IntroSection from './l_IntroSection';
import FeatureSection from './l_FeatureSection';
import FeatureSection2 from './l_FeatureSection2';
import AboutSection from './l_AboutSection';
import MyOptionalVideo from './l_OptionalVideo';

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
