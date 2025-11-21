import { checkResCodeCompliance } from './rescode';
import { Site, PlanningInputs } from '../domain/types';

describe('checkResCodeCompliance', () => {
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

    const mockInputs: PlanningInputs = {
        siteCoveragePercent: 50,
        permeabilityPercent: 30,
        gardenAreaPercent: 40,
        posPerDwellingSqm: 50,
        secludedPosSqm: 30,
        secludedPosMinWidthM: 4,
    };

    it('should pass when all inputs are compliant', () => {
        const result = checkResCodeCompliance(mockSite, mockInputs);
        expect(result.compliant).toBe(true);
        expect(result.issues).toHaveLength(0);
    });

    it('should fail when site coverage is too high', () => {
        const inputs = { ...mockInputs, siteCoveragePercent: 70 };
        const result = checkResCodeCompliance(mockSite, inputs);
        expect(result.compliant).toBe(false);
        expect(result.issues).toContain('Site coverage exceeds 60% maximum.');
    });

    it('should fail when permeability is too low', () => {
        const inputs = { ...mockInputs, permeabilityPercent: 10 };
        const result = checkResCodeCompliance(mockSite, inputs);
        expect(result.compliant).toBe(false);
        expect(result.issues).toContain('Permeability below 20% minimum.');
    });

    it('should fail when garden area is too low for large site', () => {
        // Site > 650sqm requires 35%
        const inputs = { ...mockInputs, gardenAreaPercent: 20 };
        const result = checkResCodeCompliance(mockSite, inputs);
        expect(result.compliant).toBe(false);
        expect(result.issues).toContain('Garden area below mandatory 35% for GRZ lots > 650m².');
    });
});
