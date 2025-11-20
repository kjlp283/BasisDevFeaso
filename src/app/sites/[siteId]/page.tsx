import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/layout/PageHeader";
import { SiteSnapshotCard } from "@/components/sites/SiteSnapshotCard";
import { CouncilRiskCard } from "@/components/sites/CouncilRiskCard";
import { GoldenBlockScoreCard } from "@/components/sites/GoldenBlockScoreCard";

interface PageProps {
    params: Promise<{ siteId: string }>;
}

export default async function SiteOverviewPage({ params }: PageProps) {
    const { siteId } = await params;

    const site = await prisma.site.findUnique({
        where: { id: siteId },
    });

    if (!site) notFound();

    return (
        <div>
            <PageHeader title={site.name} subtitle={site.address} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <div className="lg:col-span-2 space-y-6">
                    <SiteSnapshotCard site={site} />
                    <CouncilRiskCard councilName={site.council} />
                </div>
                <div>
                    <GoldenBlockScoreCard site={site} />
                </div>
            </div>
        </div>
    );
}
