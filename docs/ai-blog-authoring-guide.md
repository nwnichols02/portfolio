# Melon-db — AI blog authoring guide

> **Purpose:** Reference document for AI assistants writing blog posts, series content, launch copy, or technical essays about [Melon](https://github.com/nwnichols02/melon-db). Contains product facts, ADRs, phase history, limitations, voice guidance, and links to source material. **Do not treat deferred items as shipped.**

**Last updated:** 2026-06-07 (Phase 34 shipped; alpha release engineering complete)

---

## How to use this document

1. Read **Author & audience** and **Voice & tone** before drafting.
2. Use **Architectural Decision Records (ADRs)** as the source of truth for *why* decisions were made — include tradeoffs, not just benefits.
3. Cross-check **v1 limitations** and **Deferred work** — never imply features that are gap/deferred.
4. Map claims to **Phase chronology** when describing *when* something landed.
5. Target blog format is defined in **Blog platform (portfolio site)** — match section structure if writing for `BlogPage.tsx`.
6. Canonical user-facing docs live in `apps/docs/content/docs/` — prefer linking to GitHub paths over inventing API names.

---

## Author & audience

| Field | Value |
|-------|-------|
| **Author** | Nate Nichols (`nwnichols02@gmail.com`, GitHub: [nwnichols02](https://github.com/nwnichols02)) |
| **Location** | Memphis, TN — Senior Web Application Developer, software architect |
| **Portfolio** | https://nathan-nichols.vercel.app |
| **Blog route** | `/blog` and `/blog/$slug` (React portfolio app at `~/Desktop/Personal/portfolio`) |
| **Existing related post** | `react-micro-loader` — *Why Offline‑First Changes Everything* (2025, category Offline-First) |
| **Melon repo** | https://github.com/nwnichols02/melon-db (MIT) |
| **npm scope** | `@melon-db/*` with dist-tag **`alpha`** — no production SLA |

### Intended readers

- React Native / Expo engineers evaluating local-first data layers
- WatermelonDB teams considering migration
- Prisma-leaning teams who want schema/codegen locally without Prisma engine on device
- Platform engineers who care about sync, observability, and package boundaries
- Technical leaders reading architecture essays (author's portfolio theme: federation, SSDLC, offline-first, DDD)

### Product positioning (honest)

- **Melon is:** A modular local-first database stack — AST-first query engine, SQLite adapters, optional Watermelon-compatible sync, multiple query surfaces, RN New Architecture native path.
- **Melon is not:** A remote ORM, the full Prisma engine, CRDT-first sync, managed backend service, or GA/stable semver 1.x (alpha today).
- **Relationship to WatermelonDB:** Successor *in intent* — preserves adapter model, lazy SQLite, reactive queries, write boundaries, sync protocol shape. Offers migration codemods and parity matrix; not 100% API clone.

---

## Blog platform (portfolio site)

Blog content lives in:

```
~/Desktop/Personal/portfolio/src/portfolio/architect/BlogPage.tsx   # post bodies + BLOG_POSTS metadata
~/Desktop/Personal/portfolio/src/portfolio/architect/BlogIndex.tsx   # index grid
~/Desktop/Personal/portfolio/src/portfolio/architect/ArchitectureSection.tsx  # homepage featured posts
```

### Post metadata shape

Each post needs:

```ts
{
  slug: string           // URL: /blog/{slug}
  title: string
  category: string       // e.g. 'Melon', 'Offline-First', 'Architecture'
  year: string           // e.g. '2026'
  readingTime: string    // e.g. '~10 min read'
  tagline: string        // 1–2 sentences for cards and header
}
```

### Required section structure (four H2 sections)

Every post uses the same TOC anchors:

| Section ID | Label | Content guidance |
|------------|-------|------------------|
| `overview` | Overview | 2–3 paragraphs: problem, why it mattered for Melon, hook to prior offline-first post where relevant |
| `architecture` | Architecture decisions | 3–5 `<h3>` subsections with concrete Melon terms, phases, package names |
| `impact` | Impact & tradeoffs | Pros/cons, who wins/pays, what was deferred |
| `lessons` | Lessons for teams | Actionable takeaway; optional closing tie to "architecture serves teams" |

### Visual / UX conventions

- Mono uppercase category labels (`MELON · 2026`)
- Dark mode supported; prose uses `text-gray-600 dark:text-gray-400`
- Inline code: `` `QueryAst` ``, `` `@melon-db/db` ``
- Footer CTA: "Stay curious" → contact section
- Homepage "Core Competencies" bento grid features select posts

### Planned Melon series (12 posts)

Use category **`Melon`** for the series. Suggested slugs and titles:

| # | Slug | Title |
|---|------|-------|
| 0 (optional intro) | `melon-series-intro` | Building Melon: Twelve Lessons from an Offline-First Database Stack |
| 1 | `melon-ast-first` | One Query AST to Rule Them All: Why Adapters Should Never See User Syntax |
| 2 | `melon-split-storage-sync` | Storage and Sync Are Two Products, Not One Package |
| 3 | `melon-three-query-surfaces` | Three Query APIs Is Not Over-Engineering — It Is Realistic |
| 4 | `melon-prisma-not-engine` | Prisma Support Without the Prisma Engine: Compatibility Is Not Identity |
| 5 | `melon-expo-go-vs-native` | Expo Go and Dev Builds Are Two Different Products |
| 6 | `melon-native-is-a-product` | Native SQLite Is Not a Feature Flag — It Is a Product Line |
| 7 | `melon-reactive-queries` | CRUD Is Table Stakes — observeQuery Is Where Offline-First Gets Hard |
| 8 | `melon-post-fetch-includes` | Why I Chose Post-Fetch Includes Over SQL JOINs (For Now) |
| 9 | `melon-prd-before-code` | I Wrote PRDs for Every Package Before I Knew What I Was Building |
| 10 | `melon-docs-as-product` | I Built a Docs Site Before I Built a Community |
| 11 | `melon-open-source-release` | Phase 34 Was Not "Flip the Repo Public" — It Was Release Engineering |
| 12 | `melon-codemods-migration` | Codemods Are Empathy for Your Past Self (and WatermelonDB Users) |

**Cross-link:** Post 2 and series intro should link to existing slug `react-micro-loader` (*Why Offline‑First Changes Everything*).

---

## Voice & tone

Write as **Nate Nichols**, first person, architect-builder voice:

- **Do:** Complete sentences, concrete tradeoffs, name the thing you rejected and why, cite phases/ADRs, admit limitations same paragraph as benefits.
- **Do:** Connect to enterprise patterns readers know (bounded contexts, modular monoliths, SSDLC gates) when explaining package splits.
- **Don't:** Hype ("revolutionary", "10x") without benchmark context; don't claim GA or Prisma parity.
- **Don't:** Present deferred work (sliding window, SQL JOIN includes, background sync) as available.
- **Prefer:** "Lesson:" or "Tradeoff:" framing over bullet dumps of features.

Example tone (good):

> Workspace `bun install` lies about publish correctness. Tarball smoke tests exist because of that.

Example tone (bad):

> Melon is the best offline database ever with full Prisma support!

---

## Product overview

### One-sentence pitch

Melon-db is a TypeScript-first, AST-first local database for React Native with SQLite adapters, reactive queries, three query authoring surfaces, optional Watermelon-compatible sync, and a migration path from WatermelonDB.

### Two modular products

1. **Storage & query** — `@melon-db/db` + adapters + query packages + React hooks
2. **Sync** — `@melon-db/sync` + `@melon-db/sync-server` (optional)

Everything compiles to **QueryAst** → **PreparedQuery** before storage.

### Design principles (from docs)

- **AST-first** — one internal representation; adapters never see user syntax
- **Typed at the edge** — schema metadata drives inference
- **Local execution first** — optimized for on-device SQLite
- **Composable and pure** — query builders/compilers side-effect free until execution
- **Modular by design** — storage and sync evolve independently

### Inspiration sources

| Source | What Melon took |
|--------|-----------------|
| WatermelonDB | Adapter model, lazy SQLite, reactive UI, write boundaries, sync protocol shape |
| RxDB / CouchDB Mango | Serializable JSON query DSL |
| Prisma | Schema-first typing, codegen, hook patterns — **not** runtime engine |

---

## Package map (12 packages)

| Package | Role | Key exports / concepts |
|---------|------|------------------------|
| `@melon-db/db` | Core engine | `createDatabase`, `createMelonSchema`, `MelonDatabase`, `MelonCollection`, AST types, in-memory adapter, sync primitives (`getLocalChanges`, `applyRemoteChanges`) |
| `@melon-db/db-sqlite` | SQLite adapter | `createSqliteAdapter`, AST→SQL compiler, Bun/Node/Expo/RN exports, `observeQuery`, triggers |
| `@melon-db/db-sqlite-native` | RN native module | TurboModule + C++ JSI, `global.melonSqliteJsi`, native DB thread |
| `@melon-db/db-query` | Fluent builder | `QueryBuilder`, `createQueryFactory`, `resolveCollectionQuery` |
| `@melon-db/db-query-mango` | Mango compiler | `createMangoCompiler`, `MangoQuery`, `normalizeMangoQuery` |
| `@melon-db/db-prisma` | Prisma layer | `importPrismaSchema`, `createPrismaLikeClient`, `compilePrismaQuery`, CLI `melon-prisma` |
| `@melon-db/db-react` | React bindings | `MelonDbProvider`, `useDatabase`, `useQuery`, `useFindMany`, `useMangoQuery`, `useRecord`, `useWriter`, `useSync`, `*State` hooks |
| `@melon-db/db-devtools` | Debugging | `createReactiveDevtoolsBridge`, `MelonDevtoolsPanel`, Plan/SQL/params/AST |
| `@melon-db/db-testkit` | Testing | `withTestDatabase`, re-exports in-memory adapter |
| `@melon-db/db-codemods` | Migration | `melon-codemod migrate-queries/writes/react/schema`, Q→AST translator |
| `@melon-db/sync` | Sync orchestrator | `synchronize`, checkpoint stores, retry, conflict policies |
| `@melon-db/sync-server` | Reference backend | HTTP server, `PostgresSyncStore`, validators |

### Dependency rules

- `@melon-db/db` is stack bottom — **no** other melon-* deps **except** ADR-010: runtime dep on `@melon-db/db-query`
- Query packages (`db-query`, `db-query-mango`, `db-prisma`) depend only on `@melon-db/db`; they do not depend on each other
- `@melon-db/sync` depends only on `@melon-db/db`
- `@melon-db/sync-server` depends on sync types/server libs, not query packages
- `@melon-db/db-react` may depend on sync for `useSync` hooks (documented boundary drift)
- Apps consume any packages; domains should not leak across melon package internals

### Key source paths

| Topic | Path |
|-------|------|
| AST types | `packages/melon-db/src/ast.ts` |
| Schema | `packages/melon-db/src/schema.ts` |
| Adapter contract | `packages/melon-db/src/adapter.ts` |
| Database runtime | `packages/melon-db/src/database.ts` |
| SQL compiler | `packages/melon-db-sqlite/src/sql/` |
| Shared test vectors | `packages/melon-db/__fixtures__/` |
| Release metadata | `tooling/release/metadata.ts` |
| Publish script | `tooling/release/publish.ts` |
| ADRs (canonical) | `apps/docs/content/docs/architecture/decisions.mdx` |
| Roadmap | `apps/docs/content/docs/roadmap.mdx` |
| PRD compliance | `apps/docs/content/docs/prd-compliance.mdx` |
| PRD rules | `.cursor/rules/prd-*.mdc`, `db-*.mdc`, `package-roles.mdc` |

---

## Query pipeline (technical detail)

```
Authoring surface (fluent | Mango JSON | Prisma args)
    → QueryCompiler.compile()
    → QueryAst
    → validate against MelonSchema
    → QueryPlan (index hints, postFilter, stableSort)
    → PreparedQuery { ast, plan, source: 'melon'|'mango'|'prisma'|'compat' }
    → StorageAdapter.find() | count()
    → SQL (sqlite) or in-memory evaluation
    → MelonQueryHandle.observe() → React hooks
```

### QueryAst shape (conceptual)

```ts
type QueryOperator =
  | 'eq' | 'neq' | 'gt' | 'gte' | 'lt' | 'lte'
  | 'in' | 'notIn' | 'like' | 'contains' | 'isNull';

type QueryAst = {
  collection: string;
  where?: QueryBooleanNode;      // and | or | not | predicate
  orderBy?: QuerySort[];
  skip?: number;
  limit?: number;
  relationFilters?: ...;         // Q.on parity (Phase 32+)
  select?: QuerySelect;          // includes
  mode: 'many' | 'one' | 'count';
};
```

### Write model

- All mutations **must** run inside `db.write(fn)`
- Writers serialized; reads allowed without concurrent writers (reads do not block on write queue in v1 — see deferred)
- `insert` / `update` / `delete` throw outside write context

### Relation loading (ADR-011)

- **`belongsTo` / `hasMany` includes:** post-fetch `loadIncludes` with batch `IN` queries
- **`Q.on` / relationFilters:** SQL `WHERE fk IN (SELECT pk FROM related WHERE …)` on SQLite; `applyRelationFilters` in-memory
- **`capabilities.joins: false`** — no JOIN-shaped SELECT result sets in v1

---

## Sync architecture (technical detail)

### Split (ADR-002)

| Layer | Owner | Responsibility |
|-------|-------|----------------|
| Outbox `_melon_sync_outbox` | Engine + SQLite adapter | Queue local mutations, `pendingFields` for merge-by-field |
| `getLocalChanges()` | `@melon-db/db` | Push payload |
| `applyRemoteChanges()` | `@melon-db/db` | Pull apply + conflict dispatch |
| `synchronize()` | `@melon-db/sync` | Pull → apply → push → ack → checkpoint |
| Checkpoint store | `@melon-db/sync` | `lastPulledAt`, schema version |
| Reference HTTP/Postgres | `@melon-db/sync-server` | Dev/integration backend |

### Conflict policies (Phases 15–18)

- `server-wins` (default)
- `skip-existing`
- `client-wins`
- `last-write-wins` (needs `syncTimestampField`)
- `merge-by-field` — uses outbox `pendingFields` (Phase 17)
- `custom` — `conflictResolver` hook (Phase 18)

### Sync status machine

`idle` → `pulling` → `pushing` → `complete`; also `retrying`, `paused` (offline), `failed`. Retry: exponential backoff + jitter; `AbortSignal` cancels.

### Demo commands

```bash
bun run demo:sync:http
bun run demo:sync:postgres
bun run postgres:up
bun run sync-server:postgres
```

---

## React Native SQLite paths (technical detail)

### Decision tree

| Environment | Import | Native backing |
|-------------|--------|----------------|
| Expo Go | `@melon-db/db-sqlite/expo` | `expo-sqlite` (async) |
| Dev build | `@melon-db/db-sqlite/rn` + `@melon-db/db-sqlite-native` | JSI or TurboModule |
| Force Expo in dev client | `EXPO_PUBLIC_MELON_SQLITE=expo` | expo-sqlite |
| Force Turbo only | `EXPO_PUBLIC_MELON_SQLITE=turbo` | TurboModule promises |

`createSqliteAdapter({ mode: 'auto' })` picks best binding.

### Native stack (Phases 20–26)

1. iOS/Android bridge spike
2. TurboModule codegen (`MelonSQLiteSpec`) — Phases 22–23
3. C++ JSI host object `global.melonSqliteJsi` — Phases 25–26
4. Dedicated native DB worker queue; sync JSI methods block JS thread until queue completes (**documented v1 tradeoff**)

### Example apps

| App | Command | Purpose |
|-----|---------|---------|
| `playground-rn` | `bun run dev:rn` | Expo Go |
| `playground-rn-dev` | `bun run dev:rn:dev:start` | Native JSI, devtools, `/benchmark` screen |
| `playground-node` | `bun run demo` | Node SQLite CRUD |
| `playground-web` | `bun run dev:web` | In-memory Vite (no web SQLite yet) |
| `apps/docs` | `bun run dev:docs` | Fumadocs site + live playgrounds |

---

## Reactive queries / observeQuery (ADR-007)

### Evolution by phase

| Phase | Capability |
|-------|------------|
| 0–3 | Engine `ChangeEmitter` — collection-wide refetch on any write (in-memory default) |
| 27 | SQLite `observeQuery` — predicate-aware invalidation (`rowMatchesWhere`) |
| 29 | `_melon_observation_events` triggers; `flushObservationQueue`; JSI `sqlite3_update_hook` |
| 33 | Cross-collection `relationFilters` invalidation; field-aware UPDATE narrowing; schema-aware subscription fingerprint |

### Current behavior

- SQLite adapters: invalidate subscriptions only when changed row can affect query WHERE / relationFilters / orderBy fields
- In-memory: still collection-wide ChangeEmitter fallback
- External SQL deletes without row snapshot: conservative invalidation

### Known limitations (document in posts)

- `orderBy` + `limit` top-N membership **not exact** — may over-invalidate at boundaries
- Turbo native path: no update hook in v1 for some paths
- Perfect reactivity deferred in favor of shipping useful hooks early (ADR-007 rejected alternative: block until perfect)

---

## Architectural Decision Records (ADRs)

Canonical copy: `apps/docs/content/docs/architecture/decisions.mdx`

For each ADR below: use **Context → Decision → Pros → Cons → Alternatives rejected** when writing essays.

---

### ADR-001: AST-first single query representation

**Phase context:** Foundation (Phases 0–1)

**Context:** WatermelonDB, RxDB, ORMs expose different query syntaxes. Adapters need one stable input.

**Decision:** All query surfaces compile to `QueryAst` + `PreparedQuery` before execution. Adapters receive prepared queries only.

**Pros:**
- One SQL generator in `@melon-db/db-sqlite`
- Devtools show AST + SQL regardless of input syntax
- New surfaces (Mango, Prisma) do not touch adapters

**Cons:**
- Ergonomics lost at adapter boundary
- Advanced SQL requires AST extensions, not adapter shortcuts

**Alternatives rejected:** Per-surface adapter encoding (duplicated logic and drift)

**Blog angle:** Spine of the whole project; enables devtools and multi-surface without 3 SQL generators.

**Code path:** `packages/melon-db/src/ast.ts`, `packages/melon-db-sqlite/src/sql/`

---

### ADR-002: Split storage and sync packages

**Phase context:** Sync Phases 12–18

**Context:** Teams want offline CRUD without sync; sync has different release cadence and backend coupling.

**Decision:** `@melon-db/db` owns storage, outbox, `applyRemoteChanges`. `@melon-db/sync` owns pull/push orchestration; depends only on db.

**Pros:** Tree-shakeable; local-only apps skip sync; sync evolves without breaking query APIs.

**Cons:** Two packages for full offline apps; some sync types on engine for outbox access.

**Alternatives rejected:** Monolithic db with sync built-in (coupling, bundle size)

**Blog angle:** User experience feels monolithic; package boundary is architectural honesty.

---

### ADR-003: Three query surfaces over one AST

**Phase context:** Phase 7

**Context:** Teams prefer fluent TS, JSON Mango, or Prisma-style args by background.

**Decision:** Ship `@melon-db/db-query`, `@melon-db/db-query-mango`, `@melon-db/db-prisma` as separate compilers to same AST.

**Pros:** Familiar APIs; Mango serializable; Prisma schema reuse.

**Cons:** Documentation tax; feature parity maintenance across compilers.

**Alternatives rejected:** Single fluent API only (migration + Prisma adoption friction)

**Blog angle:** One syntax fantasy vs one engine reality.

---

### ADR-004: Adapter contract — PreparedQuery only

**Phase context:** Foundation

**Context:** Adapters should not parse Mango, Prisma, or fluent syntax.

**Decision:** `StorageAdapter.find/count` accept `PreparedQuery`; writes use `AdapterWriteOperation` structs.

**Pros:** Clear boundary for future backends (IndexedDB); pure SQL layer.

**Cons:** Include/join semantics resolved in engine/SQL with v1 limits.

**Alternatives rejected:** Adapters accept raw AST (planning hints belong in PreparedQuery)

---

### ADR-005: Dual RN SQLite path (Expo Go vs dev build)

**Phase context:** Phase 8 (Expo), Phases 20–26 (native)

**Context:** Expo Go cannot load custom native modules; production RN uses dev builds.

**Decision:**
- `@melon-db/db-sqlite/expo` for Expo Go
- `@melon-db/db-sqlite/rn` + `@melon-db/db-sqlite-native` for dev builds
- `mode: 'auto'`

**Pros:** Expo demo day-one; native perf path when needed.

**Cons:** Double test matrix; docs must explain which path.

**Alternatives rejected:** Expo-only (no native perf path); native-only (no Expo Go DX)

**Blog angle:** "React Native support" is two products.

---

### ADR-006: Layered native stack — TurboModule then C++ JSI

**Phase context:** Phases 22–26

**Context:** RN New Architecture; sync JSI avoids promise marshaling on hot paths.

**Decision:**
- Phases 22–23: TurboModule codegen iOS/Android
- Phases 25–26: C++ JSI `global.melonSqliteJsi`, native DB thread
- TurboModule remains async fallback

**Pros:** Progressive delivery; `mode: 'auto'`; WatermelonDB-class throughput goal.

**Cons:** Heavy native maintenance; sync JSI blocks JS thread until native queue completes.

**Alternatives rejected:** TurboModule-only forever (perf gap); legacy bridge modules

**Blog angle:** Native work is a product line, not a sprint.

---

### ADR-007: ChangeEmitter fallback vs native observeQuery

**Phase context:** Phases 3, 27, 29, 33 — **most amended ADR**

**Original (Phase 0–26):** ChangeEmitter re-runs queries on collection changes when adapter lacks `observeQuery`.

**Amendment Phase 27:** SQLite `observeQuery` with predicate-aware post-write invalidation.

**Amendment Phase 29:** Trigger table `_melon_observation_events`; `flushObservationQueue`; JSI `sqlite3_update_hook`.

**Amendment Phase 33:** Unified `shouldInvalidateSubscription` for WHERE + relationFilters + field-aware updates; related collection indexing for Q.on reactive queries.

**Pros:** Skip irrelevant write notifications; Q.on queries refresh when related rows change; hooks unchanged.

**Cons:** Top-N edge cases; turbo path limitations; in-memory still collection-wide; conservative external delete handling.

**Alternatives rejected:** Block reactive APIs until native triggers perfect

**Blog angle:** Shipped useful reactivity with honest limits vs waiting for perfection.

---

### ADR-008: Prisma as schema/codegen layer, not runtime engine

**Phase context:** Phase 7, 9

**Context:** Prisma RN Early Access; teams want schema/client ergonomics locally.

**Decision:** `@melon-db/db-prisma` imports schema, generates types/stubs, compiles Prisma-like args to AST. Runtime always `MelonDatabase`.

**Pros:** No Prisma engine in app; honest positioning; Bun codegen fits monorepo.

**Cons:** Not full Prisma parity; Melon migrations only (add-column, create-table).

**Alternatives rejected:** Embed Prisma engine (RN constraints, coupling)

**Blog angle:** Compatibility ≠ identity. Warn against misleading "Prisma for RN" marketing.

**CLI:** `bun run melon-prisma generate --schema=./schema.prisma --out=./generated/melon`

---

### ADR-009: Bun monorepo + Fumadocs docs site

**Phase context:** Phase 14 + out-of-cycle

**Context:** READMEs insufficient for phase history, ADRs, playgrounds, API reference.

**Decision:** `apps/docs` — Fumadocs + TanStack Start, TypeDoc per package, live playgrounds, committed benchmark JSON.

**Pros:** Single docs source; search; dogfood reactive demos in browser.

**Cons:** Extra CI (`docs:api`, `build:docs`); sync burden with phases.

**Alternatives rejected:** GitHub wiki / README-only

**Blog angle:** Docs are onboarding UX for infrastructure libraries.

---

### ADR-010: `@melon-db/db` depends on `@melon-db/db-query`

**Phase context:** Phase 30

**Context:** `MelonCollection.query((b) => …)` needs QueryBuilder without duplicating logic.

**Decision:** Runtime dependency on `@melon-db/db-query`; `resolveCollectionQueryInput` delegates to builder.

**Pros:** Watermelon-style `collection.query(Q => Q.where(...))` out of the box.

**Cons:** Core not 100% melon-*-free; cannot tree-shake db-query if using fluent collection APIs.

**Alternatives rejected:** Optional peer with runtime error (poor DX)

**Blog angle:** Purity vs DX — chose DX for common path.

---

### ADR-011: Post-fetch includes and relationFilters (no SQL JOIN SELECT)

**Phase context:** Phases 9 (belongsTo), 32 (hasMany, Q.on)

**Context:** Watermelon/Prisma expect includes and Q.on; JOIN result shaping complicates adapters and observation.

**Decision:**
- includes via post-fetch batch IN queries
- Q.on via `relationFilters` subqueries
- `capabilities.joins: false`

**Pros:** One engine path all adapters; predictable SQL; easier tests.

**Cons:** Extra round-trips; global child limit; top-N observation edge cases.

**Alternatives rejected:** SQL JOIN in adapter (deferred Phase 35+)

**Blog angle:** ORM features have implementation strategies, not just API shapes.

---

## Phase chronology (0–34 shipped)

Use this table for "when did X land" claims.

### Foundation (0–7)

| Phase | Title | Deliverables |
|-------|-------|--------------|
| 0 | Monorepo bootstrap | Bun workspaces, tooling, db skeleton |
| 1 | db M0 | Schema, AST, adapter types |
| 2 | db M1 | In-memory adapter, CRUD, write queue |
| 3 | db M2 | ChangeEmitter, observe, subscriptions |
| 4 | db-sqlite M0 | AST→SQL compiler |
| 5 | db-sqlite M1 | Bun SQLite adapter, DDL |
| 7 | Downstream packages | query, react, mango, prisma, devtools, testkit |

### RN & API (8–10)

| Phase | Deliverables |
|-------|--------------|
| 8 | expo-sqlite, playground-rn |
| 9 | useFindMany/useMangoQuery, migrations, belongsTo includes, Prisma CLI |
| 10 | SQL tests, debug flag, 10k/50k/100k benchmarks |

### Codemods (11, 19)

| Phase | Deliverables |
|-------|--------------|
| 11 | Query translator, migrate-queries/writes/react |
| 19 | Nested Q.and/or, migrate-schema spike, Q.on recipes |

### Sync (12–18)

| Phase | Deliverables |
|-------|--------------|
| 12 | Outbox, getLocalChanges, applyRemoteChanges, synchronize() |
| 13 | HTTP server, useSync, persistent checkpoints |
| 14 | Devtools panel, Fumadocs docs site |
| 15 | Retry, network monitor, conflict policies |
| 16 | PostgresSyncStore, Docker |
| 17 | merge-by-field, pendingFields |
| 18 | custom conflictResolver |

### Native & observation (20–33)

| Phase | Deliverables |
|-------|--------------|
| 20–21 | Native spike, Android, playground-rn-dev split |
| 22–23 | TurboModule iOS/Android |
| 24 | bench:compare vs WatermelonDB, CI |
| 25–26 | C++ JSI iOS/Android |
| 27 | predicate-aware observeQuery |
| 28 | On-device benchmark screen |
| 29 | Trigger-driven observation, update_hook |
| 30 | collection.query(builder), useRecord, ADR-010 |
| 31 | PRD compliance matrix, walkthroughs, AGENTS.md |
| 32 | hasMany includes, relationFilters / Q.on |
| 33 | observeQuery precision, field-aware updates |

### Release (34)

| Phase | Deliverables |
|-------|--------------|
| 34 | Publishable tarballs, release:smoke, release.yml, alpha policy, RELEASING.md |

---

## v1 limitations (always mention in evaluative posts)

- All mutations inside `db.write()`
- SQLite migrations: **add-column** and **create-table** only
- Relation includes: post-fetch, not SQL JOIN; nested includes / per-parent `take` deferred
- Q.on / relationFilters: **belongsTo** only; experimental Watermelon join tables unsupported
- observeQuery: field-aware for WHERE + relationFilters + orderBy; top-N edge cases remain
- Prisma: schema/codegen/client facade — not full engine; `emitZod` gap
- Mango: documented operator subset
- Native JSI: sync methods block JS thread; no BLOB round-trip on JSI path (per native docs)
- Sync: no `merging` state; apply synchronous; no background sync service
- Alpha npm: **no production SLA**

---

## Deferred & gap items (do NOT claim shipped)

| Item | Status | Notes |
|------|--------|-------|
| Sliding window retention (prd-4) | Gap / future | org-aware prune, local_prune_ledger, pressure modes |
| SQL SELECT JOIN shaping | Deferred | ADR-011; post-fetch today |
| `getChangedCollections` on adapters | Gap | sync uses outbox |
| Full multi-file schema codemods | Deferred | single-model spike only |
| Background sync service | Deferred | |
| Per-field timestamps / three-way merge | Deferred | |
| EAS Build CI for dev client | Deferred | |
| Web SQLite adapter (`playground-web`) | Partial | in-memory only |
| Supabase / REST sync recipes | Gap | |
| Sync `merging` state | Deferred | |
| Read blocked during write | Deferred | writes serialized only |
| npm org / public GitHub flip | May be manual gaps | see prd-compliance alpha table |

---

## Release engineering (Phase 34 detail)

For open-source / alpha posts:

### Pre-publish gates

```bash
bun install
bun test
bun run typecheck
bun run check
bun run build:packages
bun tooling/release/validate-exports.ts
bun run release:smoke
bun audit --audit-level=high
```

### Publish flow

```bash
bun run build:packages
bun tooling/release/sync-package-json.ts
bun run release:smoke
bun tooling/release/publish.ts --tag alpha
```

### Key files

- `RELEASING.md` — full runbook (OIDC trusted publishing, npm tokens, Bypass 2FA for CI)
- `tooling/release/metadata.ts` — author, license, repository URL
- `.github/workflows/release.yml` — CI publish with dry_run option
- `CHANGELOG.md` — lockstep `0.1.0-alpha.0` style versioning

### Install snippet (alpha)

```bash
npm install @melon-db/db@alpha @melon-db/db-sqlite@alpha @melon-db/db-react@alpha
```

### Lesson for posts

Monorepo green ≠ npm green. **`release:smoke`** installs from **packed tarballs**, not workspace links.

---

## Benchmarks & performance narrative

| Command | Purpose |
|---------|---------|
| `bun run bench` | Insert/query scales |
| `bun run bench:compare` | Melon vs WatermelonDB (better-sqlite3 parity) |
| `bun run bench:compare:docs` | Commit artifact to docs site |
| CI `bench-compare` | Regression smoke |

Artifact: `apps/docs/src/data/bench-compare-latest.json`

Docs: `/docs/performance-comparison` on docs site

**Blog guidance:** Cite benchmarks when claiming performance credibility; do not invent numbers — read committed JSON or run benches.

---

## Migration / codemods narrative

Package: `@melon-db/db-codemods`

```bash
bun run melon-codemod migrate-queries --path=./src
bun run melon-codemod migrate-writes --path=./src
bun run melon-codemod migrate-react --path=./src
bun run melon-codemod migrate-schema --path=./src/models/Task.ts
```

- Runtime translator: serializable Watermelon `Q` clauses → `QueryAst`
- **Manual rewrite required:** `Q.on` joins in some cases; multi-file schema beyond spike
- Parity matrix in docs migration guide

**Blog angle:** Successor without migration path is a hobby project.

---

## Future: sliding window (prd-4) — NOT v1

Located in `.cursor/rules/prd-4.mdc`. Do not describe as available.

Concepts for forward-looking posts only:

- Org-aware download windows, local footprint limits
- `sync_window_state`, `local_prune_ledger` tables
- Prune ≠ business delete
- Protect unsynced rows always
- Pressure modes: normal, low-storage, emergency
- Devtools has **Retention tab stub only**

---

## Quick start code (for posts)

### In-memory

```ts
import { createDatabase, createInMemoryAdapter, createMelonSchema } from '@melon-db/db';

const schema = createMelonSchema({
  version: 1,
  collections: {
    tasks: {
      name: 'tasks',
      primaryKey: 'id',
      fields: { id: { kind: 'string' }, title: { kind: 'string' } },
    },
  },
});

const db = createDatabase({ schema, adapter: createInMemoryAdapter() });

await db.write(async (tx) => {
  await tx.collection('tasks').insert({ id: '1', title: 'Hello' });
});

const tasks = await db.collection('tasks').findMany();
```

### Sync (sketch)

```ts
import { synchronize, createMemoryCheckpointStore } from '@melon-db/sync';

await synchronize({
  db,
  pullChanges: async (args) => { /* ... */ },
  pushChanges: async (args) => { /* ... */ },
  checkpointStore: createMemoryCheckpointStore(),
});
```

### Devtools

```ts
import { createReactiveDevtoolsBridge } from '@melon-db/db-devtools';

const devtools = createReactiveDevtoolsBridge();
const db = createDatabase({ schema, adapter, devtools });
```

---

## PRD source index (for deep dives)

| File | Focus |
|------|-------|
| `.cursor/rules/prd-1.mdc` | Product vision, sync, RN, npm alpha, GA checklist |
| `.cursor/rules/prd-2.mdc` | AST-first multi-surface queries |
| `.cursor/rules/prd-3.mdc` | TypeScript interface contracts |
| `.cursor/rules/prd-4.mdc` | **Future** sliding-window retention |
| `.cursor/rules/db-core.mdc` | db + db-sqlite RFC |
| `.cursor/rules/db-query.mdc` | Fluent builder + React |
| `.cursor/rules/db-prisma.mdc` | Prisma layer |
| `.cursor/rules/package-roles.mdc` | Per-package milestones |
| `.cursor/rules/file-layout.mdc` | Monorepo layout |

---

## Blog content checklist (for AI QA)

Before publishing a Melon post, verify:

- [ ] Title/tagline match ADR or phase story, not feature laundry list
- [ ] Limitations mentioned where benefits claimed (especially reactivity, Prisma, includes)
- [ ] Package names use `@melon-db/*` scope
- [ ] No claim that sliding window, SQL JOIN includes, or background sync ship in v1
- [ ] Expo Go vs dev build distinguished when discussing RN performance
- [ ] Links to GitHub repo and/or docs paths included where helpful
- [ ] Tone matches portfolio (architect, tradeoffs, lessons) not vendor marketing
- [ ] Cross-link to `react-micro-loader` if discussing offline-first motivation
- [ ] Code examples use `db.write()` for mutations
- [ ] Alpha / no SLA mentioned if discussing production adoption

---

## Suggested narrative arcs (beyond the 12-post series)

| Arc | Hook | ADRs / phases |
|-----|------|---------------|
| "Why I rebuilt WatermelonDB" | Decorators, New Architecture, TS-first | 5, 6, 8, 11 |
| "Sync is the hard part" | Extends existing offline-first post | 2, 12–18, conflict policies |
| "Shipping alpha on npm" | Tarball lies | 34, ADR-9, RELEASING.md |
| "Observation is distributed systems on one device" | UI correctness | ADR-7, 27–33 |
| "PRDs for solo/open source" | Cursor rules as executable intent | ADR-9, 9, prd-compliance |

---

## Contact & CTA (portfolio)

- Portfolio contact: https://nathan-nichols.vercel.app/#contact
- GitHub issues: https://github.com/nwnichols02/melon-db/issues
- Footer pattern: "happy to nerd out about federation, offline-first, or sync design"

---

*This file is internal authoring context. Update when ADRs, roadmap phases, or release status change.*
