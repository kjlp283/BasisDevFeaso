"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

const navItems = [
    { label: "Overview", href: "" },
    { label: "Planning", href: "/planning" },
    { label: "Feasibility", href: "/feasibility" },
    { label: "Scenarios", href: "/scenarios" },
    { label: "Reports", href: "/reports" },
];

export function Sidebar() {
    const params = useParams();
    const siteId = params?.siteId as string | undefined;

    return (
        <div className="w-64 bg-slate-900 text-white h-screen flex flex-col fixed left-0 top-0 border-r border-slate-800">
            <div className="p-6 border-b border-slate-800">
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
                    Basis Dev
                </h1>
                <p className="text-xs text-slate-400 mt-1">Feasibility Engine</p>
            </div>

            <div className="flex-1 py-6">
                <div className="px-4 mb-6">
                    <Link
                        href="/"
                        className="block px-4 py-2 rounded-md bg-slate-800 text-slate-300 hover:bg-slate-700 text-sm font-medium"
                    >
                        &larr; All Sites
                    </Link>
                </div>

                {siteId && (
                    <nav className="space-y-1 px-2">
                        {navItems.map((item) => (
                            <Link
                                key={item.label}
                                href={`/sites/${siteId}${item.href}`}
                                className="block px-4 py-2.5 rounded-md text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>
                )}
            </div>

            <div className="p-4 border-t border-slate-800">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500"></div>
                    <div>
                        <p className="text-sm font-medium text-white">User</p>
                        <p className="text-xs text-slate-500">Basis Builder</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
