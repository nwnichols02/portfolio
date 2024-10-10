import React from 'react'
import { motion } from 'framer-motion'

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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-bold mb-6">Experience</h1>
      <div className="space-y-8">
        {experiences.map((exp, index) => (
          <motion.div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <h2 className="text-2xl font-semibold mb-2">{exp.company}</h2>
            <h3 className="text-xl text-gray-600 dark:text-gray-300 mb-2">{exp.position}</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">{exp.period}</p>
            <p className="text-gray-700 dark:text-gray-200">{exp.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default Experience