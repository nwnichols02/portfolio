import React from 'react'
import { motion } from 'framer-motion'
import { useForm, SubmitHandler } from 'react-hook-form'

type FormInputs = {
  name: string
  email: string
  message: string
}

const Contact: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>()

  const onSubmit: SubmitHandler<FormInputs> = (data: any) => {
    console.log(data)
    // Here you would typically send the form data to a server
    alert('Thank you for your message! I will get back to you soon.')
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold mb-8">Contact Me</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto">
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-300 mb-2">Name</label>
          <input
            type="text"
            id="name"
            {...register('name', { required: 'Name is required' })}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 text-white"
          />
          {errors.name && <p className="text-red-500 mt-1">{errors.name.message}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-300 mb-2">Email</label>
          <input
            type="email"
            id="email"
            {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' } })}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 text-white"
          />
          {errors.email && <p className="text-red-500 mt-1">{errors.email.message}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="message" className="block text-gray-300 mb-2">Message</label>
          <textarea
            id="message"
            {...register('message', { required: 'Message is required' })}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 text-white"
            rows={5}
          ></textarea>
          {errors.message && <p className="text-red-500 mt-1">{errors.message.message}</p>}
        </div>
        <motion.button
          type="submit"
          className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Send Message
        </motion.button>
      </form>
    </div>
  )
}

export default Contact