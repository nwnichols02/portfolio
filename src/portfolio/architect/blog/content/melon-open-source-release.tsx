import type { BlogPostContent } from '../types'
import { PROSE, H3, CODE } from '../types'
import { BlogLink } from '../components/BlogLink'

const overview = (
  <>
    <p className={PROSE}>
      Phase 34 was not &quot;flip the repo public.&quot; It was release engineering: twelve{' '}
      <span className={CODE}>@melon-db/*</span> packages publishing to npm with lockstep alpha
      versioning, export validation, tarball smoke tests, and CI gates that treat publishing as a
      feature with acceptance criteria. Monorepo green does not mean npm green — workspace{' '}
      <span className={CODE}>bun install</span> lies about publish correctness.
    </p>
    <p className={PROSE}>
      Pre‑publish gates run tests, typecheck, Biome check, package builds,{' '}
      <span className={CODE}>validate-exports.ts</span>, and{' '}
      <span className={CODE}>release:smoke</span> — which installs from packed tarballs, not
      workspace symlinks. <span className={CODE}>RELEASING.md</span> documents OIDC trusted
      publishing, npm tokens, and{' '}
      <span className={CODE}>.github/workflows/release.yml</span> with dry_run support. Source lives
      on{' '}
      <a
        href="https://github.com/nwnichols02/melon-db"
        className="text-gray-900 dark:text-gray-100 underline underline-offset-4 decoration-[0.5px] hover:text-black dark:hover:text-white"
      >
        github.com/nwnichols02/melon-db
      </a>{' '}
      (MIT).
    </p>
    <p className={PROSE}>
      Alpha dist‑tag means evaluators can install today — and maintainers can ship fixes — without
      pretending semver 1.x stability or a production SLA. Read that twice before betting customer
      traffic on it.
    </p>
  </>
)

const architecture = (
  <>
    <h3 className={H3}>Phase 34 deliverables</h3>
    <p className={PROSE}>
      Publishable tarballs for all twelve packages;{' '}
      <span className={CODE}>tooling/release/metadata.ts</span> for author, license, repository
      URL; <span className={CODE}>CHANGELOG.md</span> lockstep{' '}
      <span className={CODE}>0.1.0-alpha.0</span> style versioning; alpha policy documented beside
      gap tables from{' '}
      <BlogLink slug="melon-prd-before-code">PRD compliance</BlogLink>. Public GitHub and npm org
      steps may still have manual gaps — check the compliance table rather than assuming every
      checkbox is automated.
    </p>
    <h3 className={H3}>release:smoke — why tarballs matter</h3>
    <p className={PROSE}>
      Smoke script flow: build packages, sync package.json fields, pack, install into a temp project
      from tarball paths, import critical entrypoints. Catches missing files, wrong{' '}
      <span className={CODE}>exports</span> maps, and peer dependency footguns that pass in‑repo
      tests. This is the lesson I wish more monorepos learned before their first public publish
      incident.
    </p>
    <pre className="mt-3 overflow-x-auto rounded-lg bg-gray-100 dark:bg-gray-900 p-4 text-xs font-mono text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-800">
      {`npm install @melon-db/db@alpha @melon-db/db-sqlite@alpha @melon-db/db-react@alpha`}
    </pre>
    <h3 className={H3}>Pre-publish gate stack</h3>
    <p className={PROSE}>
      Typical maintainer sequence: <span className={CODE}>bun install</span>,{' '}
      <span className={CODE}>bun test</span>, <span className={CODE}>bun run typecheck</span>,{' '}
      <span className={CODE}>bun run check</span>,{' '}
      <span className={CODE}>bun run build:packages</span>, export validation,{' '}
      <span className={CODE}>bun run release:smoke</span>,{' '}
      <span className={CODE}>bun audit --audit-level=high</span>. Publish via{' '}
      <span className={CODE}>tooling/release/publish.ts --tag alpha</span> after smoke passes.
    </p>
    <h3 className={H3}>Alpha policy: what npm @alpha does not promise</h3>
    <p className={PROSE}>
      No production SLA. Breaking API changes possible between alpha releases. Documented v1
      limitations remain — post‑fetch includes, partial codemod parity, observeQuery edge cases,
      sync without background service. npm alpha is an evaluation channel aligned with{' '}
      <BlogLink slug="melon-docs-as-product">docs and benchmark artifacts</BlogLink>, not an
      enterprise support contract.
    </p>
  </>
)

const impact = (
  <>
    <p className={PROSE}>
      <strong>Pros:</strong> External installs match what maintainers smoke test. Export validation
      prevents silent broken subpath imports. CI release workflow reduces manual publish variance.
      Alpha tag sets expectations honestly versus fake 1.0.0 marketing.
    </p>
    <p className={PROSE}>
      <strong>Cons:</strong> Release engineering consumed a full phase — opportunity cost on features
      like SQL JOIN includes. Smoke tests add minutes to every release candidate. Twelve‑package
      lockstep versioning means any package bump ships the fleet — coordination overhead. Alpha
      adopters still inherit gap list risk documented elsewhere.
    </p>
    <p className={PROSE}>
      <strong>Who wins:</strong> Teams who want to spike Melon in a branch with real npm tarballs.{' '}
      <strong>Who pays:</strong> Production teams needing semver guarantees — wait for stable tag or
      pin tarballs with eyes open.
    </p>
  </>
)

const lessons = (
  <>
    <p className={PROSE}>
      <strong>Lesson:</strong> Treat first public publish as release engineering, not a checkbox after
      README polish. If you maintain a monorepo, add tarball install smoke before your first
      external user — not after their bug report.
    </p>
    <p className={PROSE}>
      Evaluate Melon by installing alpha packages in a throwaway app, running your heaviest query
      and sync paths, and reading gap docs — not by star count. Continue the series with{' '}
      <BlogLink slug="melon-codemods-migration">codemods</BlogLink> if you migrate from
      WatermelonDB, or{' '}
      <BlogLink slug="melon-series-intro">series intro</BlogLink> for the full lesson map. File
      issues on{' '}
      <a
        href="https://github.com/nwnichols02/melon-db/issues"
        className="text-gray-900 dark:text-gray-100 underline underline-offset-4 decoration-[0.5px] hover:text-black dark:hover:text-white"
      >
        GitHub
      </a>{' '}
      when smoke‑clean installs still fail your integration — that is valuable alpha signal.
    </p>
  </>
)

export const content: BlogPostContent = { overview, architecture, impact, lessons }
