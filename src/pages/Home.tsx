import React from 'react'
import { motion } from 'framer-motion'
import { Link } from '@tanstack/react-router'
import { Code, Layers, Database } from 'lucide-react'
import WeldingAnimation from '../components/WeldingAnimation'

const Home: React.FC = () => {
  return (
    <div className="text-white">
      {/* <AppBar /> */}
      <div className="relative h-screen bg-cover bg-center overflow-hidden"
           style={{ backgroundImage: "url('https://us.evocdn.io/dealer/1353/content/media/My_Theme/man-worker-welding-metal-with-welding-machine-in-a-2023-11-27-05-13-53-utc.jpg')" }}>
        <WeldingAnimation />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center px-4">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-4"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Engineering Robust Web Solutions
          </motion.h1>
          <motion.h2 
            className="text-xl md:text-2xl mb-8"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Specializing in Micro-Frontends and Scalable Architecture
          </motion.h2>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to={"/projects" as never}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
            >
              View My Work
            </Link>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto py-16 px-4" id="skills">
        <h2 className="text-3xl font-bold mb-12 text-center">Key Skills</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <SkillCard
            icon={<Layers className="w-12 h-12 text-blue-400" />}
            title="Micro-Frontends Architecture"
            description="Expert in designing and implementing scalable micro-frontend solutions."
          />
          <SkillCard
            icon={<Code className="w-12 h-12 text-blue-400" />}
            title="React and TypeScript Expertise"
            description="Proficient in building robust applications with React and TypeScript."
          />
          <SkillCard
            icon={<Database className="w-12 h-12 text-blue-400" />}
            title="Full-Stack Development"
            description="Experienced in full-stack development with Node.js and GraphQL."
          />
        </div>
      </div>
    </div>
  )
}

const SkillCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => {
  return (
    <motion.div
      className="bg-gray-800 p-6 rounded-lg shadow-lg"
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 text-center">{title}</h3>
      <p className="text-gray-400 text-center">{description}</p>
    </motion.div>
  )
}

export default Home