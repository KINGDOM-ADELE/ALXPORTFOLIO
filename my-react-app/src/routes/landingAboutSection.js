import React from 'react';

function AboutSection() {
  return (
    <section id="about" className="about-section">
      <div className="about-content">
        <p>The inspiration to build the Zenager project likely comes from a combination of recognizing a real need in the education sector, a desire to improve administrative processes, a passion for technology, and the opportunity to make a positive impact on education..</p>
        <p>This is a Portfolio Project for Holberton School. <a href="/holberton-link">Learn More</a></p>
        {/* Add links to team members' LinkedIn, GitHub, and Twitter profiles */}
        <p><a href="/github-link">GitHub Repository</a></p>
      </div>
    </section>
  );
}

export default AboutSection;


