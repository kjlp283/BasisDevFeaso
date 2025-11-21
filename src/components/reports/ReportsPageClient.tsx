"use client";

import { Site, Scenario, FeasibilityResult } from "@/lib/domain/types";
import { calculateFeasibility } from "@/lib/services/feasibility";
import { calculateYieldScores } from "@/lib/services/yieldScoring";

interface Props {
    site: Site;
    scenarios: Scenario[];
}

export function ReportsPageClient({ site, scenarios }: Props) {
    const yieldScores = calculateYieldScores(site);

    const getScore = (type: string) => yieldScores.find(s => s.productType === type)?.score || 0;

    const getResult = (scenario: Scenario): FeasibilityResult => {
        return calculateFeasibility(site, scenario);
    };

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="space-y-8 print:space-y-6">
            <div className="flex justify-end print:hidden">
                <button
                    onClick={handlePrint}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 font-medium flex items-center gap-2"
                >
                    <span>🖨️</span> Print Feasibility Pack
                </button>
            </div>

            {/* Site Summary */}
            <section className="bg-white p-8 rounded-lg shadow-sm border border-slate-200 print:border-none print:shadow-none print:p-0">
                <div className="border-b border-slate-200 pb-6 mb-6">
                    <h2 className="text-2xl font-bold text-slate-900">{site.name}</h2>
                    <p className="text-slate-500">{site.address}</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                    <div>
                        <p className="text-sm text-slate-500">Council</p>
                        <p className="font-medium">{site.council}</p>
                    </div>
                    <div>
                        <p className="text-sm text-slate-500">Zone</p>
                        <p className="font-medium">{site.zone}</p>
                    </div>
                    <div>
                        <p className="text-sm text-slate-500">Area</p>
                        <p className="font-medium">{site.areaSqm} m²</p>
                    </div>
                    <div>
                        <p className="text-sm text-slate-500">Frontage</p>
                        <p className="font-medium">{site.frontageM} m</p>
                    </div>
                </div>

                <div className="mb-8">
                    <h3 className="text-lg font-semibold text-slate-900 mb-4">Yield Potential</h3>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="p-4 bg-slate-50 rounded-md">
                            <p className="text-sm font-medium text-slate-700">Duplex</p>
                            <div className="mt-2 h-2 bg-slate-200 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-blue-500"
                                    style={{ width: `${getScore("Duplex")}%` }}
                                />
                            </div>
                            <p className="text-xs text-slate-500 mt-1">{getScore("Duplex")}/100</p>
                        </div>
                        <div className="p-4 bg-slate-50 rounded-md">
                            <p className="text-sm font-medium text-slate-700">Triplex</p>
                            <div className="mt-2 h-2 bg-slate-200 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-purple-500"
                                    style={{ width: `${getScore("Triplex")}%` }}
                                />
                            </div>
                            <p className="text-xs text-slate-500 mt-1">{getScore("Triplex")}/100</p>
                        </div>
                        <div className="p-4 bg-slate-50 rounded-md">
                            <p className="text-sm font-medium text-slate-700">Quadplex</p>
                            <div className="mt-2 h-2 bg-slate-200 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-teal-500"
                                    style={{ width: `${getScore("Quadplex")}%` }}
                                />
                            </div>
                            <p className="text-xs text-slate-500 mt-1">{getScore("Quadplex")}/100</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Scenario Comparison */}
            {scenarios.length > 0 && (
                <section className="bg-white p-8 rounded-lg shadow-sm border border-slate-200 print:border-none print:shadow-none print:p-0 print:break-before-page">
                    <h3 className="text-lg font-semibold text-slate-900 mb-6">Scenario Comparison</h3>

                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-slate-200">
                            <thead>
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Metric</th>
                                    {scenarios.map(s => (
                                        <th key={s.id} className="px-4 py-3 text-left text-xs font-medium text-slate-900 uppercase tracking-wider">
                                            {s.name}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-slate-200">
                                <tr>
                                    <td className="px-4 py-3 text-sm font-medium text-slate-900">Product</td>
                                    {scenarios.map(s => (
                                        <td key={s.id} className="px-4 py-3 text-sm text-slate-500">{s.productType} ({s.dwellings} dwgs)</td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className="px-4 py-3 text-sm font-medium text-slate-900">Net Profit</td>
                                    {scenarios.map(s => {
                                        const res = getResult(s);
                                        return (
                                            <td key={s.id} className={`px-4 py-3 text-sm font-bold ${res.profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                                {new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD', maximumFractionDigits: 0 }).format(res.profit)}
                                            </td>
                                        );
                                    })}
                                </tr>
                                <tr>
                                    <td className="px-4 py-3 text-sm font-medium text-slate-900">Margin on Cost</td>
                                    {scenarios.map(s => {
                                        const res = getResult(s);
                                        return (
                                            <td key={s.id} className="px-4 py-3 text-sm text-slate-500">
                                                {res.marginOnCostPercent.toFixed(2)}%
                                            </td>
                                        );
                                    })}
                                </tr>
                                <tr>
                                    <td className="px-4 py-3 text-sm font-medium text-slate-900">Total Dev Cost</td>
                                    {scenarios.map(s => {
                                        const res = getResult(s);
                                        return (
                                            <td key={s.id} className="px-4 py-3 text-sm text-slate-500">
                                                {new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD', maximumFractionDigits: 0 }).format(res.totalDevelopmentCost)}
                                            </td>
                                        );
                                    })}
                                </tr>
                                <tr>
                                    <td className="px-4 py-3 text-sm font-medium text-slate-900">Bankability</td>
                                    {scenarios.map(s => {
                                        const res = getResult(s);
                                        return (
                                            <td key={s.id} className="px-4 py-3 text-sm">
                                                <span className={`px-2 py-1 text-xs font-bold rounded-full ${res.bankabilityFlag === 'Green' ? 'bg-green-100 text-green-800' :
                                                        res.bankabilityFlag === 'Amber' ? 'bg-yellow-100 text-yellow-800' :
                                                            'bg-red-100 text-red-800'
                                                    }`}>
                                                    {res.bankabilityFlag}
                                                </span>
                                            </td>
                                        );
                                    })}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>
            )}
        </div>
    );
}
