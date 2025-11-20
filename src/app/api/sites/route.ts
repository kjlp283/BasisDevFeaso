import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const site = await prisma.site.create({
            data: {
                name: body.name,
                address: body.address,
                council: body.council,
                zone: body.zone,
                overlays: body.overlays || "",
                areaSqm: parseFloat(body.areaSqm),
                frontageM: parseFloat(body.frontageM),
                depthM: parseFloat(body.depthM),
                isCorner: body.isCorner === "on",
            },
        });

        return NextResponse.json(site);
    } catch (error) {
        console.error("Error creating site:", error);
        return NextResponse.json({ error: "Failed to create site" }, { status: 500 });
    }
}
