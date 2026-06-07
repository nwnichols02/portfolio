import type { BlogPostContent } from '../types'
import { PROSE, H3, CODE } from '../types'
import { BlogLink } from '../components/BlogLink'

export const content: BlogPostContent = {
  overview: (
    <>
      <p className={PROSE}>
        The first architectural decision I locked in for Melon — before I had a working SQLite adapter,
        before sync, before React hooks — was ADR-001: every query surface compiles to one{' '}
        <code className={CODE}>QueryAst</code> before storage ever runs. That sounds like an
        abstraction tax. It is. But it is also the spine of the whole stack.
      </p>
      <p className={PROSE}>
        WatermelonDB, Mango JSON, Prisma-style args, and a fluent TypeScript builder all want
        different syntax. Adapters should not care. If{' '}
        <code className={CODE}>@melon-db/db-sqlite</code> had to understand four dialects, I would
        have four SQL generators drifting apart within a month. Instead, compilers live in query
        packages; the adapter receives a <code className={CODE}>PreparedQuery</code> and nothing
        else (ADR-004).
      </p>
      <p className={PROSE}>
        This post is about that pipeline — why I rejected per-surface adapter encoding, what the AST
        actually looks like, and how it connects to the broader Melon series. If you want the
        motivation for offline-first in the first place, start with the{' '}
        <BlogLink slug="melon-series-intro">series intro</BlogLink> or my earlier{' '}
        <BlogLink slug="react-micro-loader">offline-first essay</BlogLink>.
      </p>
    </>
  ),

  architecture: (
    <>
      <h3 className={H3}>ADR-001: one internal representation</h3>
      <p className={PROSE}>
        The decision is simple to state and hard to keep honest: all authoring surfaces compile to{' '}
        <code className={CODE}>QueryAst</code> plus a <code className={CODE}>PreparedQuery</code>{' '}
        wrapper before execution. Adapters call <code className={CODE}>find()</code> and{' '}
        <code className={CODE}>count()</code> with prepared queries only. Writes use{' '}
        <code className={CODE}>AdapterWriteOperation</code> structs — never raw user syntax.
      </p>
      <p className={PROSE}>
        I rejected per-surface adapter encoding early. That approach looks faster on day one: let
        the SQLite layer accept Mango JSON directly, add a Prisma code path, wire fluent builders
        inline. Within weeks you have duplicated WHERE logic, incompatible edge cases, and devtools
        that cannot show a unified plan. One AST means one SQL generator in{' '}
        <code className={CODE}>@melon-db/db-sqlite</code>, one validation path against{' '}
        <code className={CODE}>MelonSchema</code>, and one set of test vectors in{' '}
        <code className={CODE}>packages/melon-db/__fixtures__/</code>.
      </p>

      <h3 className={H3}>The query pipeline</h3>
      <p className={PROSE}>
        Every read follows the same stages regardless of how the developer authored it:
      </p>
      <pre className="font-mono text-xs bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-4 rounded overflow-x-auto leading-relaxed">
{`Authoring surface (fluent | Mango JSON | Prisma args)
    → QueryCompiler.compile()
    → QueryAst
    → validate against MelonSchema
    → QueryPlan (index hints, postFilter, stableSort)
    → PreparedQuery { ast, plan, source: 'melon'|'mango'|'prisma'|'compat' }
    → StorageAdapter.find() | count()
    → SQL (sqlite) or in-memory evaluation
    → MelonQueryHandle.observe() → React hooks`}
      </pre>
      <p className={PROSE}>
        The <code className={CODE}>source</code> field on{' '}
        <code className={CODE}>PreparedQuery</code> is for devtools and debugging, not for adapter
        branching. That was a deliberate discipline choice: if an adapter starts switching on{' '}
        <code className={CODE}>source</code>, the boundary is already broken.
      </p>

      <h3 className={H3}>QueryAst shape</h3>
      <p className={PROSE}>
        The AST is intentionally boring. It covers relational filtering, sorting, pagination, and
        includes — not arbitrary SQL. Advanced SQL belongs in AST extensions with schema validation,
        not adapter shortcuts:
      </p>
      <pre className="font-mono text-xs bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-4 rounded overflow-x-auto leading-relaxed">
{`type QueryOperator =
  | 'eq' | 'neq' | 'gt' | 'gte' | 'lt' | 'lte'
  | 'in' | 'notIn' | 'like' | 'contains' | 'isNull';

type QueryAst = {
  collection: string;
  where?: QueryBooleanNode;      // and | or | not | predicate
  orderBy?: QuerySort[];
  skip?: number;
  limit?: number;
  relationFilters?: RelationFilterNode[];  // Q.on parity
  select?: QuerySelect;          // includes
  mode: 'many' | 'one' | 'count';
};`}
      </pre>
      <p className={PROSE}>
        Phases 32–33 extended <code className={CODE}>relationFilters</code> for{' '}
        <code className={CODE}>Q.on</code>-style queries and tightened reactive invalidation around
        those fields. The AST did not fork — the compilers and SQL layer grew.
      </p>

      <h3 className={H3}>ADR-004: PreparedQuery at the adapter boundary</h3>
      <p className={PROSE}>
        Adapters never receive a raw AST. Planning hints — index selection, post-filters, stable
        sort keys — live on <code className={CODE}>PreparedQuery</code>, not on the AST node tree.
        That keeps compilers pure and side-effect free until execution, which matters when you run
        the same query through in-memory adapters in tests and SQLite in production.
      </p>
      <p className={PROSE}>
        The tradeoff is real: you lose adapter-level ergonomics. You cannot drop a custom SQL
        fragment into the SQLite adapter and call it a feature. Every new query capability requires
        an AST extension, compiler updates across surfaces, and SQL generation changes. That is the
        cost of one engine. See{' '}
        <BlogLink slug="melon-three-query-surfaces">three query surfaces</BlogLink> for how those
        compilers stay aligned in practice.
      </p>
    </>
  ),

  impact: (
    <>
      <h3 className={H3}>What the AST-first model buys you</h3>
      <p className={PROSE}>
        <strong>Pros:</strong> One SQL generator in <code className={CODE}>@melon-db/db-sqlite</code>.
        Devtools show AST, plan, SQL, and params regardless of input syntax. New query surfaces
        (Mango, Prisma, Watermelon-compat) never touch adapters. Shared test fixtures mean a
        compiler regression fails CI before it reaches a device. Reactive invalidation in Phases
        27–33 could reason about predicates uniformly because every path normalized to the same
        tree.
      </p>
      <p className={PROSE}>
        <strong>Cons:</strong> Ergonomics flatten at the adapter boundary — no escape hatch SQL.
        Feature parity across three compilers is ongoing documentation and maintenance tax. Include
        and join semantics resolve in the engine with v1 limits (post-fetch includes, no JOIN-shaped
        SELECTs). Alpha adopters should expect AST gaps before adapter gaps: if a feature is not
        expressible in <code className={CODE}>QueryAst</code>, it is not shippable yet.
      </p>
      <p className={PROSE}>
        <strong>Who wins:</strong> Teams building on <code className={CODE}>@melon-db/db</code> plus{' '}
        <code className={CODE}>@melon-db/db-sqlite</code> who want multiple query dialects without
        multiple storage implementations. <strong>Who pays:</strong> Anyone expecting ORM-level SQL
        escape hatches or adapter-specific optimizations without upstream AST work.
      </p>
    </>
  ),

  lessons: (
    <>
      <p className={PROSE}>
        Lesson: pick your internal representation before you pick your public API. I wrote PRDs for
        query packages after the AST types existed, not before — and that order saved me from
        painting myself into per-surface adapter corners. If you are evaluating Melon in alpha, ask
        whether your team needs a new surface or an AST extension. The answer tells you whether
        you are a consumer or a contributor.
      </p>
      <p className={PROSE}>
        The AST is not elegant because it is clever. It is elegant because adapters stay dumb,
        compilers stay pure, and every bug has one place to die. That is worth the abstraction tax
        for a multi-surface offline-first stack — and it is non-negotiable if you ever want
        devtools, codemods, and reactive queries to share one truth.
      </p>
    </>
  ),
}
