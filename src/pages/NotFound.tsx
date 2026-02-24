import React from 'react'
import { motion } from 'framer-motion'
import { Link } from '@tanstack/react-router'

const NotFound: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center min-h-screen text-center"
    >
      <motion.h1
        className="text-6xl font-bold mb-4"
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 200 }}
      >
        404
      </motion.h1>
      <motion.p
        className="text-2xl mb-8"
        initial={{ y: 50 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
      >
        Oops! Page not found.
      </motion.p>
      <motion.img
        src="https://images.unsplash.com/photo-1513682121497-80211f36a7d3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        alt="Lost in the wilderness"
        className="rounded-lg shadow-lg mb-8 max-w-md"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      />
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Link
          to="/"
          className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Go back home
        </Link>
      </motion.div>
    </motion.div>
  )
}

export default NotFound