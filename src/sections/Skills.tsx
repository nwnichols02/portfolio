import React from 'react'
import { motion } from 'framer-motion'
import BentoGrid from '../components/BentoGrid'

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
    <div className="container mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold mb-8">Skills</h2>
      <BentoGrid>
        {skillCategories.map((category, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <div className="p-6">
              <h3 className="text-xl font-semibold text-black mb-4">{category.name}</h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    className="bg-black text-black-200 text-sm px-3 py-1 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </BentoGrid>
    </div>
  )
}

export default Skills