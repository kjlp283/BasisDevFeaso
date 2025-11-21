"use client";

import { useState, useEffect } from "react";
import {
    CostInputs,
    FinanceInputs,
    SalesInputs,
    TaxInputs,
    FeasibilityResult,
    Site,
    Scenario
} from "@/lib/domain/types";
import { calculateFeasibility } from "@/lib/services/feasibility";

interface Props {
    site: Site;
    onCalculate: (result: FeasibilityResult) => void;
}

export function FeasibilityInputsForm({ site, onCalculate }: Props) {
    // Default values
    const [costInputs, setCostInputs] = useState<CostInputs>({
        landPrice: 1500000,
        stampDuty: 82500, // Approx 5.5%
        legalAndDD: 5000,
        buildRatePerSqm: 3500,
        builderMarginPercent: 20,
        softCostsPercent: 15,
        contingencyPercent: 5,
    });

    const [financeInputs, setFinanceInputs] = useState<FinanceInputs>({
        landLvrPercent: 65,
        constructionLvrPercent: 100,
        interestRatePercent: 7.5,
        projectDurationMonths: 18,
    });

    const [salesInputs, setSalesInputs] = useState<SalesInputs>({
        dwellings: 3,
        avgSalePricePerDwelling: 1200000,
        sellingCostPercent: 2.5,
    });

    const [taxInputs, setTaxInputs] = useState<TaxInputs>({
        gstMarginScheme: true,
    });

    const [scenarioParams, setScenarioParams] = useState({
        grossFloorAreaPerDwelling: 150,
        includesBasement: false,
        basementAreaSqm: 0,
    });

    const [isSaving, setIsSaving] = useState(false);
    const [scenarioName, setScenarioName] = useState("");
    const [showSaveModal, setShowSaveModal] = useState(false);

    // Calculate on any change
    useEffect(() => {
        const scenario: Scenario = {
            id: "temp",
            siteId: site.id,
            name: "Draft",
            productType: "Triplex", // Default
            dwellings: salesInputs.dwellings,
            storeys: 2,
            grossFloorAreaPerDwelling: scenarioParams.grossFloorAreaPerDwelling,
            specLevel: "HighEnd",
            includesBasement: scenarioParams.includesBasement,
            basementAreaSqm: scenarioParams.basementAreaSqm,
            planningInputs: {} as any, // Not needed for finance calc
            costInputs,
            financeInputs,
            salesInputs,
            taxInputs,
            createdAt: "",
            updatedAt: ""
        };

        const result = calculateFeasibility(site, scenario);
        onCalculate(result);
    }, [costInputs, financeInputs, salesInputs, taxInputs, scenarioParams, site, onCalculate]);

    const handleCostChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCostInputs(prev => ({ ...prev, [name]: Number(value) }));
    };

    const handleFinanceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFinanceInputs(prev => ({ ...prev, [name]: Number(value) }));
    };

    const handleSalesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSalesInputs(prev => ({ ...prev, [name]: Number(value) }));
    };

    const handleParamChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setScenarioParams(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : Number(value)
        }));
    };

    const handleSave = async () => {
        if (!scenarioName) return;
        setIsSaving(true);

        const scenarioData = {
            name: scenarioName,
            productType: "Triplex", // TODO: Make dynamic
            dwellings: salesInputs.dwellings,
            storeys: 2, // TODO: Make dynamic
            grossFloorAreaPerDwelling: scenarioParams.grossFloorAreaPerDwelling,
            specLevel: "HighEnd",
            includesBasement: scenarioParams.includesBasement,
            basementAreaSqm: scenarioParams.basementAreaSqm,
            planningInputs: {}, // TODO: Capture planning inputs if available
            costInputs,
            financeInputs,
            salesInputs,
            taxInputs,
        };

        try {
            const res = await fetch(`/api/sites/${site.id}/scenarios`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(scenarioData),
            });

            if (res.ok) {
                setShowSaveModal(false);
                setScenarioName("");
                alert("Scenario saved successfully!");
            } else {
                alert("Failed to save scenario.");
            }
        } catch (error) {
            console.error(error);
            alert("Error saving scenario.");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="space-y-8 relative">
            {/* Save Modal */}
            {showSaveModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h3 className="text-lg font-semibold mb-4">Save Scenario</h3>
                        <input
                            type="text"
                            placeholder="Scenario Name (e.g. Option A)"
                            value={scenarioName}
                            onChange={(e) => setScenarioName(e.target.value)}
                            className="w-full border border-slate-300 rounded-md p-2 mb-4"
                        />
                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => setShowSaveModal(false)}
                                className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-md"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                disabled={!scenarioName || isSaving}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                            >
                                {isSaving ? "Saving..." : "Save"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="flex justify-end">
                <button
                    onClick={() => setShowSaveModal(true)}
                    className="bg-slate-900 text-white px-4 py-2 rounded-md hover:bg-slate-800 font-medium flex items-center gap-2"
                >
                    <span>💾</span> Save Scenario
                </button>
            </div>

            {/* Project Scope */}
            <section className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Project Scope</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700">Number of Dwellings</label>
                        <input
                            name="dwellings"
                            type="number"
                            value={salesInputs.dwellings}
                            onChange={handleSalesChange}
                            className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700">Avg GFA per Dwelling (m²)</label>
                        <input
                            name="grossFloorAreaPerDwelling"
                            type="number"
                            value={scenarioParams.grossFloorAreaPerDwelling}
                            onChange={handleParamChange}
                            className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
                        />
                    </div>
                    <div className="flex items-center mt-6">
                        <input
                            name="includesBasement"
                            type="checkbox"
                            checked={scenarioParams.includesBasement}
                            onChange={handleParamChange}
                            className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                        />
                        <label className="ml-2 block text-sm text-slate-900">Includes Basement?</label>
                    </div>
                    {scenarioParams.includesBasement && (
                        <div>
                            <label className="block text-sm font-medium text-slate-700">Basement Area (m²)</label>
                            <input
                                name="basementAreaSqm"
                                type="number"
                                value={scenarioParams.basementAreaSqm}
                                onChange={handleParamChange}
                                className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
                            />
                        </div>
                    )}
                </div>
            </section>

            {/* Acquisition Costs */}
            <section className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Acquisition</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700">Land Price ($)</label>
                        <input
                            name="landPrice"
                            type="number"
                            value={costInputs.landPrice}
                            onChange={handleCostChange}
                            className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700">Stamp Duty ($)</label>
                        <input
                            name="stampDuty"
                            type="number"
                            value={costInputs.stampDuty}
                            onChange={handleCostChange}
                            className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700">Legal & DD ($)</label>
                        <input
                            name="legalAndDD"
                            type="number"
                            value={costInputs.legalAndDD}
                            onChange={handleCostChange}
                            className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
                        />
                    </div>
                </div>
            </section>

            {/* Construction & Soft Costs */}
            <section className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Construction & Costs</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700">Build Rate ($/m²)</label>
                        <input
                            name="buildRatePerSqm"
                            type="number"
                            value={costInputs.buildRatePerSqm}
                            onChange={handleCostChange}
                            className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700">Soft Costs (%)</label>
                        <input
                            name="softCostsPercent"
                            type="number"
                            value={costInputs.softCostsPercent}
                            onChange={handleCostChange}
                            className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700">Contingency (%)</label>
                        <input
                            name="contingencyPercent"
                            type="number"
                            value={costInputs.contingencyPercent}
                            onChange={handleCostChange}
                            className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
                        />
                    </div>
                </div>
            </section>

            {/* Finance */}
            <section className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Finance</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700">Interest Rate (%)</label>
                        <input
                            name="interestRatePercent"
                            type="number"
                            step="0.1"
                            value={financeInputs.interestRatePercent}
                            onChange={handleFinanceChange}
                            className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700">Duration (Months)</label>
                        <input
                            name="projectDurationMonths"
                            type="number"
                            value={financeInputs.projectDurationMonths}
                            onChange={handleFinanceChange}
                            className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700">Land LVR (%)</label>
                        <input
                            name="landLvrPercent"
                            type="number"
                            value={financeInputs.landLvrPercent}
                            onChange={handleFinanceChange}
                            className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
                        />
                    </div>
                </div>
            </section>

            {/* Sales */}
            <section className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Sales</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700">Avg Sale Price ($)</label>
                        <input
                            name="avgSalePricePerDwelling"
                            type="number"
                            value={salesInputs.avgSalePricePerDwelling}
                            onChange={handleSalesChange}
                            className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700">Selling Costs (%)</label>
                        <input
                            name="sellingCostPercent"
                            type="number"
                            step="0.1"
                            value={salesInputs.sellingCostPercent}
                            onChange={handleSalesChange}
                            className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
                        />
                    </div>
                    <div className="flex items-center mt-6">
                        <input
                            type="checkbox"
                            checked={taxInputs.gstMarginScheme}
                            onChange={(e) => setTaxInputs({ gstMarginScheme: e.target.checked })}
                            className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                        />
                        <label className="ml-2 block text-sm text-slate-900">Apply GST Margin Scheme?</label>
                    </div>
                </div>
            </section>
        </div>
    );
}
