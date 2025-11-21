// ---- Core Site Entities ----

export interface Site {
  id: string;
  name: string;          // "Bentleigh East – Eastwood St"
  address: string;
  council: string;       // "Monash", "Bayside", etc.
  zone: string;          // "GRZ1", "NRZ3", etc.
  overlays: string[];    // ["HO", "VPO", ...]
  areaSqm: number;
  frontageM: number;
  depthM: number;
  isCorner: boolean;
  easementsNotes?: string;
  createdAt: string;
  updatedAt: string;
}

// Council risk profile (static reference data)
export interface CouncilProfile {
  council: string;
  category: "Facilitator" | "Neutral" | "Protector";
  notes: string;
}

// Yield scoring result per product type
export type ProductType = "Duplex" | "Triplex" | "Quadplex";

export interface YieldScore {
  siteId: string;
  productType: ProductType;
  score: number;        // 0–100
  notes: string;        // e.g. "Frontage ideal, depth borderline"
}

// ---- Scenario & Feasibility Inputs ----

export interface Scenario {
  id: string;
  siteId: string;
  name: string;                   // "Triplex – High-End Spec"
  productType: ProductType;
  dwellings: number;
  storeys: number;
  grossFloorAreaPerDwelling: number;
  specLevel: "HighEnd" | "Luxury";
  includesBasement: boolean;
  basementAreaSqm?: number;
  planningInputs: PlanningInputs;
  costInputs: CostInputs;
  financeInputs: FinanceInputs;
  salesInputs: SalesInputs;
  taxInputs: TaxInputs;
  createdAt: string;
  updatedAt: string;
}

export interface PlanningInputs {
  siteCoveragePercent: number;
  permeabilityPercent: number;
  gardenAreaPercent: number;
  posPerDwellingSqm: number;
  secludedPosSqm: number;
  secludedPosMinWidthM: number;
  neighbourFrontSetbacksM?: number[]; // [left, right]
}

export interface CostInputs {
  landPrice: number;
  stampDuty: number;
  legalAndDD: number;
  buildRatePerSqm: number;        // commercial build rate incl. builder margin
  internalBuildRatePerSqm?: number; // optional – "wholesale" rate
  builderMarginPercent: number;
  softCostsPercent: number;
  softCostsOverrides?: SoftCostsBreakdown;
  contingencyPercent: number;
  basementRatePerSqm?: number;
}

export interface SoftCostsBreakdown {
  architect: number;
  townPlanning: number;
  openSpaceContribution: number;
  servicesContributions: number;
  lslLevy: number;
  other: number;
}

export interface FinanceInputs {
  landLvrPercent: number;
  constructionLvrPercent: number;
  interestRatePercent: number;
  projectDurationMonths: number;
  drawdownProfile?: "Linear" | "FrontLoaded" | "BackLoaded";
}

export interface SalesInputs {
  dwellings: number;
  avgSalePricePerDwelling: number;
  sellingCostPercent: number;
}

export interface TaxInputs {
  gstMarginScheme: boolean;
}

// ---- Derived Outputs ----

export interface ResCodeCheckResult {
  compliant: boolean;
  deemedToComply: boolean;
  issues: string[];
  suggestions: string[];
}

export type BankabilityFlag = "Red" | "Amber" | "Green";

export interface FeasibilityResult {
  scenarioId: string;
  grossRealisation: number;
  totalDevelopmentCost: number;
  netSalesValue: number;
  profit: number;
  marginOnCostPercent: number;
  peakDebtEstimate: number;
  bankabilityFlag: BankabilityFlag;
  breakdown: CostBreakdown;
  notes: string[];
}

export interface CostBreakdown {
  landAndAcquisition: number;
  construction: number;
  softCosts: number;
  contingency: number;
  finance: number;
  gstEstimate: number;
  sellingCosts: number;
}
