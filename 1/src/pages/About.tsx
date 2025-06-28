import React from 'react'
import { motion } from 'framer-motion'

const About: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-bold mb-6">About Me</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <p className="mb-4">
            As a Senior Software Engineer with a passion for front-end development,
            I specialize in building scalable and efficient web applications using
            cutting-edge technologies.
          </p>
          <p className="mb-4">
            My expertise lies in:
          </p>
          <ul className="list-disc list-inside mb-4">
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
          <p>
            I'm dedicated to creating robust, maintainable, and performant applications
            that provide exceptional user experiences.
          </p>
        </div>
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <img
            src="https://images.unsplash.com/photo-1549692520-acc6669e2f0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
            alt="Nathan Nichols"
            className="rounded-lg shadow-lg"
          />
        </motion.div>
      </div>
    </motion.div>
  )
}

export default About