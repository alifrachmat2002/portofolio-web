import { ReactNode } from "react";
import Navbar from "../navbar";
import Footer from "../footer";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../ui/breadcrumb";
import Link from "next/link";


export default function ProjectLayout({ children, title } : { children: ReactNode; title: string;}) {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            <Navbar variant="alternative" />
            <div className="min-h-screen py-20 max-w-7xl px-4 sm:px-6 lg:px-8">
                <Breadcrumb className="mb-4">
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link href={"/#projects"}>Projects</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>{title}</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                {children}
            </div>
            <Footer />
        </div>
    );
}