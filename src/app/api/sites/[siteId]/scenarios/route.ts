import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ siteId: string }> }
) {
    const { siteId } = await params;

    try {
        const scenarios = await prisma.scenario.findMany({
            where: { siteId },
            orderBy: { updatedAt: "desc" },
        });
        return NextResponse.json(scenarios);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch scenarios" }, { status: 500 });
    }
}

export async function POST(
    request: Request,
    { params }: { params: Promise<{ siteId: string }> }
) {
    const { siteId } = await params;

    try {
        const body = await request.json();
        const {
            name,
            productType,
            dwellings,
            storeys,
            grossFloorAreaPerDwelling,
            specLevel,
            includesBasement,
            basementAreaSqm,
            planningInputs,
            costInputs,
            financeInputs,
            salesInputs,
            taxInputs
        } = body;

        const scenario = await prisma.scenario.create({
            data: {
                siteId,
                name,
                productType,
                dwellings,
                storeys,
                grossFloorAreaPerDwelling,
                specLevel,
                includesBasement,
                basementAreaSqm,
                planningInputs: JSON.stringify(planningInputs),
                costInputs: JSON.stringify(costInputs),
                financeInputs: JSON.stringify(financeInputs),
                salesInputs: JSON.stringify(salesInputs),
                taxInputs: JSON.stringify(taxInputs),
            },
        });

        return NextResponse.json(scenario);
    } catch (error) {
        console.error("Error creating scenario:", error);
        return NextResponse.json({ error: "Failed to create scenario" }, { status: 500 });
    }
}
