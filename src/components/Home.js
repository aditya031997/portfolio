import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <section id="home" className="home">
      <div className="home-container">
        <div className="home-content">
          <h1 className="home-title">
            Hi, I'm <span className="highlight">Aditya</span>
          </h1>
          <h2 className="home-subtitle">
            Full Stack Developer
          </h2>
          <p className="home-description">
            I build end-to-end web applications using modern technologies like React, Node.js, and MongoDB. 
            Passionate about creating scalable solutions that deliver exceptional user experiences 
            from frontend to backend.
          </p>
          
          <div className="tech-stack">
            <span className="tech-label">Tech Stack:</span>
            <div className="tech-icons">
              <span className="tech-item">React</span>
              <span className="tech-item">Node.js</span>
              <span className="tech-item">MongoDB</span>
              <span className="tech-item">Express</span>
              <span className="tech-item">JavaScript</span>
            </div>
          </div>

          <div className="home-buttons">
            <a href="#projects" className="btn btn-primary">
              View My Work
            </a>
            <a href="#contact" className="btn btn-outline">
              Get In Touch
            </a>
            <a href="/resume.pdf" className="btn btn-secondary" target="_blank" rel="noopener noreferrer">
              Download Resume
            </a>
          </div>

          <div className="quick-stats">
            <div className="stat-item">
              <span className="stat-number">3+</span>
              <span className="stat-text">Years Experience</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">15+</span>
              <span className="stat-text">Projects Built</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">20+</span>
              <span className="stat-text">Happy Clients</span>
            </div>
          </div>
        </div>
        
        <div className="home-image">
          <div className="image-placeholder">
            <div className="placeholder-circle">
              <div className="code-animation">
                <div className="code-line"></div>
                <div className="code-line"></div>
                <div className="code-line"></div>
                <div className="code-line"></div>
              </div>
              <span className="image-text">Full Stack Developer</span>
            </div>
          </div>
          
          {/* Floating elements for visual appeal */}
          <div className="floating-elements">
            <div className="floating-item frontend">Frontend</div>
            <div className="floating-item backend">Backend</div>
            <div className="floating-item database">Database</div>
            <div className="floating-item api">API</div>
          </div>
        </div>
      </div>
      
      <div className="scroll-indicator">
        <div className="scroll-arrow"></div>
        <span className="scroll-text">Scroll to explore</span>
      </div>
    </section>
  );
};

export default Home;