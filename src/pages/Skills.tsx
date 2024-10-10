import React from 'react'
import { motion } from 'framer-motion'

const skillCategories = [
  {
    name: 'Front-end',
    skills: ['React', 'React Native', 'TypeScript', 'JavaScript', 'HTML', 'CSS']
  },
  {
    name: 'Back-end',
    skills: ['Node.js', 'GraphQL', 'REST APIs']
  },
  {
    name: 'Tools',
    skills: ['Vite', 'Webpack', 'Module Federation', 'Storybook', 'Jest', 'React Testing Library']
  },
  {
    name: 'Cloud',
    skills: ['AWS']
  }
]

const Skills: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-bold mb-6">Skills</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {skillCategories.map((category, index) => (
          <motion.div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">{category.name}</h2>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <motion.span
                    key={skillIndex}
                    className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm px-3 py-1 rounded-full"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default Skills