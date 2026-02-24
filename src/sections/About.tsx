// import React from 'react'
// import { motion } from 'framer-motion'
// import BentoGrid from '../components/BentoGrid'

// const About: React.FC = () => {
//   return (
//     <div className="container mx-auto px-4 py-16">
//       <h2 className="text-3xl font-bold mb-8">About Me</h2>
//       <BentoGrid>
//         <motion.div className="bg-white p-6 rounded-lg shadow-lg">
//           <p className="mb-4 text-black">
//             As a Senior Software Engineer with a passion for front-end development,
//             I specialize in building scalable and efficient web applications using
//             cutting-edge technologies.
//           </p>
//           <p className='text-black'>
//             I'm dedicated to creating robust, maintainable, and performant applications
//             that provide exceptional user experiences.
//           </p>
//         </motion.div>
//         <motion.div className="bg-white p-6 rounded-lg shadow-lg">
//           <h3 className="text-xl text-black font-semibold mb-4">My Expertise</h3>
//           <ul className="list-disc list-inside text-black">
//             <li>Micro-frontends architecture</li>
//             <li>Module Federation</li>
//             <li>React and React Native</li>
//             <li>TypeScript</li>
//             <li>Vite</li>
//             <li>Storybook</li>
//             <li>GraphQL</li>
//             <li>Node.js</li>
//             <li>AWS</li>
//           </ul>
//         </motion.div>
//         <motion.div className="bg-white p-6 rounded-lg shadow-lg">
//           <h3 className="text-xl text-black font-semibold mb-4">My Strengths</h3>
//           <ul className="list-disc list-inside text-black">
//             <li>Proficient in TypeScript</li>
//             <li>Strong problem-solving skills</li>
//             <li>Excellent communication skills</li>
//             <li>Strong attention to detail</li>
//             <li>Ability to work well in a team</li>
//           </ul>

//         </motion.div>
//       </BentoGrid>
//     </div>
//   )
// }

// export default About

import React from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Tweet from '../components/Tweet'
import TweetCard from 'react-tweet-card'
import { cn } from "@/lib/utils";
import Marquee from "@/components/ui/marquee";
import IconCloud from "@/components/ui/icon-cloud";
import Meteors from '@/components/ui/meteors';



const About: React.FC = () => {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])



  return (
    <div className="relative overflow-hidden">
      <Meteors number={30} />
      <div className="relative z-10 container mx-auto px-4 py-16 max-w-6xl">
        {/* <Meteors /> */}
        <motion.h2
          className="text-4xl font-bold mb-12 text-center "
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          About Me
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <motion.div
            className="bg-opacity-80 p-8 rounded-none dark:border-2 shadow-lg "
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <h3 className="text-2xl font-semibold mb-4 ">My Journey</h3>
            <p className="mb-4">
              As a Senior Software Engineer with a passion for front-end development,
              I forge scalable and efficient web applications using
              cutting-edge technologies.
            </p>
            <p className="">
              I'm dedicated to welding robust, maintainable, and high-performance applications
              that provide exceptional user experiences.
            </p>
          </motion.div>
          <motion.div
            className="bg-opacity-80 p-8 rounded-none dark:border-2 shadow-lg "
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <h3 className="text-2xl font-semibold mb-4 ">My Toolkit</h3>
            <ul className="space-y-2">
              {["Micro-frontends architecture", "Module Federation", "React and React Native", "TypeScript", "Vite", "Storybook", "GraphQL", "Node.js", "AWS"].map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center"
                >
                  <span className="mr-2 ">▪</span> {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>
          <motion.div
            className="bg-opacity-80 p-8 rounded-none dark:border-2 shadow-lg "
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <h3 className="text-2xl font-semibold mb-4 ">My Strengths</h3>
            <ul className="space-y-2">
              {["Precision in TypeScript", "Problem-solving under pressure", "Clear communication", "Attention to detail", "Team collaboration"].map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center"
                >
                  <span className="mr-2 ">▪</span> {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default About