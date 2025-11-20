import { Site, YieldScore, ProductType } from "../domain/types";

export function calculateYieldScores(site: Site): YieldScore[] {
    const scores: YieldScore[] = [];

    scores.push(scoreDuplex(site));
    scores.push(scoreTriplex(site));
    scores.push(scoreQuadplex(site));

    return scores;
}

function scoreDuplex(site: Site): YieldScore {
    let score = 50; // Start neutral
    const notes: string[] = [];

    // Frontage
    if (site.frontageM >= 14) {
        score += 30;
        notes.push("Excellent frontage (14m+) for side-by-side.");
    } else if (site.frontageM >= 12.5) {
        score += 10;
        notes.push("Adequate frontage.");
    } else {
        score -= 30;
        notes.push("Frontage narrow for side-by-side (<12.5m).");
    }

    // Area
    if (site.areaSqm >= 600 && site.areaSqm <= 750) {
        score += 20;
        notes.push("Ideal site area.");
    } else if (site.areaSqm < 600) {
        score -= 20;
        notes.push("Site area small.");
    }

    // Zone
    if (site.zone.includes("GRZ") || site.zone.includes("NRZ")) {
        score += 10; // Standard residential
    }

    return {
        siteId: site.id,
        productType: "Duplex",
        score: clampScore(score),
        notes: notes.join(" "),
    };
}

function scoreTriplex(site: Site): YieldScore {
    let score = 40;
    const notes: string[] = [];

    // Frontage
    if (site.frontageM >= 16) {
        score += 30;
        notes.push("Strong frontage for driveway + front dwelling.");
    } else if (site.frontageM < 15) {
        score -= 30;
        notes.push("Frontage likely too narrow for triplex.");
    }

    // Area
    if (site.areaSqm >= 750) {
        score += 20;
        notes.push("Good site area.");
    } else {
        score -= 20;
        notes.push("Area tight for 3 dwellings.");
    }

    // Depth
    if (site.depthM >= 45) {
        score += 10;
        notes.push("Good depth.");
    } else {
        notes.push("Depth may be limiting.");
    }

    return {
        siteId: site.id,
        productType: "Triplex",
        score: clampScore(score),
        notes: notes.join(" "),
    };
}

function scoreQuadplex(site: Site): YieldScore {
    let score = 30;
    const notes: string[] = [];

    // Frontage
    if (site.frontageM >= 20 || site.isCorner) {
        score += 40;
        notes.push("Excellent frontage/corner for 4 dwellings.");
    } else {
        score -= 40;
        notes.push("Frontage insufficient for quadplex.");
    }

    // Area
    if (site.areaSqm >= 900) {
        score += 30;
        notes.push("Area supports density.");
    } else {
        score -= 30;
        notes.push("Area too small.");
    }

    return {
        siteId: site.id,
        productType: "Quadplex",
        score: clampScore(score),
        notes: notes.join(" "),
    };
}

function clampScore(score: number): number {
    return Math.max(0, Math.min(100, score));
}
