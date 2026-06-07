import type { BlogPostContent } from '../types'
import { PROSE, H3, CODE } from '../types'
import { BlogLink } from '../components/BlogLink'

const overview = (
  <>
    <p className={PROSE}>
      CRUD on SQLite is table stakes. What makes offline‑first feel magical — or brittle — is
      reactivity: UI that updates when the right rows change, without polling, without refetching
      entire screens, and without missing updates when a related table mutates. In Melon, that
      problem lives in <span className={CODE}>observeQuery</span> and the fallback{' '}
      <span className={CODE}>ChangeEmitter</span> path documented in{' '}
      <strong>ADR‑007</strong> — the most amended ADR in the project.
    </p>
    <p className={PROSE}>
      Phases 27–33 were almost entirely about observation precision: predicate‑aware invalidation
      after writes, trigger tables and JSI <span className={CODE}>sqlite3_update_hook</span>,
      field‑aware updates for <span className={CODE}>WHERE</span> and{' '}
      <span className={CODE}>relationFilters</span>, and related‑collection indexing for{' '}
      <span className={CODE}>Q.on</span> queries. React hooks{' '}
      <span className={CODE}>useQuery</span> and <span className={CODE}>useFindMany</span> in{' '}
      <span className={CODE}>@melon-db/db-react</span> sit on top of that adapter contract — they
      do not paper over adapter limits.
    </p>
    <p className={PROSE}>
      I shipped useful reactivity with documented edge cases rather than blocking reactive APIs until
      native triggers were perfect. That is the honest alpha posture: observeQuery is production‑
      shaped for common list and detail screens, but top‑N windows, turbo path constraints, and
      external deletes still deserve scrutiny in your app&apos;s query shapes.
    </p>
  </>
)

const architecture = (
  <>
    <h3 className={H3}>ADR‑007: ChangeEmitter fallback vs native observeQuery</h3>
    <p className={PROSE}>
      Early Melon (Phases 0–26) re‑ran queries on collection‑wide change events when an adapter
      lacked native observation. Phase 27 added SQLite <span className={CODE}>observeQuery</span>{' '}
      with predicate‑aware post‑write invalidation — skip notifications when a write cannot affect
      a subscription&apos;s filter. Phase 29 introduced trigger table{' '}
      <span className={CODE}>_melon_observation_events</span>,{' '}
      <span className={CODE}>flushObservationQueue</span>, and JSI{' '}
      <span className={CODE}>sqlite3_update_hook</span>. Phase 33 unified{' '}
      <span className={CODE}>shouldInvalidateSubscription</span> for WHERE, relationFilters, and
      field‑aware updates, plus related collection indexing for reactive{' '}
      <span className={CODE}>Q.on</span> queries.
    </p>
    <h3 className={H3}>Adapter contract and hook surface</h3>
    <p className={PROSE}>
      <span className={CODE}>@melon-db/db-sqlite</span> implements{' '}
      <span className={CODE}>observeQuery</span> on the hot path; in‑memory adapter still uses
      collection‑wide invalidation. <span className={CODE}>useQuery</span> subscribes to a prepared
      query and re‑executes on invalidation. <span className={CODE}>useFindMany</span> (Phase 9)
      composes the same observation semantics for collection‑scoped lists. Hooks unchanged across
      amendments — precision moved down into the adapter layer where it belongs.
    </p>
    <h3 className={H3}>Top‑N, turbo path, and external deletes</h3>
    <p className={PROSE}>
      <strong>Top‑N edge cases</strong> remain: ordered limits plus concurrent writes can produce
      subscription results that differ from a one‑shot query until the next invalidation cycle.
      The <strong>turbo path</strong> (C++ JSI) improves throughput but sync JSI calls block the JS
      thread until the native queue completes — observation batching behavior differs from the async
      TurboModule fallback. <strong>External deletes</strong> — rows removed outside Melon&apos;s
      write queue, including manual SQL or another connection — are handled conservatively: when
      in doubt, invalidate rather than miss an update.
    </p>
    <h3 className={H3}>Relation filters and Q.on (Phase 33 tie‑in)</h3>
    <p className={PROSE}>
      Reactive <span className={CODE}>Q.on</span> queries depend on{' '}
      <BlogLink slug="melon-post-fetch-includes">relationFilters</BlogLink> semantics from Phase
      32. Observation must know which related collections can affect a parent filter — Phase 33
      added indexing so related row changes trigger the right parent subscriptions. belongsTo only
      in v1; experimental Watermelon join tables are unsupported.
    </p>
  </>
)

const impact = (
  <>
    <p className={PROSE}>
      <strong>Pros:</strong> Predicate‑aware invalidation cuts wasted re‑queries on large tables.
      Trigger‑driven observation scales better than re‑running every subscription on every write.
      Field‑aware updates mean updating a non‑selected column does not necessarily bust unrelated
      list queries. React hooks stay stable as observation improves.
    </p>
    <p className={PROSE}>
      <strong>Cons:</strong> In‑memory adapter remains coarse. Top‑N plus orderBy is the sharpest
      documented edge. Turbo vs async paths mean test matrices must cover both Expo Go and dev
      build native modes. External delete detection is conservative by design — more invalidation,
      not less correctness.
    </p>
    <p className={PROSE}>
      <strong>Deferred:</strong> Perfect sliding‑window retention observation, read blocked during
      write, and background sync are not v1. Do not assume observation solves sync staleness — sync
      apply is synchronous and has no <span className={CODE}>merging</span> state today.
    </p>
  </>
)

const lessons = (
  <>
    <p className={PROSE}>
      <strong>Lesson:</strong> Treat reactive queries as a product line, not a checkbox. Budget
      phases for invalidation precision the same way you budget SQL compilation — and publish the
      edge cases in the same release notes as the features.
    </p>
    <p className={PROSE}>
      When evaluating Melon alpha, prototype your worst screens first: ordered top‑N lists,{' '}
      <span className={CODE}>Q.on</span> filters, and any code path that writes outside{' '}
      <span className={CODE}>db.write()</span>. Pair with{' '}
      <BlogLink slug="melon-native-is-a-product">native SQLite</BlogLink> if JSI throughput matters
      — and read{' '}
      <BlogLink slug="melon-post-fetch-includes">post‑fetch includes</BlogLink> before assuming
      join‑shaped APIs imply join‑shaped observation.
    </p>
  </>
)

export const content: BlogPostContent = { overview, architecture, impact, lessons }
