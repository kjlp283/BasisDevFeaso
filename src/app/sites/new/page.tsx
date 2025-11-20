import { PageHeader } from "@/components/layout/PageHeader";
import { SiteForm } from "@/components/sites/SiteForm";

export default function NewSitePage() {
    return (
        <div>
            <PageHeader title="New Site" subtitle="Enter site details to begin feasibility." />
            <SiteForm />
        </div>
    );
}
