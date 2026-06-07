import type { BlogPostContent } from '../types'
import { PROSE, H3 } from '../types'

export const content: BlogPostContent = {
  overview: (
    <>
      <p className={PROSE}>
        Domain‑Driven Design (DDD) is less about fancy diagrams and more about putting
        your codebase under the control of the business language, not the database schema
        or the framework of the month.
      </p>
      <p className={PROSE}>
        <strong>What DDD actually optimizes for</strong> is alignment: the people who
        understand the problem domain and the people writing the code speak the same
        language and see the same model. That gives you: a <strong>shared vocabulary</strong>{' '}
        (Ubiquitous Language) across product, engineering, and stakeholders;{' '}
        <strong>models that map to how the business thinks</strong>, not to REST endpoints
        or ORM tables; and <strong>code that remains understandable</strong> as the domain
        evolves, instead of turning into &quot;crud‑shaped everything.&quot; In practice,
        your main artifacts are named after domain concepts—Policies, Orders, Invoices,
        Schedules—not Controllers and Utils.
      </p>
    </>
  ),
  architecture: (
    <>
      <h3 className={H3}>Core concepts in DDD</h3>
      <p className={PROSE}>
        You don&apos;t need the whole book to get value. A few core ideas get you most of the
        way. <strong>Ubiquitous Language</strong>: everyone uses the same terms for domain
        concepts, and those terms show up in code, tests, and docs.{' '}
        <strong>Bounded Contexts</strong>: clear boundaries where a model and language
        apply; outside that boundary, terms might legitimately mean something different.{' '}
        <strong>Aggregates</strong>: clusters of domain objects treated as a single
        consistency boundary (e.g., an Order and its LineItems).{' '}
        <strong>Domain Events</strong>: facts that something happened in the domain (e.g.,
        PaymentCaptured, OrderShipped) which can drive side effects elsewhere. If a
        concept isn&apos;t clear enough to name, it probably isn&apos;t stable enough to model yet.
      </p>
      <h3 className={H3}>Bounded Contexts and micro‑frontends / services</h3>
      <p className={PROSE}>
        For modern distributed systems and micro‑frontends, Bounded Contexts are your
        best friend. They help you draw boundaries: &quot;Billing,&quot; &quot;Catalog,&quot;
        &quot;Fulfillment,&quot; &quot;Identity&quot; each have their own model and language,
        even if they share terms like &quot;Customer.&quot; You avoid shared, ambiguous
        models—you stop trying to have one mega &quot;User&quot; type that means everything
        to everyone. Teams align to contexts: a team owns a context end‑to‑end (UI,
        services, data, events) and can move independently. Your micro‑frontends, APIs,
        and databases should line up with these contexts where possible, instead of
        arbitrary technical splits.
      </p>
      <h3 className={H3}>Aggregates and invariants</h3>
      <p className={PROSE}>
        Aggregates are about where you need strong consistency and where you can tolerate
        eventual consistency. Ask: what must always be true when we commit a change?
        (Invariants.) Which objects must be updated together to preserve those
        invariants? What can we safely handle asynchronously via events? For example, an
        Order aggregate might enforce &quot;total equals sum of line items&quot; and
        &quot;cannot ship unpaid orders,&quot; while inventory adjustments happen
        asynchronously in a different bounded context. Good aggregate boundaries simplify
        transaction logic and reduce cross‑service coupling.
      </p>
      <h3 className={H3}>Domain Events and integration</h3>
      <p className={PROSE}>
        Domain Events turn implicit behavior into explicit, composable contracts. They
        help you decouple workflows: OrderPlaced can drive email notifications, analytics,
        and fulfillment without the Order service knowing about any of them. They improve
        traceability: events form an audit trail of &quot;what happened,&quot; not just
        &quot;what is.&quot; They bridge contexts: each bounded context reacts to events
        that are meaningful to it, translating into its own language at the boundary.
        It&apos;s often better to start small—raise events for a few core behaviors—than to
        try to event‑source your entire system from day one.
      </p>
      <h3 className={H3}>Strategic vs tactical DDD</h3>
      <p className={PROSE}>
        A lot of teams jump straight into annotations and aggregates and miss the point.{' '}
        <strong>Strategic DDD</strong>: Bounded Contexts, context maps, and language
        alignment. This is where the biggest wins live.{' '}
        <strong>Tactical DDD</strong>: Entities, Value Objects, Aggregates, Repositories,
        etc. These shape how you write code inside a context. If you only pick one, pick
        strategic: get the boundaries and language right before fine‑tuning patterns inside
        each context.
      </p>
      <h3 className={H3}>Applying DDD in a modern stack</h3>
      <p className={PROSE}>
        In a React / TypeScript / services world, DDD shows up as: <strong>domain‑first
        modules and packages</strong>—billing-domain, inventory-domain, identity-domain,
        each exporting pure domain logic and types; <strong>use cases / application
        services</strong>—&quot;Commands&quot; like CreateInvoice, CapturePayment, PlaceOrder
        that orchestrate domain objects without UI or infrastructure concerns;{' '}
        <strong>infrastructure at the edges</strong>—HTTP handlers, DB repositories, and
        message brokers adapt to domain types, not the other way around. Tests then become
        story‑like: &quot;Given these domain facts, when this command runs, these events
        occur and these invariants hold.&quot;
      </p>
    </>
  ),
  impact: (
    <>
      <h3 className={H3}>Alignment and team ownership</h3>
      <p className={PROSE}>
        The main payoff of DDD is alignment: product, engineering, and stakeholders
        share a vocabulary and a mental model. That reduces miscommunication, makes
        onboarding easier, and keeps the codebase understandable as the domain evolves.
        When micro‑frontends and services align to Bounded Contexts, teams can own
        contexts end‑to‑end and ship independently without constant cross‑team
        coordination. Domain Events give you traceability and loose coupling—workflows
        stay composable and audit trails stay clear. Start with strategic DDD (boundaries
        and language); tactical patterns can follow once the map is right.
      </p>
    </>
  ),
  lessons: <></>,
}
