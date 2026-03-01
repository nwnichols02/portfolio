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
    title: 'Vite, Module Federation, and Zero‑Coupling Architecture for Enterprise Frontends',
    category: 'Federation',
    year: '2024',
    readingTime: '~10 min read',
    tagline:
      'Enterprise frontends are finally catching up to the way we already think about backends: independently deployable, isolated modules that can evolve without a "big bang" rewrite.',
  },
  {
    slug: 'secure-sdlc-frontend',
    title: 'Secure SDLC for Modern Frontend Platforms',
    category: 'Security',
    year: '2025',
    readingTime: '~9 min read',
    tagline:
      'Enterprise teams scale features well but struggle to scale security. A Secure SDLC bakes security into every phase of delivery instead of bolting it on as a pre‑release checklist.',
  },
  {
    slug: 'react-micro-loader',
    title: 'Why Offline‑First Changes Everything',
    category: 'Offline-First',
    year: '2025',
    readingTime: '~10 min read',
    tagline:
      'When you go offline‑first, the local database is the source of truth for UX and the server is a peer you eventually reconcile with—so saving becomes a distributed systems problem.',
  },
  {
    slug: 'beginners-guide',
    title: "Beginner's guide to my architecture portfolio",
    category: 'Overview',
    year: '2026',
    readingTime: '~8 min read',
    tagline:
      'A plain-language map of the portfolio: enterprise frontends, Secure SDLC, and offline-first—how they fit together and what I optimize for.',
  },
  {
    slug: 'technical-leadership',
    title: 'From Senior Engineer to Technical Leader',
    category: 'Leadership',
    year: '2026',
    readingTime: '~12 min read',
    tagline:
      'Technical leadership is not a promotion from "strong IC"; it\'s a different job. The core output changes from "I write great code" to "the team reliably ships the right system."',
  },
  {
    slug: 'domain-driven-design',
    title: 'What Domain-Driven Design Actually Optimizes For',
    category: 'Architecture',
    year: '2026',
    readingTime: '~11 min read',
    tagline:
      'Domain‑Driven Design (DDD) is less about fancy diagrams and more about putting your codebase under the control of the business language, not the database schema or the framework of the month.',
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
    () => BLOG_POSTS.find((p) => p.slug === slug) ?? BLOG_POSTS[0],
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
              {post.slug === 'enterprise-mf-platform' && (
                <>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                    Enterprise frontends are finally catching up to the way we already think about
                    backends: independently deployable, isolated modules that can evolve without a
                    &quot;big bang&quot; rewrite. Module Federation plus Vite gives you that power
                    with production‑grade DX and runtime performance.
                  </p>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                    Module Federation lets separate builds expose and consume code from each other
                    at runtime, without a monolithic bundle or iframes. With Vite, you get that on
                    top of lightning‑fast dev and modern tooling. At an enterprise level, this
                    unlocks: <strong>independent deployability</strong> (each MFE ships on its own
                    cadence while the shell pulls the latest remoteEntry at runtime),{' '}
                    <strong>runtime code sharing</strong> (React, design systems, utilities shared
                    instead of duplicated), and <strong>technology evolution</strong> (teams can
                    migrate piece‑by‑piece while keeping a single integrated UI). Think of the shell
                    as a &quot;router of capabilities,&quot; not a giant app; MFEs are independently
                    versioned feature slices that plug into that router.
                  </p>
                </>
              )}
              {post.slug === 'secure-sdlc-frontend' && (
                <>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                    Enterprise teams are great at scaling features, but much worse at scaling
                    security. A Secure SDLC (SSDLC) fixes that by baking security into every phase
                    of delivery instead of bolting it on as a pre‑release checklist.
                  </p>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                    This post walks through a practical SSDLC you can layer onto a modern front‑ and
                    back‑end stack, with a bias toward automation, guardrails, and developer‑friendly
                    tooling. A Secure SDLC is the standard software development lifecycle with
                    security activities attached to every phase: requirements, design,
                    implementation, testing, deployment, and maintenance. Instead of one big
                    &quot;security review&quot; at the end, you push security left via early threat
                    modeling, secure design patterns, automated scanning, and continuous monitoring
                    in production.
                  </p>
                </>
              )}
              {post.slug === 'react-micro-loader' && (
                <>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                    When you decide to go offline‑first, you&apos;re saying the local database is
                    the source of truth for user experience, and the server is a peer you eventually
                    reconcile with. That implies: every write must succeed locally, even when the
                    network is gone; conflicts are not an edge case but a design constraint; and
                    &quot;saving&quot; becomes a distributed systems problem, not just a POST
                    request. Your architecture has to treat network as optional and sync as a
                    background concern rather than a prerequisite.
                  </p>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                    <strong>WatermelonDB</strong> is built for this: a high‑performance,
                    SQLite‑backed database optimized for React/React Native, with a schema‑first
                    model and observable queries. It gives you normalized relational data on device
                    with migrations, reactive queries that keep UI in sync with local state, and a
                    well‑defined &quot;sync shape&quot;—pull changes from the server, push local
                    changes up, and let your app handle the results. WatermelonDB covers the
                    offline data store and reactivity; it doesn&apos;t pretend sync is easy, and
                    that honesty is important.
                  </p>
                </>
              )}
              {post.slug === 'beginners-guide' && (
                <>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                    This article is a plain-language tour of my architecture portfolio: how the pieces
                    fit together and what I optimize for.
                  </p>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                    The blog is organized around three themes—<strong>enterprise frontends</strong>{' '}
                    (Vite, Module Federation, zero-coupling micro-frontends), <strong>security</strong>{' '}
                    (Secure SDLC and DevSecOps for modern platforms), and <strong>offline-first</strong>{' '}
                    (local-first data, WatermelonDB, and sync as a first-class concern). Each of the
                    other posts goes deep on one of these; this guide is the map.
                  </p>
                </>
              )}
              {post.slug === 'technical-leadership' && (
                <>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                    Technical leadership is not a promotion from &quot;strong IC&quot;; it&apos;s a
                    different job. The core output changes from &quot;I write great code&quot; to
                    &quot;the team reliably ships the right system.&quot;
                  </p>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                    A strong senior can own problems end‑to‑end; a technical leader owns systems and
                    people dynamics around those systems. The shifts that matter: <strong>from depth
                    to leverage</strong>—you still understand the hard parts, but you optimize for
                    others doing the work well, not for you being the hero; <strong>from code to
                    outcomes</strong>—design docs, trade‑off calls, incident follow‑ups, and
                    stakeholder alignment become as important as pull requests; <strong>from local to
                    systemic</strong>—you care less about &quot;this ticket&quot; and more about
                    architecture, SDLC, and how teams interact. You&apos;re still technical, but your
                    primary artifact is clarity, not code.
                  </p>
                </>
              )}
              {post.slug === 'domain-driven-design' && (
                <>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                    Domain‑Driven Design (DDD) is less about fancy diagrams and more about putting
                    your codebase under the control of the business language, not the database schema
                    or the framework of the month.
                  </p>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                    <strong>What DDD actually optimizes for</strong> is alignment: the people who
                    understand the problem domain and the people writing the code speak the same
                    language and see the same model. That gives you: a <strong>shared vocabulary</strong>{' '}
                    (Ubiquitous Language) across product, engineering, and stakeholders;{' '}
                    <strong>models that map to how the business thinks</strong>, not to REST endpoints
                    or ORM tables; and <strong>code that remains understandable</strong> as the domain
                    evolves, instead of turning into &quot;crud‑shaped everything.&quot; In practice,
                    your main artifacts are named after domain concepts—Policies, Orders, Invoices,
                    Schedules—not Controllers and Utils.
                  </p>
                </>
              )}
            </section>

            <section id="architecture" className="space-y-3">
              <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-black">
                Architecture decisions
              </h2>
              {post.slug === 'enterprise-mf-platform' && (
                <>
                  <h3 className="text-lg font-semibold text-black mt-4">Zero‑coupling principles</h3>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                    Most MF implementations stop at &quot;separate repos and independent
                    deploys.&quot; Zero‑coupling goes further: MFEs don&apos;t know each other
                    exist. They integrate only through a stable contract with the platform shell.
                    Core rules: <strong>no cross‑MFE imports</strong> (one MFE never imports
                    another&apos;s functions, types, or hooks); <strong>no shared runtime state
                    between MFEs</strong> (no global Redux, no shared React context—communicate via
                    navigation, URL, and shell‑managed events); <strong>only shared libraries are
                    federated</strong> (React, react‑dom, design system, low‑level utilities); and
                    the <strong>shell owns cross‑cutting concerns</strong> (auth, routing, layout,
                    logging/telemetry, configuration). In practice, an MFE is a pure function from
                    &quot;platform‑provided props + URL&quot; to UI.
                  </p>
                  <h3 className="text-lg font-semibold text-black mt-4">
                    Platform topology: shell and MFEs
                  </h3>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                    At a minimum you have: a <strong>shell (host)</strong>—Vite app for layout,
                    routing, auth bootstrap, and feature discovery, consuming remotes via Module
                    Federation; <strong>domain MFEs (remotes)</strong>—independently deployed Vite
                    apps exposing React roots like <code className="font-mono text-xs bg-gray-100 px-1.5 py-0.5 rounded">./OrdersApp</code>, <code className="font-mono text-xs bg-gray-100 px-1.5 py-0.5 rounded">./BillingApp</code>; and optionally{' '}
                    <strong>mixed‑tech remotes</strong> (legacy Webpack/Rspack) while you migrate
                    toward Vite. The shell uses route‑based composition: each route segment maps to
                    a remote module that renders into a zone, with lazy loading via dynamic{' '}
                    <code className="font-mono text-xs bg-gray-100 px-1.5 py-0.5 rounded">import()</code>.
                  </p>
                  <h3 className="text-lg font-semibold text-black mt-4">
                    Vite + Module Federation configuration
                  </h3>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                    Vite doesn&apos;t ship Module Federation out of the box; use{' '}
                    <code className="font-mono text-xs bg-gray-100 px-1.5 py-0.5 rounded">@originjs/vite-plugin-federation</code> or the official{' '}
                    <code className="font-mono text-xs bg-gray-100 px-1.5 py-0.5 rounded">@module-federation/vite</code>. For the host: declare the shell as host with remotes and shared; map remote names (e.g. orders, billing) to remoteEntry URLs (configurable per environment); share react and react‑dom as singletons. For a remote MFE: declare <code className="font-mono text-xs bg-gray-100 px-1.5 py-0.5 rounded">exposes</code> to root components/widgets; mirror shared dependencies from the host. You keep fast HMR, TS support, and normal React tooling.
                  </p>
                  <h3 className="text-lg font-semibold text-black mt-4">
                    Enforcing zero coupling
                  </h3>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                    Enforce via code and tooling: <strong>type‑safe shell contracts</strong> (e.g.
                    PlatformContext, FeatureFlags, UserContext in a shared types package, no
                    concrete implementations across MFEs); <strong>no shared global state</strong>—MFEs
                    get state through props from the shell and manage local/remote data with their
                    own stack (e.g. TanStack Query); <strong>event‑driven integration</strong>—cross‑MFE
                    effects via shell‑mediated events or URL changes (e.g. Orders MFE navigates to{' '}
                    <code className="font-mono text-xs bg-gray-100 px-1.5 py-0.5 rounded">/billing/invoice/123</code>, shell loads Billing MFE). This mirrors microservice design: MFEs only talk through APIs and contracts they don&apos;t own.
                  </p>
                </>
              )}
              {post.slug === 'secure-sdlc-frontend' && (
                <>
                  <h3 className="text-lg font-semibold text-black mt-4">
                    Phase‑by‑phase Secure SDLC flow
                  </h3>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                    Frame the SSDLC as five core phases: <strong>Requirements</strong>—capture
                    security requirements, regulatory constraints, and risk appetite alongside
                    functional and non‑functional requirements. <strong>Design</strong>—threat
                    modeling, secure patterns, document where controls live (auth, data validation,
                    logging, secrets). <strong>Implementation</strong>—secure coding standards,
                    SAST/secret scanning in CI, keep dependencies clean. <strong>Testing</strong>—DAST,
                    dependency checks, targeted security tests; block releases on critical vulns.{' '}
                    <strong>Deployment &amp; Maintenance</strong>—harden environments, validate IaC,
                    monitor for attacks, feed production findings back into requirements and threat
                    models.
                  </p>
                  <h3 className="text-lg font-semibold text-black mt-4">
                    Threat modeling as the backbone
                  </h3>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                    Threat modeling keeps security work focused. Embed it early (requirements/design
                    for new systems and when you introduce significant architectural change). Use
                    data‑flow‑centric views: model how data moves through services, UIs, APIs, and
                    third‑party integrations to spot attack paths. Tie threats to work items—translate
                    threats into backlog items and link them to implementation so developers
                    understand the &quot;why&quot; behind mitigations. Done right, threat models
                    become living artifacts you update as the system evolves.
                  </p>
                  <h3 className="text-lg font-semibold text-black mt-4">
                    DevSecOps: automating the guardrails
                  </h3>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                    Secure SDLC in practice is SSDLC plus DevSecOps: security controls wired into
                    pipelines and environments. CI pipeline checks: SAST, dependency scanning, secret
                    detection, basic IaC validation on every merge, with policy gates for critical
                    issues. Runtime and deployment: container hardening, image scanning,
                    orchestration checks, secure build pipelines. Continuous monitoring:
                    post‑deployment monitoring, risk scoring, anomaly detection, alerting—so
                    production findings feed the next SDLC cycle. The goal is to make the secure
                    path the easiest path.
                  </p>
                </>
              )}
              {post.slug === 'react-micro-loader' && (
                <>
                  <h3 className="text-lg font-semibold text-black mt-4">
                    The real pain: sync engines
                  </h3>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                    Sync is where offline‑first projects get hard. You&apos;ll hit{' '}
                    <strong>conflict resolution</strong> (last‑write‑wins is often wrong;
                    domain‑aware merge becomes a mini rules engine), <strong>partial
                    failures</strong> (push succeeds for some records not others; pulls truncated or
                    out‑of‑order), <strong>versioning</strong> (cursor‑ or timestamp‑based change
                    tracking on client and server, with migrations), and{' '}
                    <strong>multi‑device semantics</strong> (same user, multiple devices, every race
                    you didn&apos;t design for). All of this has to run in the background, under
                    flaky connectivity, without corrupting the local DB or blocking the UI.
                  </p>
                  <h3 className="text-lg font-semibold text-black mt-4">
                    &quot;Batteries included&quot; sync: blessing and trap
                  </h3>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                    Hosted backends and turnkey sync engines are great for prototyping, avoiding
                    the first 6–12 months of building diff/push/pull/retry machinery, and standard
                    CRUD with simple record‑level conflicts. But they have hard limits: domain logic
                    (as soon as business rules affect conflict resolution, generic abstractions
                    leak), performance tuning (batch sizes, prioritization, backoff), and data
                    shape evolution (schema changes, per‑tenant extensions). The key warning:{' '}
                    <em>there will come a day when you have to write your own sync logic</em>. Treat
                    them like scaffolding, not foundations.
                  </p>
                  <h3 className="text-lg font-semibold text-black mt-4">
                    Designing your own sync layer
                  </h3>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                    When you own sync, WatermelonDB can still be the workhorse; the sync engine is a
                    thin layer around it and your backend. Center on: <strong>explicit change
                    tracking</strong> (server: &quot;changes since cursor X&quot; per collection;
                    client: queues of pending writes with metadata); <strong>deterministic conflict
                    rules</strong> (per‑entity policies—e.g. sum counters, max timestamp, server
                    wins for locked records—implemented at the server); <strong>idempotency and
                    replay</strong> (writes repeatable and deduplicated; clients replay failed
                    batches safely); and <strong>observability by design</strong> (log sync cycles,
                    durations, failures, record counts; make single‑device sync history debuggable).
                    Design with these early and migrating off a generic engine becomes a controlled
                    evolution, not a full rewrite.
                  </p>
                </>
              )}
              {post.slug === 'beginners-guide' && (
                <>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                    Across all of my work, I optimize for systems that are predictable to operate
                    and forgiving to change: explicit contracts, observable behavior, and
                    architectures that make errors visible early instead of hiding them.
                  </p>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                    The other posts expand on that in practice—zero-coupling boundaries in
                    federated frontends, phase-by-phase security in the SDLC, and explicit change
                    tracking and conflict rules in offline-first sync. The details differ, but the
                    mindset is the same.
                  </p>
                </>
              )}
              {post.slug === 'technical-leadership' && (
                <>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                    You can think of technical leadership as three overlapping jobs: Architect,
                    Coach, and Shield.
                  </p>
                  <h3 className="text-lg font-semibold text-black mt-4">1. Architect: Shape the System</h3>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                    The Architect job is about direction and constraints, not drawing boxes all day.
                    Define guardrails: coding standards, architectural principles (e.g., zero‑coupling
                    MFEs, offline‑first boundaries, secure SDLC expectations), and what &quot;good&quot;
                    looks like. Make high‑impact trade‑offs: choose where to incur tech debt, when to
                    refactor, and how to phase big changes into shippable increments. Keep the map
                    current: maintain architecture docs, ADRs, and shared diagrams so new engineers
                    don&apos;t have to reverse‑engineer the system from the repo. Good technical
                    leaders create an environment where most decisions can be made locally because
                    the big decisions are clear.
                  </p>
                  <h3 className="text-lg font-semibold text-black mt-4">2. Coach: Grow People and Practices</h3>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                    You can&apos;t scale technical leadership without investing in others. Review at the
                    right altitude: don&apos;t bikeshed syntax; focus reviews on correctness, boundaries,
                    failure modes, and long‑term maintainability. Turn feedback into patterns: if you
                    give the same feedback twice, codify it—lint rules, templates, checklists, example
                    repos, or runbooks. Make learning explicit: own brown‑bags, design reviews, and
                    debriefs after incidents or large projects; treat them as normal parts of the job,
                    not &quot;nice to have.&quot; The goal is to make the team more capable over time, so
                    things that were &quot;hard&quot; become routine.
                  </p>
                  <h3 className="text-lg font-semibold text-black mt-4">3. Shield: Manage Risk and Expectations</h3>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                    Technical leaders sit at the intersection of engineering reality and business
                    demands. Translate risk: explain impact, likelihood, and options in business
                    terms—&quot;If we skip this, here&apos;s the failure mode and cost.&quot; Say &quot;no,
                    but…&quot;: offer constrained alternatives (&quot;We can&apos;t do that safely by Friday,
                    but we can ship an 80% solution with a feature flag.&quot;). Protect focus: push
                    back on thrash, unbounded scope, and randomization so the team can actually
                    complete work. When done well, stakeholders see fewer surprises, and engineers
                    see fewer &quot;fire drills.&quot;
                  </p>
                  <h3 className="text-lg font-semibold text-black mt-4">Leading Through Design, Not Heroics</h3>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                    Technical leaders are judged less on heroics and more on avoiding drama through
                    good design. Write clear design docs: expected behavior, constraints, risks, and
                    alternatives; good docs reduce meetings and misalignment. Prefer simple, boring
                    solutions: your future self and junior devs should be able to reason about the
                    system; cleverness is a cost. Design for failure first: timeouts, retries,
                    idempotency, and feature flags are design decisions, not afterthoughts. If the
                    system is resilient and understandable, you&apos;ve done your job—even if your name
                    isn&apos;t on the biggest PRs.
                  </p>
                </>
              )}
              {post.slug === 'domain-driven-design' && (
                <>
                  <h3 className="text-lg font-semibold text-black mt-4">Core concepts in DDD</h3>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                    You don&apos;t need the whole book to get value. A few core ideas get you most of the
                    way. <strong>Ubiquitous Language</strong>: everyone uses the same terms for domain
                    concepts, and those terms show up in code, tests, and docs.{' '}
                    <strong>Bounded Contexts</strong>: clear boundaries where a model and language
                    apply; outside that boundary, terms might legitimately mean something different.{' '}
                    <strong>Aggregates</strong>: clusters of domain objects treated as a single
                    consistency boundary (e.g., an Order and its LineItems).{' '}
                    <strong>Domain Events</strong>: facts that something happened in the domain (e.g.,
                    PaymentCaptured, OrderShipped) which can drive side effects elsewhere. If a
                    concept isn&apos;t clear enough to name, it probably isn&apos;t stable enough to model yet.
                  </p>
                  <h3 className="text-lg font-semibold text-black mt-4">
                    Bounded Contexts and micro‑frontends / services
                  </h3>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                    For modern distributed systems and micro‑frontends, Bounded Contexts are your
                    best friend. They help you draw boundaries: &quot;Billing,&quot; &quot;Catalog,&quot;
                    &quot;Fulfillment,&quot; &quot;Identity&quot; each have their own model and language,
                    even if they share terms like &quot;Customer.&quot; You avoid shared, ambiguous
                    models—you stop trying to have one mega &quot;User&quot; type that means everything
                    to everyone. Teams align to contexts: a team owns a context end‑to‑end (UI,
                    services, data, events) and can move independently. Your micro‑frontends, APIs,
                    and databases should line up with these contexts where possible, instead of
                    arbitrary technical splits.
                  </p>
                  <h3 className="text-lg font-semibold text-black mt-4">Aggregates and invariants</h3>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                    Aggregates are about where you need strong consistency and where you can tolerate
                    eventual consistency. Ask: what must always be true when we commit a change?
                    (Invariants.) Which objects must be updated together to preserve those
                    invariants? What can we safely handle asynchronously via events? For example, an
                    Order aggregate might enforce &quot;total equals sum of line items&quot; and
                    &quot;cannot ship unpaid orders,&quot; while inventory adjustments happen
                    asynchronously in a different bounded context. Good aggregate boundaries simplify
                    transaction logic and reduce cross‑service coupling.
                  </p>
                  <h3 className="text-lg font-semibold text-black mt-4">Domain Events and integration</h3>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                    Domain Events turn implicit behavior into explicit, composable contracts. They
                    help you decouple workflows: OrderPlaced can drive email notifications, analytics,
                    and fulfillment without the Order service knowing about any of them. They improve
                    traceability: events form an audit trail of &quot;what happened,&quot; not just
                    &quot;what is.&quot; They bridge contexts: each bounded context reacts to events
                    that are meaningful to it, translating into its own language at the boundary.
                    It&apos;s often better to start small—raise events for a few core behaviors—than to
                    try to event‑source your entire system from day one.
                  </p>
                  <h3 className="text-lg font-semibold text-black mt-4">Strategic vs tactical DDD</h3>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                    A lot of teams jump straight into annotations and aggregates and miss the point.{' '}
                    <strong>Strategic DDD</strong>: Bounded Contexts, context maps, and language
                    alignment. This is where the biggest wins live.{' '}
                    <strong>Tactical DDD</strong>: Entities, Value Objects, Aggregates, Repositories,
                    etc. These shape how you write code inside a context. If you only pick one, pick
                    strategic: get the boundaries and language right before fine‑tuning patterns inside
                    each context.
                  </p>
                  <h3 className="text-lg font-semibold text-black mt-4">Applying DDD in a modern stack</h3>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                    In a React / TypeScript / services world, DDD shows up as: <strong>domain‑first
                    modules and packages</strong>—billing-domain, inventory-domain, identity-domain,
                    each exporting pure domain logic and types; <strong>use cases / application
                    services</strong>—&quot;Commands&quot; like CreateInvoice, CapturePayment, PlaceOrder
                    that orchestrate domain objects without UI or infrastructure concerns;{' '}
                    <strong>infrastructure at the edges</strong>—HTTP handlers, DB repositories, and
                    message brokers adapt to domain types, not the other way around. Tests then become
                    story‑like: &quot;Given these domain facts, when this command runs, these events
                    occur and these invariants hold.&quot;
                  </p>
                </>
              )}
            </section>

            <section id="impact" className="space-y-3">
              <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-black">
                Impact & tradeoffs
              </h2>
              {post.slug === 'enterprise-mf-platform' && (
                <>
                  <h3 className="text-lg font-semibold text-black mt-4">
                    Monorepo, CI/CD, and scalability
                  </h3>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                    You can run this architecture in a monorepo or multi‑repo; Module Federation
                    works with both. A monorepo plus MF gives you coordinated but optional
                    releases (MFEs versioned independently in a single source of truth), shared
                    tooling and linting (zero‑coupling rules and ownership boundaries at repo
                    level), and simplified local dev (run a subset of MFEs plus the shell with
                    Vite). CI/CD builds and deploys each MFE independently, publishing
                    remoteEntry assets to your CDN or edge platform.
                  </p>
                  <h3 className="text-lg font-semibold text-black mt-4">
                    Where this shines in the enterprise
                  </h3>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                    This style works well for: <strong>large e‑commerce platforms</strong> (product
                    discovery, checkout, account, admin ship independently with a coherent design
                    system); <strong>internal admin portals</strong> (analytics, reporting,
                    configuration panels evolve on their own); and <strong>widget‑heavy
                    dashboards</strong> (each widget or board segment is an MFE, easy to plug in or
                    swap for different tenants). At scale, the payoff is the ability to refactor or
                    rewrite a domain slice with minimal blast radius, while the platform shell stays
                    stable for years.
                  </p>
                </>
              )}
              {post.slug === 'secure-sdlc-frontend' && (
                <>
                  <h3 className="text-lg font-semibold text-black mt-4">
                    Culture, roles, and security champions
                  </h3>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                    No SSDLC survives contact with reality without people and ownership. Use{' '}
                    <strong>defined security roles</strong> so development, operations, and
                    security have clear responsibilities and fewer &quot;not my job&quot; gaps.{' '}
                    <strong>Security champions</strong>—developers embedded in each squad—act as
                    the first line for threat modeling, tooling, and code reviews. Allocate{' '}
                    <strong>budget and training</strong> for tools and incident response so
                    security isn&apos;t permanently deprioritized by feature work. When security
                    responsibilities are explicit and supported, the SSDLC becomes part of how you
                    build software rather than an occasional compliance exercise.
                  </p>
                </>
              )}
              {post.slug === 'react-micro-loader' && (
                <>
                  <h3 className="text-lg font-semibold text-black mt-4">
                    Practical guidance before you commit
                  </h3>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                    If you&apos;re starting a new offline‑first project with WatermelonDB (or
                    similar): start with the simplest working sync that respects your domain, even
                    if you lean on a managed service at first. Keep sync logic isolated from UI—treat
                    sync as a pure‑ish pipeline around your DB with clear inputs/outputs so you can
                    swap implementations. Document your conflict policies in plain language before
                    you code them; if you can&apos;t explain them, you won&apos;t debug them. Budget
                    time for sync from day one; don&apos;t treat it as a &quot;later&quot; feature.
                  </p>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                    Offline‑first is worth it for many products, but the cost isn&apos;t in
                    WatermelonDB or local state—it&apos;s in owning synchronization as a
                    first‑class part of your architecture.
                  </p>
                </>
              )}
              {post.slug === 'beginners-guide' && (
                <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                  The impact of these systems isn&apos;t just technical. They shape how teams work:
                  who owns what (MFEs vs shell, security champions, sync ownership), how risk is
                  managed (SSDLC phases, conflict policies), and how quickly you can change
                  direction without burning the organization out.
                </p>
              )}
              {post.slug === 'technical-leadership' && (
                <>
                  <h3 className="text-lg font-semibold text-black mt-4">Influence Without Authority</h3>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                    Even as a titled lead, most of your impact is persuasion, not command. Lead by
                    example, selectively: pick a few critical paths (an architecture spike, the first
                    MFE, the initial sync engine) and execute them in the style you want others to
                    copy. Be consistent: if your priorities change every week, the team will stop
                    listening; if your principles are stable, people will internalize them. Share
                    context widely: the more people understand &quot;why,&quot; the less you need to
                    enforce &quot;what.&quot; Influence is earned through good calls over time, clear
                    communication, and visibly owning the hard problems when they appear.
                  </p>
                </>
              )}
              {post.slug === 'domain-driven-design' && (
                <>
                  <h3 className="text-lg font-semibold text-black mt-4">Alignment and team ownership</h3>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                    The main payoff of DDD is alignment: product, engineering, and stakeholders
                    share a vocabulary and a mental model. That reduces miscommunication, makes
                    onboarding easier, and keeps the codebase understandable as the domain evolves.
                    When micro‑frontends and services align to Bounded Contexts, teams can own
                    contexts end‑to‑end and ship independently without constant cross‑team
                    coordination. Domain Events give you traceability and loose coupling—workflows
                    stay composable and audit trails stay clear. Start with strategic DDD (boundaries
                    and language); tactical patterns can follow once the map is right.
                  </p>
                </>
              )}
            </section>

            <section id="lessons" className="space-y-3">
              <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-black">
                Lessons for teams
              </h2>
              {post.slug !== 'technical-leadership' && (
                <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                  The common thread across all of these projects is simple:{' '}
                  <span className="font-medium text-gray-900">
                    architecture is there to serve teams, not the other way around
                  </span>
                  . Good systems make it obvious how to do the right thing, and cheap to recover when
                  you inevitably get something wrong.
                </p>
              )}
              {post.slug === 'technical-leadership' && (
                <>
                  <h3 className="text-lg font-semibold text-black mt-4">Staying Technical Without Being a Bottleneck</h3>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                    The trap is either becoming non‑technical or the single point of failure. Allocate
                    time for deep work: reserve blocks for reading code, experimenting, and staying
                    current with the stack. Avoid owning every critical path: pair or mob on important
                    work instead of soloing it; your job is to de‑bottleneck, not centralize. Delegate
                    visibly: let others lead projects and designs, and support them publicly;
                    you&apos;re there to de‑risk, not to take over.
                  </p>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                    If the system keeps moving in the right direction while you&apos;re on vacation,
                    that&apos;s a strong signal of effective technical leadership.
                  </p>
                </>
              )}
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
            </div>
          </aside>
        </div>

        {/* Stay curious footer */}
        <section className="mt-16 border-t border-gray-200 pt-10">
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white/70 px-6 py-6 md:py-7 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
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
