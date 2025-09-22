"use client"
import React, { ReactNode, useState } from "react";
import { AppSidebar } from "../app-sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import { Separator } from "../ui/separator";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../ui/breadcrumb";
import { useTheme } from "next-themes";
import { Button } from "../ui/button";
import { Moon, Sun } from "lucide-react";

interface Props {
    children : ReactNode;
    breadcrumbs?: Breadcrumb[]
}

export type Breadcrumb = {
    title: string;
    href: string;
}

export default function AdminLayout({ children, breadcrumbs }: Props) {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                    <SidebarTrigger className="-ml-1" />
                    <Separator
                        orientation="vertical"
                        className="mr-2 data-[orientation=vertical]:h-4"
                    />
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem className="hidden md:block">
                                <BreadcrumbLink href="/admin">Admin</BreadcrumbLink>
                            </BreadcrumbItem>
                            {breadcrumbs?.map((breadcrumb, index) => (
                                <React.Fragment key={index}>
                                    <BreadcrumbSeparator className="hidden md:block" />
                                    <BreadcrumbItem>
                                        {index + 1 == breadcrumbs.length ? 
                                            <BreadcrumbPage>
                                                {breadcrumb.title}
                                            </BreadcrumbPage>
                                            :
                                            <BreadcrumbLink href={breadcrumb.href}>
                                                {breadcrumb.title}
                                            </BreadcrumbLink>
                                        }
                                    </BreadcrumbItem>
                                </React.Fragment>
                            ))}
                        </BreadcrumbList>
                    </Breadcrumb>
                    <Button
                            variant="ghost"
                            size="icon"
                            className="ml-auto"
                            onClick={() =>
                                setTheme(theme === "dark" ? "light" : "dark")
                            }
                            aria-label="Toggle theme"
                        >
                            {mounted && theme === "dark" ? (
                                <Sun className="h-5 w-5" />
                            ) : (
                                <Moon className="h-5 w-5" />
                            )}
                        </Button>
                </header>
                <div className="p-6 ">{children}</div>
            </SidebarInset>
        </SidebarProvider>
    );
}