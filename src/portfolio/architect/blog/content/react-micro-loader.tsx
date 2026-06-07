import type { BlogPostContent } from '../types'
import { PROSE, H3 } from '../types'

export const content: BlogPostContent = {
  overview: (
    <>
      <p className={PROSE}>
        When you decide to go offline‑first, you&apos;re saying the local database is
        the source of truth for user experience, and the server is a peer you eventually
        reconcile with. That implies: every write must succeed locally, even when the
        network is gone; conflicts are not an edge case but a design constraint; and
        &quot;saving&quot; becomes a distributed systems problem, not just a POST
        request. Your architecture has to treat network as optional and sync as a
        background concern rather than a prerequisite.
      </p>
      <p className={PROSE}>
        <strong>WatermelonDB</strong> is built for this: a high‑performance,
        SQLite‑backed database optimized for React/React Native, with a schema‑first
        model and observable queries. It gives you normalized relational data on device
        with migrations, reactive queries that keep UI in sync with local state, and a
        well‑defined &quot;sync shape&quot;—pull changes from the server, push local
        changes up, and let your app handle the results. WatermelonDB covers the
        offline data store and reactivity; it doesn&apos;t pretend sync is easy, and
        that honesty is important.
      </p>
    </>
  ),
  architecture: (
    <>
      <h3 className={H3}>The real pain: sync engines</h3>
      <p className={PROSE}>
        Sync is where offline‑first projects get hard. You&apos;ll hit{' '}
        <strong>conflict resolution</strong> (last‑write‑wins is often wrong;
        domain‑aware merge becomes a mini rules engine), <strong>partial
        failures</strong> (push succeeds for some records not others; pulls truncated or
        out‑of‑order), <strong>versioning</strong> (cursor‑ or timestamp‑based change
        tracking on client and server, with migrations), and{' '}
        <strong>multi‑device semantics</strong> (same user, multiple devices, every race
        you didn&apos;t design for). All of this has to run in the background, under
        flaky connectivity, without corrupting the local DB or blocking the UI.
      </p>
      <h3 className={H3}>&quot;Batteries included&quot; sync: blessing and trap</h3>
      <p className={PROSE}>
        Hosted backends and turnkey sync engines are great for prototyping, avoiding
        the first 6–12 months of building diff/push/pull/retry machinery, and standard
        CRUD with simple record‑level conflicts. But they have hard limits: domain logic
        (as soon as business rules affect conflict resolution, generic abstractions
        leak), performance tuning (batch sizes, prioritization, backoff), and data
        shape evolution (schema changes, per‑tenant extensions). The key warning:{' '}
        <em>there will come a day when you have to write your own sync logic</em>. Treat
        them like scaffolding, not foundations.
      </p>
      <h3 className={H3}>Designing your own sync layer</h3>
      <p className={PROSE}>
        When you own sync, WatermelonDB can still be the workhorse; the sync engine is a
        thin layer around it and your backend. Center on: <strong>explicit change
        tracking</strong> (server: &quot;changes since cursor X&quot; per collection;
        client: queues of pending writes with metadata); <strong>deterministic conflict
        rules</strong> (per‑entity policies—e.g. sum counters, max timestamp, server
        wins for locked records—implemented at the server); <strong>idempotency and
        replay</strong> (writes repeatable and deduplicated; clients replay failed
        batches safely); and <strong>observability by design</strong> (log sync cycles,
        durations, failures, record counts; make single‑device sync history debuggable).
        Design with these early and migrating off a generic engine becomes a controlled
        evolution, not a full rewrite.
      </p>
    </>
  ),
  impact: (
    <>
      <h3 className={H3}>Practical guidance before you commit</h3>
      <p className={PROSE}>
        If you&apos;re starting a new offline‑first project with WatermelonDB (or
        similar): start with the simplest working sync that respects your domain, even
        if you lean on a managed service at first. Keep sync logic isolated from UI—treat
        sync as a pure‑ish pipeline around your DB with clear inputs/outputs so you can
        swap implementations. Document your conflict policies in plain language before
        you code them; if you can&apos;t explain them, you won&apos;t debug them. Budget
        time for sync from day one; don&apos;t treat it as a &quot;later&quot; feature.
      </p>
      <p className={PROSE}>
        Offline‑first is worth it for many products, but the cost isn&apos;t in
        WatermelonDB or local state—it&apos;s in owning synchronization as a
        first‑class part of your architecture.
      </p>
    </>
  ),
  lessons: <></>,
}
