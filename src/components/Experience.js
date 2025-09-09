import React from 'react';
import './Experience.css';

const Experience = () => {
  const experiences = [
    {
      id: 1,
      company: 'TechCorp Solutions',
      position: 'Senior Frontend Developer',
      duration: '2022 - Present',
      location: 'Remote',
      type: 'Full-time',
      responsibilities: [
        'Led development of responsive web applications using React.js and TypeScript',
        'Collaborated with UI/UX designers to implement pixel-perfect designs',
        'Optimized application performance resulting in 40% faster load times',
        'Mentored junior developers and conducted code reviews',
        'Implemented automated testing strategies using Jest and Cypress'
      ],
      technologies: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'GraphQL']
    },
    {
      id: 2,
      company: 'Digital Innovations Inc.',
      position: 'Frontend Developer',
      duration: '2021 - 2022',
      location: 'New York, NY',
      type: 'Full-time',
      responsibilities: [
        'Developed and maintained multiple client websites using modern JavaScript frameworks',
        'Worked closely with backend team to integrate RESTful APIs',
        'Implemented responsive designs for mobile and desktop platforms',
        'Participated in agile development processes and sprint planning',
        'Created reusable component library to improve development efficiency'
      ],
      technologies: ['React', 'Vue.js', 'SASS', 'Bootstrap', 'REST APIs']
    },
    {
      id: 3,
      company: 'StartupHub',
      position: 'Junior Web Developer',
      duration: '2020 - 2021',
      location: 'San Francisco, CA',
      type: 'Full-time',
      responsibilities: [
        'Built interactive web applications using HTML, CSS, and JavaScript',
        'Assisted in the development of e-commerce platforms',
        'Debugged and fixed cross-browser compatibility issues',
        'Collaborated with design team to create user-friendly interfaces',
        'Participated in daily standups and team meetings'
      ],
      technologies: ['HTML5', 'CSS3', 'JavaScript', 'jQuery', 'PHP']
    },
    {
      id: 4,
      company: 'FreelanceWork',
      position: 'Freelance Web Developer',
      duration: '2019 - 2020',
      location: 'Remote',
      type: 'Contract',
      responsibilities: [
        'Developed custom websites for small businesses and startups',
        'Provided ongoing maintenance and support for client websites',
        'Created responsive designs that work across all devices',
        'Managed multiple projects simultaneously with tight deadlines',
        'Communicated directly with clients to understand requirements'
      ],
      technologies: ['WordPress', 'HTML/CSS', 'JavaScript', 'PHP', 'MySQL']
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