import type { BlogPostContent } from '../types'
import { PROSE, H3, CODE } from '../types'
import { BlogLink } from '../components/BlogLink'

const overview = (
  <>
    <p className={PROSE}>
      Building a WatermelonDB successor without a migration path is a hobby project. Teams have{' '}
      <span className={CODE}>Q.where</span> chains, <span className={CODE}>db.write</span>{' '}
      boundaries, React hooks, and model classes — not greenfield AST fluency.{' '}
      <span className={CODE}>@melon-db/db-codemods</span> (Phases 11 and 19) ships CLI transforms
      plus a runtime translator from serializable Watermelon <span className={CODE}>Q</span> clauses
      to <span className={CODE}>QueryAst</span> — the same internal representation{' '}
      <BlogLink slug="melon-ast-first">ADR‑001</BlogLink> mandates for every query surface.
    </p>
    <p className={PROSE}>
      Codemods are empathy for your past self — and for users you ask to switch databases. They
      automate the mechanical renames and import paths; they do not pretend parity is 100%. The
      migration guide publishes an honest matrix: what translates cleanly, what needs manual rewrite
      (especially some <span className={CODE}>Q.on</span> join patterns), and what remains deferred
      (full multi‑file schema codemods beyond a single‑model spike).
    </p>
    <p className={PROSE}>
      Alpha means run codemods on a branch, read the diff, and test observation — not blindly merge
      and ship. Melon is a successor in intent, not a drop‑in clone.
    </p>
  </>
)

const architecture = (
  <>
    <h3 className={H3}>CLI commands in @melon-db/db-codemods</h3>
    <p className={PROSE}>
      Four entrypoints cover the common migration surfaces:
    </p>
    <pre className="mt-3 overflow-x-auto rounded-lg bg-gray-100 dark:bg-gray-900 p-4 text-xs font-mono text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-800">
      {`bun run melon-codemod migrate-queries --path=./src
bun run melon-codemod migrate-writes --path=./src
bun run melon-codemod migrate-react --path=./src
bun run melon-codemod migrate-schema --path=./src/models/Task.ts`}
    </pre>
    <p className={PROSE}>
      <span className={CODE}>migrate-queries</span> rewrites Watermelon query call sites toward Melon
      fluent / collection APIs. <span className={CODE}>migrate-writes</span> targets{' '}
      <span className={CODE}>db.write</span> and batch patterns.{' '}
      <span className={CODE}>migrate-react</span> maps hook imports toward{' '}
      <span className={CODE}>@melon-db/db-react</span> (
      <BlogLink slug="melon-reactive-queries">useQuery, useFindMany</BlogLink>, etc.).{' '}
      <span className={CODE}>migrate-schema</span> is a single‑file model spike — not full
      multi‑file schema migration yet.
    </p>
    <h3 className={H3}>Q → QueryAst runtime translator</h3>
    <p className={PROSE}>
      Beyond AST‑aware codemods, a runtime translator accepts serializable Watermelon{' '}
      <span className={CODE}>Q</span> clauses and emits <span className={CODE}>QueryAst</span> for
      incremental strangler migrations — run legacy shapes through Melon execution without rewriting
      every callsite on day one. Nested <span className={CODE}>Q.and</span> /{' '}
      <span className={CODE}>Q.or</span> landed in Phase 19; parity still trails full Watermelon
      operator surface — check Mango subset docs for overlapping limits.
    </p>
    <h3 className={H3}>Q.on manual rewrite cases</h3>
    <p className={PROSE}>
      <span className={CODE}>Q.on</span> compiles to{' '}
      <BlogLink slug="melon-post-fetch-includes">relationFilters</BlogLink> — belongsTo only in v1.
      Experimental Watermelon join tables are unsupported. Some join recipes in codemod output still
      need hand‑editing; the parity matrix calls these out explicitly. Do not assume codemod green
      equals observation‑correct <span className={CODE}>Q.on</span> — validate reactive behavior
      separately.
    </p>
    <h3 className={H3}>Cross‑link to AST‑first spine</h3>
    <p className={PROSE}>
      Codemods succeed because Melon has one query IR. Without{' '}
      <BlogLink slug="melon-ast-first">AST‑first design</BlogLink>, migration would require
      per‑adapter string rewriting — unmaintainable across SQLite, in‑memory, and future backends.
      Translators and compilers share test vectors in{' '}
      <span className={CODE}>packages/melon-db/__fixtures__/</span> so codemod output matches fluent
      and Mango paths.
    </p>
  </>
)

const impact = (
  <>
    <p className={PROSE}>
      <strong>Pros:</strong> Lowers cost of evaluation for WatermelonDB teams. Mechanical migrations
      finish in hours instead of weeks for query‑heavy codebases. Runtime translator enables phased
      rollouts. Parity matrix sets honest expectations before production bets.
    </p>
    <p className={PROSE}>
      <strong>Cons:</strong> Manual rewrite tax on complex <span className={CODE}>Q.on</span> and
      join tables. Schema codemod scope is spike‑level — large model graphs need hand porting.
      Codemods cannot migrate custom sync server logic or non‑Watermelon persistence. Alpha API
      drift may require re‑running transforms after upgrades.
    </p>
    <p className={PROSE}>
      <strong>Deferred:</strong> Full multi‑file schema codemods, automatic sync endpoint rewrites,
      and 100% Watermelon API clone — all explicitly out of v1 alpha scope.
    </p>
  </>
)

const lessons = (
  <>
    <p className={PROSE}>
      <strong>Lesson:</strong> If you ask users to switch infrastructure, ship migration tooling in
      the same release train as the core — and document what codemods will never fix (sync backends,
      join tables, alpha gaps).
    </p>
    <p className={PROSE}>
      Migration workflow: run all four CLI passes on a branch, diff against parity matrix, then
      stress‑test{' '}
      <BlogLink slug="melon-reactive-queries">observeQuery</BlogLink> screens and{' '}
      <BlogLink slug="melon-split-storage-sync">sync</BlogLink> if applicable. Read{' '}
      <BlogLink slug="melon-ast-first">AST‑first</BlogLink> to understand why translated queries
      behave differently than Watermelon adapter internals — compatibility is execution on Melon, not
      identity with WatermelonDB.
    </p>
  </>
)

export const content: BlogPostContent = { overview, architecture, impact, lessons }
