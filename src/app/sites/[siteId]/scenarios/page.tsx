import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/layout/PageHeader";
import { ScenarioList } from "@/components/scenarios/ScenarioList";
import { Site } from "@/lib/domain/types";

interface PageProps {
    params: Promise<{ siteId: string }>;
}

export default async function ScenariosPage({ params }: PageProps) {
    const { siteId } = await params;

    const prismaSite = await prisma.site.findUnique({
        where: { id: siteId },
    });

    if (!prismaSite) notFound();

    // Convert to Domain Site
    const site: Site = {
        ...prismaSite,
        overlays: prismaSite.overlays ? prismaSite.overlays.split(",").map(s => s.trim()) : [],
        createdAt: prismaSite.createdAt.toISOString(),
        updatedAt: prismaSite.updatedAt.toISOString(),
    };

    return (
        <div>
            <PageHeader
                title="Scenarios"
                subtitle={site.name}
                action={{ label: "+ New Scenario", href: `/sites/${site.id}/feasibility` }}
            />
            <ScenarioList site={site} />
        </div>
    );
}
