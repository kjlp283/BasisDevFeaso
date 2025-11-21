# Basis Dev Feasibility Platform - V1 Complete

## Project Overview
The "Basis Dev Feasibility" platform has been successfully built to V1 specifications. It allows users to:
1.  **Manage Sites**: Create and view residential development sites.
2.  **Assess Planning**: Check ResCode compliance and view Council Risk profiles.
3.  **Calculate Feasibility**: Input detailed costs, finance, and sales data to calculate profit, margin, and bankability.
4.  **Manage Scenarios**: Save multiple feasibility scenarios for a single site and compare them.
5.  **Generate Reports**: View and print a "Feasibility Pack" summary.

## Key Features Implemented
-   **Tech Stack**: Next.js 15, TypeScript, Tailwind CSS, Prisma (SQLite).
-   **Domain Logic**:
    -   `yieldScoring.ts`: Calculates suitability for Duplex/Triplex/Quadplex.
    -   `rescode.ts`: Checks compliance with Clause 55 standards.
    -   `feasibility.ts`: Comprehensive financial modelling (Residual Land Value, Profit, Margin, Peak Debt).
-   **UI Components**:
    -   `SiteForm`, `SiteSnapshotCard`
    -   `PlanningInputsForm`, `ResCodeComplianceCard`
    -   `FeasibilityInputsForm`, `FeasibilitySummaryCard`
    -   `ScenarioList`
    -   `ReportsPageClient` (Print-friendly)

## Verification
-   **Unit Tests**: All core services (`feasibility`, `rescode`, `yieldScoring`) have passing Jest tests.
-   **Browser Tests**: Verified navigation, site creation, feasibility calculation, scenario saving, and reports page rendering.

## Next Steps (V2 Roadmap)
1.  **Authentication**: Implement user login (e.g., Clerk or NextAuth).
2.  **Database**: Migrate from SQLite to Postgres for production.
3.  **AI Integration**: Use LLMs to parse "Easements" text and auto-populate planning inputs.
4.  **Comparables**: Integrate real estate API for sales evidence.
5.  **PDF Generation**: Server-side PDF generation for more robust reporting.

## How to Run
1.  `npm install`
2.  `npx prisma migrate dev`
3.  `npm run dev`
4.  Open `http://localhost:3000`
