import type { BlogPostContent } from '../types'
import { PROSE, H3, CODE } from '../types'
import { BlogLink } from '../components/BlogLink'

export const content: BlogPostContent = {
  overview: (
    <>
      <p className={PROSE}>
        Teams hear &quot;Prisma support&quot; and assume the full engine — query engine binary, remote
        datasource queries, Prisma Migrate at runtime on device. Melon does not ship any of that.
        ADR-008 is explicit: <code className={CODE}>@melon-db/db-prisma</code> is a schema and
        codegen layer that compiles Prisma-like args to <code className={CODE}>QueryAst</code>.
        Runtime is always <code className={CODE}>MelonDatabase</code> plus SQLite.
      </p>
      <p className={PROSE}>
        I made this call in Phases 7 and 9 after watching Prisma React Native Early Access and
        deciding that embedding the Prisma engine on device was the wrong coupling for an
        offline-first stack. Teams want schema-first typing and client ergonomics locally — not a
        remote ORM pretending the phone is a server.
      </p>
      <p className={PROSE}>
        Honest positioning saves trust, especially in alpha. This post is what &quot;Prisma
        support&quot; actually means in Melon — and what it deliberately does not mean. For how the
        Prisma surface fits alongside fluent and Mango compilers, see{' '}
        <BlogLink slug="melon-three-query-surfaces">three query surfaces</BlogLink>.
      </p>
    </>
  ),

  architecture: (
    <>
      <h3 className={H3}>ADR-008: compatibility is not identity</h3>
      <p className={PROSE}>
        The package imports <code className={CODE}>.prisma</code> files via{' '}
        <code className={CODE}>importPrismaSchema</code>, generates typed stubs, and routes{' '}
        <code className={CODE}>findMany</code> / <code className={CODE}>findFirst</code> /{' '}
        <code className={CODE}>count</code>-shaped calls through{' '}
        <code className={CODE}>compilePrismaQuery</code>. No Prisma query engine ships in the app
        bundle. No Prisma Client network stack runs on device.
      </p>
      <p className={PROSE}>
        I rejected embedding the Prisma engine for React Native constraints, bundle size, and
        coupling to Prisma&apos;s release cycle. Melon owns migrations (add-column and create-table
        in v1), write serialization, and reactive queries — not Prisma Migrate runtime.
      </p>

      <h3 className={H3}>createPrismaLikeClient in practice</h3>
      <p className={PROSE}>
        After codegen, you get a facade that feels familiar without pretending to be Prisma:
      </p>
      <pre className="font-mono text-xs bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-4 rounded overflow-x-auto leading-relaxed">
{`import { createPrismaLikeClient } from '@melon-db/db-prisma';
import { createDatabase } from '@melon-db/db';
import { createSqliteAdapter } from '@melon-db/db-sqlite/expo';

const db = createDatabase({ schema: melonSchema, adapter: createSqliteAdapter() });
const prisma = createPrismaLikeClient({ db, schema: importedPrismaSchema });

const openTasks = await prisma.task.findMany({
  where: { status: { equals: 'open' } },
  orderBy: { dueAt: 'asc' },
  take: 20,
});`}
      </pre>
      <p className={PROSE}>
        Under the hood that is <code className={CODE}>QueryAst</code> →{' '}
        <code className={CODE}>PreparedQuery</code> → SQLite — same path as fluent and Mango. Devtools
        show the same plan regardless of facade.
      </p>

      <h3 className={H3}>Codegen CLI</h3>
      <p className={PROSE}>
        Types and collection metadata generate at build time, not on device:
      </p>
      <pre className="font-mono text-xs bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-4 rounded overflow-x-auto leading-relaxed">
{`bun run melon-prisma generate --schema=./schema.prisma --out=./generated/melon`}
      </pre>
      <p className={PROSE}>
        Bun fits the monorepo toolchain. Alpha gap: <code className={CODE}>emitZod</code> and full
        Prisma schema feature parity are not shipped — check the docs parity matrix before assuming
        your schema constructs translate cleanly.
      </p>

      <h3 className={H3}>Documented limitations (v1 alpha)</h3>
      <p className={PROSE}>
        <strong>No remote queries.</strong> There is no datasource URL execution on device — all
        reads and writes hit local SQLite (or in-memory in tests).{' '}
        <strong>No Prisma Migrate runtime.</strong> Melon migrations are Melon migrations.{' '}
        <strong>Subset of Prisma filter operators</strong> — documented, not identical.{' '}
        <strong>Includes and relation filters</strong> follow Melon engine semantics (post-fetch
        includes, <code className={CODE}>relationFilters</code> for{' '}
        <code className={CODE}>Q.on</code>), not Prisma&apos;s full relation API.
      </p>
    </>
  ),

  impact: (
    <>
      <h3 className={H3}>Who this helps — and who it frustrates</h3>
      <p className={PROSE}>
        <strong>Pros:</strong> Schema-first teams reuse existing <code className={CODE}>.prisma</code>{' '}
        files for types and client shape without shipping the engine. Codegen stays in CI where it
        belongs. Positioning is defensible: local-first execution, not remote ORM cosplay.
      </p>
      <p className={PROSE}>
        <strong>Cons:</strong> Not full Prisma parity — adopters expecting drop-in Prisma Client will
        hit gaps quickly. Marketing that says &quot;Prisma for React Native&quot; without this
        disclaimer will create support debt I cannot afford in alpha. Melon migrations only cover
        add-column and create-table today.
      </p>
      <p className={PROSE}>
        <strong>Lesson for evaluators:</strong> If your app depends on Prisma Data Platform, server
        components, or Migrate-driven deployment pipelines as runtime behavior, Melon is the wrong
        tool. If you want Prisma-shaped local queries over SQLite with honest limits, read the parity
        matrix and try the playground.
      </p>
    </>
  ),

  lessons: (
    <>
      <p className={PROSE}>
        Lesson: name the thing you rejected alongside the thing you ship. &quot;Prisma
        support&quot; without &quot;without the engine&quot; is how trust erodes in the first
        support thread. I would rather lose a eval who needed full Prisma than win one who felt
        bait-and-switched at week three.
      </p>
      <p className={PROSE}>
        For teams already on Prisma schema in a monorepo: treat Melon as a local execution target
        and codegen input — not a Prisma Client replacement. Generate stubs, wire{' '}
        <code className={CODE}>createPrismaLikeClient</code>, and validate critical queries against
        shared AST fixtures. Alpha means the parity matrix is the contract, not marketing copy.
      </p>
    </>
  ),
}
