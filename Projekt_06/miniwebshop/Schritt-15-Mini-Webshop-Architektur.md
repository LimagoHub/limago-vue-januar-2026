# Schritt 15 – Mini‑Webshop‑Architektur (Vue 3, Pinia, Router, Composables)

Dieser Schritt baut ein **Mini‑Webshop‑Projekt from scratch**, das

- mit **`npm run dev`** sofort lauffähig ist
- eine **produktive Startseite** (Shop) hat
- sauber strukturiert ist (Stores + Composables)
- als Basis für echte APIs (.NET) dient

Getestet & gedacht für **Rider**.

---

## Zielarchitektur

- **Stores (Pinia)**
  - catalogStore – Produkte
  - cartStore – Warenkorb (IDs + Mengen)
  - customerStore – Kunde
- **Composables**
  - useMoney
  - useCartDetails
- **Routing**
  - /shop, /cart, /product/:id, /checkout

---

## 15.0 Projekt anlegen

```powershell
npm create vite@latest mini-shop -- --template vue-ts
cd mini-shop
npm install
npm run dev
```

---

## 15.1 Abhängigkeiten

```powershell
npm install pinia vue-router@4
npm install axios
```

---

## 15.2 Projektstruktur

```
src/
  api/
  composables/
  router/
  stores/
  views/
  models/
```

---

## 15.3 main.ts

```ts
import { createApp } from "vue";
import { createPinia } from "pinia";
import { router } from "./router";
import App from "./App.vue";

createApp(App)
  .use(createPinia())
  .use(router)
  .mount("#app");
```

---

## 15.4 Router

```ts
import { createRouter, createWebHistory } from "vue-router";

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/shop" },
    { path: "/shop", component: () => import("../views/ShopView.vue") },
    { path: "/cart", component: () => import("../views/CartView.vue") },
    { path: "/product/:id", component: () => import("../views/ProductDetailsView.vue"), props: true },
    { path: "/checkout", component: () => import("../views/CheckoutView.vue") },
    { path: "/:pathMatch(.*)*", component: () => import("../views/NotFoundView.vue") },
  ],
});
```

---

## 15.5 Models

```ts
export type Product = {
  id: string;
  name: string;
  priceCents: number;
  stock: number;
};

export type CartItem = {
  productId: string;
  qty: number;
};
```

---

## 15.6 Mock API

```ts
const db = [
  { id: "p1", name: "Vue T‑Shirt", priceCents: 1999, stock: 10 },
  { id: "p2", name: "Pinia Sticker", priceCents: 499, stock: 100 },
];
```

---

## 15.7 Stores & Composables
(Siehe Tutorial: catalogStore, cartStore, useMoney, useCartDetails)

---

## Ergebnis

- Shop startet produktiv
- Warenkorb persistent
- Architektur erweiterbar

---

## Nächste Schritte

- API (ASP.NET Core)
- Orders
- Auth
