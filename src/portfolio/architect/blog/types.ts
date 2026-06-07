import type { ReactNode } from 'react'

export interface BlogPost {
  slug: string
  title: string
  category: string
  year: string
  readingTime: string
  tagline: string
}

export interface BlogPostContent {
  overview: ReactNode
  architecture: ReactNode
  impact: ReactNode
  lessons: ReactNode
}

export const POST_SECTIONS = [
  { id: 'overview', label: 'Overview' },
  { id: 'architecture', label: 'Architecture decisions' },
  { id: 'impact', label: 'Impact & tradeoffs' },
  { id: 'lessons', label: 'Lessons for teams' },
] as const

export const PROSE =
  'text-sm md:text-base text-gray-600 dark:text-gray-400 leading-relaxed'

export const H3 = 'text-lg font-semibold text-black dark:text-white mt-4'

export const CODE =
  'font-mono text-xs bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-1.5 py-0.5 rounded'
