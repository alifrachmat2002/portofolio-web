import AdminLayout, { Breadcrumb } from "@/components/layouts/AdminLayout";
import Techstack from "@/components/views/Admin/Techstack/Techstack";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const breadcrumbs : Breadcrumb[] = [
    {
        href: "/techstacks",
        title: "Tech Stack"
    },
]
export default async function TechPage() {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session) {
        redirect("/")
    }
    
    return (
        <AdminLayout breadcrumbs={breadcrumbs}>
            <Techstack/>
        </AdminLayout>
    );
}