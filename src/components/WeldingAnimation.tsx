import React, { useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'

const WeldingAnimation: React.FC = () => {
  const lightControls = useAnimation()
  const sparkControls = useAnimation()

  useEffect(() => {
    lightControls.start({
      opacity: [0.5, 1, 0.5],
      scale: [1, 1.2, 1],
      transition: {
        duration: 0.3,
        repeat: Infinity,
        repeatType: 'reverse',
      },
    })

    sparkControls.start({
      opacity: [1, 0],
      scale: [0, 1],
      y: [0, -100],
      x: [0, 50], // 30-degree angle approximation
      transition: {
        duration: 0.8,
        repeat: Infinity,
        repeatType: 'loop',
        ease: 'easeOut',
      },
    })
  }, [lightControls, sparkControls])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-16 h-16 bg-orange-500 rounded-full filter blur-md"
        animate={lightControls}
      />
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute bottom-1/4 right-1/4 w-1 h-1 bg-white rounded-full"
          custom={i}
          animate={sparkControls}
          transition={{
            delay: i * 0.02,
            repeat: Infinity,
            duration: 0.5 + Math.random() * 0.5,
          }}
          style={{
            scale: Math.random() * 0.5 + 0.5,
            opacity: Math.random() * 0.7 + 0.3,
          }}
        />
      ))}
    </div>
  )
}

export default WeldingAnimation