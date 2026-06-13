# Kite Research Agent

> Research analyst for the Kite network — monitor mainnet activity, wallets, contracts, and ecosystem products, and turn them into research briefs.

[![CI](https://github.com/gnanam1990/kite-research-agent/actions/workflows/ci.yml/badge.svg)](https://github.com/gnanam1990/kite-research-agent/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

## Overview

Kite Research Agent is a TypeScript pnpm monorepo that pairs a Hono API with a Vite + React frontend to research the Kite network. It performs a real read against Kite Mainnet (current block height over JSON-RPC plus gas/network stats from the KiteScan explorer) and presents it alongside product, wallet, contract, and approval views. It is aimed at operators and analysts who want a single surface for Kite ecosystem activity, with risky or fund-moving actions gated behind explicit approval.

Most agentic behavior in this repo is intentionally preview-safe rather than fully autonomous — see [Status](#status) for what is real versus preview.

## Features

- **Live Kite Mainnet read** — `GET /chain/stats` fetches the current block height over JSON-RPC (`viem`) and gas/network stats from KiteScan at request time. Degrades to a preview-safe payload (still HTTP 200) if chain infrastructure is unreachable.
- **On-chain event watcher** — the module surface for monitoring blocks, txs, wallets, contracts, and token transfers (marked `live` in product metadata).
- **Domain core** — pure TypeScript validation and policy helpers: EVM address / tx-hash validation, risk levels and weighting, and an approval rule (`requiresApproval`) that flags high/critical risk or fund-moving actions.
- **Worker runtime** — a `PreviewRuntime` queue that builds activity events, exercised by the API at `POST /runs/simulate`.
- **Research briefs API** — create and list research items (briefs) with server-side EVM-address validation on the owner field.
- **Approval queue** — pending approvals with approve/deny endpoints.
- **Graceful frontend fallback** — the SPA calls the same-origin `/api` in production and renders from bundled preview data if the API is unreachable.

## Tech stack

- **Language:** TypeScript (ESM)
- **API:** Hono 4 (`@hono/node-server`, with the Vercel Node adapter for serverless)
- **Frontend:** Vite 7, React 19, Tailwind CSS 4, lucide-react
- **Chain access:** viem 2 (`createPublicClient`, custom `defineChain` for Kite mainnet/testnet)
- **Tests:** Vitest 3
- **Tooling:** pnpm 9 workspaces, esbuild (production API bundle), tsx (dev)
- **Hosting:** Vercel (Build Output API)

## Architecture

A pnpm workspace (`packages/*`) plus a thin serverless entry:

- `packages/core` — pure domain logic: types, EVM/tx validation, risk and approval rules, activity builders. No runtime dependencies.
- `packages/connectors` — Kite chain definitions, a `viem` public client, a KiteScan URL helper, and a small cached-`fetch` utility.
- `packages/worker` — `PreviewRuntime`, an in-memory job queue that turns queued items into activity events.
- `packages/api` — the Hono app: routes, in-memory demo data, and the live `chain/stats` read. Runs standalone in dev.
- `packages/web` — the Vite + React SPA, with bundled preview data and an API client that falls back gracefully.
- `server/index.ts` — Vercel Serverless Function that mounts the shared Hono app under `/api` using the Node-runtime adapter.

## Getting started

### Prerequisites

- Node.js 22 (the CI matrix uses Node 22)
- pnpm 9 (`packageManager` is pinned to `pnpm@9.15.9`)

### Installation

```bash
pnpm install
```

### Configuration

Copy `.env.example` and adjust as needed. The project reads the following variables (names only — never commit real secrets):

| Variable | Purpose |
| --- | --- |
| `KITE_NETWORK` | Active network selector (`mainnet` / `testnet`). |
| `KITE_MAINNET_RPC` | Kite Mainnet JSON-RPC endpoint. |
| `KITE_MAINNET_API` | KiteScan mainnet explorer API base. |
| `KITE_TESTNET_RPC` | Kite Testnet JSON-RPC endpoint. |
| `KITE_TESTNET_API` | KiteScan testnet explorer API base. |
| `API_PORT` | Local dev API port (default `8787`). |
| `WEB_ORIGIN` | Allowed CORS origin for the API (default `http://localhost:5173`). |
| `VITE_API_URL` | Frontend API base for local dev. Ignored in production, where the SPA calls same-origin `/api`. |
| `WEBHOOK_SECRET_DEMO` | Local-only demo webhook secret. |
| `LLM_PROVIDER` | LLM provider selector (defaults to `preview`). |

### Running

```bash
pnpm dev
```

This runs the API and web app in parallel:

- Frontend: `http://localhost:5173`
- API: `http://localhost:8787`

## Usage

The API base path is `/api` in production (same-origin) and `http://localhost:8787` in local dev.

| Method | Path | Description |
| --- | --- | --- |
| GET | `/health` | Service health probe. |
| GET | `/meta` | Product and module metadata. |
| GET | `/modules` | Product modules. |
| GET | `/briefs` | List research items. |
| POST | `/briefs` | Create an item (`name`, `description`, `owner` required; `owner` must be a valid EVM address). |
| GET | `/briefs/:id` | Fetch one item. |
| GET | `/runs` | Activity / run log. |
| POST | `/runs/simulate` | Simulate a run through the worker runtime. |
| GET | `/approvals` | Pending approvals. |
| POST | `/approvals/:id/approve` · `/deny` | Resolve an approval (server-side, in-memory). |
| GET | `/chain/stats` | Live Kite Mainnet block height + gas (degrades to preview if infra is down). |
| POST | `/webhooks/:triggerId` | Preview webhook intake. |

Quick check against a running dev server:

```bash
curl http://localhost:8787/health        # { "ok": true, "service": "kite-research-agent" }
curl http://localhost:8787/chain/stats   # live Kite Mainnet block height + gas
```

## Testing

```bash
pnpm test         # vitest across all packages
pnpm typecheck    # tsc --noEmit across all packages
pnpm lint         # type-level lint (tsc --noEmit)
```

Tests cover core validation/policy logic (`packages/core`), the API routes including the chain and worker-simulate endpoints (`packages/api`), and the worker runtime (`packages/worker`). The `connectors` and `web` packages currently run with `--passWithNoTests`.

## Project structure

```txt
server/index.ts          Vercel serverless entry; mounts the Hono app at /api
packages/api/            Hono API (routes, demo data, live chain read)
packages/web/            Vite + React 19 frontend
packages/worker/         in-memory PreviewRuntime job queue
packages/core/           pure TypeScript domain logic
packages/connectors/     Kite chain defs, viem client, KiteScan helpers
scripts/vercel-build.mjs Build Output API packaging for Vercel
```

## Status

Preview / demo-stage, with one genuinely live capability:

- **Live:** The Kite Mainnet read (`/chain/stats`) is a real on-chain query (block height via JSON-RPC + KiteScan gas stats). The Hono API is deployed to Vercel as a serverless function. The "On-chain Event Watcher" module is the one marked `live` in product metadata.
- **Preview:** The other four modules (Wallet/Contract Intelligence, Ecosystem Product Tracker, Daily Research Brief Generator, Alerts + Webhook Delivery) are preview. API list/approval state is in-memory and resets on cold start. The webhook endpoint acknowledges intake only.
- **Frontend approvals are local-state-only by design.** Approve/Deny in the UI updates React state for the session and does not call the approve/deny API endpoints. The API endpoints exist and mutate server-side in-memory state independently.
- Created items are persisted to `localStorage` and merged into the list, since the serverless API is stateless.
- No official mainnet contract address is invented in this repo.
- Agentic decisions, payment verification, fund movement, trading, and scoring behavior are preview-safe unless explicitly verified by backend code. Client-submitted payment claims are not trusted; fund-moving or high-risk actions require explicit approval.

When deployed, the project is hosted on Vercel (static SPA + serverless `/api`), auto-deployed from `main` via the Build Output API (`scripts/vercel-build.mjs`).

## License

[MIT](LICENSE) © 2026 Gnanam (gnanam1990)
