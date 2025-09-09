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
              I'm a dedicated web developer with over 3 years of experience creating 
              digital experiences that make a difference. I specialize in building 
              responsive, user-friendly applications using modern technologies.
            </p>
            <p>
              My journey in web development started with a curiosity about how websites work, 
              and it has evolved into a passion for creating seamless user experiences. 
              I enjoy solving complex problems and learning new technologies.
            </p>
        
          </div>
          
          <div className="about-image">
            <div className="image-wrapper">
              <div className="about-photo">
                <span>Your Professional Photo</span>
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