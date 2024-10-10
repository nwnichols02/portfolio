import React from 'react'
import { motion } from 'framer-motion'
import BentoGrid from '../components/BentoGrid'

const projects = [
  {
    title: 'Micro-frontends at Pluralsight',
    description: 'Implemented a scalable micro-frontends architecture using Module Federation, improving development efficiency and application performance.',
    technologies: ['React', 'TypeScript', 'Webpack', 'Module Federation'],
    image: 'https://images.unsplash.com/photo-1635405050330-b0824eb1bf26?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHdlYiUyMGRlc2lnbnxlbnwwfHwwfHx8MA%3D%3D'
  },
  {
    title: 'React Native Mobile App at Vivint',
    description: 'Developed a feature-rich mobile application for smart home control and monitoring.',
    technologies: ['React Native', 'TypeScript', 'GraphQL', 'Redux'],
    image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2ViJTIwZGVzaWdufGVufDB8fDB8fHww'
  },
  {
    title: 'Full-stack Application with Node.js and GraphQL',
    description: 'Built a scalable full-stack application with a GraphQL API and React front-end.',
    technologies: ['Node.js', 'Express', 'GraphQL', 'React', 'PostgreSQL'],
    image: "https://media.istockphoto.com/id/1336621601/photo/group-of-people-working-and-drinking-hot-coffee-with-latte-art-in-the-cafe.webp?a=1&s=612x612&w=0&k=20&c=a2lcDoJLb37NBfG6Aq3pHqVk2q0VoTgU6oDQFU9joko="
  }
]

const Projects: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold mb-8">Projects</h2>
      <BentoGrid>
        {projects.map((project, index) => (
          <motion.div
            key={index}
            className="bg-muted rounded-lg shadow-lg bg-white overflow-hidden"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <div className="p-6">
              <h3 className="text-xl font-semibold text-black mb-2">{project.title}</h3>
              <p className="text-black mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech, techIndex) => (
                  <span key={techIndex} className="bg-black text-black-200 text-sm px-3 py-1 rounded-full">
                    {tech}
                  </span>
                ))}
              </div>
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-48 object-cover rounded"
              // loading="lazy"
              />
            </div>
          </motion.div>
        ))}
      </BentoGrid>
    </div>
  )
}

export default Projects