import { calculateYieldScores } from "../src/lib/services/yieldScoring";
import { checkResCodeCompliance } from "../src/lib/services/rescode";
import { calculateFeasibility } from "../src/lib/services/feasibility";
import { Site, Scenario, PlanningInputs, CostInputs, FinanceInputs, SalesInputs, TaxInputs } from "../src/lib/domain/types";

const mockSite: Site = {
    id: "site-1",
    name: "Test Site",
    address: "123 Test St",
    council: "Monash",
    zone: "GRZ1",
    overlays: [],
    areaSqm: 700,
    frontageM: 16,
    depthM: 43,
    isCorner: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
};

console.log("--- Yield Scores ---");
console.log(calculateYieldScores(mockSite));

const mockPlanning: PlanningInputs = {
    siteCoveragePercent: 55,
    permeabilityPercent: 25,
    gardenAreaPercent: 36,
    posPerDwellingSqm: 50,
    secludedPosSqm: 30,
    secludedPosMinWidthM: 3.5,
};

console.log("\n--- ResCode Check ---");
console.log(checkResCodeCompliance(mockSite, mockPlanning));

const mockScenario: Scenario = {
    id: "scen-1",
    siteId: "site-1",
    name: "Triplex Test",
    productType: "Triplex",
    dwellings: 3,
    storeys: 2,
    grossFloorAreaPerDwelling: 150,
    specLevel: "HighEnd",
    includesBasement: false,
    planningInputs: mockPlanning,
    costInputs: {
        landPrice: 1500000,
        stampDuty: 82500,
        legalAndDD: 5000,
        buildRatePerSqm: 3000,
        builderMarginPercent: 20,
        softCostsPercent: 15,
        contingencyPercent: 5,
    },
    financeInputs: {
        landLvrPercent: 60,
        constructionLvrPercent: 100, // usually funded 100% of cost
        interestRatePercent: 7.5,
        projectDurationMonths: 18,
    },
    salesInputs: {
        dwellings: 3,
        avgSalePricePerDwelling: 1200000,
        sellingCostPercent: 2.5,
    },
    taxInputs: {
        gstMarginScheme: true,
    },
    createdAt: "",
    updatedAt: ""
};

console.log("\n--- Feasibility ---");
const feas = calculateFeasibility(mockSite, mockScenario);
console.log("Profit:", feas.profit);
console.log("Margin:", feas.marginOnCostPercent.toFixed(2) + "%");
console.log("Bankability:", feas.bankabilityFlag);
