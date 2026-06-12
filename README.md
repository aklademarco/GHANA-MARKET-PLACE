# Ghana Market Place Frontend

React/Vite frontend for Ghana Market Place, a verified multi-vendor marketplace for Ghanaian businesses.

## Development

```bash
npm install
npm run dev
```

Validation:

```bash
npm run lint
npm run build
```

## Backend Integration

The complete frontend handoff, data contracts, role rules, API requirements, and workflow expectations are documented in [docs/FRONTEND_BACKEND_HANDOFF.md](docs/FRONTEND_BACKEND_HANDOFF.md).

Important: most mutations currently use frontend mock data and toast confirmations. The backend must be treated as the authority for identity, roles, seller verification, inventory, prices, commissions, order totals, payments, delivery status, and payouts.
