import { ResCodeCheckResult } from "@/lib/domain/types";

interface Props {
    result: ResCodeCheckResult;
}

export function ResCodeComplianceCard({ result }: Props) {
    return (
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-slate-900">ResCode Check</h3>
                {result.deemedToComply ? (
                    <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-bold rounded-full">
                        Deemed to Comply
                    </span>
                ) : (
                    <span className="px-3 py-1 bg-red-100 text-red-800 text-sm font-bold rounded-full">
                        Non-Compliant
                    </span>
                )}
            </div>

            {result.issues.length === 0 && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-md mb-6">
                    <p className="text-green-700 text-sm">
                        All checked quantitative standards appear to be met.
                    </p>
                </div>
            )}

            {result.issues.length > 0 && (
                <div className="mb-6">
                    <h4 className="text-sm font-medium text-slate-900 mb-2">Issues</h4>
                    <ul className="space-y-2">
                        {result.issues.map((issue, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-red-600">
                                <span className="mt-0.5">❌</span>
                                <span>{issue}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {result.suggestions.length > 0 && (
                <div>
                    <h4 className="text-sm font-medium text-slate-900 mb-2">Suggestions</h4>
                    <ul className="space-y-2">
                        {result.suggestions.map((suggestion, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-blue-600">
                                <span className="mt-0.5">💡</span>
                                <span>{suggestion}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
