import { Site, PlanningInputs, ResCodeCheckResult } from "../domain/types";

export function checkResCodeCompliance(
    site: Site,
    planning: PlanningInputs
): ResCodeCheckResult {
    const issues: string[] = [];
    const suggestions: string[] = [];

    // Site coverage
    if (planning.siteCoveragePercent > 60) {
        issues.push("Site coverage exceeds 60% maximum.");
        suggestions.push("Reduce built form to < 60% coverage (target ≤ 58%).");
    } else if (planning.siteCoveragePercent > 58) {
        suggestions.push("Site coverage is compliant but high (>58%). Consider reducing.");
    }

    // Permeability
    if (planning.permeabilityPercent < 20) {
        issues.push("Permeability below 20% minimum.");
        suggestions.push("Increase permeable surfaces (garden, permeable paving).");
    }

    // Garden area for GRZ lots > 650m²
    // Note: This is a mandatory requirement for GRZ, not just Clause 55 standard.
    if (site.zone.toUpperCase().includes("GRZ") && site.areaSqm > 650) {
        if (planning.gardenAreaPercent < 35) {
            issues.push("Garden area below mandatory 35% for GRZ lots > 650m².");
            suggestions.push("Increase garden area to ≥ 35%. This is non-negotiable.");
        }
    }

    // POS
    if (planning.posPerDwellingSqm < 40) {
        issues.push("Private open space per dwelling below 40m².");
        suggestions.push("Increase total POS per dwelling.");
    }

    if (planning.secludedPosSqm < 25) {
        issues.push("Secluded POS below 25m².");
        suggestions.push("Ensure at least 25m² of secluded POS.");
    }

    if (planning.secludedPosMinWidthM < 3) {
        issues.push("Secluded POS minimum width is less than 3m.");
        suggestions.push("Widen secluded POS area.");
    }

    const compliant = issues.length === 0;
    // In this simplified model, if it passes these checks, we deem it "Deemed to Comply" for the quantitative parts.
    const deemedToComply = compliant;

    return { compliant, deemedToComply, issues, suggestions };
}
