import { FeasibilityResult } from "@/lib/domain/types";

interface Props {
    result: FeasibilityResult;
}

export function FeasibilitySummaryCard({ result }: Props) {
    const formatCurrency = (val: number) =>
        new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD', maximumFractionDigits: 0 }).format(val);

    const formatPercent = (val: number) =>
        `${val.toFixed(2)}%`;

    const getBankabilityColor = (flag: string) => {
        switch (flag) {
            case "Green": return "bg-green-100 text-green-800 border-green-200";
            case "Amber": return "bg-yellow-100 text-yellow-800 border-yellow-200";
            case "Red": return "bg-red-100 text-red-800 border-red-200";
            default: return "bg-slate-100 text-slate-800";
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden sticky top-6">
            <div className="p-6 border-b border-slate-100">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Feasibility Summary</h3>

                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                        <p className="text-sm text-slate-500">Net Profit</p>
                        <p className={`text-2xl font-bold ${result.profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {formatCurrency(result.profit)}
                        </p>
                    </div>
                    <div>
                        <p className="text-sm text-slate-500">Margin on Cost</p>
                        <div className="flex items-center gap-2">
                            <p className={`text-2xl font-bold ${result.marginOnCostPercent >= 18 ? 'text-green-600' : result.marginOnCostPercent >= 15 ? 'text-yellow-600' : 'text-red-600'}`}>
                                {formatPercent(result.marginOnCostPercent)}
                            </p>
                        </div>
                    </div>
                </div>

                <div className={`px-4 py-2 rounded-md border text-center font-medium ${getBankabilityColor(result.bankabilityFlag)}`}>
                    Bankability: {result.bankabilityFlag}
                </div>
            </div>

            <div className="p-6 space-y-4">
                <h4 className="text-sm font-medium text-slate-900">Key Metrics</h4>

                <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Net Sales Value</span>
                    <span className="font-medium">{formatCurrency(result.netSalesValue)}</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Total Dev Cost</span>
                    <span className="font-medium">{formatCurrency(result.totalDevelopmentCost)}</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Peak Debt (Est)</span>
                    <span className="font-medium">{formatCurrency(result.peakDebtEstimate)}</span>
                </div>

                <div className="border-t border-slate-100 pt-4 mt-4">
                    <h4 className="text-sm font-medium text-slate-900 mb-3">Cost Breakdown</h4>
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span className="text-slate-500">Land & Acq.</span>
                            <span>{formatCurrency(result.breakdown.landAndAcquisition)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-slate-500">Construction</span>
                            <span>{formatCurrency(result.breakdown.construction)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-slate-500">Soft Costs</span>
                            <span>{formatCurrency(result.breakdown.softCosts)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-slate-500">Contingency</span>
                            <span>{formatCurrency(result.breakdown.contingency)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-slate-500">Finance</span>
                            <span>{formatCurrency(result.breakdown.finance)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-slate-500">Selling Costs</span>
                            <span>{formatCurrency(result.breakdown.sellingCosts)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-slate-500">GST</span>
                            <span>{formatCurrency(result.breakdown.gstEstimate)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
