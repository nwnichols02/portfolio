import type { BlogPost } from './types'

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'melon-series-intro',
    title: 'Building Melon: Twelve Lessons from an Offline-First Database Stack',
    category: 'Melon',
    year: '2026',
    readingTime: '~6 min read',
    tagline:
      'I spent a year building Melon — twelve packages, thirty-four phases, and an alpha on npm. This series is what I wish I had known before I started.',
  },
  {
    slug: 'melon-ast-first',
    title: 'One Query AST to Rule Them All: Why Adapters Should Never See User Syntax',
    category: 'Melon',
    year: '2026',
    readingTime: '~10 min read',
    tagline:
      'WatermelonDB, Mango, Prisma, and fluent builders all want different syntax. Melon compiles everything to one QueryAst before SQLite ever runs — and that single decision paid for itself ten times over.',
  },
  {
    slug: 'melon-split-storage-sync',
    title: 'Storage and Sync Are Two Products, Not One Package',
    category: 'Melon',
    year: '2026',
    readingTime: '~9 min read',
    tagline:
      'Offline-first apps feel monolithic, but Melon ships @melon-db/db and @melon-db/sync as separate packages — because local CRUD and pull/push orchestration have different lifecycles, consumers, and failure modes.',
  },
  {
    slug: 'melon-three-query-surfaces',
    title: 'Three Query APIs Is Not Over-Engineering — It Is Realistic',
    category: 'Melon',
    year: '2026',
    readingTime: '~10 min read',
    tagline:
      'Fluent TypeScript, Mango JSON, and Prisma-style args compile to the same engine. Maintaining three compilers is real work — but teams do not arrive with the same query background.',
  },
  {
    slug: 'melon-prisma-not-engine',
    title: 'Prisma Support Without the Prisma Engine: Compatibility Is Not Identity',
    category: 'Melon',
    year: '2026',
    readingTime: '~8 min read',
    tagline:
      'Teams hear "Prisma support" and assume the full engine. Melon imports schemas and generates local clients — runtime is always MelonDatabase + SQLite. Honest positioning saves trust.',
  },
  {
    slug: 'melon-expo-go-vs-native',
    title: 'Expo Go and Dev Builds Are Two Different Products',
    category: 'Melon',
    year: '2026',
    readingTime: '~10 min read',
    tagline:
      '"React Native support" is not one path. Melon runs on Expo Go via expo-sqlite and on dev builds via TurboModule + C++ JSI — because those audiences have different constraints and expectations.',
  },
  {
    slug: 'melon-native-is-a-product',
    title: 'Native SQLite Is Not a Feature Flag — It Is a Product Line',
    category: 'Melon',
    year: '2026',
    readingTime: '~11 min read',
    tagline:
      'TurboModules, C++ JSI, NDK/JNI, native DB threads — Melon Phases 20–26 taught me that performance claims require native work budgeted like a long-running product, not a one-sprint spike.',
  },
  {
    slug: 'melon-reactive-queries',
    title: 'CRUD Is Table Stakes — observeQuery Is Where Offline-First Gets Hard',
    category: 'Melon',
    year: '2026',
    readingTime: '~11 min read',
    tagline:
      'Inserts and selects are easy. UI that updates when the right rows change — without over-fetching or missing updates — took Phases 27–33 and still has documented edge cases.',
  },
  {
    slug: 'melon-post-fetch-includes',
    title: 'Why I Chose Post-Fetch Includes Over SQL JOINs (For Now)',
    category: 'Melon',
    year: '2026',
    readingTime: '~9 min read',
    tagline:
      'Relation loading could be JOIN-shaped SELECTs. Melon batches IN queries after the parent fetch — one engine path for in-memory and SQLite, predictable SQL, deferred JOIN complexity.',
  },
  {
    slug: 'melon-prd-before-code',
    title: 'I Wrote PRDs for Every Package Before I Knew What I Was Building',
    category: 'Melon',
    year: '2026',
    readingTime: '~8 min read',
    tagline:
      'Twelve packages could have become twelve opinions. Extensive PRDs in .cursor/rules/ kept boundaries stable — and ADRs stopped me from re-litigating the same tradeoffs every week.',
  },
  {
    slug: 'melon-docs-as-product',
    title: 'I Built a Docs Site Before I Built a Community',
    category: 'Melon',
    year: '2026',
    readingTime: '~9 min read',
    tagline:
      'READMEs could not carry phase history, ADRs, live playgrounds, and per-package TypeDoc. apps/docs became how I dogfood Melon — and how alpha adopters decide if it fits.',
  },
  {
    slug: 'melon-open-source-release',
    title: 'Phase 34 Was Not "Flip the Repo Public" — It Was Release Engineering',
    category: 'Melon',
    year: '2026',
    readingTime: '~10 min read',
    tagline:
      'Monorepo green does not mean npm green. Publishing twelve @melon-db packages required tarball smoke tests, export validation, CI gates, and alpha policy — a feature with acceptance criteria.',
  },
  {
    slug: 'melon-codemods-migration',
    title: 'Codemods Are Empathy for Your Past Self (and WatermelonDB Users)',
    category: 'Melon',
    year: '2026',
    readingTime: '~9 min read',
    tagline:
      'Building a WatermelonDB successor without a migration path is a hobby. @melon-db/db-codemods translates queries, writes, React patterns, and single-model schemas — with an honest parity matrix for what still needs manual work.',
  },
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

export const MELON_LESSON_SLUGS = [
  'melon-ast-first',
  'melon-split-storage-sync',
  'melon-three-query-surfaces',
  'melon-prisma-not-engine',
  'melon-expo-go-vs-native',
  'melon-native-is-a-product',
  'melon-reactive-queries',
  'melon-post-fetch-includes',
  'melon-prd-before-code',
  'melon-docs-as-product',
  'melon-open-source-release',
  'melon-codemods-migration',
] as const
