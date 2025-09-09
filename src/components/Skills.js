import React from 'react';
import './Skills.css';
import { 
  SiJavascript, 
  SiReact, 
  SiMongodb, 
  SiNodedotjs, 
  SiHtml5, 
  SiCss3, 
  SiGithub, 
  SiDocker, 
  SiPostman, 
  SiSwagger 
} from "react-icons/si";

import { VscVscode } from "react-icons/vsc";

const Skills = () => {
  const technicalSkills = [
    { name: 'JavaScript', icon: <SiJavascript color="#f7df1e" /> },
    { name: 'React.js', icon: <SiReact color="#61dafb" /> },
    { name: 'MongoDB', icon: <SiMongodb color="#47A248" /> },
    { name: 'Node.js', icon: <SiNodedotjs color="#3C873A" /> },
    { name: 'HTML5', icon: <SiHtml5 color="#E34F26" /> },
    { name: 'CSS3', icon: <SiCss3 color="#1572B6" /> },
  ];

const tools = [
  { name: 'Git & GitHub', icon: <SiGithub color="#181717" /> },
  { name: 'VS Code', icon: <VscVscode color="#007ACC" /> },
  { name: 'Swagger', icon: <SiSwagger color="#85EA2D" /> },
  { name: 'Postman', icon: <SiPostman color="#FF6C37" /> },
  { name: 'Docker', icon: <SiDocker color="#2496ED" /> },
];


  const softSkills = [
    'Problem Solving',
    'Team Collaboration',
    'Communication',
    'Project Management',
    'Creative Thinking',
    'Attention to Detail'
  ];

  return (
    <section id="skills" className="skills">
      <div className="skills-container">
        <div className="skills-header">
          <h2 className="section-title">My Skills</h2>
          <div className="title-underline"></div>
          <p className="section-subtitle">
            Technologies and tools I work with to bring ideas to life
          </p>
        </div>

        <div className="skills-content">
          {/* Technical Skills */}
          <div className="skill-category">
            <h3 className="category-title">Technical Skills</h3>
            <div className="technical-skills-grid">
              {technicalSkills.map((skill, index) => (
                <div key={index} className="skill-logo-item">
                  <div className="icon">{skill.icon}</div>
                  <span>{skill.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tools & Technologies */}
          <div className="skill-category">
            <h3 className="category-title">Tools & Technologies</h3>
            <div className="tools-grid">
              {tools.map((tool, index) => (
                <div key={index} className="tool-item">
                  <div className="icon">{tool.icon}</div>
                  <span>{tool.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Soft Skills */}
          <div className="skill-category">
            <h3 className="category-title">Soft Skills</h3>
            <div className="soft-skills-grid">
              {softSkills.map((skill, index) => (
                <div key={index} className="soft-skill-item">
                  <div className="soft-skill-icon">✓</div>
                  <span>{skill}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
