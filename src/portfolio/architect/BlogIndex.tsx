import { Link } from '@tanstack/react-router'
import { BLOG_POSTS } from './BlogPage'

export default function BlogIndex() {
  return (
    <div className="min-h-screen bg-[#fafafa] text-brand-text font-sans antialiased">
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between gap-6">
          <div>
            <p className="text-[0.65rem] font-mono uppercase tracking-[0.25em] text-gray-500">
              Blog
            </p>
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-black">
              Architecture, systems, and frontend platforms
            </h1>
            <p className="mt-1 text-[0.8rem] text-gray-500 max-w-2xl">
              A small collection of deep dives on the systems behind my portfolio — from federated
              frontends to event-sourced backends and the tooling in between.
            </p>
          </div>
          <a
            href="/"
            className="hidden sm:inline-flex text-xs font-mono px-3 py-1.5 border border-gray-300 rounded-full hover:bg-black hover:text-white transition-colors whitespace-nowrap"
          >
            ← Back to portfolio
          </a>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10 md:py-14 space-y-10">
        <section className="space-y-4">
          <p className="text-[0.7rem] font-mono uppercase tracking-[0.25em] text-gray-500">
            Articles
          </p>
          {/* Bento grid: first post featured (tall, 2 rows), next 4 in 2×2, last post full width */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
            {BLOG_POSTS.map((post, index) => {
              const isFeatured = index === 0
              const isWide = index === BLOG_POSTS.length - 1
              return (
                <Link
                  key={post.slug}
                  to="/blog/$slug"
                  params={{ slug: post.slug }}
                  className={`group rounded-2xl border border-gray-200 bg-white p-4 md:p-5 flex flex-col justify-between hover:-translate-y-0.5 hover:shadow-md transition-all
                    ${isFeatured ? 'md:row-span-2' : ''}
                    ${isWide ? 'md:col-span-3' : ''}
                  `}
                >
                  <div className="space-y-2 flex-1 flex flex-col">
                    <p className="text-[0.65rem] font-mono text-gray-500 uppercase tracking-[0.25em]">
                      {post.category} · {post.year}
                    </p>
                    <h2
                      className={`font-semibold text-black group-hover:underline underline-offset-4 ${
                        isFeatured ? 'text-base md:text-lg' : 'text-sm md:text-base'
                      } ${isWide ? 'md:text-lg' : ''}`}
                    >
                      {post.title}
                    </h2>
                    <p
                      className={`text-xs text-gray-600 flex-1 ${isFeatured ? 'line-clamp-4 md:line-clamp-none' : 'line-clamp-3'} ${isWide ? 'md:max-w-2xl' : ''}`}
                    >
                      {post.tagline}
                    </p>
                  </div>
                  <p className="mt-3 text-[0.65rem] font-mono text-gray-400">{post.readingTime}</p>
                </Link>
              )
            })}
          </div>
        </section>
      </main>
    </div>
  )
}

