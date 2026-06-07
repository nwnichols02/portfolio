import type { BlogPostContent } from '../types'
import { PROSE } from '../types'

export const content: BlogPostContent = {
  overview: (
    <>
      <p className={PROSE}>
        This article is a plain-language tour of my architecture portfolio: how the pieces
        fit together and what I optimize for.
      </p>
      <p className={PROSE}>
        The blog is organized around three themes—<strong>enterprise frontends</strong>{' '}
        (Vite, Module Federation, zero-coupling micro-frontends), <strong>security</strong>{' '}
        (Secure SDLC and DevSecOps for modern platforms), and <strong>offline-first</strong>{' '}
        (local-first data, WatermelonDB, and sync as a first-class concern). Each of the
        other posts goes deep on one of these; this guide is the map.
      </p>
    </>
  ),
  architecture: (
    <>
      <p className={PROSE}>
        Across all of my work, I optimize for systems that are predictable to operate
        and forgiving to change: explicit contracts, observable behavior, and
        architectures that make errors visible early instead of hiding them.
      </p>
      <p className={PROSE}>
        The other posts expand on that in practice—zero-coupling boundaries in
        federated frontends, phase-by-phase security in the SDLC, and explicit change
        tracking and conflict rules in offline-first sync. The details differ, but the
        mindset is the same.
      </p>
    </>
  ),
  impact: (
    <p className={PROSE}>
      The impact of these systems isn&apos;t just technical. They shape how teams work:
      who owns what (MFEs vs shell, security champions, sync ownership), how risk is
      managed (SSDLC phases, conflict policies), and how quickly you can change
      direction without burning the organization out.
    </p>
  ),
  lessons: <></>,
}
