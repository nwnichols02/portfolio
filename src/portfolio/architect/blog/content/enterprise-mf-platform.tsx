import type { BlogPostContent } from '../types'
import { PROSE, H3, CODE } from '../types'

export const content: BlogPostContent = {
  overview: (
    <>
      <p className={PROSE}>
        Enterprise frontends are finally catching up to the way we already think about
        backends: independently deployable, isolated modules that can evolve without a
        &quot;big bang&quot; rewrite. Module Federation plus Vite gives you that power
        with production‑grade DX and runtime performance.
      </p>
      <p className={PROSE}>
        Module Federation lets separate builds expose and consume code from each other
        at runtime, without a monolithic bundle or iframes. With Vite, you get that on
        top of lightning‑fast dev and modern tooling. At an enterprise level, this
        unlocks: <strong>independent deployability</strong> (each MFE ships on its own
        cadence while the shell pulls the latest remoteEntry at runtime),{' '}
        <strong>runtime code sharing</strong> (React, design systems, utilities shared
        instead of duplicated), and <strong>technology evolution</strong> (teams can
        migrate piece‑by‑piece while keeping a single integrated UI). Think of the shell
        as a &quot;router of capabilities,&quot; not a giant app; MFEs are independently
        versioned feature slices that plug into that router.
      </p>
    </>
  ),
  architecture: (
    <>
      <h3 className={H3}>Zero‑coupling principles</h3>
      <p className={PROSE}>
        Most MF implementations stop at &quot;separate repos and independent
        deploys.&quot; Zero‑coupling goes further: MFEs don&apos;t know each other
        exist. They integrate only through a stable contract with the platform shell.
        Core rules: <strong>no cross‑MFE imports</strong> (one MFE never imports
        another&apos;s functions, types, or hooks); <strong>no shared runtime state
        between MFEs</strong> (no global Redux, no shared React context—communicate via
        navigation, URL, and shell‑managed events); <strong>only shared libraries are
        federated</strong> (React, react‑dom, design system, low‑level utilities); and
        the <strong>shell owns cross‑cutting concerns</strong> (auth, routing, layout,
        logging/telemetry, configuration). In practice, an MFE is a pure function from
        &quot;platform‑provided props + URL&quot; to UI.
      </p>
      <h3 className={H3}>Platform topology: shell and MFEs</h3>
      <p className={PROSE}>
        At a minimum you have: a <strong>shell (host)</strong>—Vite app for layout,
        routing, auth bootstrap, and feature discovery, consuming remotes via Module
        Federation; <strong>domain MFEs (remotes)</strong>—independently deployed Vite
        apps exposing React roots like <code className={CODE}>./OrdersApp</code>,{' '}
        <code className={CODE}>./BillingApp</code>; and optionally{' '}
        <strong>mixed‑tech remotes</strong> (legacy Webpack/Rspack) while you migrate
        toward Vite. The shell uses route‑based composition: each route segment maps to
        a remote module that renders into a zone, with lazy loading via dynamic{' '}
        <code className={CODE}>import()</code>.
      </p>
      <h3 className={H3}>Vite + Module Federation configuration</h3>
      <p className={PROSE}>
        Vite doesn&apos;t ship Module Federation out of the box; use{' '}
        <code className={CODE}>@originjs/vite-plugin-federation</code> or the official{' '}
        <code className={CODE}>@module-federation/vite</code>. For the host: declare the shell as host with remotes and shared; map remote names (e.g. orders, billing) to remoteEntry URLs (configurable per environment); share react and react‑dom as singletons. For a remote MFE: declare <code className={CODE}>exposes</code> to root components/widgets; mirror shared dependencies from the host. You keep fast HMR, TS support, and normal React tooling.
      </p>
      <h3 className={H3}>Enforcing zero coupling</h3>
      <p className={PROSE}>
        Enforce via code and tooling: <strong>type‑safe shell contracts</strong> (e.g.
        PlatformContext, FeatureFlags, UserContext in a shared types package, no
        concrete implementations across MFEs); <strong>no shared global state</strong>—MFEs
        get state through props from the shell and manage local/remote data with their
        own stack (e.g. TanStack Query); <strong>event‑driven integration</strong>—cross‑MFE
        effects via shell‑mediated events or URL changes (e.g. Orders MFE navigates to{' '}
        <code className={CODE}>/billing/invoice/123</code>, shell loads Billing MFE). This mirrors microservice design: MFEs only talk through APIs and contracts they don&apos;t own.
      </p>
    </>
  ),
  impact: (
    <>
      <h3 className={H3}>Monorepo, CI/CD, and scalability</h3>
      <p className={PROSE}>
        You can run this architecture in a monorepo or multi‑repo; Module Federation
        works with both. A monorepo plus MF gives you coordinated but optional
        releases (MFEs versioned independently in a single source of truth), shared
        tooling and linting (zero‑coupling rules and ownership boundaries at repo
        level), and simplified local dev (run a subset of MFEs plus the shell with
        Vite). CI/CD builds and deploys each MFE independently, publishing
        remoteEntry assets to your CDN or edge platform.
      </p>
      <h3 className={H3}>Where this shines in the enterprise</h3>
      <p className={PROSE}>
        This style works well for: <strong>large e‑commerce platforms</strong> (product
        discovery, checkout, account, admin ship independently with a coherent design
        system); <strong>internal admin portals</strong> (analytics, reporting,
        configuration panels evolve on their own); and <strong>widget‑heavy
        dashboards</strong> (each widget or board segment is an MFE, easy to plug in or
        swap for different tenants). At scale, the payoff is the ability to refactor or
        rewrite a domain slice with minimal blast radius, while the platform shell stays
        stable for years.
      </p>
    </>
  ),
  lessons: <></>,
}
