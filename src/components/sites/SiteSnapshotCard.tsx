import { Site } from "@prisma/client";

export function SiteSnapshotCard({ site }: { site: Site }) {
    return (
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Site Snapshot</h3>
            <dl className="grid grid-cols-2 gap-4 text-sm">
                <div>
                    <dt className="text-slate-500">Area</dt>
                    <dd className="font-medium text-slate-900">{site.areaSqm}m²</dd>
                </div>
                <div>
                    <dt className="text-slate-500">Frontage</dt>
                    <dd className="font-medium text-slate-900">{site.frontageM}m</dd>
                </div>
                <div>
                    <dt className="text-slate-500">Depth</dt>
                    <dd className="font-medium text-slate-900">{site.depthM}m</dd>
                </div>
                <div>
                    <dt className="text-slate-500">Corner</dt>
                    <dd className="font-medium text-slate-900">{site.isCorner ? "Yes" : "No"}</dd>
                </div>
                <div>
                    <dt className="text-slate-500">Zone</dt>
                    <dd className="font-medium text-slate-900">{site.zone}</dd>
                </div>
                <div>
                    <dt className="text-slate-500">Overlays</dt>
                    <dd className="font-medium text-slate-900">{site.overlays || "None"}</dd>
                </div>
            </dl>
        </div>
    );
}
