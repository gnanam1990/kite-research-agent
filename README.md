# KiteResearch Agent

[![CI](https://github.com/gnanam1990/kite-research-agent/actions/workflows/ci.yml/badge.svg)](https://github.com/gnanam1990/kite-research-agent/actions/workflows/ci.yml)

Autonomous research analyst for Kite mainnet, wallets, contracts, products, and ecosystem activity.

This repository is built from the staged prompt pack in [`prompts/`](prompts/).

## Product promise

Monitor Kite activity, wallets, contracts, product changes, and alerts to produce research briefs.

## Live

- App: https://kite-research-agent.vercel.app
- API: https://kite-research-agent.vercel.app/api/health
- Live chain read: https://kite-research-agent.vercel.app/api/chain/stats
- Proof report: [docs/PROOF_OF_WORK.md](docs/PROOF_OF_WORK.md) · screenshot: [docs/screenshot.jpg](docs/screenshot.jpg)

## Core modules

- **On-chain Event Watcher** — Monitor blocks, txs, wallets, contracts, and token transfers.
- **Wallet/Contract Intelligence** — Generate readable profiles and changes for wallets/contracts.
- **Ecosystem Product Tracker** — Track 21+ Kite products, URLs, repos, status, and changes.
- **Daily Research Brief Generator** — Create daily or weekly Kite research reports.
- **Alerts + Webhook Delivery** — Notify users when research conditions match.

## What is real

- Vite + React 19 + TypeScript frontend with the required product routes.
- Hono API **deployed live** as a Vercel Serverless Function at `/api` (not just local dev).
- **Real Kite Mainnet read** at `GET /api/chain/stats` — live block height over JSON-RPC (`viem`) plus
  gas/network stats from the KiteScan explorer, surfaced in the app's live-network strip.
- Pure TypeScript core package for Kite-safe address/tx validation, risk policies, activity logs, and approval rules.
- Worker runtime (`@kite-research-agent/worker`) wired into the live API at `POST /api/runs/simulate`.
- Tests for core validation, API routes (incl. chain + worker), and worker execution.

## What is PREVIEW

- The app degrades gracefully: if the live API is unreachable, the frontend renders from bundled preview data.
- Agentic decisions, payment verification, fund movement, trading, security, and scoring behavior are preview-safe
  unless explicitly verified by backend code.
- Client-submitted payment claims are not trusted. Fund-moving or risky actions require explicit approval.
- No official mainnet contract address is invented in this repo.

## API endpoints

Base path in production is `/api` (same-origin); base path in local dev is `http://localhost:8787`.

| Method | Path | Description |
| --- | --- | --- |
| GET | `/health` | Service health probe. |
| GET | `/meta` | Product + module metadata (single source). |
| GET | `/modules` | Product modules. |
| GET | `/briefs` | List items. |
| POST | `/briefs` | Create an item (`name`, `description`, `owner` required; `owner` must be a valid EVM address). |
| GET | `/briefs/:id` | Fetch one item. |
| GET | `/runs` | Activity / run log. |
| POST | `/runs/simulate` | Simulate a run through the worker runtime. |
| GET | `/approvals` | Pending approvals. |
| POST | `/approvals/:id/approve` · `/deny` | Resolve an approval. |
| GET | `/chain/stats` | **Live** Kite Mainnet block height + gas (degrades to preview if infra is down). |
| POST | `/webhooks/:triggerId` | Preview webhook intake. |

## Structure

```txt
server/index.ts        Hono entry mounted at /api (bundled into a Vercel function)
packages/web/          Vite + React 19 frontend
packages/api/          Hono API server (app + routes + live chain read)
packages/worker/       background jobs and runtime simulation
packages/core/         pure TypeScript domain logic
packages/connectors/   Kite constants, KiteScan helper, cached fetch, RPC client
```

## Run locally

```bash
pnpm install
pnpm dev
```

Frontend: `http://localhost:5173` · API: `http://localhost:8787`

```bash
curl http://localhost:8787/health         # { "ok": true, "service": "kite-research-agent" }
curl http://localhost:8787/chain/stats     # live Kite Mainnet block height + gas
```

## Verification

```bash
pnpm -r typecheck
pnpm -r test
pnpm --filter @kite-research-agent/web build
```

## Deployment

Vercel is connected to this repo and auto-deploys `main` via the Build Output API
(`scripts/vercel-build.mjs`):

- **Static frontend** — the built Vite SPA.
- **Serverless API** — `server/index.ts` is esbuild-bundled into a self-contained function mounted at `/api`.
- The frontend calls same-origin `/api` in production and falls back to bundled preview data on any error.

## License

[MIT](LICENSE) © 2026 Gnanam (gnanam1990)
