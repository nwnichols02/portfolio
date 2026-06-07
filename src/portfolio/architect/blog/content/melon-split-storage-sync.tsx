import type { BlogPostContent } from '../types'
import { PROSE, H3, CODE } from '../types'
import { BlogLink } from '../components/BlogLink'

export const content: BlogPostContent = {
  overview: (
    <>
      <p className={PROSE}>
        Offline-first apps feel monolithic to users: write locally, see UI update, sync when
        online. Under the hood, Melon deliberately splits that experience into two products —{' '}
        <code className={CODE}>@melon-db/db</code> for storage and{' '}
        <code className={CODE}>@melon-db/sync</code> for pull/push orchestration. ADR-002 is
        architectural honesty, not npm pedantry.
      </p>
      <p className={PROSE}>
        I made this call during sync Phases 12–18, after I had a working local engine (Phases 0–7)
        and before I treated sync as inevitable for every consumer. Some teams want offline CRUD
        without a sync engine. Some want sync with a custom backend, not my reference HTTP server.
        Coupling those lifecycles into one package would have slowed both.
      </p>
      <p className={PROSE}>
        If you have not read why offline-first changes the problem shape in the first place, my{' '}
        <BlogLink slug="react-micro-loader">offline-first essay</BlogLink> covers the motivation.
        This post is about where Melon draws the boundary — and what each side owns.
      </p>
    </>
  ),

  architecture: (
    <>
      <h3 className={H3}>ADR-002: two packages, one user experience</h3>
      <p className={PROSE}>
        <code className={CODE}>@melon-db/db</code> owns the schema, write queue, outbox table (
        <code className={CODE}>_melon_sync_outbox</code>), and the primitives{' '}
        <code className={CODE}>getLocalChanges()</code> and{' '}
        <code className={CODE}>applyRemoteChanges()</code>.{' '}
        <code className={CODE}>@melon-db/sync</code> owns{' '}
        <code className={CODE}>synchronize()</code>, checkpoint stores, retry with backoff, network
        monitoring, and conflict policy dispatch. Sync depends only on db — never on query packages
        or React hooks.
      </p>
      <p className={PROSE}>
        The reference backend lives in <code className={CODE}>@melon-db/sync-server</code> — HTTP
        and Postgres stores for integration demos, not a managed Melon cloud. Alpha today means no
        production SLA on any of these packages; the split still holds for semver and tree-shaking
        reasons.
      </p>

      <h3 className={H3}>Phase history: storage first, sync second</h3>
      <p className={PROSE}>
        Foundation Phases 0–7 built the engine: schema, AST, in-memory adapter, SQLite compiler,
        downstream query and React packages. I did not block local CRUD on sync design. Sync Phases
        12–18 layered orchestration on top of engine primitives that already existed — outbox in
        Phase 12, HTTP server and <code className={CODE}>useSync</code> in 13, retry and conflict
        policies in 15–18, merge-by-field and custom resolvers in 17–18.
      </p>
      <p className={PROSE}>
        That sequencing matters for adopters: you can ship a local-only app on{' '}
        <code className={CODE}>@melon-db/db</code> and{' '}
        <code className={CODE}>@melon-db/db-sqlite</code> without installing sync. When you add
        sync, you add a package — and a failure mode — explicitly.
      </p>

      <h3 className={H3}>What lives where</h3>
      <p className={PROSE}>
        The outbox is engine + SQLite adapter territory because it is tied to write serialization
        and <code className={CODE}>pendingFields</code> for merge-by-field conflicts. The sync status
        machine (<code className={CODE}>idle</code> → <code className={CODE}>pulling</code> →{' '}
        <code className={CODE}>pushing</code> → <code className={CODE}>complete</code>, plus{' '}
        <code className={CODE}>retrying</code>, <code className={CODE}>paused</code>,{' '}
        <code className={CODE}>failed</code>) lives in sync. Apply is synchronous in v1 — no{' '}
        <code className={CODE}>merging</code> state, no background sync service. Those are deferred,
        not hidden.
      </p>
      <p className={PROSE}>
        Conflict policies shipped across Phases 15–18: server-wins (default), skip-existing,
        client-wins, last-write-wins, merge-by-field, and custom{' '}
        <code className={CODE}>conflictResolver</code> hooks. The engine applies remote changes;
        sync decides when and with what policy.
      </p>

      <h3 className={H3}>Trying it: demo commands</h3>
      <p className={PROSE}>
        The monorepo includes working demos — not slides:
      </p>
      <pre className="font-mono text-xs bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-4 rounded overflow-x-auto leading-relaxed">
{`bun run demo:sync:http
bun run demo:sync:postgres
bun run postgres:up
bun run sync-server:postgres`}
      </pre>
      <p className={PROSE}>
        These wire <code className={CODE}>synchronize()</code> against the reference server. Your
        production backend will differ; the split means you replace pull/push functions and checkpoint
        storage without forking the SQLite adapter.
      </p>
    </>
  ),

  impact: (
    <>
      <h3 className={H3}>Pros and cons of the split</h3>
      <p className={PROSE}>
        <strong>Pros:</strong> Local-only apps skip sync entirely — smaller bundle, fewer moving
        parts. Sync can evolve on its own release cadence without breaking query APIs. Tree-shaking
        actually means something when sync is optional. Teams with existing sync infrastructure can
        call <code className={CODE}>getLocalChanges()</code> /{' '}
        <code className={CODE}>applyRemoteChanges()</code> directly and ignore{' '}
        <code className={CODE}>synchronize()</code>.
      </p>
      <p className={PROSE}>
        <strong>Cons:</strong> Full offline-first apps install two core packages minimum, plus
        adapter and React bindings. Some sync-related types live on the engine for outbox access —
        the boundary is clean in dependency direction, not in conceptual purity.{' '}
        <code className={CODE}>@melon-db/db-react</code> optionally depends on sync for{' '}
        <code className={CODE}>useSync</code>, which is documented boundary drift.
      </p>
      <p className={PROSE}>
        <strong>Deferred:</strong> Background sync service, per-field three-way merge, Supabase/REST
        recipes, and a <code className={CODE}>merging</code> sync state are not v1. Do not infer
        them from the UX polish of the demos.
      </p>
    </>
  ),

  lessons: (
    <>
      <p className={PROSE}>
        Lesson: bounded contexts apply to npm packages too. Storage and sync have different
        consumers, failure modes, and release cadences — same reasoning as splitting billing from
        catalog in a microservices map. If your team already owns sync, treat{' '}
        <code className={CODE}>@melon-db/db</code> as the local engine and bring your orchestrator.
        If you do not, start local-only and add{' '}
        <code className={CODE}>@melon-db/sync</code> when conflict policies and checkpoints are
        designed — not when the first screen ships.
      </p>
      <p className={PROSE}>
        Alpha caveat: sync works for real demos and tests, but there is no managed backend and no
        production SLA. The package split is the stable part; your backend contract is yours to
        harden.
      </p>
    </>
  ),
}
