import React from 'react'
import { motion } from 'framer-motion'
import BentoGrid from '../components/BentoGrid'

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
    <div className="container mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold mb-8">Blog</h2>
      <BentoGrid>
        {blogPosts.map((post, index) => (
          <motion.article
            key={index}
            className="bg-gray-800 rounded-lg shadow-lg p-6"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <h3 className="text-2xl font-semibold mb-2">{post.title}</h3>
            <p className="text-gray-400 mb-4">{post.date}</p>
            <p className="text-gray-200">{post.excerpt}</p>
            <motion.a
              href="#"
              className="inline-block mt-4 text-blue-400 hover:text-blue-300"
              whileHover={{ x: 5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              Read more →
            </motion.a>
          </motion.article>
        ))}
      </BentoGrid>
    </div>
  )
}

export default Blog