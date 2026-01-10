# 🐙 Kraken Explorer

An interactive visual guide to understanding energy APIs and account data. Built as a portfolio project showcasing modern React development practices.

**[🚀 Live Demo](https://samollason.github.io/kraken-api-explorer/)**

![React](https://img.shields.io/badge/React-18-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue?logo=typescript)
![XState](https://img.shields.io/badge/XState-v5-orange)
![Styled Components](https://img.shields.io/badge/Styled_Components-v6-pink)

## 🎯 What is this?

Kraken Explorer is an educational tool that helps users understand:
- **Energy account data structures** - How accounts, properties, meters, and agreements relate
- **API patterns** - Visual breakdowns of GraphQL queries and REST endpoints
- **Industry terminology** - MPAN, MPRN, GSP regions, tariff codes decoded visually

### Key Features
- 🖱️ **Clickable info icons** - Every data field has an (i) button explaining its meaning and API mapping
- 🔍 **Tariff decoder** - Interactive modal that breaks down tariff codes like `E-1R-AGILE-FLEX-22-11-25-C`
- 📊 **Usage visualization** - Weekly consumption chart with electricity/gas breakdown
- 🎮 **Progress tracking** - Gamified exploration tracking which concepts you've learned
- 🌙 **Dark theme** - Inspired by Octopus Energy's brand colors

## 🛠️ Tech Stack

This project uses Kraken/Octopus Energy's tech stack:

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18.x | UI framework |
| TypeScript | 5.x | Type safety (strict mode) |
| Vite | 5.x | Build tool |
| Styled Components | 6.x | CSS-in-JS theming |
| XState | 5.x | State machine for navigation |
| Jest + RTL | Latest | Testing |

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/SamOllason/kraken-api-explorer.git
cd kraken-explorer

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Available Scripts

```bash
npm run dev        # Start dev server with HMR
npm run build      # Production build
npm run preview    # Preview production build
npm run test       # Run tests
npm run test:watch # Run tests in watch mode
npm run lint       # Run ESLint
npm run typecheck  # Run TypeScript type checking
```

## 📁 Project Structure

```
src/
├── components/
│   ├── common/          # Shared styled components
│   ├── Dashboard/       # Main dashboard view
│   ├── InfoPanel/       # Slide-in concept explanation panel
│   ├── TariffDecoder/   # Interactive tariff code decoder
│   └── UsageChart/      # Consumption visualization
├── data/
│   ├── concepts.ts      # Energy concept definitions
│   └── mockAccount.ts   # Realistic mock account data
├── machines/
│   └── explorerMachine.ts  # XState navigation machine
├── styles/
│   ├── theme.ts         # Styled-components theme
│   └── GlobalStyles.ts  # Global CSS
├── types/
│   └── kraken.ts        # TypeScript interfaces
├── App.tsx              # Root component
└── main.tsx             # Entry point
```

## 🎨 Design Decisions

### Why XState?
State management for this app involves coordinating:
- Panel open/close states
- Navigation between concepts
- Tracking visited concepts
- Modal overlays

XState provides a visual, declarative way to manage these states and makes impossible states impossible.

### Why Styled Components?
- Co-located styles with components
- Theme injection via React context
- Dynamic styling based on props
- Zero runtime for static styles

### Why Mock Data?
Using realistic mock data instead of a real API connection because:
1. No API credentials needed to run the demo
2. Demonstrates data structure understanding
3. Allows offline usage
4. Faster development iteration

## 🧪 Testing Strategy

- **Unit tests** for individual components
- **Integration tests** for user flows
- **Accessibility testing** via RTL queries

```bash
# Run all tests
npm run test

# Run tests with coverage
npm run test -- --coverage
```

## 📚 API Coverage

> **Estimated coverage: ~10-15%** of Kraken's full API surface

This project focuses on the **core data model concepts** for educational purposes, not comprehensive API coverage. It's designed as a "learn how Kraken structures energy data" tool rather than a full API client.

### ✅ What's Covered

| Concept | Description |
|---------|-------------|
| Account Number | Customer identifier (e.g., A-12B4C6D8) |
| MPAN | 13-digit electricity meter point number |
| MPRN | Gas meter point reference number |
| Tariff Code | Encoded product/region/date identifier |
| GSP Region | Grid Supply Point regional zone |
| Standing Charge | Daily fixed cost |
| Unit Rate | Per-kWh energy price |
| Consumption | Energy usage readings |
| Properties | Address and meter point relationships |
| Meters | Serial numbers, types, reading sources |
| Agreements | Tariff contracts with validity periods |

### ❌ What's Not Covered

The following areas of Kraken's API are **not** included in this explorer:

| Category | Examples |
|----------|----------|
| **Authentication** | OAuth flows, API key management |
| **Billing & Payments** | Statements, payment schedules, direct debits |
| **Smart Meter Operations** | Reading submissions, boost heating controls |
| **Quotes & Switching** | Quote generation, switch initiation |
| **Products Catalog** | Available tariffs, pricing tiers |
| **Intelligent Dispatch** | Intelligent Octopus, EV charging schedules |
| **Export Tariffs** | Outgoing Octopus, feed-in payments |
| **Real-time Pricing** | Agile/Tracker price feeds |
| **Webhooks** | Event notifications, callbacks |
| **GraphQL Mutations** | Account updates, preferences changes |
| **Saving Sessions** | Demand flexibility events |
| **Heat Pump APIs** | Cosy Octopus, heat pump controls |

## 📖 Guided Learning

Guided Learning is an interactive narrative experience that teaches Kraken API concepts through real-life scenarios. Follow **Sam** (you) and their dog **Obi** through a year as an energy customer.

### Chapter Roadmap

| # | Chapter | Status | Concepts Covered |
|---|---------|--------|------------------|
| 1 | **Welcome** | ✅ Done | Introduction to the journey |
| 2 | **Your First Bill** | ✅ Done | Standing charge, unit rate, consumption, tariff codes |
| 3 | **Understanding Your Tariff** | ✅ Done | Tariff decoding, GSP regions, rate types, product codes |
| 4 | **Moving Home** | 🚧 Planned | Properties, MPAN discovery, supply transfer |
| 5 | **Switching Tariff** | 🚧 Planned | Agreements, product catalog, validFrom/validTo |
| 6 | **Saving Session** | 🚧 Planned | Demand flexibility, consumption targets |
| 7 | **Agent View** | 🚧 Planned | Support agent perspective, account lookup |

### Progress Tracking
Guided Learning includes an **API Concepts Explorer** progress bar showing what percentage of Kraken's API surface you've explored. Click the (i) buttons throughout each chapter to learn about specific API endpoints and data structures.

## 🎯 Portfolio Context

This project was built to demonstrate:

1. **Technical proficiency** with modern React and TypeScript
2. **Domain understanding** of energy industry concepts
3. **UX thinking** - making complex data accessible
4. **Code quality** - clean architecture, testing, documentation
5. **Product sense** - identifying user needs (both customer and support agent perspectives)

## 📄 License

MIT

---

Built with 💚 for Kraken/Octopus Energy
