"use client";

import { useEffect, useState } from "react";
import { Scenario, FeasibilityResult, Site } from "@/lib/domain/types";
import { calculateFeasibility } from "@/lib/services/feasibility";

interface Props {
    site: Site;
}

export function ScenarioList({ site }: Props) {
    const [scenarios, setScenarios] = useState<Scenario[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchScenarios() {
            try {
                const res = await fetch(`/api/sites/${site.id}/scenarios`);
                if (res.ok) {
                    const data = await res.json();
                    // Parse JSON blobs
                    const parsedScenarios = data.map((s: any) => ({
                        ...s,
                        planningInputs: JSON.parse(s.planningInputs),
                        costInputs: JSON.parse(s.costInputs),
                        financeInputs: JSON.parse(s.financeInputs),
                        salesInputs: JSON.parse(s.salesInputs),
                        taxInputs: JSON.parse(s.taxInputs),
                    }));
                    setScenarios(parsedScenarios);
                }
            } catch (error) {
                console.error("Failed to fetch scenarios", error);
            } finally {
                setLoading(false);
            }
        }

        fetchScenarios();
    }, [site.id]);

    const getResult = (scenario: Scenario): FeasibilityResult => {
        return calculateFeasibility(site, scenario);
    };

    if (loading) return <div>Loading scenarios...</div>;

    if (scenarios.length === 0) {
        return (
            <div className="text-center p-12 bg-slate-50 rounded-lg border border-dashed border-slate-300">
                <p className="text-slate-500">No scenarios saved yet.</p>
                <p className="text-sm text-slate-400 mt-1">Create a scenario from the Feasibility tab.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {scenarios.map((scenario) => {
                const result = getResult(scenario);
                return (
                    <div key={scenario.id} className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="font-semibold text-slate-900">{scenario.name}</h3>
                                <p className="text-sm text-slate-500">{scenario.productType} • {scenario.dwellings} Dwellings</p>
                            </div>
                            <span className={`px-2 py-1 text-xs font-bold rounded-full ${result.bankabilityFlag === 'Green' ? 'bg-green-100 text-green-800' :
                                    result.bankabilityFlag === 'Amber' ? 'bg-yellow-100 text-yellow-800' :
                                        'bg-red-100 text-red-800'
                                }`}>
                                {result.bankabilityFlag}
                            </span>
                        </div>

                        <div className="space-y-2 mb-6">
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-500">Profit</span>
                                <span className={`font-medium ${result.profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                    {new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD', maximumFractionDigits: 0 }).format(result.profit)}
                                </span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-500">Margin</span>
                                <span className="font-medium">{result.marginOnCostPercent.toFixed(2)}%</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-500">TDC</span>
                                <span className="font-medium">
                                    {new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD', maximumFractionDigits: 0 }).format(result.totalDevelopmentCost)}
                                </span>
                            </div>
                        </div>

                        <div className="pt-4 border-t border-slate-100 flex justify-end gap-2">
                            <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                                View Details &rarr;
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
