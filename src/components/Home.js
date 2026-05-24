import React, { useState, useEffect } from 'react';
import './Home.css';

const words = ['Full Stack Developer', 'Problem Solver', 'MERN Stack Expert'];

const Home = () => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    const handleType = () => {
      const i = loopNum % words.length;
      const fullText = words[i];

      setText(
        isDeleting
          ? fullText.substring(0, text.length - 1)
          : fullText.substring(0, text.length + 1)
      );

      setTypingSpeed(isDeleting ? 40 : 100);

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed]);

  return (
    <section id="home" className="home">
      {/* Background neon light aura orbs */}
      <div className="aura-orb aura-orb-cyan"></div>
      <div className="aura-orb aura-orb-violet"></div>
      
      <div className="home-container">
        <div className="home-content">
          <span className="welcome-tag">MERN Stack Developer · Mohali, India</span>
          <h1 className="home-title">
            Hi, I'm <span className="highlight">Aditya</span>
          </h1>
          <h2 className="home-subtitle">
            <span className="typewriter">{text}</span>
            <span className="cursor">|</span>
          </h2>
          <p className="home-description">
            MERN stack developer with 4+ years building scalable full-stack apps — REST APIs, PostgreSQL, 
            React & Next.js, and JWT-secured backends. I've shipped live products in crypto and AI voice, 
            and I care about clean code, maintainable architecture, and interfaces people actually enjoy using.
          </p>
          
          <div className="tech-stack">
            <span className="tech-label">Core Tech Stack:</span>
            <div className="tech-icons">
              <span className="tech-item">React.js</span>
              <span className="tech-item">Node.js</span>
              <span className="tech-item">MongoDB</span>
              <span className="tech-item">Express.js</span>
              <span className="tech-item">Next.js</span>
              <span className="tech-item">PostgreSQL</span>
            </div>
          </div>

          <div className="home-buttons">
            <a href="#projects" className="btn btn-glow btn-primary">
              View My Work
            </a>
            <a href="#contact" className="btn btn-glow btn-outline">
              Get In Touch
            </a>
            <a
              href={`${process.env.PUBLIC_URL}/Aditya_Singh_Resume.pdf`}
              download="Aditya_Singh_Resume.pdf"
              className="btn btn-glow btn-secondary"
            >
              Download CV <span className="cv-icon">↓</span>
            </a>
          </div>

          <div className="quick-stats">
            <div className="stat-item">
              <span className="stat-number">4+</span>
              <span className="stat-text">Years Experience</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">10+</span>
              <span className="stat-text">Projects Built</span>
            </div>
          </div>
        </div>
        
        <div className="home-image">
          <div className="image-placeholder">
            <div className="placeholder-circle">
              <div className="glowing-ring"></div>
              <div className="code-animation">
                <div className="code-line"></div>
                <div className="code-line"></div>
                <div className="code-line"></div>
                <div className="code-line"></div>
              </div>
              <span className="image-text">&lt;Code /&gt;</span>
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
      
      <a href="#about" className="scroll-indicator" aria-label="Scroll to about section">
        <div className="scroll-arrow"></div>
        <span className="scroll-text">Scroll to explore</span>
      </a>
    </section>
  );
};

export default Home;