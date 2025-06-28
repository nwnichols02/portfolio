import React from 'react'
import { motion } from 'framer-motion'

interface BentoGridProps {
  children: React.ReactNode
}

const BentoGrid: React.FC<BentoGridProps> = ({ children }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {React.Children.map(children, (child, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          // className="bg-muted rounded-lg shadow-lg overflow-hidden"
        >
          {child}
        </motion.div>
      ))}
    </div>
  )
}

export default BentoGrid