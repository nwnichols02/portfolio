import React from 'react'
import { motion } from 'framer-motion'
import BentoGrid from '../components/BentoGrid'

const experiences = [
  {
    company: 'Pluralsight',
    position: 'Senior Software Engineer',
    period: '2020 - Present',
    description: 'Lead the implementation of micro-frontends architecture, improving scalability and development efficiency.'
  },
  {
    company: 'Vivint',
    position: 'Software Engineer II',
    period: '2018 - 2020',
    description: 'Developed React Native mobile applications for smart home control and monitoring.'
  },
  {
    company: 'Podium',
    position: 'Software Engineer',
    period: '2016 - 2018',
    description: 'Built and maintained full-stack web applications using Node.js, React, and GraphQL.'
  }
]

const Experience: React.FC = () => {
  return (
    <div className="container bg-white mx-auto px-4 py-16 rounded-xl">
      <h2 className="text-3xl text-black font-bold mb-8">Experience</h2>
      <BentoGrid>
        {experiences.map((exp, index) => (
          <motion.div
            key={index}
            className="bg-black rounded-lg shadow-lg p-6"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <h3 className="text-2xl font-semibold mb-2">{exp.company}</h3>
            <h4 className="text-xl text-gray-300 mb-2">{exp.position}</h4>
            <p className="text-gray-400 mb-4">{exp.period}</p>
            <p className="text-gray-200">{exp.description}</p>
          </motion.div>
        ))}
      </BentoGrid>
    </div>
  )
}

export default Experience