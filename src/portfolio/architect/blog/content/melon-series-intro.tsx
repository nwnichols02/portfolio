import type { BlogPostContent } from '../types'
import { PROSE, H3, CODE } from '../types'
import { BlogLink } from '../components/BlogLink'

const overview = (
  <>
    <p className={PROSE}>
      In{' '}
      <BlogLink slug="react-micro-loader">Why Offline‑First Changes Everything</BlogLink>, I
      argued that going offline‑first turns saving into a distributed systems problem — local
      writes must succeed, sync is background work, and your UI lives on observable local state.
      That essay was the motivation.{' '}
      <a
        href="https://github.com/nwnichols02/melon-db"
        className="text-gray-900 dark:text-gray-100 underline underline-offset-4 decoration-[0.5px] hover:text-black dark:hover:text-white"
      >
        Melon
      </a>{' '}
      is what I built next: a modular TypeScript stack for React Native with an AST‑first query
      engine, SQLite adapters, optional Watermelon‑compatible sync, and a migration path from
      WatermelonDB.
    </p>
    <p className={PROSE}>
      Melon is not a single package pretending to be a platform. It ships as{' '}
      <strong>twelve scoped packages</strong> under <span className={CODE}>@melon-db/*</span>,
      developed across <strong>Phases 0–34</strong> — from monorepo bootstrap through native JSI,
      reactive observation, codemods, and release engineering. Today it is on npm with the{' '}
      <span className={CODE}>alpha</span> dist‑tag. That means the API surface is real enough to
      evaluate, but there is <strong>no production SLA</strong> and semver 1.x stability is not the
      promise yet.
    </p>
    <p className={PROSE}>
      This series is twelve architecture essays — one per major lesson — drawn from ADRs, phase
      history, and the honest gap list. Read them in order or jump to the topic that matches your
      evaluation. Each post names what shipped, what is deferred, and what I would do differently
      with hindsight.
    </p>
  </>
)

const architecture = (
  <>
    <h3 className={H3}>From motivation to modular stack</h3>
    <p className={PROSE}>
      The offline‑first post established the problem space: local database as UX source of truth,
      server as reconciliation peer. Melon answers that with two modular products — storage and
      query (<span className={CODE}>@melon-db/db</span> plus adapters and query compilers) and
      optional sync (<span className={CODE}>@melon-db/sync</span> +{' '}
      <span className={CODE}>@melon-db/sync-server</span>). Everything compiles to{' '}
      <span className={CODE}>QueryAst</span> before SQLite runs, which is the spine every later
      lesson hangs on.
    </p>
    <h3 className={H3}>Twelve packages, one dependency graph</h3>
    <p className={PROSE}>
      The stack spans core engine, SQLite adapters (Expo and native paths), three query surfaces
      (fluent, Mango, Prisma‑like), React hooks, devtools, testkit, codemods, and sync packages.
      Package boundaries were enforced early — not because npm likes small packages, but because
      local‑only apps, sync‑enabled apps, and Prisma‑leaning teams have different lifecycles and
      bundle constraints.
    </p>
    <h3 className={H3}>Phases 0–34 as the changelog you can trust</h3>
    <p className={PROSE}>
      Phase history is how I keep claims honest. Foundation phases (0–7) delivered the AST and
      adapters. RN and API phases (8–10) added Expo Go, migrations, and benchmarks. Sync phases
      (12–18) split orchestration from storage. Native and observation phases (20–33) delivered
      TurboModule, C++ JSI, predicate‑aware <span className={CODE}>observeQuery</span>, and
      relation filters. Phase 34 was release engineering — tarball smoke tests, export validation,
      and alpha publish policy — not merely flipping a repo public.
    </p>
    <h3 className={H3}>The twelve lessons</h3>
    <ul className={`${PROSE} list-disc pl-5 space-y-2`}>
      <li>
        <BlogLink slug="melon-ast-first">One Query AST to Rule Them All</BlogLink>
      </li>
      <li>
        <BlogLink slug="melon-split-storage-sync">Storage and Sync Are Two Products</BlogLink>
      </li>
      <li>
        <BlogLink slug="melon-three-query-surfaces">Three Query APIs Is Realistic</BlogLink>
      </li>
      <li>
        <BlogLink slug="melon-prisma-not-engine">Prisma Support Without the Prisma Engine</BlogLink>
      </li>
      <li>
        <BlogLink slug="melon-expo-go-vs-native">Expo Go and Dev Builds Are Two Products</BlogLink>
      </li>
      <li>
        <BlogLink slug="melon-native-is-a-product">Native SQLite Is a Product Line</BlogLink>
      </li>
      <li>
        <BlogLink slug="melon-reactive-queries">observeQuery Is Where It Gets Hard</BlogLink>
      </li>
      <li>
        <BlogLink slug="melon-post-fetch-includes">Post‑Fetch Includes Over SQL JOINs (For Now)</BlogLink>
      </li>
      <li>
        <BlogLink slug="melon-prd-before-code">PRDs Before Code</BlogLink>
      </li>
      <li>
        <BlogLink slug="melon-docs-as-product">Docs as Product</BlogLink>
      </li>
      <li>
        <BlogLink slug="melon-open-source-release">Phase 34 Release Engineering</BlogLink>
      </li>
      <li>
        <BlogLink slug="melon-codemods-migration">Codemods as Migration Empathy</BlogLink>
      </li>
    </ul>
  </>
)

const impact = (
  <>
    <p className={PROSE}>
      <strong>Pros:</strong> A series tied to shipped phases and ADRs gives evaluators a map —
      not marketing bullets. Modular packages let teams adopt storage without sync, or Mango without
      Prisma. Alpha on npm means you can install from tarballs that passed{' '}
      <span className={CODE}>release:smoke</span>, not just pass CI in a workspace linked monorepo.
    </p>
    <p className={PROSE}>
      <strong>Cons:</strong> Twelve packages and thirty‑four phases is a lot to onboard. Alpha
      means breaking changes, documented gaps (post‑fetch includes, partial Q.on parity, top‑N
      observation edge cases), and no enterprise support contract. Melon is a successor in intent to
      WatermelonDB, not a drop‑in clone — codemods help, manual work remains.
    </p>
    <p className={PROSE}>
      <strong>Who wins:</strong> RN teams evaluating local‑first stacks, WatermelonDB migrators,
      and architects who want package boundaries that match bounded contexts.{' '}
      <strong>Who pays:</strong> Teams expecting GA semver, full Prisma engine parity, or
      background sync as a built‑in service — those are deferred or out of scope for v1 alpha.
    </p>
  </>
)

const lessons = (
  <>
    <p className={PROSE}>
      <strong>Lesson:</strong> If your offline‑first motivation essay and your implementation diverge
      without a bridge, readers cannot follow the arc. This intro exists so the{' '}
      <BlogLink slug="react-micro-loader">offline‑first post</BlogLink> and the Melon essays connect
      as one story — problem, then system, then tradeoffs.
    </p>
    <p className={PROSE}>
      Start with{' '}
      <BlogLink slug="melon-ast-first">AST‑first queries</BlogLink> if you care about engine
      design; jump to{' '}
      <BlogLink slug="melon-codemods-migration">codemods</BlogLink> if you are migrating from
      WatermelonDB. Read{' '}
      <BlogLink slug="melon-open-source-release">Phase 34</BlogLink> before you bet production
      traffic on alpha packages. Source and issues live on{' '}
      <a
        href="https://github.com/nwnichols02/melon-db"
        className="text-gray-900 dark:text-gray-100 underline underline-offset-4 decoration-[0.5px] hover:text-black dark:hover:text-white"
      >
        GitHub
      </a>
      .
    </p>
  </>
)

export const content: BlogPostContent = { overview, architecture, impact, lessons }
