import type { BlogPostContent } from '../types'
import { PROSE, H3 } from '../types'

export const content: BlogPostContent = {
  overview: (
    <>
      <p className={PROSE}>
        Technical leadership is not a promotion from &quot;strong IC&quot;; it&apos;s a
        different job. The core output changes from &quot;I write great code&quot; to
        &quot;the team reliably ships the right system.&quot;
      </p>
      <p className={PROSE}>
        A strong senior can own problems end‑to‑end; a technical leader owns systems and
        people dynamics around those systems. The shifts that matter: <strong>from depth
        to leverage</strong>—you still understand the hard parts, but you optimize for
        others doing the work well, not for you being the hero; <strong>from code to
        outcomes</strong>—design docs, trade‑off calls, incident follow‑ups, and
        stakeholder alignment become as important as pull requests; <strong>from local to
        systemic</strong>—you care less about &quot;this ticket&quot; and more about
        architecture, SDLC, and how teams interact. You&apos;re still technical, but your
        primary artifact is clarity, not code.
      </p>
    </>
  ),
  architecture: (
    <>
      <p className={PROSE}>
        You can think of technical leadership as three overlapping jobs: Architect,
        Coach, and Shield.
      </p>
      <h3 className={H3}>1. Architect: Shape the System</h3>
      <p className={PROSE}>
        The Architect job is about direction and constraints, not drawing boxes all day.
        Define guardrails: coding standards, architectural principles (e.g., zero‑coupling
        MFEs, offline‑first boundaries, secure SDLC expectations), and what &quot;good&quot;
        looks like. Make high‑impact trade‑offs: choose where to incur tech debt, when to
        refactor, and how to phase big changes into shippable increments. Keep the map
        current: maintain architecture docs, ADRs, and shared diagrams so new engineers
        don&apos;t have to reverse‑engineer the system from the repo. Good technical
        leaders create an environment where most decisions can be made locally because
        the big decisions are clear.
      </p>
      <h3 className={H3}>2. Coach: Grow People and Practices</h3>
      <p className={PROSE}>
        You can&apos;t scale technical leadership without investing in others. Review at the
        right altitude: don&apos;t bikeshed syntax; focus reviews on correctness, boundaries,
        failure modes, and long‑term maintainability. Turn feedback into patterns: if you
        give the same feedback twice, codify it—lint rules, templates, checklists, example
        repos, or runbooks. Make learning explicit: own brown‑bags, design reviews, and
        debriefs after incidents or large projects; treat them as normal parts of the job,
        not &quot;nice to have.&quot; The goal is to make the team more capable over time, so
        things that were &quot;hard&quot; become routine.
      </p>
      <h3 className={H3}>3. Shield: Manage Risk and Expectations</h3>
      <p className={PROSE}>
        Technical leaders sit at the intersection of engineering reality and business
        demands. Translate risk: explain impact, likelihood, and options in business
        terms—&quot;If we skip this, here&apos;s the failure mode and cost.&quot; Say &quot;no,
        but…&quot;: offer constrained alternatives (&quot;We can&apos;t do that safely by Friday,
        but we can ship an 80% solution with a feature flag.&quot;). Protect focus: push
        back on thrash, unbounded scope, and randomization so the team can actually
        complete work. When done well, stakeholders see fewer surprises, and engineers
        see fewer &quot;fire drills.&quot;
      </p>
      <h3 className={H3}>Leading Through Design, Not Heroics</h3>
      <p className={PROSE}>
        Technical leaders are judged less on heroics and more on avoiding drama through
        good design. Write clear design docs: expected behavior, constraints, risks, and
        alternatives; good docs reduce meetings and misalignment. Prefer simple, boring
        solutions: your future self and junior devs should be able to reason about the
        system; cleverness is a cost. Design for failure first: timeouts, retries,
        idempotency, and feature flags are design decisions, not afterthoughts. If the
        system is resilient and understandable, you&apos;ve done your job—even if your name
        isn&apos;t on the biggest PRs.
      </p>
    </>
  ),
  impact: (
    <>
      <h3 className={H3}>Influence Without Authority</h3>
      <p className={PROSE}>
        Even as a titled lead, most of your impact is persuasion, not command. Lead by
        example, selectively: pick a few critical paths (an architecture spike, the first
        MFE, the initial sync engine) and execute them in the style you want others to
        copy. Be consistent: if your priorities change every week, the team will stop
        listening; if your principles are stable, people will internalize them. Share
        context widely: the more people understand &quot;why,&quot; the less you need to
        enforce &quot;what.&quot; Influence is earned through good calls over time, clear
        communication, and visibly owning the hard problems when they appear.
      </p>
    </>
  ),
  lessons: (
    <>
      <h3 className={H3}>Staying Technical Without Being a Bottleneck</h3>
      <p className={PROSE}>
        The trap is either becoming non‑technical or the single point of failure. Allocate
        time for deep work: reserve blocks for reading code, experimenting, and staying
        current with the stack. Avoid owning every critical path: pair or mob on important
        work instead of soloing it; your job is to de‑bottleneck, not centralize. Delegate
        visibly: let others lead projects and designs, and support them publicly;
        you&apos;re there to de‑risk, not to take over.
      </p>
      <p className={PROSE}>
        If the system keeps moving in the right direction while you&apos;re on vacation,
        that&apos;s a strong signal of effective technical leadership.
      </p>
    </>
  ),
}
