import React from 'react';

import prospectsImage from '../assets/prospects.png';
import feedsImage from '../assets/feeds.png';
import adminLandingImage from '../assets/admin_landing.png';

function FeatureSection() {
  const features = [
    {
      name: 'PROSPECTS',
      description:
        'This feature provides admin information of prospective students from data collected via the enquiries feature from visitors who have officially asked about some thing of interest.',
      image: prospectsImage,
    },
    {
      name: 'FEEDS',
      description:
        'This feature provides admin, a means of passing information to users at large.',
      image: feedsImage,
    },
    {
      name: 'STATISTICS',
      description:
        'This feature provides the admin the statistics of performance and activities for the last six months .',
      image: adminLandingImage,
    },
  ];

  return (
    <section id="features" className="feature-section fsection1">
      <div className="feature-container">
        {features.map((feature, index) => (
          <div className="feature" key={index}>
            <h2>{feature.name}</h2>
            <div className="content-container">
              <img src={feature.image} alt={feature.name} />
              <p>{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default FeatureSection;
