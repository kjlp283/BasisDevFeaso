"use client";

import { useState } from "react";
import { Site, FeasibilityResult } from "@/lib/domain/types";
import { FeasibilityInputsForm } from "@/components/feasibility/FeasibilityInputsForm";
import { FeasibilitySummaryCard } from "@/components/feasibility/FeasibilitySummaryCard";

interface Props {
    site: Site;
}

export function FeasibilityPageClient({ site }: Props) {
    const [result, setResult] = useState<FeasibilityResult | null>(null);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
                <FeasibilityInputsForm site={site} onCalculate={setResult} />
            </div>

            <div className="lg:col-span-1">
                {result ? (
                    <FeasibilitySummaryCard result={result} />
                ) : (
                    <div className="bg-slate-50 p-6 rounded-lg border border-dashed border-slate-300 text-center text-slate-500">
                        Enter inputs to see feasibility results.
                    </div>
                )}
            </div>
        </div>
    );
}
