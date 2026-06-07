import type { BlogPostContent } from '../types'
import { PROSE, H3, CODE } from '../types'
import { BlogLink } from '../components/BlogLink'

export const content: BlogPostContent = {
  overview: (
    <>
      <p className={PROSE}>
        Native SQLite in Melon is not a feature flag I flipped when expo-sqlite felt slow. ADR-006
        treats TurboModules, C++ JSI, NDK/JNI, and a dedicated native DB worker queue as Phases
        20–26 — a product line with its own milestones, regressions, and maintenance budget.
      </p>
      <p className={PROSE}>
        React Native New Architecture changed the calculus. Promise marshaling on hot read/write paths
        hurts; sync JSI calls into <code className={CODE}>global.melonSqliteJsi</code> avoid that
        overhead but introduce a documented v1 tradeoff: sync JSI methods block the JS thread until
        the native queue completes. There is no free lunch — only labeled tradeoffs.
      </p>
      <p className={PROSE}>
        I did not ship native work as a one-sprint spike. This post covers the layered stack, how
        benchmarks fit in, and what alpha means for production claims. For the Expo Go vs dev build
        split at the import level, start with{' '}
        <BlogLink slug="melon-expo-go-vs-native">Expo Go and dev builds</BlogLink>.
      </p>
    </>
  ),

  architecture: (
    <>
      <h3 className={H3}>ADR-006: TurboModule first, JSI second</h3>
      <p className={PROSE}>
        Phase 20–21 proved native viability on iOS and Android and split{' '}
        <code className={CODE}>playground-rn-dev</code> from Expo Go demos. Phases 22–23 shipped
        TurboModule codegen (<code className={CODE}>MelonSQLiteSpec</code>) on both platforms —
        async, shippable, fallback forever. Phases 25–26 added the C++ JSI host object and native DB
        thread queue for throughput-sensitive paths.
      </p>
      <p className={PROSE}>
        I rejected TurboModule-only forever (perf ceiling) and legacy bridge modules (New Architecture
        direction). Progressive delivery with <code className={CODE}>mode: 'auto'</code> lets apps
        pick JSI when present without breaking Expo Go evals.
      </p>

      <h3 className={H3}>Layered stack</h3>
      <pre className="font-mono text-xs bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-4 rounded overflow-x-auto leading-relaxed">
{`TypeScript (@melon-db/db-sqlite/rn)
    → binding selection (auto | turbo | jsi)
    → TurboModule (async promises)     OR     global.melonSqliteJsi (sync JSI)
    → native DB worker queue
    → SQLite (platform NDK/JNI / iOS)
    → optional sqlite3_update_hook (observeQuery, Phase 29)`}
      </pre>
      <p className={PROSE}>
        Package <code className={CODE}>@melon-db/db-sqlite-native</code> owns the native module
        install and JSI registration. TypeScript adapters stay in{' '}
        <code className={CODE}>@melon-db/db-sqlite</code> — same AST→SQL compiler, different
        transport.
      </p>

      <h3 className={H3}>Sync JSI and the JS thread</h3>
      <p className={PROSE}>
        Sync JSI is a deliberate performance choice with a documented cost: calls block the JS thread
        until the native DB queue finishes. That keeps hot paths free of promise allocation churn but
        means long-running queries or large batches can frame-drop UI if you run them on the critical
        path without scheduling discipline.
      </p>
      <p className={PROSE}>
        Alpha limitations on the JSI path also include no BLOB round-trip on some native paths per
        current docs — check native package README before assuming parity with the expo-sqlite
        adapter for every column type.
      </p>

      <h3 className={H3}>Benchmarks without invented numbers</h3>
      <p className={PROSE}>
        Performance credibility requires artifacts, not adjectives. The monorepo runs comparative
        benches against WatermelonDB on better-sqlite3 parity and commits results for the docs site:
      </p>
      <pre className="font-mono text-xs bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-4 rounded overflow-x-auto leading-relaxed">
{`bun run bench:compare
bun run bench:compare:docs   # commit artifact to apps/docs`}
      </pre>
      <p className={PROSE}>
        CI includes a <code className={CODE}>bench-compare</code> smoke gate. On-device,{' '}
        <code className={CODE}>playground-rn-dev</code> exposes a benchmark screen (Phase 28) —
        useful for feeling regressions, not for publishing numbers I have not run. Read{' '}
        <code className={CODE}>apps/docs/src/data/bench-compare-latest.json</code> or run benches
        yourself before repeating any throughput claim. I will not quote figures here that I have not
        sourced from committed artifacts.
      </p>
    </>
  ),

  impact: (
    <>
      <h3 className={H3}>Native as product line — pros and cons</h3>
      <p className={PROSE}>
        <strong>Pros:</strong> Credible path to WatermelonDB-class throughput on device. Unified
        query engine regardless of binding. TurboModule fallback when JSI is unavailable. Reactive
        SQLite observation can use <code className={CODE}>sqlite3_update_hook</code> on supported
        paths (Phase 29).
      </p>
      <p className={PROSE}>
        <strong>Cons:</strong> Heavy ongoing maintenance — Xcode, Gradle, NDK, RN codegen upgrades
        every release cycle. Sync JSI blocks JS thread (v1 tradeoff). Some turbo native paths lack
        update hooks in v1. Alpha: no EAS Build CI for dev client yet — native validation is on you.
      </p>
      <p className={PROSE}>
        <strong>Who should invest:</strong> Teams shipping dev builds who have hit expo-sqlite
        ceilings or need observeQuery precision on SQLite. <strong>Who should wait:</strong> Teams
        still in Expo Go-only prototypes — native work pays off after product-market fit, not before.
      </p>
    </>
  ),

  lessons: (
    <>
      <p className={PROSE}>
        Lesson: budget native work like a product line, not a performance ticket. Phases 20–26 span
        spikes, codegen, JSI, benches, and playground splits — that is quarters, not sprints. If
        your organization cannot own NDK/JNI regressions across RN upgrades, stay on{' '}
        <code className={CODE}>@melon-db/db-sqlite/expo</code> until you can.
      </p>
      <p className={PROSE}>
        When you do invest, run <code className={CODE}>bench:compare</code>, read the committed JSON,
        and reproduce on <code className={CODE}>playground-rn-dev</code> with the same{' '}
        <code className={CODE}>mode</code> you ship. Performance claims without artifacts are
        marketing; Melon is alpha enough without me adding invented numbers to a blog post.
      </p>
    </>
  ),
}
