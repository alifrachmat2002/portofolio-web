"use client"

import { useMemo } from "react";
import useTechstack from "./useTechstack"
import { ColumnDef } from "@tanstack/react-table";
import { Techstack as TechstackType } from "@/db/schema/techstacks";
import { DataTableColumnHeader } from "@/components/ui/data-table/data-table-column-header";
import { DataTable } from "@/components/ui/data-table/data-table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Edit, MoreHorizontal, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import AddTechstackDialog from "@/components/ui/techstack/add-techstack-dialog";

export default function Techstack() {
    const { 
        techstackData,
        isLoading,
        isError,
    } = useTechstack();

    const columns = useMemo<ColumnDef<TechstackType>[]>(() => [
        {
            accessorKey: "name",
            header: ({ column }) => <DataTableColumnHeader column={column} title="Name"/>
        },
        {
            id: "actions",
            header: () => <span>Actions</span>,
            cell: ({ row }) => {           
                return (
                    <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>
                            <Edit/>
                            Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Trash/>
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                    </DropdownMenu>
            )
            },
        }
    ],[])

    return (
        <div className="space-y-6">
            <div className="flex justify-between">
                <h1 className="lg:text-3xl font-bold">Tech Stack</h1>
                <AddTechstackDialog/>
            </div>
            <DataTable columns={columns} data={techstackData || []} />
        </div>
    );
}