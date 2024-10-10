import React from 'react';
import { motion } from 'framer-motion';
import BentoGrid from '../components/BentoGrid';

const projects = [
  {
    title: 'Micro-frontends at Pluralsight',
    description:
      'Implemented a scalable micro-frontends architecture using Module Federation, improving development efficiency and application performance.',
    technologies: ['React', 'TypeScript', 'Webpack', 'Module Federation'],
  },
  {
    title: 'React Native Mobile App at Vivint',
    description:
      'Developed a feature-rich mobile application for smart home control and monitoring.',
    technologies: ['React Native', 'TypeScript', 'GraphQL', 'Redux'],
  },
  {
    title: 'Full-stack Application with Node.js and GraphQL',
    description:
      'Built a scalable full-stack application with a GraphQL API and React front-end.',
    technologies: ['Node.js', 'Express', 'GraphQL', 'React', 'PostgreSQL'],
  },
];

const Projects: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      <h1 className="text-3xl font-bold mb-8">Projects</h1>
      <BentoGrid>
        {projects.map((project, index) => (
          <div
            key={index}
            className="bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
          >
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">{project.title}</h2>
              <p className="text-gray-300 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="bg-blue-900 text-blue-200 text-sm px-2 py-1 rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </BentoGrid>
    </motion.div>
  );
};

export default Projects;
