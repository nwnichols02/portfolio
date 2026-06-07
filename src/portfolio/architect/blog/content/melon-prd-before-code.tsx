import type { BlogPostContent } from '../types'
import { PROSE, H3, CODE } from '../types'
import { BlogLink } from '../components/BlogLink'

const overview = (
  <>
    <p className={PROSE}>
      Melon ships as twelve packages. Without upfront boundaries, that becomes twelve opinions
      drifting on every refactor. Before most implementation milestones, I wrote PRDs in{' '}
      <span className={CODE}>.cursor/rules/</span> — one per package and major capability — with
      acceptance criteria, non‑goals, and explicit gap lists. They were wrong often; they were still
      cheaper than re‑litigating scope in pull requests every week.
    </p>
    <p className={PROSE}>
      PRDs did not replace code. They paired with an ADR loop: when a decision stabilized enough to
      teach future readers, it moved into{' '}
      <span className={CODE}>apps/docs/content/docs/architecture/decisions.mdx</span> as ADR‑001
      through ADR‑011. Phase gates then referenced both — Phase 31 added a PRD compliance matrix
      and walkthroughs so alpha claims could be checked against written intent, not memory.
    </p>
    <p className={PROSE}>
      This essay is about process honesty for infrastructure libraries. Melon alpha is usable because
      boundaries were argued on paper first; it is not finished because PRDs also recorded what v1
      would defer — SQL JOIN includes, sliding window retention, full multi‑file schema codemods,
      background sync.
    </p>
  </>
)

const architecture = (
  <>
    <h3 className={H3}>PRDs in .cursor/rules as living contracts</h3>
    <p className={PROSE}>
      Package PRDs named exports, dependency rules, and test expectations before folders existed.
      Cross‑cutting PRDs (sync protocol, native stack, release engineering) defined interfaces between
      bounded contexts — e.g.{' '}
      <BlogLink slug="melon-split-storage-sync">storage vs sync split</BlogLink> before{' '}
      <span className={CODE}>@melon-db/sync</span> imported anything beyond{' '}
      <span className={CODE}>@melon-db/db</span>. Cursor rules made PRDs visible to every coding
      session, not buried in a wiki.
    </p>
    <h3 className={H3}>The ADR loop: Context → Decision → Pros → Cons</h3>
    <p className={PROSE}>
      When implementation proved a PRD tradeoff, I wrote an ADR with rejected alternatives — not
      just the winning idea. Examples readers meet in the series:{' '}
      <BlogLink slug="melon-ast-first">ADR‑001 AST‑first</BlogLink>,{' '}
      <BlogLink slug="melon-reactive-queries">ADR‑007 observation</BlogLink>,{' '}
      <BlogLink slug="melon-post-fetch-includes">ADR‑011 post‑fetch includes</BlogLink>,{' '}
      <BlogLink slug="melon-docs-as-product">ADR‑009 docs site</BlogLink>. Amendments (especially
      ADR‑007) are first‑class — the doc history explains Phase 27–33, not a silent rewrite.
    </p>
    <h3 className={H3}>Twelve‑package map as organizational spine</h3>
    <p className={PROSE}>
      The package map is the cheat sheet PRDs enforce:{' '}
      <span className={CODE}>@melon-db/db</span> core;{' '}
      <span className={CODE}>db-sqlite</span> + <span className={CODE}>db-sqlite-native</span>{' '}
      adapters; <span className={CODE}>db-query</span>, <span className={CODE}>db-query-mango</span>
      , <span className={CODE}>db-prisma</span> compilers; <span className={CODE}>db-react</span>,{' '}
      <span className={CODE}>db-devtools</span>, <span className={CODE}>db-testkit</span>,{' '}
      <span className={CODE}>db-codemods</span>; <span className={CODE}>sync</span> +{' '}
      <span className={CODE}>sync-server</span>. Query packages depend only on db; sync depends only
      on db; apps compose freely. ADR‑010 documents the intentional exception — db runtime depends on
      db-query for Watermelon‑style collection queries.
    </p>
    <h3 className={H3}>Phase gates and compliance matrix (Phase 31)</h3>
    <p className={PROSE}>
      Late‑project discipline: map shipped phases to PRD acceptance rows. Gaps surface as alpha table
      entries — not surprise GitHub issues. That matrix feeds{' '}
      <BlogLink slug="melon-open-source-release">release engineering</BlogLink> and the public docs
      prd-compliance page so adopters see the same gap list maintainers use.
    </p>
  </>
)

const impact = (
  <>
    <p className={PROSE}>
      <strong>Pros:</strong> Stable package boundaries across thirty‑four phases. Faster onboarding
      for future contributors — intent precedes folder structure. ADRs give the blog series a
      canonical why for each essay. Compliance matrix reduces &quot;docs say X but code does Y&quot;
      drift at alpha.
    </p>
    <p className={PROSE}>
      <strong>Cons:</strong> PRD maintenance tax — phases outran prose sometimes. Over‑specifying
      early PRDs wasted paragraphs on paths later rejected (e.g. monolithic sync). Cursor rules as
      source of truth is unconventional for external contributors who expect docs/ only.
    </p>
    <p className={PROSE}>
      <strong>Who wins:</strong> Solo architects and small teams building multi‑package platforms
      who need memory outside their head. <strong>Who pays:</strong> Teams allergic to written
      scope — Melon&apos;s process weight is real, not decorative.
    </p>
  </>
)

const lessons = (
  <>
    <p className={PROSE}>
      <strong>Lesson:</strong> Write package PRDs before you know the final API — especially when
      npm will eventually publish twelve names. Non‑goals matter as much as exports; defer lists
      prevent accidental marketing of gap features.
    </p>
    <p className={PROSE}>
      Close the loop: PRD → implement → ADR → docs → compliance row. If you skip ADRs, you will
      re‑argue the same tradeoff every quarter. Start reading the series at{' '}
      <BlogLink slug="melon-series-intro">series intro</BlogLink> for phase context, then{' '}
      <BlogLink slug="melon-docs-as-product">docs as product</BlogLink> for how ADRs reach adopters.
    </p>
  </>
)

export const content: BlogPostContent = { overview, architecture, impact, lessons }
