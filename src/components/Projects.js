import React from 'react';
import './Projects.css';
import {
  FiShoppingBag,
  FiCheckSquare,
  FiCloudRain,
  FiCoffee,
  FiLayers,
  FiMessageSquare,
  FiTrendingUp,
  FiPhone,
  FiExternalLink,
  FiGithub,
} from 'react-icons/fi';
import { projects } from '../data/projects';

const projectIcons = {
  crypto: <FiTrendingUp />,
  voice: <FiPhone />,
  shopping: <FiShoppingBag />,
  tasks: <FiCheckSquare />,
  weather: <FiCloudRain />,
  restaurant: <FiCoffee />,
  portfolio: <FiLayers />,
  chat: <FiMessageSquare />,
};

const Projects = () => {
  return (
    <section id="projects" className="projects">
      <div className="projects-container">
        <div className="projects-header">
          <h2 className="section-title">Featured Work</h2>
          <div className="title-underline"></div>
          <p className="section-subtitle">
            A curated showcase of commercial web applications and side projects that demonstrate engineering expertise and design aesthetics.
          </p>
        </div>

        <div className="projects-grid">
          {projects.map((project) => {
            const icon = projectIcons[project.icon] || <FiLayers />;

            return (
              <div key={project.id} className="project-card">
                <div className={`project-image ${project.colorClass}`}>
                  <div className="project-mesh-grid"></div>
                  <div className="project-vector-illustration">
                    <div className="vector-icon-glow">{icon}</div>
                  </div>
                  <div className="project-overlay">
                    <div className={`project-links ${!project.githubLink ? 'project-links-single' : ''}`}>
                      <a
                        href={project.liveLink}
                        className="project-link live-link"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FiExternalLink /> Live Site
                      </a>
                      {project.githubLink && (
                        <a
                          href={project.githubLink}
                          className="project-link github-link"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FiGithub /> GitHub
                        </a>
                      )}
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
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;
