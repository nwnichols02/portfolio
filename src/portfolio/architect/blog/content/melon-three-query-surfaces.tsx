import type { BlogPostContent } from '../types'
import { PROSE, H3, CODE } from '../types'
import { BlogLink } from '../components/BlogLink'

export const content: BlogPostContent = {
  overview: (
    <>
      <p className={PROSE}>
        I ship three query packages — fluent TypeScript, Mango JSON, and Prisma-style args — that
        all compile to the same <code className={CODE}>QueryAst</code>. ADR-003 and ADR-010 together
        say: teams do not arrive with the same query background, and pretending otherwise is how
        migration projects die.
      </p>
      <p className={PROSE}>
        The fantasy is one syntax. The reality is one engine. Maintaining three compilers is real
        work — documentation tax, feature parity, test vectors — but it is cheaper than maintaining
        three SQL generators or telling WatermelonDB refugees and Prisma-leaning teams to rewrite
        everything on day one.
      </p>
      <p className={PROSE}>
        This post maps the three surfaces, the <code className={CODE}>collection.query(builder)</code>{' '}
        DX from Phase 30, and how codegen fits in. For the AST pipeline underneath, see{' '}
        <BlogLink slug="melon-ast-first">one Query AST to rule them all</BlogLink>.
      </p>
    </>
  ),

  architecture: (
    <>
      <h3 className={H3}>Three packages, zero cross-dependencies</h3>
      <p className={PROSE}>
        Query packages depend only on <code className={CODE}>@melon-db/db</code>. They do not depend
        on each other:
      </p>
      <div className="overflow-x-auto">
        <table className="w-full text-sm border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
          <thead className="bg-gray-50 dark:bg-gray-900">
            <tr>
              <th className="text-left px-4 py-2 font-semibold text-black dark:text-white">Package</th>
              <th className="text-left px-4 py-2 font-semibold text-black dark:text-white">Surface</th>
              <th className="text-left px-4 py-2 font-semibold text-black dark:text-white">Key exports</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            <tr>
              <td className="px-4 py-2 font-mono text-xs text-gray-900 dark:text-gray-100">@melon-db/db-query</td>
              <td className={`px-4 py-2 ${PROSE}`}>Fluent TypeScript builder</td>
              <td className={`px-4 py-2 ${PROSE}`}>
                <code className={CODE}>QueryBuilder</code>,{' '}
                <code className={CODE}>createQueryFactory</code>,{' '}
                <code className={CODE}>resolveCollectionQuery</code>
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2 font-mono text-xs text-gray-900 dark:text-gray-100">@melon-db/db-query-mango</td>
              <td className={`px-4 py-2 ${PROSE}`}>RxDB/CouchDB-style JSON</td>
              <td className={`px-4 py-2 ${PROSE}`}>
                <code className={CODE}>createMangoCompiler</code>,{' '}
                <code className={CODE}>MangoQuery</code>,{' '}
                <code className={CODE}>normalizeMangoQuery</code>
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2 font-mono text-xs text-gray-900 dark:text-gray-100">@melon-db/db-prisma</td>
              <td className={`px-4 py-2 ${PROSE}`}>Prisma-like args from schema</td>
              <td className={`px-4 py-2 ${PROSE}`}>
                <code className={CODE}>importPrismaSchema</code>,{' '}
                <code className={CODE}>createPrismaLikeClient</code>,{' '}
                <code className={CODE}>compilePrismaQuery</code>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className={PROSE}>
        Each compiler is side-effect free until execution. Shared fixtures in the monorepo assert
        identical AST output for equivalent queries across surfaces where parity is claimed.
      </p>

      <h3 className={H3}>ADR-010: collection.query(builder) on the core</h3>
      <p className={PROSE}>
        Phase 30 added a runtime dependency from <code className={CODE}>@melon-db/db</code> to{' '}
        <code className={CODE}>@melon-db/db-query</code> — a purity compromise I documented in
        ADR-010. Watermelon-style{' '}
        <code className={CODE}>collection.query((Q) =&gt; Q.where(...))</code>{' '}
        needs the builder at runtime without optional peer dependency footguns.
      </p>
      <pre className="font-mono text-xs bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-4 rounded overflow-x-auto leading-relaxed">
{`const tasks = await db.collection('tasks').query((q) =>
  q.where('status', 'eq', 'open').orderBy('dueAt', 'asc').limit(20)
);`}
      </pre>
      <p className={PROSE}>
        <code className={CODE}>resolveCollectionQueryInput</code> delegates to the builder compiler.
        You cannot tree-shake <code className={CODE}>@melon-db/db-query</code> if you use this API —
        that is the tradeoff I accepted for DX on the common path.
      </p>

      <h3 className={H3}>Mango: serializable queries</h3>
      <p className={PROSE}>
        Mango JSON matters when queries cross process boundaries — sync filters, server-side
        validation, persisted search specs. The compiler normalizes operator subsets documented in
        alpha; not every CouchDB Mango operator ships in v1. React hooks expose it via{' '}
        <code className={CODE}>useMangoQuery</code> in <code className={CODE}>@melon-db/db-react</code>.
      </p>

      <h3 className={H3}>Prisma surface and CLI</h3>
      <p className={PROSE}>
        The Prisma package imports <code className={CODE}>.prisma</code> schema files and generates
        typed client stubs — runtime is always <code className={CODE}>MelonDatabase</code>, not the
        Prisma engine. Codegen runs through the monorepo CLI:
      </p>
      <pre className="font-mono text-xs bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-4 rounded overflow-x-auto leading-relaxed">
{`bun run melon-prisma generate --schema=./schema.prisma --out=./generated/melon`}
      </pre>
      <p className={PROSE}>
        Compatibility is not identity — see{' '}
        <BlogLink slug="melon-prisma-not-engine">Prisma without the engine</BlogLink> for what that
        means in alpha.
      </p>
    </>
  ),

  impact: (
    <>
      <h3 className={H3}>Realistic multi-surface tradeoffs</h3>
      <p className={PROSE}>
        <strong>Pros:</strong> Teams keep familiar syntax. Mango queries serialize. Prisma schema
        reuse lowers adoption friction for schema-first teams. One AST and one SQL generator absorb
        complexity that would otherwise live in adapters.
      </p>
      <p className={PROSE}>
        <strong>Cons:</strong> Feature parity maintenance across three compilers. Larger conceptual
        surface for docs and support. ADR-010 means core is not 100% query-package-free. Alpha Mango
        and Prisma subsets require reading the parity matrix, not assuming drop-in replacement.
      </p>
      <p className={PROSE}>
        <strong>Rejected alternative:</strong> Single fluent API only — faster for me to maintain,
        hostile to WatermelonDB migration and Prisma-adjacent teams. I chose realistic over pure.
      </p>
    </>
  ),

  lessons: (
    <>
      <p className={PROSE}>
        Lesson: one syntax is a maintainer fantasy, one engine is an architect constraint. If you are
        picking a surface for a greenfield app, start with{' '}
        <code className={CODE}>collection.query(builder)</code> — it is the best-typed and the most
        integrated with reactive hooks. If you are migrating from WatermelonDB, run codemods first,
        then decide whether Mango or fluent fits your persisted-query needs.
      </p>
      <p className={PROSE}>
        Three compilers is not over-engineering when your adopters are not over-homogeneous. Budget
        for parity tests the same way you budget for API docs — or the surfaces will drift silently
        until someone&apos;s production query compiles to a different AST than devtools showed in
        staging.
      </p>
    </>
  ),
}
