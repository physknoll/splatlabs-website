# Splat Labs Website

<p align="center">
  <img src="public/logo/splatlabs_logo_full.png" alt="Splat Labs Logo" width="400"/>
</p>

<p align="center">
  <strong>The #1 Gaussian Splat Viewer & Cloud Hosting Platform</strong><br/>
  <em>Host. View. Measure. Share.</em>
</p>

<p align="center">
  <a href="https://splatlabs.ai">Website</a> •
  <a href="https://cloud.rockrobotic.com">Platform</a> •
  <a href="https://splatlabs.ai/pricing">Pricing</a>
</p>

---

## 📖 About

**Splat Labs** is the world's most advanced cloud platform for hosting, sharing, and collaborating on Gaussian Splat models. Founded in 2025 by [ROCK Robotic](https://rockrobotic.com), Splat Labs combines cutting-edge 3D capture hardware with professional-grade cloud software to enable immersive, photorealistic 3D experiences.

This repository contains the official marketing website and e-commerce store for Splat Labs, built with modern web technologies for optimal performance and user experience.

---

## ✨ Features

### Cloud Platform Capabilities

- **Gaussian Splat Hosting** — Industry-leading rendering quality from any source
- **AI Virtual Staging** — Furnish empty spaces with text prompts (powered by Gemini AI)
- **AI Floor Plans** — Automatically generate professional floor plans from 3D scans
- **4D Timelines** — Track construction progress and changes over time
- **Portals** — Connect multiple scans into seamless virtual walkthroughs
- **Precision Measurements** — Sub-centimeter accuracy for survey-grade results
- **Cinematic Fly-Throughs** — Create professional video walkthroughs
- **Universal Sharing** — Works on any device, no plugins required

### Website Features

- 🛒 **E-commerce Store** — Integrated with Ecwid for hardware sales
- 💳 **Stripe Payments** — Secure checkout with Stripe integration
- 📊 **Analytics** — PostHog integration for user behavior insights
- 🔍 **SEO Optimized** — Full metadata, structured data, and sitemap support
- 📱 **Responsive Design** — Beautiful experience across all devices
- ⚡ **Performance** — Built with Next.js 15 and Turbopack for blazing-fast loads
- 🎬 **Animations** — Smooth interactions with Framer Motion and GSAP

---

## 🛠 Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | [Next.js 15](https://nextjs.org/) with App Router |
| **Language** | [TypeScript](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) |
| **UI Components** | Custom components with [Lucide React](https://lucide.dev/) icons |
| **Animations** | [Framer Motion](https://www.framer.com/motion/) & [GSAP](https://gsap.com/) |
| **State Management** | [Zustand](https://zustand-demo.pmnd.rs/) |
| **E-commerce** | [Ecwid](https://www.ecwid.com/) API |
| **Payments** | [Stripe](https://stripe.com/) |
| **Analytics** | [PostHog](https://posthog.com/) |
| **Content** | [MDX](https://mdxjs.com/) with gray-matter |
| **Fonts** | Outfit, Plus Jakarta Sans, JetBrains Mono |

---

## 📁 Project Structure

```
splatlabs-website/
├── app/                          # Next.js App Router
│   ├── api/                      # API Routes
│   │   ├── checkout/             # Stripe checkout endpoints
│   │   ├── products/             # Product data API
│   │   ├── revalidate/           # ISR revalidation
│   │   └── webhooks/             # Stripe & Ecwid webhooks
│   ├── components/               # React components
│   │   ├── checkout/             # Checkout flow components
│   │   ├── landing/              # Homepage sections
│   │   ├── layout/               # Navbar, Footer, etc.
│   │   ├── lixell2pro/           # L2 Pro product page components
│   │   ├── portalcam/            # PortalCam product page components
│   │   ├── pricing/              # Pricing page components
│   │   ├── seo/                  # Structured data, meta
│   │   ├── store/                # E-commerce components
│   │   └── ui/                   # Shared UI components
│   ├── checkout/                 # Checkout pages
│   ├── pricing/                  # Pricing page
│   ├── products/                 # Product detail pages
│   ├── store/                    # Store pages
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Homepage
├── docs/                         # Internal documentation
│   ├── company-overview.md       # Company & product info
│   ├── lixel-l2-pro.md          # L2 Pro sales guide
│   ├── portalcam.md             # PortalCam sales guide
│   └── pricing-guide.md         # Pricing documentation
├── lib/                          # Shared utilities
│   ├── ecwid/                    # Ecwid API client
│   ├── stores/                   # Zustand stores
│   ├── analytics.ts              # PostHog helpers
│   ├── constants.ts              # App constants
│   └── utils.ts                  # Utility functions
├── public/                       # Static assets
│   ├── logo/                     # Brand assets
│   ├── lixell2pro/               # L2 Pro images & videos
│   ├── portalcam/                # PortalCam images & videos
│   └── videos/                   # Homepage videos
├── scripts/                      # Build scripts
└── Configuration files...
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/physknoll/splatlabs-website.git
cd splatlabs-website
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

Create a `.env.local` file in the root directory:

```env
# Ecwid E-commerce
ECWID_STORE_ID=your_store_id
ECWID_SECRET_TOKEN=your_secret_token
ECWID_PUBLIC_TOKEN=your_public_token

# Stripe Payments
STRIPE_SECRET_KEY=sk_live_...
STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# PostHog Analytics
NEXT_PUBLIC_POSTHOG_KEY=phc_...
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com

# App URLs
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

4. **Run the development server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

---

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with Turbopack |
| `npm run build` | Create production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint for code quality |

---

## 🏗 Architecture

### API Routes

| Endpoint | Description |
|----------|-------------|
| `POST /api/checkout/create-checkout-session` | Create Stripe checkout session |
| `POST /api/checkout/calculate` | Calculate order totals with shipping |
| `POST /api/checkout/cancel-order` | Cancel an existing order |
| `GET /api/products` | Fetch products from Ecwid |
| `POST /api/webhooks/stripe` | Handle Stripe payment events |
| `POST /api/webhooks/ecwid` | Handle Ecwid order events |
| `POST /api/revalidate` | Trigger ISR revalidation |

### State Management

Cart state is managed globally using **Zustand** with persistence:

```typescript
// lib/stores/cart-store.ts
const useCartStore = create(
  persist(
    (set) => ({
      items: [],
      addItem: (item) => { ... },
      removeItem: (id) => { ... },
      clearCart: () => { ... },
    }),
    { name: 'cart-storage' }
  )
)
```

### Ecwid Integration

The Ecwid client handles all e-commerce operations:

```typescript
// lib/ecwid/client.ts
- fetchProducts()      // Get all products
- fetchProduct(id)     // Get single product
- calculateOrder()     // Calculate shipping & taxes
- createOrder()        // Submit order to Ecwid
```

---

## 🎨 Design System

### Colors

| Name | Value | Usage |
|------|-------|-------|
| Rock Orange | `#FF5F1F` | Primary accent, CTAs |
| Light Background | `#FFFFFF` | Main backgrounds |
| Content Primary | `#1a1a1a` | Headings |
| Content Secondary | `#4B5563` | Body text |

### Typography

| Font | Usage |
|------|-------|
| **Outfit** | Headings (600-900 weight) |
| **Plus Jakarta Sans** | Body text |
| **JetBrains Mono** | Code, technical specs |

### Breakpoints

| Name | Min Width |
|------|-----------|
| sm | 640px |
| md | 768px |
| lg | 1024px |
| xl | 1280px |
| 2xl | 1536px |
| 3xl | 1920px |
| 4xl | 2560px |

---

## 🛒 Products

### Hardware We Sell

| Product | Description | Starting Price |
|---------|-------------|----------------|
| **PortalCam** | First true spatial camera for Gaussian Splats | $4,999 |
| **Lixel L2 Pro** | Professional handheld LiDAR scanner | Contact for pricing |
| **XGRIDS** | Professional Gaussian Splat capture system | Contact for pricing |
| **ROCK LiDAR** | Drone-mounted LiDAR systems | Contact for pricing |

### Cloud Platform Plans

| Plan | Projects | Starting Price |
|------|----------|----------------|
| Free | 2 | $0/month |
| Starter | 5-20 | $12/month (annual) |
| Business | 20-150 | $58/month (annual) |
| Enterprise | 50-500+ | $158/month (annual) |

---

## 🔒 Security

- All payments processed through **Stripe** (PCI DSS compliant)
- Webhook signatures verified for all external integrations
- Environment variables for all sensitive credentials
- HTTPS enforced in production

---

## 📈 Analytics

We use **PostHog** for:
- Page view tracking
- Product view events
- Cart interactions
- Checkout funnel analysis
- User behavior insights

---

## 🤝 Contributing

1. Create a feature branch from `main`
2. Make your changes
3. Run linting: `npm run lint`
4. Submit a pull request

---

## 📄 License

This project is proprietary software owned by ROCK Robotic / Splat Labs.

---

## 📞 Contact

| Channel | Link |
|---------|------|
| **Website** | [splatlabs.ai](https://splatlabs.ai) |
| **Platform** | [cloud.rockrobotic.com](https://cloud.rockrobotic.com) |
| **Twitter** | [@rockrobotic](https://twitter.com/rockrobotic) |
| **LinkedIn** | [ROCK Robotic](https://linkedin.com/company/rockrobotic) |
| **YouTube** | [@rockrobotic](https://youtube.com/@rockrobotic) |

---

<p align="center">
  <strong>Built with ❤️ by the Splat Labs Team</strong><br/>
  <em>© 2025-2026 ROCK Robotic. All rights reserved.</em>
</p>
