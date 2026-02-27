import { useEffect, useMemo } from 'react'
import { useParams } from '@tanstack/react-router'

type BlogPost = {
  slug: string
  title: string
  category: string
  year: string
  readingTime: string
  tagline: string
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'enterprise-mf-platform',
    title: 'Enterprise MF Platform — from monolith to federated frontends',
    category: 'Federation',
    year: '2024',
    readingTime: '~10 min read',
    tagline: 'How we scaled a React monolith into a zero-coupling micro-frontend platform.',
  },
  {
    slug: 'cloud-native-event-bus',
    title: 'Cloud Native Event Bus — designing for real-time finance data',
    category: 'System Design',
    year: '2023',
    readingTime: '~9 min read',
    tagline: 'Building a high-throughput, auditable event stream for financial systems.',
  },
  {
    slug: 'react-micro-loader',
    title: 'React Micro-Loader — shipping remote features without the fear',
    category: 'Open Source',
    year: '2022',
    readingTime: '~7 min read',
    tagline: 'An OSS utility for dynamic remote components that still feels like React.',
  },
  {
    slug: 'beginners-guide',
    title: "Beginner's guide to my architecture portfolio",
    category: 'Overview',
    year: '2026',
    readingTime: '~8 min read',
    tagline: 'A plain-language tour of the systems and patterns I care about.',
  },
]

const POST_SECTIONS = [
  { id: 'overview', label: 'Overview' },
  { id: 'architecture', label: 'Architecture decisions' },
  { id: 'impact', label: 'Impact & tradeoffs' },
  { id: 'lessons', label: 'Lessons for teams' },
]

export default function BlogPage() {
  const { slug } = useParams({ strict: false }) as { slug?: string }

  const post = useMemo(
    () => BLOG_POSTS.find((p) => p.slug === slug) ?? BLOG_POSTS.find((p) => p.slug === 'beginners-guide')!,
    [slug],
  )

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [slug])

  return (
    <div className="min-h-screen bg-[#fafafa] text-brand-text font-sans antialiased">
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between gap-6">
          <div className="space-y-1">
            <p className="text-[0.65rem] font-mono uppercase tracking-[0.25em] text-gray-500">
              {post.category} · {post.year}
            </p>
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-black">
              {post.title}
            </h1>
            <p className="text-[0.7rem] font-mono text-gray-400">
              Updated Feb 2026 · {post.readingTime}
            </p>
          </div>
          <a
            href="/blog"
            className="hidden sm:inline-flex text-xs font-mono px-3 py-1.5 border border-gray-300 rounded-full hover:bg-black hover:text-white transition-colors whitespace-nowrap"
          >
            ← Back to blog
          </a>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10 md:py-14">
        {/* Top meta + quick summary */}
        <section className="mb-10 border-b border-gray-200 pb-8">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
            <div className="space-y-4 max-w-2xl">
              <p className="text-sm md:text-base text-gray-600 leading-relaxed">{post.tagline}</p>
            </div>
          </div>
        </section>

        {/* Layout: content + sidebar TOC */}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,3fr)_minmax(240px,1fr)] gap-10 lg:gap-16">
          {/* Main article */}
          <article className="space-y-12">
            {/* Local table of contents (mobile) */}
            <nav className="lg:hidden mb-4 rounded-2xl border border-gray-200 bg-white px-4 py-4">
              <p className="text-[0.7rem] font-mono uppercase tracking-[0.25em] text-gray-500 mb-3">
                Table of contents
              </p>
              <ol className="space-y-2 text-sm">
                {POST_SECTIONS.map((section) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="text-gray-700 hover:text-black underline underline-offset-4 decoration-[0.5px]"
                    >
                      {section.label}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            {/* Continuous article sections */}
            <section id="overview" className="space-y-3">
              <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-black">
                Overview
              </h2>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                {post.slug === 'enterprise-mf-platform' &&
                  'This article walks through how we broke a growing React monolith into a federated frontend platform that 50+ internal applications rely on every day.'}
                {post.slug === 'cloud-native-event-bus' &&
                  'This article unpacks the event-driven backbone behind a real-time financial platform, and why we chose streams over request–response APIs.'}
                {post.slug === 'react-micro-loader' &&
                  'This article tells the story of a small open source utility that helped teams adopt micro-frontends without wrecking their DX.'}
                {post.slug === 'beginners-guide' &&
                  'This article is a narrative version of my portfolio: one continuous story about how these systems fit together and what I optimize for as an architect.'}
              </p>
            </section>

            <section id="architecture" className="space-y-3">
              <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-black">
                Architecture decisions
              </h2>
              {post.slug === 'enterprise-mf-platform' && (
                <>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                    The core constraint for the platform was organizational, not technical. Multiple
                    teams needed to ship independently, but the user experience still had to feel
                    like a single product. Module federation gave us a way to split ownership
                    without forcing everyone into the same release train.
                  </p>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                    At a high level, we built a shell application responsible for routing,
                    authentication, and shared UI. Feature teams own remote applications that are
                    registered with the shell at build time, but resolved and loaded at runtime.
                    Shared libraries like React, the design system, and analytics are marked as
                    singletons to avoid version drift.
                  </p>
                </>
              )}
              {post.slug === 'cloud-native-event-bus' && (
                <>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                    For financial data, you rarely just need the &quot;current value&quot;. You need
                    a full history: who did what, when, and in response to which external event. An
                    event bus with durable streams gives you that history for free, as long as you
                    design your events carefully.
                  </p>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                    We chose a log-based architecture: producers append immutable events, consumers
                    maintain their own projections. This separates write concerns (capturing reality
                    as it happens) from read concerns (answering business questions quickly) and
                    keeps the system flexible as new requirements show up.
                  </p>
                </>
              )}
              {post.slug === 'react-micro-loader' && (
                <>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                    Micro-Loader started as a small wrapper around React&apos;s{' '}
                    <code className="font-mono text-xs bg-gray-100 px-1.5 py-0.5 rounded">
                      Suspense
                    </code>{' '}
                    and dynamic imports. The goal was simple: loading remote components should feel
                    the same as rendering local ones, with good defaults for loading and error
                    states.
                  </p>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                    Under the hood it handles script injection, caching, and boundary placement so
                    that product code can stay focused on behavior. The architecture is intentionally
                    small: a few composable primitives instead of a full framework.
                  </p>
                </>
              )}
              {post.slug === 'beginners-guide' && (
                <>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                    Across all of my work, I optimize for systems that are predictable to operate
                    and forgiving to change. That means explicit contracts, observable behavior, and
                    architectures that make errors visible early instead of hiding them.
                  </p>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                    The rest of my portfolio expands on this through concrete projects: federated
                    frontends, event-sourced backends, and tooling that helps teams move quickly
                    without losing control of complexity.
                  </p>
                </>
              )}
            </section>

            <section id="impact" className="space-y-3">
              <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-black">
                Impact & tradeoffs
              </h2>
              {post.slug === 'enterprise-mf-platform' && (
                <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                  The platform unlocked parallel delivery across teams and reduced coordination
                  overhead for large features. The tradeoff is stricter up-front design of shared
                  contracts and observability, since failures now cross repo and team boundaries.
                </p>
              )}
              {post.slug === 'cloud-native-event-bus' && (
                <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                  Moving to an event bus improved reliability and auditability, but required a
                  mindset shift: debugging with streams, embracing eventual consistency, and
                  designing events as a long-lived API surface instead of a private implementation
                  detail.
                </p>
              )}
              {post.slug === 'react-micro-loader' && (
                <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                  The library lowered the barrier to adopting micro-frontends and helped align
                  multiple teams on good loading and error-handling patterns. The tradeoff is that
                  you need discipline around versioning and rollout strategies for remote bundles.
                </p>
              )}
              {post.slug === 'beginners-guide' && (
                <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                  The impact of these systems isn&apos;t just technical. They shape how teams work:
                  who owns what, how risk is managed, and how quickly you can change direction
                  without burning the organization out.
                </p>
              )}
            </section>

            <section id="lessons" className="space-y-3">
              <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-black">
                Lessons for teams
              </h2>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                The common thread across all of these projects is simple:{' '}
                <span className="font-medium text-gray-900">
                  architecture is there to serve teams, not the other way around
                </span>
                . Good systems make it obvious how to do the right thing, and cheap to recover when
                you inevitably get something wrong.
              </p>
            </section>
          </article>

          {/* Sidebar: table of contents + meta (desktop) */}
          <aside className="hidden lg:block space-y-6">
            <div className="sticky top-32 space-y-6">
              <section className="rounded-2xl border border-gray-200 bg-white px-4 py-4">
                <p className="text-[0.7rem] font-mono uppercase tracking-[0.25em] text-gray-500 mb-3">
                  Table of contents
                </p>
                <ol className="space-y-2 text-sm">
                  {POST_SECTIONS.map((section) => (
                    <li key={section.id} className="flex items-center gap-2">
                      <span className="h-px w-4 bg-gray-300" />
                      <a
                        href={`#${section.id}`}
                        className="text-gray-700 hover:text-black underline underline-offset-4 decoration-[0.5px]"
                      >
                        {section.label}
                      </a>
                    </li>
                  ))}
                </ol>
              </section>

              <section className="rounded-2xl border border-dashed border-gray-300 bg-white/70 px-4 py-4 space-y-3">
                <p className="text-[0.7rem] font-mono uppercase tracking-[0.25em] text-gray-500">
                  Snapshot
                </p>
                <ul className="space-y-1 text-xs text-gray-600">
                  <li>
                    <span className="font-mono text-gray-500">Role</span> · Software Architect
                  </li>
                  <li>
                    <span className="font-mono text-gray-500">Scope</span> · Frontend platform, data
                    systems, OSS
                  </li>
                  <li>
                    <span className="font-mono text-gray-500">Stack</span> · React, Module
                    Federation, Event Sourcing
                  </li>
                </ul>
              </section>
            </div>
          </aside>
        </div>

        {/* Related posts-style footer */}
        <section className="mt-16 border-t border-gray-200 pt-10 space-y-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <p className="text-[0.7rem] font-mono uppercase tracking-[0.25em] text-gray-500 mb-1">
                Related sections
              </p>
              <h2 className="text-lg md:text-xl font-semibold tracking-tight text-black">
                Explore more of the portfolio
              </h2>
            </div>
            <a
              href="/#architecture"
              className="inline-flex text-xs font-mono px-3 py-1.5 border border-gray-300 rounded-full hover:bg-black hover:text-white transition-colors whitespace-nowrap"
            >
              View Architecture grid →
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <a
              href="/#architecture"
              className="group rounded-2xl border border-gray-200 bg-white p-4 hover:-translate-y-0.5 hover:shadow-md transition-all"
            >
              <p className="text-[0.65rem] font-mono text-gray-500 uppercase tracking-[0.25em] mb-2">
                Case Study
              </p>
              <h3 className="text-sm font-semibold text-black mb-1 group-hover:underline underline-offset-4">
                Architecture grid
              </h3>
              <p className="text-xs text-gray-600">
                Visual overview of the same projects inside the main portfolio.
              </p>
            </a>
            <a
              href="/#ham-radio"
              className="group rounded-2xl border border-gray-200 bg-white p-4 hover:-translate-y-0.5 hover:shadow-md transition-all"
            >
              <p className="text-[0.65rem] font-mono text-gray-500 uppercase tracking-[0.25em] mb-2">
                Systems Thinking
              </p>
              <h3 className="text-sm font-semibold text-black mb-1 group-hover:underline underline-offset-4">
                Ham radio section
              </h3>
              <p className="text-xs text-gray-600">
                Hardware and signal-chain work that informs how I think about reliability.
              </p>
            </a>
            <a
              href="/#about"
              className="group rounded-2xl border border-gray-200 bg-white p-4 hover:-translate-y-0.5 hover:shadow-md transition-all"
            >
              <p className="text-[0.65rem] font-mono text-gray-500 uppercase tracking-[0.25em] mb-2">
                Background
              </p>
              <h3 className="text-sm font-semibold text-black mb-1 group-hover:underline underline-offset-4">
                About & experience
              </h3>
              <p className="text-xs text-gray-600">
                Context on the roles and environments where these systems were built.
              </p>
            </a>
          </div>

          <div className="mt-10 rounded-2xl border border-dashed border-gray-300 bg-white/70 px-6 py-6 md:py-7 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <p className="text-[0.7rem] font-mono uppercase tracking-[0.25em] text-gray-500 mb-1">
                Stay curious
              </p>
              <p className="text-sm text-gray-700 max-w-xl">
                I&apos;m always happy to nerd out about federation, event-driven systems, or
                frontend platforms. If something here sparked ideas for your team, reach out via the
                contact section on the main page.
              </p>
            </div>
            <a
              href="/#contact"
              className="inline-flex justify-center items-center text-xs font-mono px-4 py-2 border border-black rounded-full bg-black text-white hover:bg-white hover:text-black transition-colors"
            >
              Contact me about architecture →
            </a>
          </div>
        </section>
      </main>
    </div>
  )
}
