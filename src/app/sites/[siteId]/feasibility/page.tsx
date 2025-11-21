import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/layout/PageHeader";
import { FeasibilityPageClient } from "@/components/feasibility/FeasibilityPageClient";
import { Site } from "@/lib/domain/types";

interface PageProps {
    params: Promise<{ siteId: string }>;
}

export default async function FeasibilityPage({ params }: PageProps) {
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
            <PageHeader title="Financial Feasibility" subtitle={site.name} />
            <FeasibilityPageClient site={site} />
        </div>
    );
}
