import { CouncilProfile } from "./types";

export const COUNCIL_PROFILES: CouncilProfile[] = [
    {
        council: "Monash",
        category: "Facilitator",
        notes: "Generally growth-focused. Good for townhouses in GRZ.",
    },
    {
        council: "Kingston",
        category: "Facilitator",
        notes: "Supportive of development near transport hubs.",
    },
    {
        council: "Manningham",
        category: "Facilitator",
        notes: "Accepting of density, but watch for steep topography overlays.",
    },
    {
        council: "Darebin",
        category: "Facilitator",
        notes: "Pro-development but very strict on ESD and accessibility.",
    },
    {
        council: "Merri-bek",
        category: "Facilitator",
        notes: "Formerly Moreland. High density support, strict ESD.",
    },
    {
        council: "Bayside",
        category: "Protector",
        notes: "High scrutiny. Neighbourhood character is paramount. Expect objections.",
    },
    {
        council: "Boroondara",
        category: "Protector",
        notes: "Very protective of heritage and character. Difficult for aggressive density.",
    },
    {
        council: "Stonnington",
        category: "Protector",
        notes: "High land values, high scrutiny on design quality and setbacks.",
    },
    {
        council: "Glen Eira",
        category: "Neutral",
        notes: "Balanced approach. Strict on transition zones.",
    },
];

export function getCouncilProfile(councilName: string): CouncilProfile | undefined {
    return COUNCIL_PROFILES.find((c) => c.council.toLowerCase() === councilName.toLowerCase());
}
