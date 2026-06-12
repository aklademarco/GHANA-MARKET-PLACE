# GMP Frontend to Backend Handoff

## 1. Project Overview

Ghana Market Place (GMP) is a verified multi-vendor marketplace. Buyers shop from approved Ghanaian businesses. New sellers do not create an active seller account directly: they first book a physical shop-verification visit. A GMP administrator approves the business before seller access is granted.

Frontend stack:

- React 19 and Vite
- React Router
- Zustand with local persistence
- Tailwind CSS 4
- React Toastify

## 2. Local Setup

```bash
npm install
npm run dev
npm run lint
npm run build
```

Recommended API environment variable:

```env
VITE_API_BASE_URL=http://localhost:3000/api/v1
```

Do not hard-code API origins. Replace the existing hard-coded orders URL with a shared API client using `VITE_API_BASE_URL`.

## 3. Frontend Routes

Public/customer routes:

| Route | Purpose |
| --- | --- |
| `/` | Marketplace homepage |
| `/collections` | Product search, category filters and sorting |
| `/product/:productId` | Product details and variant selection |
| `/shop/:sellerId` | Public seller storefront |
| `/cart` | Seller-grouped shopping cart |
| `/place-order` | Delivery, payment and order review |
| `/orders` | Customer order history/tracking |
| `/book-shop-verification` | Request an in-person seller verification visit |
| `/login` | Authentication |
| `/about`, `/contact` | Company pages |

Seller workspace:

- `/seller/dashboard`
- `/seller/profile`
- `/seller/products/new`

Admin workspace:

- `/admin/dashboard`

The backend must enforce permissions even if a user manually enters a protected URL. Frontend route guards should also be added after authentication APIs are connected.

## 4. Roles and Navbar Rules

Canonical roles:

```text
customer
seller
admin
```

Role behavior:

- Guests and customers do not see `Seller Centre`.
- Authenticated users with `role: "seller"` see `Seller Centre`.
- `Start selling` remains public and opens the shop-verification booking page.
- Admin and seller APIs must reject users without the required role.
- A seller should only receive the seller role after verification approval.

The Zustand auth state currently expects:

```json
{
  "user": {
    "id": "usr_123",
    "name": "Ama Mensah",
    "email": "ama@example.com",
    "phone": "+233240000000",
    "role": "seller"
  },
  "accessToken": "jwt-or-session-token"
}
```

Login response recommendation:

```json
{
  "success": true,
  "data": {
    "user": {
      "id": "usr_123",
      "name": "Ama Mensah",
      "email": "ama@example.com",
      "phone": "+233240000000",
      "role": "seller"
    },
    "accessToken": "token",
    "refreshToken": "token"
  }
}
```

The server-returned role is authoritative. Never accept a role supplied by the login form.

## 5. Seller Verification Workflow

Public users submit `/book-shop-verification` with:

```json
{
  "businessName": "Ama Fashion House",
  "ownerName": "Ama Mensah",
  "phone": "+233240000000",
  "alternatePhone": "+233500000000",
  "category": "Fashion",
  "region": "Greater Accra",
  "town": "Madina",
  "digitalAddress": "GA-123-4567",
  "landmark": "Near the market",
  "preferredDate": "2026-06-20",
  "preferredTime": "9:00 AM - 11:00 AM",
  "notes": "Shop opens at 8 AM"
}
```

Suggested statuses:

```text
requested -> contacted -> visit_scheduled -> visited -> approved
                                             -> rejected
                                             -> more_information_required
```

Approval should create or activate the seller/store record. The seller can then authenticate and receive `role: "seller"`.

## 6. Core Data Models

### Product

```json
{
  "id": "0031",
  "sellerId": "store_7",
  "name": "Ergonomic Gaming Chair",
  "slug": "ergonomic-gaming-chair",
  "description": "...",
  "price": 1850,
  "currency": "GHS",
  "images": ["https://..."],
  "category": "Furniture",
  "subCategory": "Chairs",
  "sizes": [],
  "colors": ["Black & Blue", "Black & Red", "All Black"],
  "stock": 12,
  "inStock": true,
  "rating": 4.6,
  "reviewCount": 42,
  "bestSeller": true,
  "status": "active"
}
```

Variant rules:

- Sizes are optional. Do not require a size for appliances, electronics, or furniture.
- Colors are optional.
- A cart line must be uniquely identified by product plus selected variant values.
- The backend must validate that the selected color/size exists and has stock.

### Store

```json
{
  "id": "store_7",
  "ownerId": "usr_123",
  "name": "Prime Furniture GH",
  "slug": "prime-furniture-gh",
  "description": "...",
  "logoUrl": "https://...",
  "bannerUrl": "https://...",
  "phone": "+233240000000",
  "email": "store@example.com",
  "region": "Greater Accra",
  "town": "Accra",
  "digitalAddress": "GA-123-4567",
  "verificationStatus": "approved",
  "verifiedAt": "2026-06-12T10:00:00Z",
  "rating": 4.8,
  "status": "active"
}
```

### Cart line sent to checkout

```json
{
  "productId": "0031",
  "quantity": 1,
  "variant": {
    "size": null,
    "color": "Black & Blue"
  }
}
```

The current persisted frontend cart uses a legacy nested object keyed by a display variant string. During API integration, migrate it to structured cart lines as shown above.

### Order

```json
{
  "id": "ord_123",
  "orderNumber": "GMP-20260612-0012",
  "customerId": "usr_456",
  "status": "processing",
  "paymentStatus": "paid",
  "paymentMethod": "momo",
  "subtotal": 8050,
  "shippingTotal": 20,
  "commissionTotal": 644,
  "grandTotal": 8070,
  "currency": "GHS",
  "shippingAddress": {},
  "sellerOrders": [],
  "createdAt": "2026-06-12T12:00:00Z"
}
```

Orders containing multiple sellers should create one parent marketplace order and one child seller order per store. Shipping, fulfilment status, commission, settlement and disputes must be tracked per seller order.

## 7. Required API Endpoints

Authentication:

```text
POST   /auth/register/customer
POST   /auth/login
POST   /auth/refresh
POST   /auth/logout
GET    /auth/me
```

Seller verification:

```text
POST   /verification-requests
GET    /admin/verification-requests
GET    /admin/verification-requests/:id
PATCH  /admin/verification-requests/:id/status
```

Catalog and stores:

```text
GET    /categories
GET    /products?search=&category=&sellerId=&minPrice=&maxPrice=&sort=&page=
GET    /products/:id
GET    /stores/:id-or-slug
GET    /stores/:id/products
POST   /seller/products
PATCH  /seller/products/:id
DELETE /seller/products/:id
```

Checkout and payments:

```text
POST   /checkout/quote
POST   /orders
POST   /payments/initialize
GET    /payments/:reference/verify
POST   /webhooks/paystack
POST   /webhooks/flutterwave
```

Orders and tracking:

```text
GET    /orders
GET    /orders/:id
GET    /orders/track?orderNumber=&phone=
PATCH  /seller/orders/:sellerOrderId/status
POST   /seller/orders/:sellerOrderId/tracking
POST   /orders/:id/delivery-confirmation
POST   /orders/:id/refund-request
```

Admin and payouts:

```text
GET    /admin/dashboard
GET    /admin/stores
PATCH  /admin/stores/:id/status
GET    /seller/dashboard
GET    /seller/balance
GET    /seller/payouts
POST   /seller/payouts/requests
```

## 8. Checkout Contract

The frontend collects:

- Customer contact details
- Region, city, street address, GhanaPost GPS and landmark
- Standard or express delivery
- Mobile Money, card or eligible pay-on-delivery
- Product IDs, quantities and selected variants

Before displaying the final payable amount, call `POST /checkout/quote`. The backend must recalculate:

- Current prices
- Product availability and variant stock
- Shipping per seller
- Discounts
- Platform commission
- Grand total
- Pay-on-delivery eligibility

Never trust totals calculated in the browser.

Recommended order creation request:

```json
{
  "items": [
    {
      "productId": "0031",
      "quantity": 1,
      "variant": { "color": "Black & Blue", "size": null }
    }
  ],
  "shippingAddress": {
    "firstName": "Kojo",
    "lastName": "Mensah",
    "email": "kojo@example.com",
    "phone": "+233240000000",
    "region": "Greater Accra",
    "city": "Accra",
    "address": "12 Market Street",
    "digitalAddress": "GA-123-4567",
    "landmark": "Near the station"
  },
  "deliveryMethod": "standard",
  "paymentMethod": "momo",
  "quoteId": "quote_123"
}
```

## 9. Order Lifecycle

Recommended seller-order statuses:

```text
pending_payment -> paid -> accepted -> packing -> shipped -> delivered
                       -> rejected
                       -> cancelled
```

Recommended marketplace statuses should be derived from child seller orders. The buyer can review only after the relevant seller order is delivered.

Funds should remain unavailable to the seller until delivery confirmation and the dispute window rules are satisfied.

## 10. API Response and Error Shape

Success:

```json
{
  "success": true,
  "data": {},
  "meta": { "page": 1, "pageSize": 24, "total": 120 }
}
```

Validation error:

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Please correct the highlighted fields.",
    "fields": {
      "phone": "A valid Ghana phone number is required."
    }
  }
}
```

Use stable error codes. The frontend should not branch on human-readable error messages.

## 11. Current Mocked Areas

The following frontend actions are not yet backed by production APIs:

- Login and customer registration
- Verification appointment submission
- Product creation and editing
- Seller profile updates
- Checkout quote and order creation
- Payment initialization
- Seller withdrawal requests
- Admin dashboard metrics and actions
- Storefront metadata
- Contact form

`Orders.jsx` is the only page currently attempting a backend request, and it uses a hard-coded local URL. Replace this during API-client integration.

## 12. Security Requirements

- Authorize every seller/admin operation on the server.
- Derive seller ownership from the authenticated user, not request payloads.
- Validate and sanitize uploaded files and text.
- Verify payment webhooks using provider signatures.
- Make order/payment creation idempotent.
- Store Ghana Card and verification documents privately with strict access controls.
- Do not expose payout or identity details in public store responses.
- Use secure HTTP-only cookies for refresh tokens where possible.
- Rate-limit login, tracking, verification and payment endpoints.
