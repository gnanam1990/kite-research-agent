# KiteResearch Agent — Project Prompt Pack

## One-line summary
Autonomous research analyst for Kite mainnet, wallets, contracts, products, and ecosystem activity.

## Product positioning
Continuously monitor Kite on-chain activity and ecosystem signals, summarize changes, produce daily briefs, and trigger alerts.

## Why this exists
Builders need intelligence, not raw logs. This agent turns mainnet activity, wallet movement, product status, contract changes, and ecosystem updates into actionable research.

## Repository name
`kite-research-agent`

## Header subtitle
`RESEARCH`

## Core routes
- `/`
- `/briefs`
- `/briefs/:id`
- `/watchlists`
- `/wallets/:address`
- `/contracts/:address`
- `/alerts`
- `/settings`


## Core modules
1. **On-chain Event Watcher** — Monitor blocks, txs, wallets, contracts, and token transfers for notable activity.
2. **Wallet/Contract Intelligence** — Generate readable profiles and changes for wallets/contracts.
3. **Ecosystem Product Tracker** — Track the 21+ Kite products, URLs, repos, status, and changes.
4. **Daily Research Brief Generator** — Create daily/weekly Kite research reports from events and product changes.
5. **Alerts + Webhook Delivery** — Notify users when research conditions match.

## API surface
- `GET /events`
- `POST /watchlists`
- `GET /intelligence/:address`
- `GET /briefs`
- `POST /briefs/generate`
- `POST /alerts`
- `GET /alerts/:id/deliveries`


## Safety requirements
- Research summaries must not invent facts
- Sources/tx hashes must be retained
- Investment advice language forbidden
- Alerts do not guarantee risk/security


## Build philosophy
This is not a small demo. Build it as a serious productivity platform for Kite AI agents. Every UI screen must move the user toward a real workflow, decision, payment, approval, or operational outcome.
