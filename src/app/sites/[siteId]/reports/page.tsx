import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/layout/PageHeader";
import { ReportsPageClient } from "@/components/reports/ReportsPageClient";
import { Site, Scenario } from "@/lib/domain/types";

interface PageProps {
    params: Promise<{ siteId: string }>;
}

export default async function ReportsPage({ params }: PageProps) {
    const { siteId } = await params;

    const prismaSite = await prisma.site.findUnique({
        where: { id: siteId },
    });

    if (!prismaSite) notFound();

    const prismaScenarios = await prisma.scenario.findMany({
        where: { siteId },
        orderBy: { updatedAt: "desc" },
    });

    // Convert to Domain Site
    const site: Site = {
        ...prismaSite,
        overlays: prismaSite.overlays ? prismaSite.overlays.split(",").map(s => s.trim()) : [],
        easementsNotes: prismaSite.easementsNotes || undefined,
        createdAt: prismaSite.createdAt.toISOString(),
        updatedAt: prismaSite.updatedAt.toISOString(),
    };

    // Convert to Domain Scenarios
    const scenarios: Scenario[] = prismaScenarios.map(s => ({
        ...s,
        productType: s.productType as any, // Cast to ProductType
        planningInputs: JSON.parse(s.planningInputs),
        costInputs: JSON.parse(s.costInputs),
        financeInputs: JSON.parse(s.financeInputs),
        salesInputs: JSON.parse(s.salesInputs),
        taxInputs: JSON.parse(s.taxInputs),
        createdAt: s.createdAt.toISOString(),
        updatedAt: s.updatedAt.toISOString(),
    }));

    return (
        <div>
            <PageHeader title="Feasibility Pack" subtitle={site.name} />
            <ReportsPageClient site={site} scenarios={scenarios} />
        </div>
    );
}
