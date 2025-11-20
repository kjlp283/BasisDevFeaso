"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PlanningInputs } from "@/lib/domain/types";

interface Props {
    siteId: string;
    initialData?: PlanningInputs;
}

export function PlanningInputsForm({ siteId, initialData }: Props) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    // Default values or initial data
    const defaultValues: PlanningInputs = initialData || {
        siteCoveragePercent: 50,
        permeabilityPercent: 25,
        gardenAreaPercent: 35,
        posPerDwellingSqm: 40,
        secludedPosSqm: 25,
        secludedPosMinWidthM: 3,
        neighbourFrontSetbacksM: [],
    };

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setLoading(true);

        const formData = new FormData(event.currentTarget);

        const data = {
            siteCoveragePercent: Number(formData.get("siteCoveragePercent")),
            permeabilityPercent: Number(formData.get("permeabilityPercent")),
            gardenAreaPercent: Number(formData.get("gardenAreaPercent")),
            posPerDwellingSqm: Number(formData.get("posPerDwellingSqm")),
            secludedPosSqm: Number(formData.get("secludedPosSqm")),
            secludedPosMinWidthM: Number(formData.get("secludedPosMinWidthM")),
        };

        // In a real app, we'd save this to a Scenario. 
        // For v1, we'll store it in a temporary "Draft Scenario" or just pass it up to the parent via URL params/state if we want instant feedback.
        // However, the requirement is to have a "Planning" tab. 
        // Let's assume we are updating the "Active Scenario" for this site.
        // For simplicity in v1, we might create a default scenario if none exists, or just update a "planning" field on the site if we extended the model.

        // BUT, the domain model says PlanningInputs belong to a Scenario.
        // So we need a Scenario to edit.
        // Let's create a "Quick Check" scenario automatically if one doesn't exist, or just let the user play with numbers.

        // For this specific UI step, let's just emit the values or save to a default scenario.
        // We'll implement a simple "Save to Default Scenario" API.

        try {
            // TODO: Implement API to save planning inputs
            console.log("Saving planning inputs:", data);
            router.refresh();
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-sm border border-slate-200">
            <h3 className="text-lg font-semibold text-slate-900">Planning Envelope</h3>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                    <label className="block text-sm font-medium text-slate-700">Site Coverage (%)</label>
                    <input
                        name="siteCoveragePercent"
                        type="number"
                        defaultValue={defaultValues.siteCoveragePercent}
                        className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
                    />
                    <p className="text-xs text-slate-500 mt-1">Max 60% (ResCode)</p>
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700">Permeability (%)</label>
                    <input
                        name="permeabilityPercent"
                        type="number"
                        defaultValue={defaultValues.permeabilityPercent}
                        className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
                    />
                    <p className="text-xs text-slate-500 mt-1">Min 20%</p>
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700">Garden Area (%)</label>
                    <input
                        name="gardenAreaPercent"
                        type="number"
                        defaultValue={defaultValues.gardenAreaPercent}
                        className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
                    />
                    <p className="text-xs text-slate-500 mt-1">Min 35% for lots &gt;650m²</p>
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700">POS per Dwelling (m²)</label>
                    <input
                        name="posPerDwellingSqm"
                        type="number"
                        defaultValue={defaultValues.posPerDwellingSqm}
                        className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
                    />
                    <p className="text-xs text-slate-500 mt-1">Min 40m² total</p>
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700">Secluded POS (m²)</label>
                    <input
                        name="secludedPosSqm"
                        type="number"
                        defaultValue={defaultValues.secludedPosSqm}
                        className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
                    />
                    <p className="text-xs text-slate-500 mt-1">Min 25m²</p>
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700">SPOS Min Width (m)</label>
                    <input
                        name="secludedPosMinWidthM"
                        type="number"
                        defaultValue={defaultValues.secludedPosMinWidthM}
                        className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
                    />
                    <p className="text-xs text-slate-500 mt-1">Min 3m</p>
                </div>
            </div>

            <div className="pt-4">
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 font-medium disabled:opacity-50"
                >
                    Check Compliance
                </button>
            </div>
        </form>
    );
}
