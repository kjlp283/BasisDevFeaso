import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/layout/PageHeader";
import { PlanningPageClient } from "@/components/planning/PlanningPageClient";
import { Site } from "@/lib/domain/types";

interface PageProps {
    params: Promise<{ siteId: string }>;
}

export default async function PlanningPage({ params }: PageProps) {
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
            <PageHeader title="Planning & ResCode" subtitle={site.name} />
            <PlanningPageClient site={site} />
        </div>
    );
}
