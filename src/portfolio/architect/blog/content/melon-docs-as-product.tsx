import type { BlogPostContent } from '../types'
import { PROSE, H3, CODE } from '../types'
import { BlogLink } from '../components/BlogLink'

const overview = (
  <>
    <p className={PROSE}>
      READMEs were fine for Phase 4. By Phase 14 — sync shipped, native work looming, three query
      surfaces compiling to one AST — READMEs could not carry phase history, ADR rationale, live
      playgrounds, or per‑package API reference. <strong>ADR‑009</strong> committed to{' '}
      <span className={CODE}>apps/docs</span>: a Fumadocs site on TanStack Start that treats
      documentation as onboarding UX for an infrastructure library, not as an afterthought once
      &quot;real users&quot; appear.
    </p>
    <p className={PROSE}>
      I built the docs site before I built a community — deliberately. Alpha adopters decide fit from
      docs, devtools, and benchmark artifacts, not from conference talks. TypeDoc runs per package in
      CI; benchmark JSON is committed to the repo and rendered on performance comparison pages; ADRs
      and roadmap pages explain deferred work so evaluators do not infer features from API shape
      alone.
    </p>
    <p className={PROSE}>
      Extra CI jobs (<span className={CODE}>docs:api</span>,{' '}
      <span className={CODE}>build:docs</span>) and sync burden with phase landings are the cost.
      For Melon alpha, that cost buys trust — especially alongside honest gap lists in prd-compliance
      and migration guides.
    </p>
  </>
)

const architecture = (
  <>
    <h3 className={H3}>ADR‑009: Fumadocs + Bun monorepo docs app</h3>
    <p className={PROSE}>
      <span className={CODE}>apps/docs</span> centralizes narrative docs, architecture decisions,
      package guides, and search. Fumadocs provides MDX structure and navigation; TanStack Start hosts
      the app inside the same Bun workspace as packages — dogfooding reactive demos in the browser
      where feasible. Rejected alternatives: GitHub wiki (no playgrounds, weak search) and
      README‑only (no single ADR source of truth).
    </p>
    <h3 className={H3}>TypeDoc per package in CI</h3>
    <p className={PROSE}>
      Each <span className={CODE}>@melon-db/*</span> package exports TypeDoc‑generated reference
      linked from the docs site — not hand‑maintained duplicate signatures. When{' '}
      <BlogLink slug="melon-prd-before-code">PRDs and ADRs</BlogLink> change export shapes, CI
      fails if API docs drift. Alpha caveat: some Prisma‑layer gaps (e.g.{' '}
      <span className={CODE}>emitZod</span>) are documented as limitations, not hidden stubs.
    </p>
    <h3 className={H3}>Live playgrounds and reactive demos</h3>
    <p className={PROSE}>
      Browser playgrounds exercise query compilers and in‑memory adapter paths without RN device
      setup. RN‑specific paths (
      <BlogLink slug="melon-expo-go-vs-native">Expo Go vs dev build</BlogLink>) link out to
      playground-rn apps in the monorepo. Docs explain which adapter export to import — a common alpha
      support question if left implicit.
    </p>
    <h3 className={H3}>Benchmark artifacts as committed evidence</h3>
    <p className={PROSE}>
      <span className={CODE}>bun run bench:compare:docs</span> writes{' '}
      <span className={CODE}>apps/docs/src/data/bench-compare-latest.json</span> — Melon vs
      WatermelonDB numbers readers can inspect, not trust from a tweet. CI{' '}
      <span className={CODE}>bench-compare</span> acts as regression smoke. Blog posts should cite
      that JSON or rerun benches — not invent throughput claims. Performance narrative stays
      credible without over‑promising GA stability.
    </p>
  </>
)

const impact = (
  <>
    <p className={PROSE}>
      <strong>Pros:</strong> Single searchable source for ADRs, roadmap, migration parity matrix, and
      API reference. Benchmark artifacts anchor performance essays. Playgrounds shorten time‑to‑first‑
      query for evaluators. Docs double as the compliance surface for alpha gap disclosure.
    </p>
    <p className={PROSE}>
      <strong>Cons:</strong> Docs CI lengthens feedback loops. Phase landings require doc updates or
      drift accumulates. Fumadocs + TypeDoc + TanStack Start is more moving parts than a static
      site generator. No community forum replaces issue triage — docs do not answer every integration
      question.
    </p>
    <p className={PROSE}>
      <strong>Alpha honesty:</strong> Retention tab in devtools is stub only; sliding window PRD
      (prd-4) is forward‑looking docs content, not shipped capability. Web SQLite playground remains
      partial — in‑memory only for broad web adapter work.
    </p>
  </>
)

const lessons = (
  <>
    <p className={PROSE}>
      <strong>Lesson:</strong> For multi‑package infrastructure, docs are part of the product —
      especially at alpha when npm install is the first handshake. Invest in ADR pages and committed
      benchmark artifacts before launch posts.
    </p>
    <p className={PROSE}>
      If you adopt Melon alpha, read architecture/decisions and prd-compliance before hooks API
      tutorials — surface syntax is the easy part. When you publish your own library, pair{' '}
      <BlogLink slug="melon-open-source-release">release engineering</BlogLink> docs with user docs;
      tarball smoke failures often show up only in install guides, not unit tests.
    </p>
  </>
)

export const content: BlogPostContent = { overview, architecture, impact, lessons }
