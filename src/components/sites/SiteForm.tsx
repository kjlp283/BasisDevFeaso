"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { COUNCIL_PROFILES } from "@/lib/domain/councilProfiles";

export function SiteForm() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setLoading(true);

        const formData = new FormData(event.currentTarget);

        try {
            const response = await fetch("/api/sites", {
                method: "POST",
                body: JSON.stringify(Object.fromEntries(formData)),
                headers: { "Content-Type": "application/json" },
            });

            if (!response.ok) throw new Error("Failed to create site");

            const site = await response.json();
            router.push(`/sites/${site.id}`);
            router.refresh();
        } catch (error) {
            console.error(error);
            alert("Error creating site");
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl bg-white p-8 rounded-lg shadow-sm border border-slate-200">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="col-span-2">
                    <label className="block text-sm font-medium text-slate-700">Site Name / Nickname</label>
                    <input
                        name="name"
                        required
                        placeholder="e.g. Bentleigh East – Eastwood St"
                        className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
                    />
                </div>

                <div className="col-span-2">
                    <label className="block text-sm font-medium text-slate-700">Address</label>
                    <input
                        name="address"
                        required
                        className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700">Council</label>
                    <select
                        name="council"
                        required
                        className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
                    >
                        <option value="">Select Council</option>
                        {COUNCIL_PROFILES.map((c) => (
                            <option key={c.council} value={c.council}>
                                {c.council}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700">Zone</label>
                    <input
                        name="zone"
                        required
                        placeholder="e.g. GRZ1"
                        className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700">Site Area (m²)</label>
                    <input
                        name="areaSqm"
                        type="number"
                        step="1"
                        required
                        className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700">Frontage (m)</label>
                    <input
                        name="frontageM"
                        type="number"
                        step="0.1"
                        required
                        className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700">Depth (m)</label>
                    <input
                        name="depthM"
                        type="number"
                        step="0.1"
                        required
                        className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
                    />
                </div>

                <div className="flex items-center h-full pt-6">
                    <input
                        name="isCorner"
                        type="checkbox"
                        className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    />
                    <label className="ml-2 block text-sm text-slate-900">Corner Site?</label>
                </div>

                <div className="col-span-2">
                    <label className="block text-sm font-medium text-slate-700">Overlays (comma separated)</label>
                    <input
                        name="overlays"
                        placeholder="e.g. HO, VPO"
                        className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
                    />
                </div>
            </div>

            <div className="flex justify-end pt-4">
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 font-medium disabled:opacity-50"
                >
                    {loading ? "Creating..." : "Create Site"}
                </button>
            </div>
        </form>
    );
}
