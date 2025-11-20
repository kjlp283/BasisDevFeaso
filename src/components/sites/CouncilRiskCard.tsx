import { getCouncilProfile } from "@/lib/domain/councilProfiles";

export function CouncilRiskCard({ councilName }: { councilName: string }) {
    const profile = getCouncilProfile(councilName);

    if (!profile) return null;

    const colorMap = {
        Facilitator: "bg-green-50 text-green-700 border-green-200",
        Neutral: "bg-yellow-50 text-yellow-700 border-yellow-200",
        Protector: "bg-red-50 text-red-700 border-red-200",
    };

    return (
        <div className={`rounded-lg border p-6 ${colorMap[profile.category]}`}>
            <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold">{profile.council} Council</h3>
                <span className="px-2 py-1 bg-white bg-opacity-50 rounded text-xs font-bold uppercase tracking-wide">
                    {profile.category}
                </span>
            </div>
            <p className="text-sm opacity-90">{profile.notes}</p>
        </div>
    );
}
