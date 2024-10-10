import React from 'react'
import { motion } from 'framer-motion'
import WeldingAnimation from '../components/WeldingAnimation'

const Home: React.FC = () => {
  return (
    <div className="relative h-screen bg-cover bg-center overflow-hidden">
      <picture>
        <source
          media="(max-width: 640px)"
          srcSet="https://us.evocdn.io/dealer/1353/content/media/My_Theme/man-worker-welding-metal-with-welding-machine-in-a-2023-11-27-05-13-53-utc-small.jpg"
        />
        <source
          media="(max-width: 1024px)"
          srcSet="https://us.evocdn.io/dealer/1353/content/media/My_Theme/man-worker-welding-metal-with-welding-machine-in-a-2023-11-27-05-13-53-utc-medium.jpg"
        />
        <img
          src="https://us.evocdn.io/dealer/1353/content/media/My_Theme/man-worker-welding-metal-with-welding-machine-in-a-2023-11-27-05-13-53-utc.jpg"
          alt="Welder at work"
        className="w-full h-full"
        // loading="eager"
        />
      </picture>
      <WeldingAnimation />
      <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col justify-center items-center text-center px-4">
        <motion.h1
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Engineering Robust Web Solutions
        </motion.h1>
        <motion.h2
          className="text-xl md:text-2xl lg:text-3xl mb-8 text-gray-300"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Specializing in Micro-Frontends and Scalable Architecture
        </motion.h2>
        <motion.button
          onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
          className="bg-white text-black font-bold py-3 px-6 rounded-lg transition duration-300 hover:bg-gray-200"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          View My Work
        </motion.button>
      </div>
    </div>
  )
}

export default Home