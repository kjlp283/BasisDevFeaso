import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/layout/PageHeader";

export default async function Home() {
  const sites = await prisma.site.findMany({
    orderBy: { updatedAt: "desc" },
    include: { scenarios: true },
  });

  return (
    <div>
      <PageHeader
        title="Sites"
        actions={
          <Link
            href="/sites/new"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 font-medium"
          >
            + New Site
          </Link>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sites.map((site) => (
          <Link
            key={site.id}
            href={`/sites/${site.id}`}
            className="block bg-white rounded-lg shadow-sm border border-slate-200 hover:shadow-md transition-shadow p-6"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">{site.name}</h3>
                <p className="text-slate-500 text-sm">{site.address}</p>
              </div>
              <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-full font-medium">
                {site.council}
              </span>
            </div>

            <div className="space-y-2 text-sm text-slate-600">
              <div className="flex justify-between">
                <span>Zone:</span>
                <span className="font-medium">{site.zone}</span>
              </div>
              <div className="flex justify-between">
                <span>Area:</span>
                <span className="font-medium">{site.areaSqm}m²</span>
              </div>
              <div className="flex justify-between">
                <span>Scenarios:</span>
                <span className="font-medium">{site.scenarios.length}</span>
              </div>
            </div>
          </Link>
        ))}

        {sites.length === 0 && (
          <div className="col-span-full text-center py-12 bg-slate-50 rounded-lg border border-dashed border-slate-300">
            <p className="text-slate-500 mb-4">No sites found. Create your first site to get started.</p>
            <Link
              href="/sites/new"
              className="text-blue-600 hover:underline font-medium"
            >
              Create New Site
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
