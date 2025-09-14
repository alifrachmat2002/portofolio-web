import AdminLayout, { Breadcrumb } from "@/components/layouts/AdminLayout";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const breadcrumbs : Breadcrumb[] = [
    {
        href: "/admin",
        title: "Home"
    }
]
export default async function AdminPage() {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session) {
        redirect("/")
    }
    
    return (
        <AdminLayout breadcrumbs={breadcrumbs}>
            <h1 className="lg:text-3xl font-bold">
                Welcome Back my Boi {session.user.name}
            </h1>
        </AdminLayout>
    );
}