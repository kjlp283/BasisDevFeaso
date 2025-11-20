import { Site } from "@prisma/client";
import { calculateYieldScores } from "@/lib/services/yieldScoring";
import { Site as DomainSite } from "@/lib/domain/types";

export function GoldenBlockScoreCard({ site }: { site: Site }) {
    // Convert Prisma site to Domain site
    const domainSite: DomainSite = {
        ...site,
        overlays: site.overlays ? site.overlays.split(",").map(s => s.trim()) : [],
        createdAt: site.createdAt.toISOString(),
        updatedAt: site.updatedAt.toISOString(),
    };

    const scores = calculateYieldScores(domainSite);

    return (
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-6">Golden Block Score</h3>
            <div className="space-y-6">
                {scores.map((score) => (
                    <div key={score.productType}>
                        <div className="flex justify-between items-end mb-1">
                            <span className="font-medium text-slate-700">{score.productType}</span>
                            <span className={`font-bold ${getScoreColor(score.score)}`}>
                                {score.score}/100
                            </span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-2.5 mb-2">
                            <div
                                className={`h-2.5 rounded-full ${getProgressBarColor(score.score)}`}
                                style={{ width: `${score.score}%` }}
                            ></div>
                        </div>
                        <p className="text-xs text-slate-500">{score.notes}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

function getScoreColor(score: number) {
    if (score >= 70) return "text-green-600";
    if (score >= 40) return "text-yellow-600";
    return "text-red-600";
}

function getProgressBarColor(score: number) {
    if (score >= 70) return "bg-green-500";
    if (score >= 40) return "bg-yellow-500";
    return "bg-red-500";
}
