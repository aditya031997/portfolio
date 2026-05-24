import React from 'react';
import './About.css';

const About = () => {
  return (
    <section id="about" className="about">
      <div className="about-container">
        <div className="about-header">
          <h2 className="section-title">About Me</h2>
          <div className="title-underline"></div>
        </div>
        
        <div className="about-content">
          <div className="about-text">
            <h3>Hello! I'm a passionate developer</h3>
            <p>
              I'm a dedicated full-stack developer with over 4+ years of experience creating 
              premium digital experiences that make a difference. I specialize in building 
              responsive, high-performance web applications using modern, cutting-edge technologies.
            </p>
            <p>
              My journey in web development started with a curiosity about how websites operate, 
              which rapidly evolved into a career path focused on coding seamless backends and 
              highly interactive user interfaces. I thrive on solving complex computational problems 
              and learning new parts of the ever-evolving tech ecosystem.
            </p>
            
            <div className="about-stats-mini">
              <div className="about-stat">
                <span className="about-stat-num">4+</span>
                <span className="about-stat-label">Years Experience</span>
              </div>
              <div className="about-stat">
                <span className="about-stat-num">10+</span>
                <span className="about-stat-label">Projects Completed</span>
              </div>
              <div className="about-stat">
                <span className="about-stat-num">100%</span>
                <span className="about-stat-label">Commitment</span>
              </div>
            </div>
          </div>
          
          <div className="about-image">
            <div className="image-wrapper">
              {/* Elegant Terminal Card Mockup */}
              <div className="about-photo-mockup">
                <div className="terminal-header">
                  <span className="terminal-dot red"></span>
                  <span className="terminal-dot yellow"></span>
                  <span className="terminal-dot green"></span>
                  <span className="terminal-title">bash - aditya@singh</span>
                </div>
                <div className="terminal-body">
                  <p className="cmd"><span className="prompt">aditya:~$</span> cat profile.json</p>
                  <p className="output-json">
                    <span className="brace">&#123;</span><br />
                    &nbsp;&nbsp;<span className="key">"name"</span>: <span className="val">"Aditya Singh"</span>,<br />
                    &nbsp;&nbsp;<span className="key">"role"</span>: <span className="val">"Full Stack Developer"</span>,<br />
                    &nbsp;&nbsp;<span className="key">"location"</span>: <span className="val">"Mohali, India"</span>,<br />
                    &nbsp;&nbsp;<span className="key">"focus"</span>: <span className="val">"Clean Architecture & UX"</span>,<br />
                    &nbsp;&nbsp;<span className="key">"stack"</span>: <span className="brace">[</span><span className="val">"React"</span>, <span className="val">"Node"</span>, <span className="val">"MongoDB"</span><span className="brace">]</span><br />
                    <span className="brace">&#125;</span>
                  </p>
                  <p className="cmd"><span className="prompt">aditya:~$</span> <span className="blink-block">_</span></p>
                </div>
              </div>
              <div className="image-decoration"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;