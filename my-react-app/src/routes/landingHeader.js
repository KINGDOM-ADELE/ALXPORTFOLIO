import React, { useRef } from 'react';

function Header() {
  const introRef = useRef('intro');
  const featuresRef = useRef('features');
  const aboutRef = useRef('about');

  const scrollToSection = (ref) => {
    if (ref.current) {
      const element = document.getElementById(ref.current);
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  };

  return (
    <header className="sticky-header">
      <div className="logo">
        <a href="/">
          <img
            className="navBarImg cursorPointer"
            src={require('../assets/manager_app.logo.png')}
            alt="Logo"
          />
        </a>
      </div>
      <nav>
        <ul>
          <li onClick={() => scrollToSection(introRef)}>Intro</li>
          <li onClick={() => scrollToSection(featuresRef)}>Features</li>
          <li onClick={() => scrollToSection(aboutRef)}>About</li>
        </ul>
      </nav>
      <a href="/home" className="btn">
        Visit Manager
      </a>
    </header>
  );
}

export default Header;
