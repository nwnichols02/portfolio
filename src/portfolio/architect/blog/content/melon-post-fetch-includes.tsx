import type { BlogPostContent } from '../types'
import { PROSE, H3, CODE } from '../types'
import { BlogLink } from '../components/BlogLink'

const overview = (
  <>
    <p className={PROSE}>
      Teams expect relation loading — belongsTo parents on detail screens, hasMany children on
      lists, and Watermelon‑style <span className={CODE}>Q.on</span> filters that feel like joins.
      The tempting implementation is SQL <span className={CODE}>JOIN</span> shaped{' '}
      <span className={CODE}>SELECT</span>s in the adapter. Melon deliberately did not ship that in
      v1. <strong>ADR‑011</strong> commits to post‑fetch includes and{' '}
      <span className={CODE}>relationFilters</span> subqueries with{' '}
      <span className={CODE}>capabilities.joins: false</span>.
    </p>
    <p className={PROSE}>
      Phase 9 delivered belongsTo includes via <span className={CODE}>loadIncludes</span> — batch
      IN queries after the parent fetch. Phase 32 extended hasMany includes and{' '}
      <span className={CODE}>Q.on</span> via <span className={CODE}>relationFilters</span>. One
      engine path serves in‑memory and SQLite adapters; SQL stays predictable; tests stay
      tractable. The tradeoff is extra round‑trips and a global child limit, not wrong results
      hidden inside join row explosion.
    </p>
    <p className={PROSE}>
      SQL SELECT JOIN shaping is explicitly <strong>deferred</strong> (Phase 35+ in roadmap
      language). When you read Melon docs or benchmarks, includes are post‑fetch — not
      adapter‑level joins. I would rather admit that in alpha than imply ORM‑complete relation
      loading.
    </p>
  </>
)

const architecture = (
  <>
    <h3 className={H3}>ADR‑011: loadIncludes and batch IN queries</h3>
    <p className={PROSE}>
      After a parent query resolves, <span className={CODE}>loadIncludes</span> collects foreign
      keys and issues batched IN lookups per relation. Nested includes and per‑parent{' '}
      <span className={CODE}>take</span> are gap/deferred — v1 handles the common one‑level belongsTo
      and hasMany shapes documented in the migration guide. Adapters never emit join‑shaped SELECT
      plans for includes; the SQL compiler treats relations as follow‑up queries orchestrated by the
      engine.
    </p>
    <h3 className={H3}>relationFilters and Q.on without JOIN SELECT</h3>
    <p className={PROSE}>
      <span className={CODE}>Q.on</span> compiles to <span className={CODE}>relationFilters</span>{' '}
      — subqueries that constrain the parent collection by related row predicates. That gives
      Watermelon‑familiar filter syntax without JOIN result shaping in the adapter. v1 supports{' '}
      <strong>belongsTo only</strong>; experimental Watermelon join tables are unsupported. Some{' '}
      <span className={CODE}>Q.on</span> patterns still need manual rewrite — see{' '}
      <BlogLink slug="melon-codemods-migration">codemods parity matrix</BlogLink>.
    </p>
    <h3 className={H3}>capabilities.joins: false as an honest contract</h3>
    <p className={PROSE}>
      Adapter capabilities advertise <span className={CODE}>joins: false</span> so query planners
      and devtools do not assume join pushdown. Devtools show AST, SQL, and include plans as
      separate steps — which matches how observation invalidation reasons about parent and related
      collections in{' '}
      <BlogLink slug="melon-reactive-queries">ADR‑007</BlogLink>.
    </p>
    <h3 className={H3}>What deferred JOIN work would unlock — and cost</h3>
    <p className={PROSE}>
      Future SQL JOIN shaping could reduce round‑trips for deep graphs and simplify top‑N
      observation at join boundaries. It would also duplicate planning logic across adapters,
      complicate trigger‑based invalidation, and expand the test matrix. ADR‑011 rejected that
      cost for v1 alpha; post‑fetch was the ship‑now strategy.
    </p>
  </>
)

const impact = (
  <>
    <p className={PROSE}>
      <strong>Pros:</strong> One engine path for memory and SQLite. Predictable SQL in devtools.
      Easier parity testing across three query surfaces (
      <BlogLink slug="melon-three-query-surfaces">fluent, Mango, Prisma‑like</BlogLink>). Observation
      can index related collections without parsing join keys from wide rows.
    </p>
    <p className={PROSE}>
      <strong>Cons:</strong> Extra queries mean latency on relation‑heavy screens. Global child
      limits cap unbounded hasMany fan‑out. Top‑N observation with relationFilters still has edge
      cases documented in v1 limitations. Teams coming from SQL JOIN ORMs may perceive N+1 where
      they expected one query plan.
    </p>
    <p className={PROSE}>
      <strong>Not shipped:</strong> SQL JOIN includes, nested includes with per‑parent take, and
      join table parity. Do not benchmark Melon against JOIN‑shaped ORM queries until that work
      lands — compare post‑fetch semantics honestly.
    </p>
  </>
)

const lessons = (
  <>
    <p className={PROSE}>
      <strong>Lesson:</strong> ORM features have implementation strategies, not just API shapes.
      Before copying Prisma or Watermelon surface syntax, decide whether your adapter contract
      carries join plans or orchestrates follow‑up fetches — and advertise that in capabilities, not
      footnotes.
    </p>
    <p className={PROSE}>
      Profile relation‑heavy screens on device under alpha. If post‑fetch round‑trips hurt, narrow
      includes, paginate children, or wait for deferred JOIN work — do not assume{' '}
      <span className={CODE}>include:</span> implies a single SQL statement today. Pair with{' '}
      <BlogLink slug="melon-ast-first">AST‑first planning</BlogLink> so all three query surfaces
      compile includes the same way.
    </p>
  </>
)

export const content: BlogPostContent = { overview, architecture, impact, lessons }
