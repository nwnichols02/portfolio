import React from 'react'
import { motion } from 'framer-motion'
import BentoGrid from '../components/BentoGrid'

const About: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold mb-8">About Me</h2>
      <BentoGrid>
        <motion.div className="bg-white p-6 rounded-lg shadow-lg">
          <p className="mb-4 text-black">
            As a Senior Software Engineer with a passion for front-end development,
            I specialize in building scalable and efficient web applications using
            cutting-edge technologies.
          </p>
          <p className='text-black'>
            I'm dedicated to creating robust, maintainable, and performant applications
            that provide exceptional user experiences.
          </p>
        </motion.div>
        <motion.div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl text-black font-semibold mb-4">My Expertise</h3>
          <ul className="list-disc list-inside text-black">
            <li>Micro-frontends architecture</li>
            <li>Module Federation</li>
            <li>React and React Native</li>
            <li>TypeScript</li>
            <li>Vite</li>
            <li>Storybook</li>
            <li>GraphQL</li>
            <li>Node.js</li>
            <li>AWS</li>
          </ul>
        </motion.div>
        <motion.div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl text-black font-semibold mb-4">My Strengths</h3>
          <ul className="list-disc list-inside text-black">
            <li>Proficient in TypeScript</li>
            <li>Strong problem-solving skills</li>
            <li>Excellent communication skills</li>
            <li>Strong attention to detail</li>
            <li>Ability to work well in a team</li>
          </ul>

        </motion.div>
      </BentoGrid>
    </div>
  )
}

export default About