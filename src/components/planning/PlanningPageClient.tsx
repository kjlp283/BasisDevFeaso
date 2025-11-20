"use client";

import { useState } from "react";
import { Site, PlanningInputs, ResCodeCheckResult } from "@/lib/domain/types";
import { checkResCodeCompliance } from "@/lib/services/rescode";
import { ResCodeComplianceCard } from "@/components/planning/ResCodeComplianceCard";
import { CouncilRiskCard } from "@/components/sites/CouncilRiskCard";

interface Props {
    site: Site;
}

export function PlanningPageClient({ site }: Props) {
    const [inputs, setInputs] = useState<PlanningInputs>({
        siteCoveragePercent: 50,
        permeabilityPercent: 25,
        gardenAreaPercent: 35,
        posPerDwellingSqm: 40,
        secludedPosSqm: 25,
        secludedPosMinWidthM: 3,
        neighbourFrontSetbacksM: [],
    });

    const [result, setResult] = useState<ResCodeCheckResult>(
        checkResCodeCompliance(site, inputs)
    );

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        const newInputs = { ...inputs, [name]: Number(value) };
        setInputs(newInputs);
        setResult(checkResCodeCompliance(site, newInputs));
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                    <h3 className="text-lg font-semibold text-slate-900 mb-4">Planning Inputs</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700">Site Coverage (%)</label>
                            <input
                                name="siteCoveragePercent"
                                type="number"
                                value={inputs.siteCoveragePercent}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
                            />
                            <p className="text-xs text-slate-500 mt-1">Max 60%</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700">Permeability (%)</label>
                            <input
                                name="permeabilityPercent"
                                type="number"
                                value={inputs.permeabilityPercent}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
                            />
                            <p className="text-xs text-slate-500 mt-1">Min 20%</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700">Garden Area (%)</label>
                            <input
                                name="gardenAreaPercent"
                                type="number"
                                value={inputs.gardenAreaPercent}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
                            />
                            <p className="text-xs text-slate-500 mt-1">Min 35% (GRZ &gt;650m²)</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700">POS per Dwelling (m²)</label>
                            <input
                                name="posPerDwellingSqm"
                                type="number"
                                value={inputs.posPerDwellingSqm}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
                            />
                            <p className="text-xs text-slate-500 mt-1">Min 40m²</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700">Secluded POS (m²)</label>
                            <input
                                name="secludedPosSqm"
                                type="number"
                                value={inputs.secludedPosSqm}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
                            />
                            <p className="text-xs text-slate-500 mt-1">Min 25m²</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700">SPOS Min Width (m)</label>
                            <input
                                name="secludedPosMinWidthM"
                                type="number"
                                value={inputs.secludedPosMinWidthM}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
                            />
                            <p className="text-xs text-slate-500 mt-1">Min 3m</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="lg:col-span-2 space-y-6">
                <ResCodeComplianceCard result={result} />
                <CouncilRiskCard councilName={site.council} />
            </div>
        </div>
    );
}
