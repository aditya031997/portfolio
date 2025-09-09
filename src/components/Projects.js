import React from 'react';
import './Projects.css';

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: 'E-Commerce Website',
      description: 'A modern e-commerce platform built with React and Node.js. Features include user authentication, shopping cart, payment integration, and admin panel.',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      image: 'project1.jpg',
      liveLink: 'https://example.com',
      githubLink: 'https://github.com/yourusername/project1',
      category: 'Web App'
    },
    {
      id: 2,
      title: 'Task Management App',
      description: 'A collaborative task management application with real-time updates. Users can create teams, assign tasks, set deadlines, and track progress.',
      technologies: ['React', 'Firebase', 'Material-UI', 'WebSocket'],
      image: 'project2.jpg',
      liveLink: 'https://example.com',
      githubLink: 'https://github.com/yourusername/project2',
      category: 'Web App'
    },
    {
      id: 3,
      title: 'Weather Dashboard',
      description: 'A responsive weather dashboard that displays current weather and forecasts. Features location-based weather, interactive maps, and weather alerts.',
      technologies: ['JavaScript', 'OpenWeather API', 'Chart.js', 'CSS3'],
      image: 'project3.jpg',
      liveLink: 'https://example.com',
      githubLink: 'https://github.com/yourusername/project3',
      category: 'Web App'
    },
    {
      id: 4,
      title: 'Restaurant Website',
      description: 'A modern restaurant website with online reservation system, menu display, and customer reviews. Includes admin panel for managing bookings.',
      technologies: ['React', 'Express.js', 'MySQL', 'Bootstrap'],
      image: 'project4.jpg',
      liveLink: 'https://example.com',
      githubLink: 'https://github.com/yourusername/project4',
      category: 'Website'
    },
    {
      id: 5,
      title: 'Portfolio Website',
      description: 'A responsive portfolio website showcasing my work and skills. Built with modern design principles and smooth animations.',
      technologies: ['React', 'CSS3', 'Framer Motion', 'Netlify'],
      image: 'project5.jpg',
      liveLink: 'https://example.com',
      githubLink: 'https://github.com/yourusername/project5',
      category: 'Website'
    },
    {
      id: 6,
      title: 'Chat Application',
      description: 'Real-time chat application with rooms, private messaging, file sharing, and emoji support. Built with Socket.io for instant communication.',
      technologies: ['React', 'Socket.io', 'Node.js', 'MongoDB'],
      image: 'project6.jpg',
      liveLink: 'https://example.com',
      githubLink: 'https://github.com/yourusername/project6',
      category: 'Web App'
    }
  ];

  return (
    <section id="projects" className="projects">
      <div className="projects-container">
        <div className="projects-header">
          <h2 className="section-title">My Projects</h2>
          <div className="title-underline"></div>
          <p className="section-subtitle">
            Here are some of my recent projects that showcase my skills and creativity
          </p>
        </div>

        <div className="projects-grid">
          {projects.map((project) => (
            <div key={project.id} className="project-card">
              <div className="project-image">
                <div className="image-placeholder">
                  <span>Project Image</span>
                </div>
                <div className="project-overlay">
                  <div className="project-links">
                    <a href={project.liveLink} className="project-link live-link" target="_blank" rel="noopener noreferrer">
                      Live Demo
                    </a>
                    <a href={project.githubLink} className="project-link github-link" target="_blank" rel="noopener noreferrer">
                      GitHub
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="project-content">
                <div className="project-category">{project.category}</div>
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                
                <div className="project-technologies">
                  {project.technologies.map((tech, index) => (
                    <span key={index} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;