import {
    Site,
    Scenario,
    FeasibilityResult,
    CostBreakdown,
    BankabilityFlag,
    FinanceInputs,
} from "../domain/types";

export function calculateFeasibility(
    site: Site,
    scenario: Scenario
): FeasibilityResult {
    const { costInputs, financeInputs, salesInputs, taxInputs } = scenario;

    // 1. Construction Costs
    const totalGfa = scenario.grossFloorAreaPerDwelling * scenario.dwellings;
    const basementArea = scenario.includesBasement ? (scenario.basementAreaSqm || 0) : 0;

    const baseBuildCost =
        totalGfa * costInputs.buildRatePerSqm +
        basementArea * (costInputs.basementRatePerSqm || 0);

    const builderMargin = baseBuildCost * (costInputs.builderMarginPercent / 100);
    const constructionBase = baseBuildCost + builderMargin;

    // 2. Soft Costs
    let softCosts = 0;
    if (costInputs.softCostsOverrides) {
        softCosts =
            costInputs.softCostsOverrides.architect +
            costInputs.softCostsOverrides.townPlanning +
            costInputs.softCostsOverrides.openSpaceContribution +
            costInputs.softCostsOverrides.servicesContributions +
            costInputs.softCostsOverrides.lslLevy +
            costInputs.softCostsOverrides.other;
    } else {
        softCosts = (constructionBase * costInputs.softCostsPercent) / 100;
    }

    // 3. Contingency
    const contingency =
        (constructionBase + softCosts) * (costInputs.contingencyPercent / 100);

    // 4. Land & Acquisition
    const landAndAcquisition =
        costInputs.landPrice + costInputs.stampDuty + costInputs.legalAndDD;

    const grossConstruction = constructionBase + softCosts + contingency;

    // 5. Finance
    const peakDebtEstimate = estimatePeakDebt(
        landAndAcquisition,
        grossConstruction,
        financeInputs
    );

    const financeCost = estimateFinanceCost(
        peakDebtEstimate,
        financeInputs.interestRatePercent,
        financeInputs.projectDurationMonths
    );

    // 6. Sales & GST
    const grossSales = salesInputs.dwellings * salesInputs.avgSalePricePerDwelling;
    const sellingCosts = (grossSales * salesInputs.sellingCostPercent) / 100;

    const gstEstimate = estimateGst(
        grossSales,
        costInputs.landPrice,
        taxInputs.gstMarginScheme
    );

    const netSalesValue = grossSales - sellingCosts - gstEstimate;

    // 7. Totals
    const totalDevelopmentCost =
        landAndAcquisition + grossConstruction + financeCost;

    const profit = netSalesValue - totalDevelopmentCost;
    const marginOnCostPercent = (profit / totalDevelopmentCost) * 100;

    const bankabilityFlag = classifyBankability(marginOnCostPercent);

    const breakdown: CostBreakdown = {
        landAndAcquisition,
        construction: constructionBase,
        softCosts,
        contingency,
        finance: financeCost,
        gstEstimate,
        sellingCosts,
    };

    const notes: string[] = [];
    if (marginOnCostPercent < 15) {
        notes.push("Margin is below 15% - High Risk / Unbankable.");
    } else if (marginOnCostPercent < 18) {
        notes.push("Margin is tight (15-18%).");
    } else {
        notes.push("Healthy margin (>18%).");
    }

    return {
        scenarioId: scenario.id,
        grossRealisation: grossSales,
        totalDevelopmentCost,
        netSalesValue,
        profit,
        marginOnCostPercent,
        peakDebtEstimate,
        bankabilityFlag,
        breakdown,
        notes,
    };
}

function estimatePeakDebt(
    landCost: number,
    constructionCost: number,
    finance: FinanceInputs
): number {
    // Simplified: Land is 100% funded (or based on LVR) at start?
    // Usually Peak Debt = Land Loan + 100% of Construction Loan (at end).
    // But we use LVRs to determine the *loan amount*.
    // Peak Debt is roughly the max exposure.

    const landLoan = landCost * (finance.landLvrPercent / 100);
    const constructionLoan = constructionCost * (finance.constructionLvrPercent / 100);

    return landLoan + constructionLoan;
}

function estimateFinanceCost(
    peakDebt: number,
    ratePercent: number,
    durationMonths: number
): number {
    // Simplified: Assume land loan is held for full duration.
    // Construction loan is drawn down progressively (avg 50-60% utilization).
    // For simplicity in this v1, we'll take 65% of peak debt over the duration.
    // Interest = (Peak Debt * 0.65) * (Rate / 100) * (Months / 12)

    const utilizationFactor = 0.65;
    const annualRate = ratePercent / 100;
    const years = durationMonths / 12;

    return peakDebt * utilizationFactor * annualRate * years;
}

function estimateGst(
    grossSales: number,
    landCost: number,
    marginScheme: boolean
): number {
    if (marginScheme) {
        // GST on margin: (Sales - Land) / 11
        return Math.max(0, (grossSales - landCost) / 11);
    } else {
        // Full GST: Sales / 11
        return grossSales / 11;
    }
}

function classifyBankability(marginPercent: number): BankabilityFlag {
    if (marginPercent < 15) return "Red";
    if (marginPercent < 18) return "Amber";
    return "Green";
}
