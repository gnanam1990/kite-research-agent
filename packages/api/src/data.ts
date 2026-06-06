import { buildActivity, demoAddress, type ActivityEvent, type ApprovalRequest, type ProductItem, type ProductModule } from "@kite-research-agent/core";

export const modules: ProductModule[] = [
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
];

export const items: ProductItem[] = [
  {
    "id": "brief_1",
    "name": "On-chain Event Watcher",
    "description": "Monitor blocks, txs, wallets, contracts, and token transfers.",
    "owner": demoAddress,
    "status": "active",
    "risk": "medium",
    "moduleId": "module_1",
    "budgetKite": "5",
    "createdAt": "2026-06-06T02:00:00.000Z"
  },
  {
    "id": "brief_2",
    "name": "Wallet/Contract Intelligence",
    "description": "Generate readable profiles and changes for wallets/contracts.",
    "owner": demoAddress,
    "status": "active",
    "risk": "high",
    "moduleId": "module_2",
    "budgetKite": "50",
    "createdAt": "2026-06-06T02:00:00.000Z"
  },
  {
    "id": "brief_3",
    "name": "Ecosystem Product Tracker",
    "description": "Track 21+ Kite products, URLs, repos, status, and changes.",
    "owner": demoAddress,
    "status": "draft",
    "risk": "low",
    "moduleId": "module_3",
    "budgetKite": "0",
    "createdAt": "2026-06-06T02:00:00.000Z"
  }
];

export const activity: ActivityEvent[] = [
  buildActivity(items[0], "KiteResearch Agent preview event accepted", new Date("2026-06-06T02:10:00.000Z")),
  buildActivity(items[1], "Risky Kite action queued for explicit approval", new Date("2026-06-06T02:20:00.000Z")),
];

export const approvals: ApprovalRequest[] = [
  {
    id: "approval_1",
    itemId: items[1].id,
    status: "pending",
    reason: "High-risk or fund-moving Kite action requires explicit approval.",
    risk: "high",
    requestedAt: "2026-06-06T02:20:00.000Z",
  },
];

export function createItem(input: Pick<ProductItem, "name" | "description" | "owner">) {
  const item: ProductItem = {
    id: `brief_${Date.now()}`,
    name: input.name,
    description: input.description,
    owner: input.owner,
    status: "draft",
    risk: "low",
    moduleId: modules[0].id,
    budgetKite: "0",
    createdAt: new Date().toISOString(),
  };
  items.unshift(item);
  return item;
}
