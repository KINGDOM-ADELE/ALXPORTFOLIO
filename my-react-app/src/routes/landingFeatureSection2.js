import React from 'react';

import prospectsImage from '../assets/courses.png';
import feedsImage from '../assets/users-page.png';
import adminLandingImage from '../assets/User_profile.png';

function FeatureSection2() {
  const features = [
    {
      name: 'COURSES',
      description:
        'This feature provides the admin the ability to create or delete courses, it also provides users with the ability to determin and chose courses to enroll in on their own.',
      image: prospectsImage,
    },
    {
      name: 'USERS',
      description:
        'This feature allows admin view and manage students and users at large.',
      image: feedsImage,
    },
    {
      name: 'PROFILE',
      description:
        'This feature allows users to manage thier profile informtion, they can edit and update their personal details.',
      image: adminLandingImage,
    },
  ];

  return (
    <section id="features2" className="feature-section fsection2">
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

export default FeatureSection2;
