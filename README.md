# Basis Dev Feasibility

A web-based feasibility platform for **Melbourne-based boutique residential development** (2-4 dwelling projects).

## Overview

Basis Dev Feasibility helps builders pivoting into development evaluate sites for duplex, triplex, and quadplex projects. The platform provides:

- **Golden Block Scoring**: Automated site assessment for different dwelling configurations
- **ResCode Compliance**: Real-time Clause 55 compliance checking
- **Financial Feasibility**: Complete development cost modeling (coming soon)
- **Council Risk Profiling**: Melbourne council categorization and planning insights

## Features (v1)

### ✅ Implemented
- **Site Management**: Create and manage development sites with key metrics
- **Golden Block Scoring**: Automatic yield scoring for Duplex/Triplex/Quadplex
- **Planning & ResCode**: Interactive compliance checker with real-time feedback
- **Council Profiles**: Risk categorization (Facilitator/Neutral/Protector)

### 🚧 In Progress
- Financial Feasibility Engine
- Scenario Comparison
- Report Generation

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: SQLite via Prisma ORM
- **State**: React (Client Components)

## Getting Started

### Prerequisites
- Node.js 18+
- npm

### Installation

```bash
# Install dependencies
npm install

# Set up database
npx prisma generate
npx prisma migrate dev --name init

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Project Structure

```
src/
├── app/                    # Next.js pages
│   ├── sites/             # Site management routes
│   └── api/               # API routes
├── components/            # React components
│   ├── layout/           # Layout components (Sidebar, PageHeader)
│   ├── sites/            # Site-specific components
│   └── planning/         # Planning & ResCode components
├── lib/
│   ├── domain/           # Domain types and data
│   │   ├── types.ts      # TypeScript interfaces
│   │   └── councilProfiles.ts
│   └── services/         # Business logic
│       ├── yieldScoring.ts
│       ├── rescode.ts
│       └── feasibility.ts
└── prisma/
    └── schema.prisma     # Database schema
```

## Domain Model

### Site
Core entity representing a development site with:
- Location details (address, council, zone)
- Dimensions (area, frontage, depth)
- Overlays and constraints

### Yield Scoring
Evaluates site suitability for:
- **Duplex**: Side-by-side configuration
- **Triplex**: 1 front + 2 rear
- **Quadplex**: 4 dwellings (terrace/townhouse)

Scoring considers:
- Frontage width
- Site area
- Depth
- Corner status
- Zoning

### ResCode Compliance
Checks against Clause 55 standards:
- Site coverage (max 60%)
- Permeability (min 20%)
- Garden area (min 35% for GRZ >650m²)
- Private Open Space (min 40m² per dwelling)
- Secluded POS (min 25m², 3m width)

## Council Profiles

Pre-configured profiles for Melbourne councils:

**Facilitators**: Monash, Kingston, Manningham, Darebin, Merri-bek
**Protectors**: Bayside, Boroondara, Stonnington
**Neutral**: Glen Eira

## Development Roadmap

- [ ] Financial Feasibility Calculator
- [ ] Scenario Management & Comparison
- [ ] PDF Report Generation
- [ ] Sensitivity Analysis
- [ ] Multi-user support (PostgreSQL migration)
- [ ] Map integration

## License

Private - Basis Builders

## Author

Built for Basis Builders by Antigravity AI
