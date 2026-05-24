import React, { useEffect } from 'react';
import './App.css';

// Import all components
import Header from './components/Header';
import Home from './components/Home';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';

function App() {
  // Smooth scrolling for navigation links
  useEffect(() => {
    const handleSmoothScroll = (e) => {
      // Check if the clicked element is a navigation link
      if (e.target.tagName === 'A' && e.target.getAttribute('href').startsWith('#')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          const headerHeight = 70; // Height of fixed header
          const targetPosition = targetElement.offsetTop - headerHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    };

    // Add event listener for smooth scrolling
    document.addEventListener('click', handleSmoothScroll);
    
    // Cleanup event listener
    return () => {
      document.removeEventListener('click', handleSmoothScroll);
    };
  }, []);

  // Add scroll-to-top functionality
  useEffect(() => {
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '↑';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.setAttribute('aria-label', 'Scroll to top');
    document.body.appendChild(scrollToTopBtn);

    const handleScroll = () => {
      if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('visible');
      } else {
        scrollToTopBtn.classList.remove('visible');
      }
    };

    const handleScrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    };

    scrollToTopBtn.addEventListener('click', handleScrollToTop);
    window.addEventListener('scroll', handleScroll);

    // Cleanup
    return () => {
      scrollToTopBtn.removeEventListener('click', handleScrollToTop);
      window.removeEventListener('scroll', handleScroll);
      if (document.body.contains(scrollToTopBtn)) {
        document.body.removeChild(scrollToTopBtn);
      }
    };
  }, []);

  return (
    <div className="App">
      <Header />
      <main>
        <Home />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>
      
      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-content">
            <p>&copy; 2026 Aditya Singh. All rights reserved.</p>
            <p>Crafted with React.js & ⚡</p>
          </div>
          
          <div className="footer-links">
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#skills">Skills</a>
            <a href="#experience">Experience</a>
            <a href="#projects">Projects</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;