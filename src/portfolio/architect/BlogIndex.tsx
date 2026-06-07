import { Link } from '@tanstack/react-router'
import { BLOG_POSTS } from './BlogPage'

const MELON_POSTS = BLOG_POSTS.filter((p) => p.category === 'Melon')
const OTHER_POSTS = BLOG_POSTS.filter((p) => p.category !== 'Melon')

function PostCard({
  post,
  isFeatured = false,
  isWide = false,
  seriesIndex,
}: {
  post: (typeof BLOG_POSTS)[number]
  isFeatured?: boolean
  isWide?: boolean
  seriesIndex?: number
}) {
  return (
    <Link
      to="/blog/$slug"
      params={{ slug: post.slug }}
      className={`group rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#111] p-4 md:p-5 flex flex-col justify-between hover:-translate-y-0.5 hover:shadow-md transition-all
        ${isFeatured ? 'md:row-span-2' : ''}
        ${isWide ? 'md:col-span-3' : ''}
      `}
    >
      <div className="space-y-2 flex-1 flex flex-col">
        <p className="text-[0.65rem] font-mono text-gray-500 dark:text-gray-400 uppercase tracking-[0.25em]">
          {post.category} · {post.year}
          {seriesIndex !== undefined && seriesIndex > 0 ? ` · ${seriesIndex} of 12` : ''}
        </p>
        <h2
          className={`font-semibold text-black dark:text-white group-hover:underline underline-offset-4 ${
            isFeatured ? 'text-base md:text-lg' : 'text-sm md:text-base'
          } ${isWide ? 'md:text-lg' : ''}`}
        >
          {post.title}
        </h2>
        <p
          className={`text-xs text-gray-600 dark:text-gray-400 flex-1 ${isFeatured ? 'line-clamp-4 md:line-clamp-none' : 'line-clamp-3'} ${isWide ? 'md:max-w-2xl' : ''}`}
        >
          {post.tagline}
        </p>
      </div>
      <p className="mt-3 text-[0.65rem] font-mono text-gray-400 dark:text-gray-400">
        {post.readingTime}
      </p>
    </Link>
  )
}

export default function BlogIndex() {
  const melonLessons = MELON_POSTS.filter((p) => p.slug !== 'melon-series-intro')

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#0a0a0a] text-brand-text font-sans antialiased">
      <header className="border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-[#0a0a0a]/90 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between gap-6">
          <div>
            <p className="text-[0.65rem] font-mono uppercase tracking-[0.25em] text-gray-500 dark:text-gray-400">
              Blog
            </p>
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-black dark:text-white">
              Architecture, systems, and frontend platforms
            </h1>
            <p className="mt-1 text-[0.8rem] text-gray-500 dark:text-gray-400 max-w-2xl">
              Deep dives on federated frontends, Secure SDLC, offline-first data — and a twelve-part
              series on building Melon, a local-first database stack for React Native.
            </p>
          </div>
          <a
            href="/"
            className="hidden sm:inline-flex text-xs font-mono px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-full text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors whitespace-nowrap"
          >
            ← Back to portfolio
          </a>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10 md:py-14 space-y-14">
        <section className="space-y-4">
          <p className="text-[0.7rem] font-mono uppercase tracking-[0.25em] text-gray-500 dark:text-gray-400">
            Building Melon
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
            {MELON_POSTS.map((post) => {
              const isFeatured = post.slug === 'melon-series-intro'
              const isWide = post.slug === 'melon-codemods-migration'
              const lessonIndex = melonLessons.findIndex((p) => p.slug === post.slug)
              const seriesIndex =
                post.slug === 'melon-series-intro' ? undefined : lessonIndex + 1
              return (
                <PostCard
                  key={post.slug}
                  post={post}
                  isFeatured={isFeatured}
                  isWide={isWide}
                  seriesIndex={seriesIndex}
                />
              )
            })}
          </div>
        </section>

        <section className="space-y-4">
          <p className="text-[0.7rem] font-mono uppercase tracking-[0.25em] text-gray-500 dark:text-gray-400">
            All articles
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
            {OTHER_POSTS.map((post, index) => {
              const isFeatured = index === 0
              const isWide = index === OTHER_POSTS.length - 1
              return (
                <PostCard key={post.slug} post={post} isFeatured={isFeatured} isWide={isWide} />
              )
            })}
          </div>
        </section>
      </main>
    </div>
  )
}
