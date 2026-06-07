import { useEffect, useMemo } from 'react'
import { useParams } from '@tanstack/react-router'
import { BlogArticle, POST_SECTIONS } from './blog/components/BlogArticle'
import { POST_CONTENT, shouldShowGenericLesson } from './blog/content-map'
import { BLOG_POSTS } from './blog/posts'

export { BLOG_POSTS } from './blog/posts'

export default function BlogPage() {
  const { slug } = useParams({ strict: false }) as { slug?: string }

  const post = useMemo(
    () => BLOG_POSTS.find((p) => p.slug === slug) ?? BLOG_POSTS[0],
    [slug],
  )

  const content = POST_CONTENT[post.slug]

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [slug])

  if (!content) {
    return null
  }

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#0a0a0a] text-brand-text font-sans antialiased">
      <header className="border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-[#0a0a0a]/90 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between gap-6">
          <div className="space-y-1">
            <p className="text-[0.65rem] font-mono uppercase tracking-[0.25em] text-gray-500 dark:text-gray-400">
              {post.category} · {post.year}
            </p>
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-black dark:text-white">
              {post.title}
            </h1>
            <p className="text-[0.7rem] font-mono text-gray-400 dark:text-gray-400">
              Updated Feb 2026 · {post.readingTime}
            </p>
          </div>
          <a
            href="/blog"
            className="hidden sm:inline-flex text-xs font-mono px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-full text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors whitespace-nowrap"
          >
            ← Back to blog
          </a>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10 md:py-14">
        <section className="mb-10 border-b border-gray-200 dark:border-gray-800 pb-8">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
            <div className="space-y-4 max-w-2xl">
              <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                {post.tagline}
              </p>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,3fr)_minmax(240px,1fr)] gap-10 lg:gap-16">
          <article className="space-y-12">
            <nav className="lg:hidden mb-4 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#111] px-4 py-4">
              <p className="text-[0.7rem] font-mono uppercase tracking-[0.25em] text-gray-500 dark:text-gray-400 mb-3">
                Table of contents
              </p>
              <ol className="space-y-2 text-sm">
                {POST_SECTIONS.map((section) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white underline underline-offset-4 decoration-[0.5px]"
                    >
                      {section.label}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            <BlogArticle
              content={content}
              showGenericLesson={shouldShowGenericLesson(post.slug)}
            />
          </article>

          <aside className="hidden lg:block space-y-6">
            <div className="sticky top-32 space-y-6">
              <section className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#111] px-4 py-4">
                <p className="text-[0.7rem] font-mono uppercase tracking-[0.25em] text-gray-500 dark:text-gray-400 mb-3">
                  Table of contents
                </p>
                <ol className="space-y-2 text-sm">
                  {POST_SECTIONS.map((section) => (
                    <li key={section.id} className="flex items-center gap-2">
                      <span className="h-px w-4 bg-gray-300 dark:bg-gray-600" />
                      <a
                        href={`#${section.id}`}
                        className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white underline underline-offset-4 decoration-[0.5px]"
                      >
                        {section.label}
                      </a>
                    </li>
                  ))}
                </ol>
              </section>
            </div>
          </aside>
        </div>

        <section className="mt-16 border-t border-gray-200 dark:border-gray-800 pt-10">
          <div className="rounded-2xl border border-dashed border-gray-300 dark:border-gray-600 bg-white/70 dark:bg-[#111]/80 px-6 py-6 md:py-7 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <p className="text-[0.7rem] font-mono uppercase tracking-[0.25em] text-gray-500 dark:text-gray-400 mb-1">
                Stay curious
              </p>
              <p className="text-sm text-gray-700 dark:text-gray-300 max-w-xl">
                I&apos;m always happy to nerd out about federation, offline-first databases, Melon,
                or sync design. If something here sparked ideas for your team, reach out via the
                contact section on the main page.
              </p>
            </div>
            <a
              href="/#contact"
              className="inline-flex justify-center items-center text-xs font-mono px-4 py-2 border border-black dark:border-white rounded-full bg-black dark:bg-white text-white dark:text-black hover:bg-white hover:text-black dark:hover:bg-[#111] dark:hover:text-white transition-colors"
            >
              Contact me about architecture →
            </a>
          </div>
        </section>
      </main>
    </div>
  )
}
