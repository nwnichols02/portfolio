import React from 'react'
import { motion } from 'framer-motion'

const blogPosts = [
  {
    title: 'Micro-frontends: A Game-Changer for Large-Scale Applications',
    date: '2024-03-15',
    excerpt: 'Explore how micro-frontends can revolutionize the development of large-scale web applications...'
  },
  {
    title: 'Mastering Module Federation in Webpack 5',
    date: '2024-02-28',
    excerpt: 'Learn how to leverage Module Federation to create more modular and scalable JavaScript applications...'
  },
  {
    title: 'Building Scalable React Applications: Best Practices and Patterns',
    date: '2024-02-10',
    excerpt: 'Discover key strategies and design patterns for creating maintainable and scalable React applications...'
  }
]

const Blog: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-bold mb-6">Blog</h1>
      <div className="space-y-8">
        {blogPosts.map((post, index) => (
          <motion.article
            key={index}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-4">{post.date}</p>
            <p className="text-gray-700 dark:text-gray-200">{post.excerpt}</p>
            <motion.a
              href="#"
              className="inline-block mt-4 text-blue-500 hover:text-blue-600 transition-colors"
              whileHover={{ x: 5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              Read more →
            </motion.a>
          </motion.article>
        ))}
      </div>
    </motion.div>
  )
}

export default Blog