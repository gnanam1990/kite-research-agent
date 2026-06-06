export const product = {
  name: "KiteResearch Agent",
  repo: "kite-research-agent",
  subtitle: "RESEARCH",
  hero: "Monitor Kite activity, wallets, contracts, product changes, and alerts to produce research briefs.",
  positioning: "Autonomous research analyst for Kite mainnet, wallets, contracts, products, and ecosystem activity.",
  entity: "briefs",
  entitySingular: "brief",
  entityRoute: "/briefs",
  routes: [
  "/",
  "/briefs",
  "/briefs/:id",
  "/watchlists",
  "/wallets/:address",
  "/contracts/:address",
  "/alerts",
  "/settings"
],
  modules: [
  {
    "id": "module_1",
    "name": "On-chain Event Watcher",
    "description": "Monitor blocks, txs, wallets, contracts, and token transfers.",
    "preview": "live"
  },
  {
    "id": "module_2",
    "name": "Wallet/Contract Intelligence",
    "description": "Generate readable profiles and changes for wallets/contracts.",
    "preview": "preview"
  },
  {
    "id": "module_3",
    "name": "Ecosystem Product Tracker",
    "description": "Track 21+ Kite products, URLs, repos, status, and changes.",
    "preview": "preview"
  },
  {
    "id": "module_4",
    "name": "Daily Research Brief Generator",
    "description": "Create daily or weekly Kite research reports.",
    "preview": "preview"
  },
  {
    "id": "module_5",
    "name": "Alerts + Webhook Delivery",
    "description": "Notify users when research conditions match.",
    "preview": "preview"
  }
],
};
