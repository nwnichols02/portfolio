import type { BlogPostContent } from '../types'
import { PROSE, H3, CODE } from '../types'
import { BlogLink } from '../components/BlogLink'

export const content: BlogPostContent = {
  overview: (
    <>
      <p className={PROSE}>
        &quot;React Native support&quot; is not one path in Melon. ADR-005 splits Expo Go and dev
        builds into two products: <code className={CODE}>@melon-db/db-sqlite/expo</code> backed by{' '}
        <code className={CODE}>expo-sqlite</code> for demo-day compatibility, and{' '}
        <code className={CODE}>@melon-db/db-sqlite/rn</code> plus{' '}
        <code className={CODE}>@melon-db/db-sqlite-native</code> for TurboModule and C++ JSI when
        you ship a custom dev client.
      </p>
      <p className={PROSE}>
        Expo Go cannot load custom native modules. That is not a Melon limitation — it is the
        platform. Pretending one adapter covers both audiences produces either &quot;works in Expo
        Go but slow in production&quot; or &quot;native-only, no quick start&quot; — I refused both.
        Phase 8 landed the Expo path; Phases 20–26 landed native.
      </p>
      <p className={PROSE}>
        This post is the decision tree, the <code className={CODE}>mode: 'auto'</code> behavior, and
        what alpha adopters should test. For the native stack as a sustained product line — not a
        feature flag — see{' '}
        <BlogLink slug="melon-native-is-a-product">native SQLite is a product line</BlogLink>.
      </p>
    </>
  ),

  architecture: (
    <>
      <h3 className={H3}>ADR-005: dual path by environment</h3>
      <p className={PROSE}>
        <code className={CODE}>createSqliteAdapter({`{ mode: 'auto' }`})</code> picks the best
        binding available: Expo Go uses the async expo-sqlite bridge; dev builds prefer JSI when{' '}
        <code className={CODE}>global.melonSqliteJsi</code> is installed via{' '}
        <code className={CODE}>@melon-db/db-sqlite-native</code>, with TurboModule as async fallback.
        You can force a path with environment variables when debugging regressions.
      </p>

      <h3 className={H3}>Expo Go vs dev build</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
          <thead className="bg-gray-50 dark:bg-gray-900">
            <tr>
              <th className="text-left px-4 py-2 font-semibold text-black dark:text-white">Environment</th>
              <th className="text-left px-4 py-2 font-semibold text-black dark:text-white">Import</th>
              <th className="text-left px-4 py-2 font-semibold text-black dark:text-white">Native backing</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            <tr>
              <td className={`px-4 py-2 ${PROSE}`}>Expo Go</td>
              <td className="px-4 py-2 font-mono text-xs">@melon-db/db-sqlite/expo</td>
              <td className={`px-4 py-2 ${PROSE}`}>expo-sqlite (async bridge)</td>
            </tr>
            <tr>
              <td className={`px-4 py-2 ${PROSE}`}>Dev build</td>
              <td className="px-4 py-2 font-mono text-xs">@melon-db/db-sqlite/rn + db-sqlite-native</td>
              <td className={`px-4 py-2 ${PROSE}`}>TurboModule or C++ JSI</td>
            </tr>
            <tr>
              <td className={`px-4 py-2 ${PROSE}`}>Force Expo in dev client</td>
              <td className="px-4 py-2 font-mono text-xs">EXPO_PUBLIC_MELON_SQLITE=expo</td>
              <td className={`px-4 py-2 ${PROSE}`}>expo-sqlite</td>
            </tr>
            <tr>
              <td className={`px-4 py-2 ${PROSE}`}>Force Turbo only</td>
              <td className="px-4 py-2 font-mono text-xs">EXPO_PUBLIC_MELON_SQLITE=turbo</td>
              <td className={`px-4 py-2 ${PROSE}`}>TurboModule promises</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className={PROSE}>
        Double test matrix is the cost. Docs must say which path a benchmark or bug report used —
        comparing Expo Go latency to JSI throughput is apples to oranges.
      </p>

      <h3 className={H3}>Example apps and commands</h3>
      <p className={PROSE}>
        The monorepo ships two RN playgrounds on purpose:
      </p>
      <pre className="font-mono text-xs bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-4 rounded overflow-x-auto leading-relaxed">
{`# Expo Go — playground-rn
bun run dev:rn

# Dev client with native JSI — playground-rn-dev
bun run dev:rn:dev:start`}
      </pre>
      <p className={PROSE}>
        <code className={CODE}>playground-rn</code> is how I dogfood Melon on Expo Go day one.{' '}
        <code className={CODE}>playground-rn-dev</code> adds devtools and a{' '}
        <code className={CODE}>/benchmark</code> screen for on-device comparisons — not a substitute
        for CI bench artifacts, but essential for feeling regressions.
      </p>

      <h3 className={H3}>Rejected alternatives</h3>
      <p className={PROSE}>
        <strong>Expo-only:</strong> Great DX, no credible native perf story for production apps.{' '}
        <strong>Native-only:</strong> Kills quick eval and docs demos in Expo Go.{' '}
        <strong>Single adapter with runtime detection only:</strong> Hides import graph differences
        that break tree-shaking and confuse bundlers. Explicit entry points won.
      </p>
    </>
  ),

  impact: (
    <>
      <h3 className={H3}>Tradeoffs by audience</h3>
      <p className={PROSE}>
        <strong>Expo Go wins:</strong> Zero native build step for eval, workshops, and early UI
        work. Same API surface as dev builds at the TypeScript layer.{' '}
        <strong>Expo Go costs:</strong> Async bridge overhead; not where I tune observeQuery triggers
        or JSI batch paths.
      </p>
      <p className={PROSE}>
        <strong>Dev build wins:</strong> TurboModule and JSI paths, native DB worker queue, update
        hooks for reactive queries on SQLite. <strong>Dev build costs:</strong> EAS or local native
        toolchain, NDK/JNI maintenance, alpha gap — EAS Build CI for dev client is deferred.
      </p>
      <p className={PROSE}>
        Alpha adopters should plan a path: prototype in Expo Go, validate production on dev builds
        before performance claims. <code className={CODE}>mode: 'auto'</code> helps at runtime but
        does not remove the need to test both import graphs in CI.
      </p>
    </>
  ),

  lessons: (
    <>
      <p className={PROSE}>
        Lesson: when the platform draws a hard line (Expo Go vs custom native code), your architecture
        should name two products instead of one leaky abstraction. Document the decision tree in
        getting-started, not in a GitHub issue comment after someone benchmarks the wrong path.
      </p>
      <p className={PROSE}>
        If you are evaluating Melon today: run <code className={CODE}>bun run dev:rn</code> first,
        then <code className={CODE}>bun run dev:rn:dev:start</code> before judging SQLite
        performance. The API is shared; the physics are not.
      </p>
    </>
  ),
}
