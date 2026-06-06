# Stage 07 — Module 3: Ecosystem Product Tracker for KiteResearch Agent

You are OpenCode working inside this repo. Follow the prompt exactly. Do not skip requirements. Do not invent missing official contract addresses, token addresses, or unsupported claims. If a feature depends on unconfirmed mainnet contracts, implement it as PREVIEW/testnet/mock-safe only with clear UI labels.

Before writing code in this stage:
1. Read `THEME.md` in the repo root.
2. Read `KITE_CONTEXT.md` or `00_SHARED_KITE_CONTEXT.md` if present.
3. Inspect the existing codebase and summarize current structure in one paragraph.
4. Only then implement this stage.


## Goal
Implement the **Ecosystem Product Tracker** module for **KiteResearch Agent**.

## Module purpose
Track the 21+ Kite products, URLs, repos, status, and changes.

## Product context
Continuously monitor Kite on-chain activity and ecosystem signals, summarize changes, produce daily briefs, and trigger alerts.

## Features to implement
- Product registry
- Status checks
- Repo link metadata
- Change log
- Category filters
- Broken link alerts


## Required data objects
- `TrackedProduct{id, name, url, repo, category, status, notes, last_checked_at}`
- `ProductChange{id, product_id, change_type, payload_json, created_at}`


## Backend requirements
- Add/complete service functions for this module in `packages/api/src/services/`.
- Add/complete repository functions in `packages/api/src/repositories/`.
- Add route handlers for create/list/detail/update/action flows related to this module.
- Validate all inputs with Zod.
- Write at least 3 API tests or service tests for the core happy path and failure path.

## Worker/runtime requirements
- If this module has background behavior, create a job type and handler.
- Add audit/timeline log writes for important state transitions.
- Add idempotency guard if the module can create external effects.
- Any AI-generated output must store prompt, input, output, model, and timestamp.

## Frontend requirements
Create serious production-style UI, not placeholders:
- Main module page or section.
- List/table view.
- Detail drawer or detail page.
- Create/edit form where relevant.
- Status badges.
- Empty state.
- Error state.
- Loading skeleton or loading card.
- Use `AddressDisplay` and `MonoValue` for chain data.
- Use `PreviewBadge` for mock, heuristic, or incomplete data.

## UX requirements
- The user should understand what action to take next.
- Dangerous/risky actions require confirmation dialog.
- Show clear helper text for policies, limits, payment state, or agent decisions.
- Do not hide complexity behind fake-complete UI.

## Acceptance criteria
- Product registry is editable
- Status checks are marked PREVIEW if simple HTTP only
- Broken links show rust warnings


## Additional checks
- All module screens work with seeded data.
- No fake mainnet execution claims.
- No unsupported token/contract assumptions.
- Unit tests cover core logic.

## Required verification

Run these commands and fix all issues before ending the stage:

```bash
pnpm install
pnpm -r typecheck
pnpm -r lint || true
pnpm -r test || true
grep -rn "Instrument\|font-instrument\|font-serif" packages/web/src packages/web/index.html || true
grep -rn "violet\|indigo\|cyan\|#7C3AED\|#4F46E5\|#06B6D4" packages/web/src || true
```

Expected:
- TypeScript passes.
- No forbidden fonts.
- No forbidden colors in non-comment UI code.
- UI uses Kite palette only: sand, cream, olive, deep brown, warm rust.
- All addresses, hashes, balances, block numbers, tx IDs use `font-mono`.

