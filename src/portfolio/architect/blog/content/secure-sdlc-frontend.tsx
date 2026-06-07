import type { BlogPostContent } from '../types'
import { PROSE, H3 } from '../types'

export const content: BlogPostContent = {
  overview: (
    <>
      <p className={PROSE}>
        Enterprise teams are great at scaling features, but much worse at scaling
        security. A Secure SDLC (SSDLC) fixes that by baking security into every phase
        of delivery instead of bolting it on as a pre‑release checklist.
      </p>
      <p className={PROSE}>
        This post walks through a practical SSDLC you can layer onto a modern front‑ and
        back‑end stack, with a bias toward automation, guardrails, and developer‑friendly
        tooling. A Secure SDLC is the standard software development lifecycle with
        security activities attached to every phase: requirements, design,
        implementation, testing, deployment, and maintenance. Instead of one big
        &quot;security review&quot; at the end, you push security left via early threat
        modeling, secure design patterns, automated scanning, and continuous monitoring
        in production.
      </p>
    </>
  ),
  architecture: (
    <>
      <h3 className={H3}>Phase‑by‑phase Secure SDLC flow</h3>
      <p className={PROSE}>
        Frame the SSDLC as five core phases: <strong>Requirements</strong>—capture
        security requirements, regulatory constraints, and risk appetite alongside
        functional and non‑functional requirements. <strong>Design</strong>—threat
        modeling, secure patterns, document where controls live (auth, data validation,
        logging, secrets). <strong>Implementation</strong>—secure coding standards,
        SAST/secret scanning in CI, keep dependencies clean. <strong>Testing</strong>—DAST,
        dependency checks, targeted security tests; block releases on critical vulns.{' '}
        <strong>Deployment &amp; Maintenance</strong>—harden environments, validate IaC,
        monitor for attacks, feed production findings back into requirements and threat
        models.
      </p>
      <h3 className={H3}>Threat modeling as the backbone</h3>
      <p className={PROSE}>
        Threat modeling keeps security work focused. Embed it early (requirements/design
        for new systems and when you introduce significant architectural change). Use
        data‑flow‑centric views: model how data moves through services, UIs, APIs, and
        third‑party integrations to spot attack paths. Tie threats to work items—translate
        threats into backlog items and link them to implementation so developers
        understand the &quot;why&quot; behind mitigations. Done right, threat models
        become living artifacts you update as the system evolves.
      </p>
      <h3 className={H3}>DevSecOps: automating the guardrails</h3>
      <p className={PROSE}>
        Secure SDLC in practice is SSDLC plus DevSecOps: security controls wired into
        pipelines and environments. CI pipeline checks: SAST, dependency scanning, secret
        detection, basic IaC validation on every merge, with policy gates for critical
        issues. Runtime and deployment: container hardening, image scanning,
        orchestration checks, secure build pipelines. Continuous monitoring:
        post‑deployment monitoring, risk scoring, anomaly detection, alerting—so
        production findings feed the next SDLC cycle. The goal is to make the secure
        path the easiest path.
      </p>
    </>
  ),
  impact: (
    <>
      <h3 className={H3}>Culture, roles, and security champions</h3>
      <p className={PROSE}>
        No SSDLC survives contact with reality without people and ownership. Use{' '}
        <strong>defined security roles</strong> so development, operations, and
        security have clear responsibilities and fewer &quot;not my job&quot; gaps.{' '}
        <strong>Security champions</strong>—developers embedded in each squad—act as
        the first line for threat modeling, tooling, and code reviews. Allocate{' '}
        <strong>budget and training</strong> for tools and incident response so
        security isn&apos;t permanently deprioritized by feature work. When security
        responsibilities are explicit and supported, the SSDLC becomes part of how you
        build software rather than an occasional compliance exercise.
      </p>
    </>
  ),
  lessons: <></>,
}
