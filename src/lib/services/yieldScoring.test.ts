import { calculateYieldScores } from './yieldScoring';
import { Site } from '../domain/types';

describe('calculateYieldScores', () => {
    const baseSite: Site = {
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

    it('should score high for Quadplex on large corner site', () => {
        const site = { ...baseSite, areaSqm: 1000, frontageM: 25, isCorner: true };
        const scores = calculateYieldScores(site);
        const quadScore = scores.find(s => s.productType === 'Quadplex');
        expect(quadScore?.score).toBeGreaterThan(80);
    });

    it('should score low for Quadplex on small narrow site', () => {
        const site = { ...baseSite, areaSqm: 500, frontageM: 10 };
        const scores = calculateYieldScores(site);
        const quadScore = scores.find(s => s.productType === 'Quadplex');
        expect(quadScore?.score).toBeLessThan(40);
    });

    it('should score high for Duplex on standard site', () => {
        const site = { ...baseSite, areaSqm: 650, frontageM: 15 };
        const scores = calculateYieldScores(site);
        const duplexScore = scores.find(s => s.productType === 'Duplex');
        expect(duplexScore?.score).toBeGreaterThan(60);
    });
});
