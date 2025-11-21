import { calculateFeasibility } from './feasibility';
import { Site, Scenario } from '../domain/types';

describe('calculateFeasibility', () => {
    const mockSite: Site = {
        id: 'site-1',
        name: 'Test Site',
        address: '123 Test St',
        council: 'Bayside',
        zone: 'GRZ1',
        areaSqm: 800,
        frontageM: 20,
        depthM: 40,
        isCorner: false,
        overlays: [],
        createdAt: '',
        updatedAt: ''
    };

    const mockScenario: Scenario = {
        id: 'scenario-1',
        siteId: 'site-1',
        name: 'Test Scenario',
        productType: 'Townhouse' as any,
        dwellings: 3,
        storeys: 2,
        grossFloorAreaPerDwelling: 150,
        specLevel: 'HighEnd',
        includesBasement: false,
        basementAreaSqm: 0,
        planningInputs: {} as any,
        costInputs: {
            landPrice: 2000000,
            stampDuty: 110000,
            legalAndDD: 5000,
            buildRatePerSqm: 3500,
            builderMarginPercent: 20,
            softCostsPercent: 15,
            contingencyPercent: 5,
        },
        financeInputs: {
            landLvrPercent: 65,
            constructionLvrPercent: 100,
            interestRatePercent: 7.5,
            projectDurationMonths: 18,
        },
        salesInputs: {
            dwellings: 3,
            avgSalePricePerDwelling: 1500000,
            sellingCostPercent: 2.5,
        },
        taxInputs: {
            gstMarginScheme: true,
        },
        createdAt: '',
        updatedAt: ''
    };

    it('should calculate gross realisation correctly', () => {
        const result = calculateFeasibility(mockSite, mockScenario);
        expect(result.grossRealisation).toBe(4500000); // 3 * 1.5m
    });

    it('should calculate construction costs correctly', () => {
        const result = calculateFeasibility(mockSite, mockScenario);
        // GFA = 3 * 150 = 450
        // Base Build = 450 * 3500 = 1,575,000
        // Builder Margin = 20% of 1,575,000 = 315,000
        // Total Construction = 1,890,000
        expect(result.breakdown.construction).toBe(1890000);
    });

    it('should calculate profit correctly', () => {
        const result = calculateFeasibility(mockSite, mockScenario);
        expect(result.profit).toBeLessThan(result.grossRealisation);
        expect(result.profit).toBeDefined();
    });
});
