import React from 'react';
import './Experience.css';

const Experience = () => {
  const experiences = [
    {
      id: 1,
      company: 'Eminence Technology',
      position: 'Full Stack Developer',
      duration: '2022 - Present',
      location: 'Mohali, India',
      type: 'Full-time',
      responsibilities: [
        'Build and maintain full-stack web applications using the MERN stack (React, Node.js, Express, MongoDB)',
        'Develop RESTful APIs and integrate them with responsive, user-friendly frontends',
        'Collaborate with cross-functional teams to deliver client projects on schedule',
        'Write clean, maintainable code and participate in code reviews',
        'Debug production issues and improve application performance and reliability'
      ],
      technologies: ['React', 'Node.js', 'Express.js', 'MongoDB', 'JavaScript', 'REST APIs']
    },
    {
      id: 2,
      company: 'PixlerLab',
      position: 'React.js Intern',
      duration: 'Sep 2021 - Jan 2022',
      location: 'Mohali, India',
      type: 'Internship',
      responsibilities: [
        'Learned React.js fundamentals — components, props, state, and basic hooks',
        'Assisted seniors with small UI tasks and simple page sections under close guidance',
        'Practiced HTML, CSS, and JavaScript while fixing minor bugs on assigned tickets',
        'Observed how the team plans work, uses Git, and reviews code in a real project environment',
        'Built confidence by picking up new concepts each week and applying them to hands-on tasks'
      ],
      technologies: ['React.js', 'JavaScript', 'HTML5', 'CSS3', 'Git']
    }
  ];

  return (
    <section id="experience" className="experience">
      <div className="experience-container">
        <div className="experience-header">
          <h2 className="section-title">Work Experience</h2>
          <div className="title-underline"></div>
          <p className="section-subtitle">
            My professional journey and the experiences that shaped my career
          </p>
        </div>

        <div className="timeline">
          {experiences.map((exp, index) => (
            <div key={exp.id} className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}>
              <div className="timeline-content">
                <div className="experience-card">
                  <div className="experience-header-card">
                    <div className="company-info">
                      <h3 className="position">{exp.position}</h3>
                      <h4 className="company">{exp.company}</h4>
                      <div className="experience-meta">
                        <span className="duration">{exp.duration}</span>
                        <span className="location">{exp.location}</span>
                        <span className={`type ${exp.type.toLowerCase()}`}>{exp.type}</span>
                      </div>
                    </div>
                  </div>

                  <div className="experience-body">
                    <h5>Key Responsibilities:</h5>
                    <ul className="responsibilities">
                      {exp.responsibilities.map((responsibility, idx) => (
                        <li key={idx}>{responsibility}</li>
                      ))}
                    </ul>

                    <div className="experience-technologies">
                      <h5>Technologies Used:</h5>
                      <div className="tech-tags">
                        {exp.technologies.map((tech, idx) => (
                          <span key={idx} className="tech-tag">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="timeline-marker"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;