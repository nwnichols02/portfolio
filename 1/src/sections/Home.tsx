import React from 'react'
import { motion } from 'framer-motion'
import WeldingAnimation from '../components/WeldingAnimation'
import "../styles/screenOverlay.css"
import GradualSpacing from '@/components/ui/gradual-spacing'
import WordPullUp from '@/components/ui/word-pull-up'

const Home: React.FC = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden hero-large is-visible">
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat hero-large is-visible" style={{
        backgroundImage: `url('https://us.evocdn.io/dealer/1353/content/media/My_Theme/man-worker-welding-metal-with-welding-machine-in-a-2023-11-27-05-13-53-utc.jpg')`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }}></div>
      {/* <img
        src="https://us.evocdn.io/dealer/1353/content/media/My_Theme/man-worker-welding-metal-with-welding-machine-in-a-2023-11-27-05-13-53-utc.jpg"
        alt="Welder at work"
      /> */}
      <WeldingAnimation />
      <div className="absolute inset-0 flex flex-col justify-start items-start text-left px-4 pt-20 sm:pt-24 md:pt-28">
        <div className="relative p-6 rounded-lg mt-16 sm:mt-20 md:mt-24">
          {/* <WordPullUp words="Engineering Robust Web Solutions" />
          <WordPullUp words="Specializing in Micro-Frontends and Scalable Architecture" /> */}
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 3 }}
          >
            Engineering Robust Web Solutions
          </motion.h1>
          <motion.h2
            className="text-xl md:text-2xl lg:text-3xl mb-8 text-gray-300"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 3, delay: 0.2 }}
          >
            Specializing in Micro-Frontends and Scalable Architecture
          </motion.h2>
          {/* <motion.button
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
            className="bg-white text-black font-bold py-3 px-6 rounded-lg transition duration-300 hover:bg-gray-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View My Work
          </motion.button> */}
        </div>
      </div>
    </div>
  )
}

export default Home