import React from 'react'
import { motion } from 'framer-motion'

interface StepperProps {
  steps: string[]
  activeStep: number
  onStepClick: (index: number) => void
}

const Stepper: React.FC<StepperProps> = ({ steps, activeStep, onStepClick }) => {
  return (
    <div className="fixed left-4 top-1/2 transform -translate-y-1/2 z-50 hidden md:block">
      <div className="flex flex-col items-center space-y-4">
        {steps.map((step, index) => (
          <motion.button
            key={step}
            className={`w-3 h-3 rounded-full ${
              index === activeStep ? 'bg-white' : 'bg-gray-500'
            }`}
            whileHover={{ scale: 1.2 }}
            onClick={() => onStepClick(index)}
          >
            <span className="sr-only">{step}</span>
          </motion.button>
        ))}
      </div>
    </div>
  )
}

export default Stepper