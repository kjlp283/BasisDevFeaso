-- CreateTable
CREATE TABLE "Site" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "council" TEXT NOT NULL,
    "zone" TEXT NOT NULL,
    "overlays" TEXT NOT NULL,
    "areaSqm" REAL NOT NULL,
    "frontageM" REAL NOT NULL,
    "depthM" REAL NOT NULL,
    "isCorner" BOOLEAN NOT NULL,
    "easementsNotes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Scenario" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "siteId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "productType" TEXT NOT NULL,
    "dwellings" INTEGER NOT NULL,
    "storeys" INTEGER NOT NULL,
    "grossFloorAreaPerDwelling" REAL NOT NULL,
    "specLevel" TEXT NOT NULL,
    "includesBasement" BOOLEAN NOT NULL,
    "basementAreaSqm" REAL,
    "planningInputs" TEXT NOT NULL,
    "costInputs" TEXT NOT NULL,
    "financeInputs" TEXT NOT NULL,
    "salesInputs" TEXT NOT NULL,
    "taxInputs" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Scenario_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "Site" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
